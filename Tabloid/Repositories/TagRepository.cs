using System.Collections.Generic;
using Tabloid.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Utils;
using Tabloid.Repositories;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }




        public AllTagsDTO GetAllTags(bool usePagination, int? increment, int? offset)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $@"
                SELECT Id, [Name], (SELECT COUNT(*) FROM dbo.Tag WHERE IsDeleted = 0) Total
                FROM dbo.Tag
                WHERE IsDeleted = 0
                ORDER BY [Name]
                {(usePagination ? $"OFFSET {(offset == null ? 0 : offset)} ROWS FETCH NEXT {(increment == null ? 10 : increment)} ROWS ONLY" : "")}
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Tag> tags = new List<Tag>();
                        AllTagsDTO newDTO = new();

                        while (reader.Read())
                        {
                            Tag newTag = new()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                Name = DbUtils.GetString(reader, "name")
                            };

                            tags.Add(newTag);
                            if (newDTO.Total == null)
                            {
                                newDTO.Total = DbUtils.GetInt(reader, "Total");
                            }
                        }

                        newDTO.Tags = tags;
                        return newDTO;
                    }
                }
            }
        }

        public void Add(Tag tag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    //! If tag already exists, but is deleted, restore it.
                    cmd.CommandText = $@"
                        IF (SELECT Id FROM dbo.Tag WHERE [Name] = @Name) IS NULL
	                        INSERT INTO dbo.Tag ([Name])
	                        VALUES (@Name)
                        ELSE
	                        UPDATE dbo.Tag
	                        SET IsDeleted = 0
	                        WHERE [Name] = @Name
                    ";

                    DbUtils.AddParameter(cmd, "@Name", tag.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Edit(string oldName, string newName)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE dbo.Tag
                        SET [Name] = @NewName
                        WHERE [Name] = @OldName
                    ";

                    DbUtils.AddParameter(cmd, "@NewName", newName);
                    DbUtils.AddParameter(cmd, "@OldName", oldName);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int tagId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE dbo.Tag
                        SET IsDeleted = 1
                        WHERE Id = @Id
                    ";

                    DbUtils.AddParameter(cmd, "@Id", tagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}