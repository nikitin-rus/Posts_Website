import { Params } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { UserRouteParamsSchema } from "../../schemas/params/UserRouteParamsSchema";

export async function userCommentsLoader({
    request,
    params,
}: {
    request: Request,
    params: Params,
}) {
    const { id } = UserRouteParamsSchema.parse(params);
    const searchParams = new URL(request.url).searchParams;
    
    return await ApiWorker.getUserComments(id, searchParams);
}