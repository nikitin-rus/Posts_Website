import { PostDto } from "../dtos/PostDto";

export interface Post extends PostDto {
    type: "post",
}