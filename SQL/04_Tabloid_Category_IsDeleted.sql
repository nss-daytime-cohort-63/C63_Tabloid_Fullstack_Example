use [Tabloid]
GO

ALTER TABLE dbo.Category
ADD IsDeleted BIT NOT NULL DEFAULT(0)