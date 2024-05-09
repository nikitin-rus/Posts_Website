import axios from "axios";
import { PostDto } from "../typescript/dtos/PostDto";

export async function getPosts() {    
    const response = await axios.get<PostDto[]>(
        `/api/posts`
    );
    return response.data;
}