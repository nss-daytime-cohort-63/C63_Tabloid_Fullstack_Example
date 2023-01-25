using System.Collections.Generic;

using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        AllCategoriesDTO GetAll(bool usePagination, int? offset);
        public void Add(Category category);
    }
}