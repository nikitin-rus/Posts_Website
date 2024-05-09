using Microsoft.AspNetCore.Mvc;
using Posts_Website.Dtos;
using Posts_Website.Entities;
using Posts_Website.Exceptions;
using Posts_Website.Mappers;
using Posts_Website.Repositories;

namespace Posts_Website.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController(IUserRepository repo) : ControllerBase
    {
		[HttpGet]
		public IActionResult GetAll()
		{
			return Ok(repo.GetAll()
						  .Select(u => u.ToUserDto()));
		}

		[HttpGet("{id}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            User? user = repo.GetById(id) ??
				throw new EntityNotFoundException();

            return Ok(user.ToUserDetailsDto());
        }
    }
}