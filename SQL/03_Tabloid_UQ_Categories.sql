use [master]

GO

ALTER TABLE dbo.Category 
ADD CONSTRAINT [UQ_Category_Name] UNIQUE([Name])