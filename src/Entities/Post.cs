namespace Posts_Website.Entities
{
    public record class Post
    (
        Guid Id,
        Guid UserId,
        string Title,
        string Content,
        string PublishedAt
    )
    {
        public string Title { get; set; } = Title;
        public string Content { get; set; } = Content;
        public User? User { get; set; }
        public List<Comment> Comments { get; set; } = [];
    };
}