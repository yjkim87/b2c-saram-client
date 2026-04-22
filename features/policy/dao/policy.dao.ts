import sql from "mssql"
import { DatabaseConnLIB, DatabaseConnType, type SqlParameter } from "@/shared/dao/common/DatabaseConnLIB"
import type { PolicyDocument, PolicyType } from "@/features/policy/model/policy.types"

type PolicyDbRow = {
  PolicyType?: string
  Version?: string | Date
  Title?: string
  ContentHtml?: string
  EffectiveAt?: string | Date
  UpdatedAt?: string | Date
}

const databaseConnLIB = new DatabaseConnLIB()
const conn = "real"

function formatDateToYmd(value: Date) {
  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, "0")
  const day = `${value.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function toVersionString(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : undefined
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return formatDateToYmd(value)
  }

  return undefined
}

function toDefaultTitle(type: PolicyType) {
  if (type === "privacy") {
    return "\uAC1C\uC778\uC815\uBCF4\uCC98\uB9AC\uBC29\uCE68"
  }

  return "\uC774\uC6A9\uC57D\uAD00"
}

function toPolicyDocument(row: PolicyDbRow, type: PolicyType): PolicyDocument | null {
  const content = typeof row.ContentHtml === "string" ? row.ContentHtml.trim() : ""

  if (!content) {
    return null
  }

  const title =
    typeof row.Title === "string" && row.Title.trim().length > 0
      ? row.Title.trim()
      : toDefaultTitle(type)

  const updatedAt = toVersionString(row.Version) ?? toVersionString(row.EffectiveAt) ?? toVersionString(row.UpdatedAt)

  return {
    type,
    title,
    content,
    updatedAt,
  }
}

export class PolicyDao {
  async getPublishedPoliciesByType(type: PolicyType): Promise<PolicyDocument[]> {
    const query = `
      SELECT
        PolicyType,
        Version,
        Title,
        ContentHtml,
        EffectiveAt,
        UpdatedAt
      FROM dbo.PolicyDocuments
      WHERE PolicyType = @PolicyType
        AND IsPublished = 1
      ORDER BY Version DESC, EffectiveAt DESC, Id DESC
    `

    const parameters: SqlParameter[] = [
      {
        ParameterName: "@PolicyType",
        Value: type,
        SqlDbType: sql.NVarChar(20),
      },
    ]

    const rows = await databaseConnLIB.ExcDT<PolicyDbRow>(query, parameters, DatabaseConnType.TXT, conn)

    return rows
      .map((row) => toPolicyDocument(row, type))
      .filter((document): document is PolicyDocument => document !== null)
  }
}
