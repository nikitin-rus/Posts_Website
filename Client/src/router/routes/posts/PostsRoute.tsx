import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { PostCardList } from "../../../components/lists/PostCardList";
import { Page } from "../../../components/Page";
import { SelectOption, Select } from "../../../components/UI/Select";
import { Pagination } from "../../../components/Pagination";
import { PostsSchema } from "../../../schemas/post/PostsSchema";
import { Input } from "../../../components/UI/inputs/Input";
import Close from "../../../assets/icons/close_24dp.svg";


export function PostsRoute() {
    const componentClassName = "posts-route";
    const { posts, totalCount } = PostsSchema.parse(useLoaderData());
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState("");

    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectOptions: SelectOption[] = [
        { name: "new", value: "Сначала новые" },
        { name: "old", value: "Сначала старые" }
    ];

    const filteredPosts = posts.filter(p => {
        const content = p.content.toLowerCase();
        return content.includes(search.toLowerCase());
    });

    const sortedPosts = filteredPosts.sort((a, b) => {
        const date1 = new Date(a.publishedAt);
        const date2 = new Date(b.publishedAt);
        const optionName = selectOptions[selectedIndex].name;

        switch (optionName) {
            case "new": {
                return date2.getTime() - date1.getTime();
            }
            case "old": {
                return date1.getTime() - date2.getTime();
            }
            default: {
                return date2.getTime() - date1.getTime();
            }
        }
    });

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    function handleClear() {
        setSearch("");
    }

    function handleSelect(selectedIndex: number) {
        setSelectedIndex(selectedIndex);
        setSearchParams({
            ...Object.fromEntries(searchParams.entries()),
            sort: selectOptions[selectedIndex].name
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
        <div className="posts-route">
            <Page>
                <div className={componentClassName + "__input-and-select"}>
                    <Input className={componentClassName + "__input"}
                        value={search}
                        onChange={handleSearch}
                        label="Поиск по содержанию"
                        placeholder="Полет через Ла-Манш"
                        icon={Close}
                        onIconClick={handleClear}
                    />

                    <Select
                        selectedIndex={selectedIndex}
                        onSelect={handleSelect}
                        options={selectOptions}
                    />
                </div>

                {sortedPosts.length > 0 ? (
                    <PostCardList className={componentClassName + "__list"}
                        posts={sortedPosts}
                    />
                ) : (
                    <h2 className={componentClassName + "__message"}>
                        Ничего не найдено
                    </h2>
                )}

                <Pagination className={componentClassName + "__pagination"}
                    pagesCount={Math.ceil(totalCount / limit)}
                    currentPage={page}
                    onNavigate={handleNavigate}
                />
            </Page>
        </div >
    );
}