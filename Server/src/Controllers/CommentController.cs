using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Posts_Website.Dtos;
using Posts_Website.Entities;
using Posts_Website.Exceptions;
using Posts_Website.Mappers;
using Posts_Website.Repositories;
using Posts_Website.Services;

namespace server.src.Controllers
{
	[Route("/api/posts/{postId:guid}/comments")]
	[ApiController]
	public class CommentController(
		ICommentRepository commentRepo,
		IPostRepository postRepo,
		IClaimsPrincipalService principalService
	) : ControllerBase
	{
		[HttpGet]
		public IActionResult GetAll([FromRoute] Guid postId)
		{
			return Ok(commentRepo.GetAllByPostId(postId)
								 .Select(c => c.ToCommentDto()));
		}

		[HttpGet("{id:guid}")]
		public IActionResult GetById([FromRoute] Guid id)
		{
			Comment? comment = commentRepo.GetById(id) ??
				throw new EntityNotFoundException();

			return Ok(comment.ToCommentDetailsDto());
		}

		[HttpPost]
		[Authorize]
		public IActionResult Insert([FromBody] CommentFormDto dto, [FromRoute] Guid postId)
		{
			User curUser = principalService.ToUser(User);

			Post? post = postRepo.GetById(postId) ??
				throw new EntityNotFoundException();

			DateTime dateTimeNow = new(DateTime.Now.Ticks, DateTimeKind.Local);

			Comment comment = new(
				Id: Guid.NewGuid(),
				UserId: curUser.Id,
				PostId: postId,
				Content: dto.Content,
				WrittenAt: dateTimeNow.ToString("o")
			)
			{
				Post = post
			};

			commentRepo.Insert(comment);
			commentRepo.Save();

			return Ok(comment.ToCommentDto());
		}

		[HttpPut("{id:guid}")]
		[Authorize]
		public IActionResult Update([FromRoute] Guid id, [FromBody] CommentFormDto dto)
		{
			Comment? comment = commentRepo.GetById(id) ??
				throw new EntityNotFoundException();

			User curUser = principalService.ToUser(User);

			if (curUser.Id == comment.UserId)
			{
				comment.Content = dto.Content;
				commentRepo.Update(comment);
				commentRepo.Save();
				return Ok(comment.ToCommentDto());
			}
			else
				return Forbid();
		}

		[HttpDelete("{id:guid}")]
		[Authorize]
		public IActionResult Delete([FromRoute] Guid id)
		{
			Comment? comment = commentRepo.GetById(id) ??
				throw new EntityNotFoundException();

			User curUser = principalService.ToUser(User);

			if (curUser.Id == comment.UserId)
			{
				commentRepo.Delete(id);
				commentRepo.Save();
				return Ok(comment.ToCommentDto());
			}
			else
				return Forbid();
		}
	}
}
