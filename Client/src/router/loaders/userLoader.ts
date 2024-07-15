import { Params } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { UserRouteParamsSchema } from "../../schemas/params/UserRouteParamsSchema";

export async function userLoader({
    params
}: {
    params: Params
}) {
    const { id } = UserRouteParamsSchema.parse(params);
    return await ApiWorker.getUser(id);
}