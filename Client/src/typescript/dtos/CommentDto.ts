import { PostDto } from "./PostDto";
import { UserDto } from "./UserDto";

export interface CommentDto {
    id: string,
    postId: string,
    content: string,
    writtenAt: string,
    user: UserDto
}

export interface CommentDetailsDto extends CommentDto {
    post: PostDto
}

export interface CommentFormDto {
    content: string
}