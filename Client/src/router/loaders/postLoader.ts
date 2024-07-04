import { Params } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { PostRouteParamsSchema } from "../../schemas/params/PostRouteParamsSchema";

export async function postLoader({
    params
}: {
    params: Params
}) {
    const { id } = PostRouteParamsSchema.parse(params);
    
    return await ApiWorker.getPost(id);
}