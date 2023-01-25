using System.Collections.Generic;

namespace Tabloid.Models
{
    public class AllCategoriesDTO //! DTO = Data Transfer Object
    {
        public List<Category> Categories { get; set; }
        public int? Total { get; set; }
    }
}
