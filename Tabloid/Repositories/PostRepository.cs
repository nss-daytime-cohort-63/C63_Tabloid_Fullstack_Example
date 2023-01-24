using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using Tabloid.Repositories;


namespace Tabloid.Repositories
{

    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT p.Id, p.Title, p.Content, p.ImageLocation, p.CreateDateTime, p.PublishDateTime,
                      p.IsApproved, p.UserProfileId, p.CategoryId,

                      up.FireBaseUserId, up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime AS UserProfileDateCreated,
                      up.ImageLocation AS UserProfileImageUrl, up.UserTypeId
                        
                 FROM Post p
                      JOIN UserProfile up ON p.UserProfileId = up.Id
                WHERE PublishDateTime <= SYSDATETIME() AND IsApproved = 1
             ORDER BY PublishDateTime DESC
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            posts.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDatetime"),
                                IsApproved = (bool)reader["IsApproved"],
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                },
                            });
                        }

                        return posts;
                    }
                }
            }
        }
    }
}