namespace Posts_Website.Entities
{
    public record class Comment
    (
        Guid Id,
        Guid UserId,
        Guid PostId,
        string Content,
        string WrittenAt
    )
    {
        public string Content { get; set; } = Content;
        public User? User { get; set; }
        public Post? Post { get; set; }
    };
}