using Microsoft.AspNetCore.Mvc;
using Posts_Website.Entities;
using Posts_Website.Exceptions;
using Posts_Website.Helpers;
using Posts_Website.Mappers;
using Posts_Website.Repositories;

namespace Posts_Website.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController(
        IUserRepository userRepo,
        ICommentRepository commentRepo
    ) : ControllerBase
    {
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            User? user = userRepo.GetById(id) ??
                throw new EntityNotFoundException();

            return Ok(user.ToUserDto());
        }

        [HttpGet("{id}/posts")]
        public IActionResult GetPostsRange(
            [FromRoute] Guid id,
            [FromQuery] int limit = 10,
            [FromQuery] int page = 1,
            [FromQuery] string sort = "new",
            [FromQuery] string search = ""
        )
        {
            User? user = userRepo.GetById(id) ??
                throw new EntityNotFoundException();

            SearchPostsResults results = ControllerHelper.SearchPosts(
                user.Posts,
                search,
                sort,
                page,
                limit
            );

            HttpContext.Response.Headers.Append(
                "X-Total-Count",
                results.TotalCount.ToString()
            );

            return Ok(results.Posts.Select(p => p.ToPostDto()));
        }

        [HttpGet("{id}/comments")]
        public IActionResult GetCommentsRange(
            [FromRoute] Guid id,
            [FromQuery] int limit = 10,
            [FromQuery] int page = 1,
            [FromQuery] string sort = "new",
            [FromQuery] string search = ""
        )
        {
            User? user = userRepo.GetById(id) ??
                throw new EntityNotFoundException();

            Comment[] comments = commentRepo.GetAll();

            SearchCommentsResults results = ControllerHelper.SearchComments(
                user.Comments,
                search,
                sort,
                page,
                limit
            );

            HttpContext.Response.Headers.Append(
                "X-Total-Count",
                results.TotalCount.ToString()
            );

            return Ok(results.Comments.Select(c => c.ToCommentDto()));
        }
    }
}