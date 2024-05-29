import axios from "axios";
import { CommentDto } from "../typescript/dtos/CommentDto";

export async function deleteComment(
    postId: string,
    commentId: string,
    jwtToken: string
) {
    const response = await axios.delete<CommentDto>(
        `/api/posts/${postId}/comments/${commentId}`,
        {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        }
    );
    return response.data;
}