using Posts_Website.Dtos;
using Posts_Website.Entities;
using Posts_Website.Exceptions;

namespace Posts_Website.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment comment)
        {
            if (comment.User == null)
                throw new NullNavigationPropertyException();

			return new CommentDto(
                Id: comment.Id,
                PostId: comment.PostId,
                Content: comment.Content,
                WrittenAt: comment.WrittenAt,
                User: comment.User.ToUserDto()
            );
        }        
        
        public static CommentDetailsDto ToCommentDetailsDto(this Comment comment)
        {
            if (comment.User == null)
                throw new NullNavigationPropertyException();
            
            if (comment.Post == null)
                throw new NullNavigationPropertyException();

			return new CommentDetailsDto(
                Id: comment.Id,
                PostId: comment.PostId,
                Content: comment.Content,
                WrittenAt: comment.WrittenAt,
                User: comment.User.ToUserDto(),
                Post: comment.Post.ToPostDto()
            );
        }
    }
}