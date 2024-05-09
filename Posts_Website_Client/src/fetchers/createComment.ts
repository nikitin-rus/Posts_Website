import axios from "axios";
import { CommentDto, CommentFormDto } from "../typescript/dtos/CommentDto";

export async function createComment(
    postId: string,
    commentForm: CommentFormDto,
    jwtToken: string
) {
    const response = await axios.post<CommentDto>(
        `/api/posts/${postId}/comments`,
        commentForm,
        {
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        }
    );
    return response.data;
}