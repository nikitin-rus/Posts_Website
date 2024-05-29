using Posts_Website.Dtos;
using Posts_Website.Entities;
using Posts_Website.Exceptions;

namespace Posts_Website.Mappers
{
    public static class PostMapper
    {
        public static PostDto ToPostDto(this Post post)
        {
            if (post.User == null)
                throw new NullNavigationPropertyException();

            return new PostDto(
                Id: post.Id,
                Title: post.Title,
                Content: post.Content,
                PublishedAt: post.PublishedAt,
                User: post.User.ToUserDto()
            );
        }

        public static PostDetailsDto ToPostDetailsDto(this Post post)
        {
            if (post.User == null)
                throw new NullNavigationPropertyException();

            return new PostDetailsDto(
                Id: post.Id,
                Title: post.Title,
                Content: post.Content,
                PublishedAt: post.PublishedAt,
                User: post.User.ToUserDto(),
                Comments: [.. post.Comments.Select(c => c.ToCommentDto())]
            );
        }
    }
}