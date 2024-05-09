import { CommentDto } from "./CommentDto"
import { UserDto } from "./UserDto"

export interface PostDto {
    id: string
    content: string,
    publishedAt: string,
    user: UserDto
}

export interface PostDetailsDto extends PostDto {
    comments: CommentDto[]
}

export interface PostFormDto {
    content: string
}