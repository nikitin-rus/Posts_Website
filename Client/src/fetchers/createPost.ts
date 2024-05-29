import axios from "axios";
import { PostDto, PostFormDto } from "../typescript/dtos/PostDto";

export async function createPost(postForm: PostFormDto, jwtToken: string) {
    const response = await axios.post<PostDto>(`/api/posts`, postForm, {
        headers: {
            "Authorization": `Bearer ${jwtToken}`
        }
    });
    return response.data;
}