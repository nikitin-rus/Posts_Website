import { Params, redirect, } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { UserRouteParamsSchema } from "../../schemas/params/UserRouteParamsSchema";

export async function userLoader({
    request,
    params,
}: {
    request: Request,
    params: Params,
}) {
    const { id } = UserRouteParamsSchema.parse(params);

    if (
        request.url.endsWith(id)
        || request.url.endsWith(id + "/")
    ) {
        return redirect(`/users/${id}/posts`);
    }

    return await ApiWorker.getUser(id);
}