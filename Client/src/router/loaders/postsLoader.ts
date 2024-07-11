import { ApiWorker } from "../../helpers/ApiWorker";
import { isNonNegativeInteger } from "../../helpers/isNonNegativeInteger";

// TODO: Проброс ошибок BadRequest, если isNonNegativeInteger выдает false для query-параметров.

export async function postsLoader({
    request
}: {
    request: Request
}) {
    let limit = 3;
    let page = 1;
    let sort = "new";
    
    const url = new URL(request.url);
    const searchParams = {
        page: url.searchParams.get("page"),
        limit: url.searchParams.get("limit"),
        sort: url.searchParams.get("sort"),
    };

    if (searchParams.page && isNonNegativeInteger(searchParams.page)) {
        page = +searchParams.page;
    }   

    if (searchParams.limit && isNonNegativeInteger(searchParams.limit)) {
        limit = +searchParams.limit;
    }

    if (searchParams.sort) {
        sort = searchParams.sort;
    }

    return await ApiWorker.getPosts(limit, page, sort);
}