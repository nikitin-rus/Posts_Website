using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts_Website.Dtos;
using Posts_Website.Entities;
using Posts_Website.Exceptions;
using Posts_Website.Mappers;
using Posts_Website.Repositories;
using Posts_Website.Services;

namespace Posts_Website.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController(
        IPostRepository postRepo,
        IClaimsPrincipalService principalService
    ) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            Post[] posts = postRepo.GetAll();

            return Ok(posts.Select(p => p.ToPostDto()));
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            Post? post = postRepo.GetById(id) ??
                throw new EntityNotFoundException();

            return Ok(post.ToPostDetailsDto());
        }

        [HttpPost]
        [Authorize]
        public IActionResult Insert([FromBody] PostFormDto dto)
        {
            User curUser = principalService.ToUser(User);

            DateTime dateTimeNow = new(DateTime.Now.Ticks, DateTimeKind.Local);

            Post post = new(
                Id: Guid.NewGuid(),
                UserId: curUser.Id,
                Title: dto.Title,
                Content: dto.Content,
                PublishedAt: dateTimeNow.ToString("o")
            );

            postRepo.Insert(post);
            postRepo.Save();

            return Ok(post.ToPostDto());
        }

        [HttpPut("{id:guid}")]
        [Authorize]
        public IActionResult Update([FromRoute] Guid id, [FromBody] PostFormDto dto)
        {
            Post? post = postRepo.GetById(id) ??
                throw new EntityNotFoundException();

            User curUser = principalService.ToUser(User);

            if (curUser.Id == post.UserId)
            {
                post.Title = dto.Title;
                post.Content = dto.Content;
                postRepo.Update(post);
                postRepo.Save();
                return Ok(post.ToPostDto());
            }
            else
                return Forbid();
        }

        [HttpDelete("{id:guid}")]
        [Authorize]
        public IActionResult Delete([FromRoute] Guid id)
        {
            Post? post = postRepo.GetById(id) ??
                throw new EntityNotFoundException();

            User curUser = principalService.ToUser(User);

            if (curUser.Id == post.UserId)
            {
                postRepo.Delete(id);
                postRepo.Save();
                return Ok(post.ToPostDto());
            }
            else
                return Forbid();
        }
    }
}