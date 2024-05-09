import { CommentDto } from "../dtos/CommentDto";

export interface Comment extends CommentDto {
    type: "comment"
}