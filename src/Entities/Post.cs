namespace Posts_Website.Entities
{
    public record class Post
    (
        Guid Id,
        Guid UserId,
        string Content,
        string PublishedAt
    )
    {
        public string Content { get; set; } = Content;
        public User? User { get; set; }
        public List<Comment> Comments { get; set; } = [];
	};
}