import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { PostCardList } from "../../../components/lists/PostCardList";
import { Page } from "../../../components/Page";
import { Select } from "../../../components/UI/Select";
import { Pagination } from "../../../components/Pagination";
import { PostsSchema } from "../../../schemas/post/PostsSchema";
import { Search } from "../../../components/UI/inputs/Search";

export function PostsRoute() {
    const componentClassName = "posts-route";

    const sortOptions = [
        { name: "new", value: "Сначала новые" },
        { name: "old", value: "Сначала старые" }
    ];
    const limitOptions = [
        { name: "3", value: "3" },
        { name: "5", value: "5" },
        { name: "10", value: "10" },
    ];

    const [selectedSortIndex, setSelectedSortIndex] = useState(0);
    const [selectedLimitIndex, setSelectedLimitIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const limit = +limitOptions[selectedLimitIndex].name;
    const sort = sortOptions[selectedSortIndex].name;

    const { posts, totalCount } = PostsSchema.parse(useLoaderData());

    const pagesCount = Math.ceil(totalCount / limit);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams(new URLSearchParams(
            `?search=${search}&sort=${sort}&page=${page}&limit=${limit}`
        ));
    }, [search, sort, page, limit]);

    function handleSearch(search: string) {
        setSearch(search);
    }

    function handleSortSelect(selectedSortIndex: number) {
        setSelectedSortIndex(selectedSortIndex);
        setPage(1);
    }

    function handleLimitSelect(selectedLimitIndex: number) {
        setSelectedLimitIndex(selectedLimitIndex);
        setPage(1);
    }

    function handleNavigate(page: number) {
        setPage(page);
    }

    return (
        <div className={componentClassName}>
            <Page>
                <div className={componentClassName + "__input-and-select"}>
                    <Search className={componentClassName + "__search"}
                        label="Поиск по содержанию"
                        placeholder="Полет через Ла-Манш"
                        search={search}
                        onSearch={handleSearch}
                    />

                    <Select className={[
                        componentClassName + "__select",
                        componentClassName + "__select_sort"
                    ].join(" ")}
                        selectedIndex={selectedSortIndex}
                        onSelect={handleSortSelect}
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
                            currentPage={page}
                            onNavigate={handleNavigate}
                        />

                        <Select className={[
                            componentClassName + "__select",
                            componentClassName + "__select_limit"
                        ].join(" ")}
                            selectedIndex={selectedLimitIndex}
                            onSelect={handleLimitSelect}
                            options={limitOptions}
                            isUp={true}
                        />
                    </div>
                )}
            </Page>
        </div >
    );
}