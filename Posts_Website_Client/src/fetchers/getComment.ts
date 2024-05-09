import axios from "axios";
import { CommentDetailsDto } from "../typescript/dtos/CommentDto";

export async function getComment(postId: string, commentId: string) {
    const response = await axios.get<CommentDetailsDto>(
        `/api/posts/${postId}/comments/${commentId}`);
    return response.data;
}