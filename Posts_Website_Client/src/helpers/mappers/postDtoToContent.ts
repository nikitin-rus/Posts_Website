import { PostDto } from "../../typescript/dtos/PostDto";
import { Post } from "../../typescript/models/Post";

export function postDtoToPost(post: PostDto): Post {
    return {
        ...post,
        type: "post",
    }
}