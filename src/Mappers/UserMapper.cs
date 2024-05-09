using Posts_Website.Dtos;
using Posts_Website.Entities;

namespace Posts_Website.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this User user)
        {
            return new UserDto(
                Id: user.Id,
                UserName: user.UserName,
                Email: user.Email
            );
        }

        public static UserDetailsDto ToUserDetailsDto(this User user)
        {
            return new UserDetailsDto(
                Id: user.Id,
                UserName: user.UserName,
                Email: user.Email,
                Posts: [.. user.Posts.Select(p => p.ToPostDto())],
                Comments: [.. user.Comments.Select(p => p.ToCommentDto())]
            );
        }
    }
}