import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PostDto } from "../../schemas/post/PostSchema";
import { Select, SelectOption } from "../UI/Select";
import { Page } from "../Page";
import { Search } from "../UI/Search";
import { PostCardList } from "../lists/PostCardList";
import { ApiWorker } from "../../helpers/ApiWorker";

export async function loader() {
    return await ApiWorker.getPosts();
}

export function PostsRoute() {
    const posts = useLoaderData() as PostDto[];
    const [search, setSearch] = useState<string>("");
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
                throw new Error(`Невозможно проассоциировать значение name опции селекта с типом сортировки`);
            }
        }
    });

    const handleSearchClear = () => setSearch("");

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    function handleSelect(selectedIndex: number) {
        setSelectedIndex(selectedIndex);
    }

    return (
        <div className="posts-route">
            <Page>
                <div className="posts-route__controls">
                    <Search
                        search={search}
                        labelText="Поиск по содержанию"
                        onClear={handleSearchClear}
                        onSearch={handleSearchInput}
                        placeholder="ECMAScript 2024"
                    />
                    <Select
                        selectedIndex={selectedIndex}
                        onSelect={handleSelect}
                        options={selectOptions}
                    />
                </div>
                
                <PostCardList className="posts-route__list"
                    posts={sortedPosts}
                />
                
                {sortedPosts.length === 0 && 
                    <h2>Ничего не найдено</h2>
                }
            </Page>
        </div >
    );
}