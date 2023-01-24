using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        Tag GetTagById(int id);
        List<int> GetTagsByPostId(int id);
        List<Tag> GetTagsOnPost(int id);
        void DeletePostTagsByPost(int postId);
        void DeletePostTagsByTag(int tagId);
        void AddTag(Tag tag);
        void DeleteTag(Tag tag);
        void UpdateTag(Tag tag);
    }
}