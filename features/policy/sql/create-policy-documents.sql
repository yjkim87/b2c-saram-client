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
)
GO

CREATE UNIQUE INDEX UX_PolicyDocuments_PolicyType_Version
ON dbo.PolicyDocuments (PolicyType, Version)
GO

CREATE INDEX IX_PolicyDocuments_Type_Published_Version
ON dbo.PolicyDocuments (PolicyType, IsPublished, Version DESC)
GO

-- Sample seed rows
-- INSERT INTO dbo.PolicyDocuments (PolicyType, Version, Title, ContentHtml, IsPublished, EffectiveAt)
-- VALUES
--   (
--     'privacy',
--     '2026-04-22',
--     N'개인정보처리방침',
--     N'<h2>제1조 개인정보의 처리항목 및 수집방법</h2><p>...</p>',
--     1,
--     '2026-04-22'
--   ),
--   (
--     'terms',
--     '2026-04-22',
--     N'이용약관',
--     N'<h2>제1조 목적</h2><p>...</p>',
--     1,
--     '2026-04-22'
--   )
GO

