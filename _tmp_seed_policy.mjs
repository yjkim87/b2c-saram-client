import fs from "node:fs"
import path from "node:path"
import sql from "mssql"

function parseEnvFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const env = {}

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()

    if (!line || line.startsWith("#")) {
      continue
    }

    const eqIndex = line.indexOf("=")
    if (eqIndex <= 0) {
      continue
    }

    const key = line.slice(0, eqIndex).trim()
    let value = line.slice(eqIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    env[key] = value
  }

  return env
}

function extractTemplateLiteral(sourceText, variableName) {
  const pattern = new RegExp("const\\s+" + variableName + "\\s*=\\s*`([\\s\\S]*?)`")
  const match = sourceText.match(pattern)

  if (!match) {
    throw new Error(`Failed to extract template literal: ${variableName}`)
  }

  return match[1]
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function linkifyUrls(value) {
  return value.replace(/(https?:\/\/[^\s)]+)/g, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  })
}

function renderPolicyLine(line) {
  const normalized = line.replace(/\u00A0/g, " ").trim()

  if (!normalized) {
    return ""
  }

  const escaped = linkifyUrls(escapeHtml(normalized))

  if (/^제\d+조\s/.test(normalized) || normalized === "부칙") {
    return `<h2>${escaped}</h2>`
  }

  if (/^\d+\.\s/.test(normalized)) {
    return `<h3>${escaped}</h3>`
  }

  return `<p>${escaped}</p>`
}

function buildPolicyContent(source, titleMarker) {
  const normalizedLines = source
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\uFEFF/g, ""))

  const startIndex = normalizedLines.findIndex((line) => line.trim() === titleMarker)
  const scopedLines = startIndex >= 0 ? normalizedLines.slice(startIndex + 1) : normalizedLines

  return scopedLines.map(renderPolicyLine).filter(Boolean).join("")
}

async function ensurePolicyTable(pool) {
  const query = `
    IF OBJECT_ID(N'dbo.PolicyDocuments', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.PolicyDocuments (
        Id          BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        PolicyType  NVARCHAR(20) NOT NULL,
        Version     VARCHAR(20) NOT NULL,
        Title       NVARCHAR(200) NOT NULL,
        ContentHtml NVARCHAR(MAX) NOT NULL,
        IsPublished BIT NOT NULL CONSTRAINT DF_PolicyDocuments_IsPublished DEFAULT (1),
        EffectiveAt DATETIME2 NOT NULL CONSTRAINT DF_PolicyDocuments_EffectiveAt DEFAULT (SYSUTCDATETIME()),
        CreatedAt   DATETIME2 NOT NULL CONSTRAINT DF_PolicyDocuments_CreatedAt DEFAULT (SYSUTCDATETIME()),
        UpdatedAt   DATETIME2 NOT NULL CONSTRAINT DF_PolicyDocuments_UpdatedAt DEFAULT (SYSUTCDATETIME())
      );
    END;

    IF NOT EXISTS (
      SELECT 1
      FROM sys.indexes
      WHERE name = 'UX_PolicyDocuments_PolicyType_Version'
        AND object_id = OBJECT_ID(N'dbo.PolicyDocuments')
    )
    BEGIN
      CREATE UNIQUE INDEX UX_PolicyDocuments_PolicyType_Version
      ON dbo.PolicyDocuments (PolicyType, Version);
    END;

    IF NOT EXISTS (
      SELECT 1
      FROM sys.indexes
      WHERE name = 'IX_PolicyDocuments_Type_Published_Version'
        AND object_id = OBJECT_ID(N'dbo.PolicyDocuments')
    )
    BEGIN
      CREATE INDEX IX_PolicyDocuments_Type_Published_Version
      ON dbo.PolicyDocuments (PolicyType, IsPublished, Version DESC);
    END;
  `

  await pool.request().query(query)
}

async function upsertPolicy(pool, { policyType, version, title, contentHtml, effectiveAt }) {
  const query = `
    MERGE dbo.PolicyDocuments AS target
    USING (
      SELECT
        @PolicyType AS PolicyType,
        @Version AS Version
    ) AS source
    ON target.PolicyType = source.PolicyType
      AND target.Version = source.Version
    WHEN MATCHED THEN
      UPDATE SET
        Title = @Title,
        ContentHtml = @ContentHtml,
        IsPublished = 1,
        EffectiveAt = @EffectiveAt,
        UpdatedAt = SYSUTCDATETIME()
    WHEN NOT MATCHED THEN
      INSERT (
        PolicyType,
        Version,
        Title,
        ContentHtml,
        IsPublished,
        EffectiveAt,
        CreatedAt,
        UpdatedAt
      )
      VALUES (
        @PolicyType,
        @Version,
        @Title,
        @ContentHtml,
        1,
        @EffectiveAt,
        SYSUTCDATETIME(),
        SYSUTCDATETIME()
      );
  `

  await pool
    .request()
    .input("PolicyType", sql.NVarChar(20), policyType)
    .input("Version", sql.VarChar(20), version)
    .input("Title", sql.NVarChar(200), title)
    .input("ContentHtml", sql.NVarChar(sql.MAX), contentHtml)
    .input("EffectiveAt", sql.DateTime2, effectiveAt)
    .query(query)
}

async function run() {
  const repoRoot = process.cwd()
  const envPath = path.join(repoRoot, ".env.local")
  const policySourcePath = path.join(repoRoot, "features", "policy", "data", "mock-policy.ts")

  const env = parseEnvFile(envPath)
  const sourceText = fs.readFileSync(policySourcePath, "utf8")

  const privacySource = extractTemplateLiteral(sourceText, "privacyPolicySource")
  const termsSource = extractTemplateLiteral(sourceText, "termsPolicySource")

  const privacyHtml = buildPolicyContent(privacySource, "사발면 플랫폼 개인정보처리방침")
  const termsHtml = buildPolicyContent(termsSource, "사발면 플랫폼 이용약관")

  const config = {
    server: env.DB_SERVER,
    port: Number(env.DB_PORT ?? 1433),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    options: {
      trustServerCertificate: true,
      encrypt: false,
    },
  }

  const pool = await new sql.ConnectionPool(config).connect()

  try {
    await ensurePolicyTable(pool)

    await upsertPolicy(pool, {
      policyType: "privacy",
      version: "2026-04-22",
      title: "개인정보처리방침",
      contentHtml: privacyHtml,
      effectiveAt: new Date("2026-04-22T00:00:00Z"),
    })

    await upsertPolicy(pool, {
      policyType: "terms",
      version: "2026-04-22",
      title: "이용약관",
      contentHtml: termsHtml,
      effectiveAt: new Date("2026-04-22T00:00:00Z"),
    })

    console.log("Policy documents seeded successfully.")
  } finally {
    await pool.close()
  }
}

run().catch((error) => {
  console.error("Failed to seed policy documents.")
  console.error(error)
  process.exit(1)
})
