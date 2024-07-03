import { Params } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { CommentRouteParamsSchema } from "../../schemas/params/CommentRouteParamsSchema";

export async function commentLoader({
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