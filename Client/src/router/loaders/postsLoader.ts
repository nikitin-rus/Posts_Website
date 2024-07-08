import { ApiWorker } from "../../helpers/ApiWorker";
import { isNonNegativeInteger } from "../../helpers/isNonNegativeInteger";

// TODO: Проброс ошибок BadRequest, если isNonNegativeInteger выдает false для query-параметров.

export async function postsLoader({
    request
}: {
    request: Request
}) {
    let limit = 1;
    let page = 1;
    
    const url = new URL(request.url);
    const searchParams = {
        page: url.searchParams.get("page"),
        limit: url.searchParams.get("limit"),
    };

    if (searchParams.page && isNonNegativeInteger(searchParams.page)) {
        page = +searchParams.page;
    }   

    if (searchParams.limit && isNonNegativeInteger(searchParams.limit)) {
        limit = +searchParams.limit;
    }

    return await ApiWorker.getPosts(limit, page);
}