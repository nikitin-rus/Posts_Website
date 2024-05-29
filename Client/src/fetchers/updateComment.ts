import axios from "axios";
import { CommentDto, CommentFormDto } from "../typescript/dtos/CommentDto";

export async function updateComment(
    postId: string,
    commentId: string,
    commentForm: CommentFormDto,
    jwtToken: string
) {
    const response = await axios.put<CommentDto>(
        `/api/posts/${postId}/comments/${commentId}`,
        commentForm,
        {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        }
    );
    return response.data;
}