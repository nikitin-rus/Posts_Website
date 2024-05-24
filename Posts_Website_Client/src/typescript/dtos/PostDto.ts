import { CommentDto } from "./CommentDto"
import { UserDto } from "./UserDto"

export interface PostDto {
    id: string
    title: string
    content: string,
    publishedAt: string,
    user: UserDto
}

export interface PostDetailsDto extends PostDto {
    comments: CommentDto[]
}

export interface PostFormDto {
    title: string
    content: string
}