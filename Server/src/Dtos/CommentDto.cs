namespace Posts_Website.Dtos
{
	public record class CommentDto
	(
		Guid Id,
		Guid PostId,
		string Content,
		string WrittenAt,
		UserDto User
	);	
	
	public record class CommentDetailsDto
	(
		Guid Id,
		Guid PostId,
		string Content,
		string WrittenAt,
		UserDto User,
		PostDto Post
	);

	public record class CommentFormDto
	(
		string Content
	);
}