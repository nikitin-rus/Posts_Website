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
        IPostRepository postRepo,
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

            int count = postRepo.GetCount(id, search);

            limit = QueryHelper.NormalizeLimit(limit, 1, 10);

            page = QueryHelper.NormalizePage(page, 1,
                QueryHelper.GetPages(count, limit)
            );

            Post[] posts = postRepo.Get(
                id,
                search,
                sort,
                QueryHelper.GetOffset(
                    page,
                    limit
                ),
                limit
            );

            HttpContext.Response.Headers.Append(
                "X-Total-Count",
                count.ToString()
            );

            return Ok(posts.Select(p => p.ToPostDto()));
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

            int count = commentRepo.GetCount(id, search);

            limit = QueryHelper.NormalizeLimit(limit, 1, 10);

            page = QueryHelper.NormalizePage(page, 1, 
                QueryHelper.GetPages(count, limit)
            );

            Comment[] comments = commentRepo.Get(
                id,
                search,
                sort,
                QueryHelper.GetOffset(
                    page,
                    limit
                ),
                limit
            );

            HttpContext.Response.Headers.Append(
                "X-Total-Count",
                count.ToString()
            );

            return Ok(comments.Select(c => c.ToCommentDto()));
        }
    }
}