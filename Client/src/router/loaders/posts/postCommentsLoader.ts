import { Params } from "react-router-dom";
import { ApiWorker } from "../../../helpers/ApiWorker";
import { PostRouteParamsSchema } from "../../../schemas/params/PostRouteParamsSchema";

export async function postCommentsLoader({
    request,
    params,
}: {
    request: Request,
    params: Params
}) {
    const { id } = PostRouteParamsSchema.parse(params);
    const searchParams = new URL(request.url).searchParams;

    return await ApiWorker.getPostComments(id, searchParams);
}