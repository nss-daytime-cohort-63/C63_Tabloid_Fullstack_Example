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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CategoryController(ICategoryRepository categoryRepository, IUserProfileRepository userProfileRepository)
        {
            _categoryRepository = categoryRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] bool usePagination, [FromQuery] int? increment, [FromQuery] int? offset)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserProfile userProfile = _userProfileRepository.GetByFirebaseUserId(UUID);

            if (userProfile.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            AllCategoriesDTO DTO = _categoryRepository.GetAll(usePagination, increment, offset);

            return Ok(DTO);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Category newCategory)
        {
            string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

            UserProfile userProfile = _userProfileRepository.GetByFirebaseUserId(UUID);

            if (userProfile.UserTypeId != UserType.ADMIN_ID)
            {
                return Unauthorized();
            }

            try
            { 
                _categoryRepository.Add(newCategory);
                
                return CreatedAtAction("GET", new { newCategory.Id }, newCategory);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
