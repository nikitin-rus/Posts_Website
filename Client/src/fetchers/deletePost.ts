import axios from "axios";
import { PostDto } from "../typescript/dtos/PostDto";

export async function deletePost(id: string, jwtToken: string) {
    const response = await axios.delete<PostDto>(`/api/posts/${id}`, {
        headers: {
            "Authorization": `Bearer ${jwtToken}`
        }
    });
    return response.data;
}