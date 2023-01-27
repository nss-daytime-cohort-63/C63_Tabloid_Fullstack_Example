using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {
        AllTagsDTO GetAllTags(bool usePagination, int? increment, int? offset);
        public void Add(Tag tag);
        public void Delete(int id);
        public void Edit(string oldName, string newName);
    }
}