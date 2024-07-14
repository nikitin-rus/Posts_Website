import { useLoaderData, useSearchParams } from "react-router-dom";
import { PostCardList } from "../../../components/lists/PostCardList";
import { Page } from "../../../components/Page";
import { SelectOption, Select } from "../../../components/UI/Select";
import { Pagination } from "../../../components/Pagination";
import { PostsSchema } from "../../../schemas/post/PostsSchema";
import { Search } from "../../../components/UI/inputs/Search";
import { ParamsWorker } from "../../../helpers/ParamsWorker";

export function PostsRoute() {
    const componentClassName = "posts-route";

    const sortOptions: SelectOption[] = [
        { name: "new", value: "Сначала новые" },
        { name: "old", value: "Сначала старые" }
    ];

    const limitOptions: SelectOption[] = [
        { name: "3", value: "3" },
        { name: "5", value: "5" },
        { name: "10", value: "10" },
    ];

    const defaultPage = 1;
    const defaultLimit = 10;

    const { posts, totalCount } = PostsSchema.parse(useLoaderData());

    const [searchParams, setSearchParams] = useSearchParams();
    const {
        page,
        limit,
        sort,
    } = {
        page: ParamsWorker.getNonNegativeInteger(searchParams, "page", defaultPage),
        limit: ParamsWorker.getNonNegativeInteger(searchParams, "limit", defaultLimit),
        sort: searchParams.get("sort") ?? "new",
    };

    const perPage = (limit === 0 || limit > 10) ? defaultLimit : limit;
    const pagesCount = Math.ceil(totalCount / perPage);
    const currentPage = (page === 0 || page > pagesCount) ? defaultPage : page;

    let selectedSortIndex = sortOptions.findIndex(o => o.name === sort);
    if (selectedSortIndex < 0) {
        selectedSortIndex = 0;
    }

    let selectedLimitIndex = limitOptions.findIndex(o => +o.name === limit);
    if (selectedLimitIndex < 0) {
        selectedLimitIndex = limitOptions.length - 1;
    }

    function handleSearch(search: string) {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: "1",
            search: search,
        });
    }

    function handleSelect(selectedSortIndex: number) {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: "1",
            sort: sortOptions[selectedSortIndex].name,
        });
    }

    function handleLimit(selectedLimitIndex: number) {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: "1",
            limit: limitOptions[selectedLimitIndex].name
        });
    }

    function handleNavigate(page: number) {
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: page.toString()
        });
    }

    return (
        <div className={componentClassName}>
            <Page>
                <div className={componentClassName + "__input-and-select"}>
                    <Search className={componentClassName + "__search"}
                        label="Поиск по содержанию"
                        placeholder="Полет через Ла-Манш"
                        onSearch={handleSearch}
                    />

                    <Select className={componentClassName + "__select"}
                        selectedIndex={selectedSortIndex}
                        onSelect={handleSelect}
                        options={sortOptions}
                    />
                </div>

                {posts.length > 0 ? (
                    <PostCardList className={componentClassName + "__list"}
                        posts={posts}
                    />
                ) : (
                    <h2 className={componentClassName + "__message"}>
                        Ничего не найдено
                    </h2>
                )}

                {totalCount > 0 && (
                    <div className={componentClassName + "__pagination-and-limit"}>
                        <Pagination className={componentClassName + "__pagination"}
                            pagesCount={pagesCount}
                            currentPage={currentPage}
                            onNavigate={handleNavigate}
                        />

                        <Select className={componentClassName + "__limit"}
                            options={limitOptions}
                            selectedIndex={selectedLimitIndex}
                            onSelect={handleLimit}
                            isUp={true}
                        />
                    </div>
                )}
            </Page>
        </div >
    );
}