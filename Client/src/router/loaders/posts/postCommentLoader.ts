import { Params } from "react-router-dom";
import { CommentRouteParamsSchema } from "../../../schemas/params/CommentRouteParamsSchema";
import { ApiWorker } from "../../../helpers/ApiWorker";

export async function postCommentLoader({
    params
}: {
    params: Params
}) {
    const {
        postId,
        commentId
    } = CommentRouteParamsSchema.parse(params);
    
    return await ApiWorker.getComment(
        postId,
        commentId
    );
}