using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;
using Tabloid.Models;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Content { get; set; }

        [Required]
        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }

        public DateTime PublishDateTime { get; set; }

        public bool IsApproved { get; set; }

        public int CategoryId { get; set; }

        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }


        /* Add this for when categories are implemented */ 

        // public Category Category { get; set; }
    }
}