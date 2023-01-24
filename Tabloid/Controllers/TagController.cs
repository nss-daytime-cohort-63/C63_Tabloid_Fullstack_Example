using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Tabloid.Repositories;
using Microsoft.VisualBasic;
using System.Security.Claims;
using Tabloid.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        // GET: TagController
        [HttpGet("Index")]
        public ActionResult Index()
        {
            var tags = _tagRepository.GetAllTags();
            return Ok(_tagRepository.GetAllTags());
        }

        // POST: api/Tag
        [Authorize(Roles = "Admin")]
        [HttpPost("Create")]
        public ActionResult Create(Tag tag)
        {
            try
            {
                _tagRepository.AddTag(tag);

                return Ok(new { message = "Success" });
            }
            catch
            {
                return Ok(tag);
            }
        }

        // POST: api/Tag/Edit/5
        [Authorize(Roles = "Admin")]
        [HttpPost("Edit/{id}")]
        public ActionResult Edit(int id, Tag tag)
        {
            try
            {
                _tagRepository.UpdateTag(tag);

                return Ok();
            }
            catch
            {
                return Ok(tag);
            }
        }

        // POST: api/Tag/Delete/5
        [Authorize(Roles = "Admin")]
        [HttpPost("Delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _tagRepository.DeletePostTagsByTag(id);

                return Ok();
            }
            catch
            {
                return Ok();
            }
        }

    }
}