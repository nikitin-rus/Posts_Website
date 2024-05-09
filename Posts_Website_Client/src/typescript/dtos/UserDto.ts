import { CommentDto } from "./CommentDto"
import { PostDto } from "./PostDto"

export interface UserDto {
    id: string,
    userName: string,
    email: string
}

export interface UserDetailsDto extends UserDto {
    posts: PostDto[],
    comments: CommentDto[]
}