using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;
using Tabloid.Models;

namespace Tabloid.Models.ViewModels
{
    public class PostTagViewModel
    {
        /* public Post Post { get; set; } */
        public PostTag PostTag { get; set; }
        public List<Tag> Tags { get; set; }
        public List<SelectListItem> Options { get; set; }
        public void OnGet()
        {
            Options = Tags.Select(x => new SelectListItem
            {
                Text = x.Name,
                Value = x.Id.ToString(),
            }).ToList();
        }
    }
}