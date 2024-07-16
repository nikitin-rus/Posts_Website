import { Params } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { UserRouteParamsSchema } from "../../schemas/params/UserRouteParamsSchema";

export async function userCommentsLoader({
    params
}: {
    params: Params
}) {
    const { id } = UserRouteParamsSchema.parse(params);
    return await ApiWorker.getUserComments(id);
}