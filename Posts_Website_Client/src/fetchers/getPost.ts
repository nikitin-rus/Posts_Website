import axios from "axios";
import { PostDetailsDto } from "../typescript/dtos/PostDto";

export async function getPost(id: string) {
    const response = await axios.get<PostDetailsDto>(`/api/posts/${id}`);
    return response.data;
}