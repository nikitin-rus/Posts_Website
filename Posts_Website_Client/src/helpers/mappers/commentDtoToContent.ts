import { CommentDto } from "../../typescript/dtos/CommentDto";
import { Comment } from "../../typescript/models/Comment";

export function commentDtoToComment(comment: CommentDto): Comment {
    return {
        ...comment,
        type: "comment",
    }
}