namespace Posts_Website.Dtos
{
    public record class UserDto
    (
        Guid Id,
        string UserName,
        string Email
    );

    public record class UserDetailsDto
    (
        Guid Id,
		string UserName,
		string Email,
        PostDto[] Posts,
		CommentDto[] Comments
	);
}