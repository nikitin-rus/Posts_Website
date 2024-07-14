import { ApiWorker } from "../../helpers/ApiWorker";

export async function postsLoader({
    request
}: {
    request: Request
}) {
    const searchParams = new URL(request.url).searchParams;

    return await ApiWorker.getPosts(
        searchParams.get("page"),
        searchParams.get("limit"),
        searchParams.get("sort"),
        searchParams.get("search"),
    );
}