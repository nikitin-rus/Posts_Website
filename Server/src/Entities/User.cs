namespace Posts_Website.Entities
{
    public record class User
    (
        Guid Id,
        string UserName,
        string Email,
        string Password
    )
    {
        public List<Comment> Comments { get; set; } = [];
		public List<Post> Posts { get; set; } = [];
    }
}

