using System.Collections.Generic;
using System.Security.Claims;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public TagController(ITagRepository tagRepository, IUserProfileRepository userProfileRepository)
        {
            _tagRepository = tagRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAllTags(bool usePagination, int? increment, int? offset)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserProfile userProfile = _userProfileRepository.GetByFirebaseUserId(UUID);

            if (userProfile.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            AllTagsDTO DTO = _tagRepository.GetAllTags(usePagination, increment, offset);

            return Ok(DTO);
        }

        [HttpPost]
        public IActionResult AddTag([FromBody] Tag newTag)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserProfile userProfile = _userProfileRepository.GetByFirebaseUserId(UUID);

            if (userProfile.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            try
            {
                _tagRepository.Add(newTag);

                return CreatedAtAction("GET", new { newTag.Id }, newTag);
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpDelete("{tagId}")]
        public IActionResult Delete([FromRoute] int tagId)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserProfile userProfile = _userProfileRepository.GetByFirebaseUserId(UUID);

            if (userProfile.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            try
            {
                _tagRepository.Delete(tagId);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Edit([FromQuery] string oldName, [FromQuery] string newName)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserProfile userProfile = _userProfileRepository.GetByFirebaseUserId(UUID);

            if (userProfile.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            try
            {
                _tagRepository.Edit(oldName, newName);

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}