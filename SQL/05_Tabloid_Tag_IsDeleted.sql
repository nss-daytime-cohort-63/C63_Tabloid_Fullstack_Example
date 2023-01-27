use [Tabloid]
GO

ALTER TABLE dbo.Tag
ADD IsDeleted BIT NOT NULL DEFAULT(0)