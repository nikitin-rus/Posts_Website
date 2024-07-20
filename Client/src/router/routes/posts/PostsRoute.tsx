import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { PostCardList } from "../../../components/lists/PostCardList";
import { Select } from "../../../components/UI/Select";
import { Pagination } from "../../../components/Pagination";
import { PostsSchema } from "../../../schemas/post/PostsSchema";
import { Search } from "../../../components/UI/inputs/Search";
import { getPagesCount } from "../../../helpers/getPagesCount";

export function PostsRoute() {
    const componentClassName = "posts-route";
    const { posts, totalCount } = PostsSchema.parse(useLoaderData());
    const selectSortOptions = [
        { name: "new", value: "Сначала новые" },
        { name: "old", value: "Сначала старые" }
    ];
    const selectLimitOptions = [
        { name: "3", value: "3" },
        { name: "5", value: "5" },
        { name: "10", value: "10" },
    ];
    const [searchInfo, setSearchInfo] = useState({
        search: "",
        page: 1,
        selectedSortIndex: 0,
        selectedLimitIndex: 0,
    });
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({
            search: searchInfo.search,
            page: searchInfo.page.toString(),
            sort: selectSortOptions[searchInfo.selectedSortIndex].name,
            limit: selectLimitOptions[searchInfo.selectedLimitIndex].name,
        });
    }, [searchInfo]);

    function handleSearch(search: string) {
        setSearchInfo({
            ...searchInfo,
            search,
            page: 1,
        });
    }

    function handleSortSelect(selectedSortIndex: number) {
        setSearchInfo({
            ...searchInfo,
            selectedSortIndex,
            page: 1,
        });
    }

    function handleLimitSelect(selectedLimitIndex: number) {
        setSearchInfo({
            ...searchInfo,
            selectedLimitIndex,
            page: 1,
        });
    }

    function handleNavigate(page: number) {
        setSearchInfo({
            ...searchInfo,
            page: page,
        });
    }

    return (
        <div className={componentClassName}>
            <div className={componentClassName + "__content"}>
                <div className={[
                    componentClassName + "__controls",
                    componentClassName + "__controls_top",
                ].join(" ")}>
                    <Search className={componentClassName + "__search"}
                        label="Поиск по содержанию"
                        placeholder="Полет через Ла-Манш"
                        search={searchInfo.search}
                        onSearch={handleSearch}
                    />

                    <Select className={[
                        componentClassName + "__select",
                        componentClassName + "__select_sort"
                    ].join(" ")}
                        selectedIndex={searchInfo.selectedSortIndex}
                        onSelect={handleSortSelect}
                        options={selectSortOptions}
                    />
                </div>

                {posts.length > 0 ? (
                    <PostCardList className={componentClassName + "__list"}
                        posts={posts}
                    />
                ) : (
                    <p className={componentClassName + "__message"}>
                        К сожалению, здесь пока пусто.
                    </p>
                )}

                {totalCount > 0 && (
                    <div className={[
                        componentClassName + "__controls",
                        componentClassName + "__controls_bottom",
                    ].join(" ")}>
                        <Pagination className={componentClassName + "__pagination"}
                            pagesCount={getPagesCount(
                                totalCount,
                                +selectLimitOptions[searchInfo.selectedLimitIndex].name)
                            }
                            currentPage={searchInfo.page}
                            onNavigate={handleNavigate}
                        />

                        <Select className={[
                            componentClassName + "__select",
                            componentClassName + "__select_limit"
                        ].join(" ")}
                            selectedIndex={searchInfo.selectedLimitIndex}
                            onSelect={handleLimitSelect}
                            options={selectLimitOptions}
                            isUp={true}
                        />
                    </div>
                )}
            </div>
        </div >
    );
}