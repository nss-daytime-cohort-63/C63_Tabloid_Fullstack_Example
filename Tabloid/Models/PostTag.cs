
using System.Collections.Generic;

namespace Tabloid.Models
{
    public class PostTag
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public int PostId { get; set; }

        public List<int> TagIds { get; set; }
    }
}