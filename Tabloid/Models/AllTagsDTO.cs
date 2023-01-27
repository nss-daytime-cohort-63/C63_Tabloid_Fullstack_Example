using System.Collections.Generic;

namespace Tabloid.Models
{
    public class AllTagsDTO //! DTO = Data Transfer Object
    {
        public List<Tag> Tags { get; set; }
        public int? Total { get; set; }
    }
}
