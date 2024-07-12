import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { PostCardList } from "../../../components/lists/PostCardList";
import { Page } from "../../../components/Page";
import { SelectOption, Select } from "../../../components/UI/Select";
import { Pagination } from "../../../components/Pagination";
import { PostsSchema } from "../../../schemas/post/PostsSchema";
import { Search } from "../../../components/UI/inputs/Search";
import { isNonNegativeInteger } from "../../../helpers/isNonNegativeInteger";

export function PostsRoute() {
    const componentClassName = "posts-route";

    const { posts, totalCount } = PostsSchema.parse(useLoaderData());

    const [searchParams, setSearchParams] = useSearchParams();
    const { searchPage, searchLimit, searchSort } = {
        searchPage: searchParams.get("page") ?? "1",
        searchLimit: searchParams.get("limit") ?? "3",
        searchSort: searchParams.get("sort"),
    };

    const [page, setPage] = useState(isNonNegativeInteger(searchPage) ? +searchPage : 1);
    const [limit, setLimit] = useState(isNonNegativeInteger(searchLimit) ? +searchLimit : 3);

    const selectOptions: SelectOption[] = [
        { name: "new", value: "Сначала новые" },
        { name: "old", value: "Сначала старые" }
    ];

    const searchSortIndex = selectOptions.findIndex(o => o.name == searchSort);
    const [selectedIndex, setSelectedIndex] = useState(searchSortIndex > -1 ? searchSortIndex : 0);

    function handleSearch(search: string) {
        setPage(1);
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: "1",
            search: search,
        });
    }

    function handleSelect(selectedIndex: number) {
        setSelectedIndex(selectedIndex);
        setPage(1);
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            page: "1",
            sort: selectOptions[selectedIndex].name,
        });
    }

    function handleNavigate(page: number) {
        setPage(page);
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
                        selectedIndex={selectedIndex}
                        onSelect={handleSelect}
                        options={selectOptions}
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
                    <Pagination className={componentClassName + "__pagination"}
                        pagesCount={Math.ceil(totalCount / limit)}
                        currentPage={page}
                        onNavigate={handleNavigate}
                    />
                )}
            </Page>
        </div >
    );
}