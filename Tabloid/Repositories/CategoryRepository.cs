using System.Collections.Generic;
using System.Security.Cryptography;
using System.Xml.Schema;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }

        public AllCategoriesDTO GetAll(bool usePagination, int? increment, int? offset)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $@"
                        SELECT Id, [Name], (SELECT COUNT(*) FROM dbo.Category) Total
                        FROM dbo.Category
                        ORDER BY [Name]
                        {(usePagination ? $"OFFSET {(offset == null ? 0 : offset)} ROWS FETCH NEXT {(increment == null ? 10 : increment)} ROWS ONLY" : "")}
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Category> categories = new List<Category>();
                        AllCategoriesDTO newDTO = new();

                        while (reader.Read())
                        {
                            Category newCategory = new()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                Name = DbUtils.GetString(reader, "name")
                            };

                            categories.Add(newCategory);
                            if (newDTO.Total == null)
                            {
                                newDTO.Total = DbUtils.GetInt(reader, "Total");
                            }
                        }
                        
                        newDTO.Categories = categories;
                        return newDTO;
                    }
                }
            }
        }

        public void Add(Category category)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $@"
                        INSERT INTO dbo.Category ([Name])
                        VALUES (@Name)
                    ";

                    DbUtils.AddParameter(cmd, "@Name", category.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
