import axios from "axios";
import { PostDto, PostFormDto } from "../typescript/dtos/PostDto";

export async function updatePost(id: string, postForm: PostFormDto, jwtToken: string) {
    const response = await axios.put<PostDto>(
        `/api/posts/${id}`,
        postForm,
        {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });
    return response.data;
}