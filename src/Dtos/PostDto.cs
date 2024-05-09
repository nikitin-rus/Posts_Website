namespace Posts_Website.Dtos
{
    public record class PostDto
    (
        Guid Id,
        string Content,
        string PublishedAt,
        UserDto User
    );

    public record class PostDetailsDto
    (
        Guid Id,
        string Content,
        string PublishedAt,
        UserDto User,
        CommentDto[] Comments
    );

    public record class PostFormDto 
    (
        string Content
    );
}