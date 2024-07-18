import { Params } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { UserRouteParamsSchema } from "../../schemas/params/UserRouteParamsSchema";

export async function userPostsLoader({
    request,
    params,
}: {
    request: Request,
    params: Params,
}) {
    const { id } = UserRouteParamsSchema.parse(params);
    const searchParams = new URL(request.url).searchParams;

    return await ApiWorker.getUserPosts(id, searchParams);
}