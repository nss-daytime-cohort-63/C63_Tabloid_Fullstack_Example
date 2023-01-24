using System.Collections.Generic;

using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }

        public List<Category> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, [Name] FROM Category";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Category> categories = new List<Category>();

                        while (reader.Read())
                        {
                            Category newCategory = new()
                            {
                                Id = DbUtils.GetInt(reader, "id"),
                                Name = DbUtils.GetString(reader, "name")
                            };

                            categories.Add(newCategory);
                        }

                        return categories;
                    }
                }
            }
        }
    }
}
