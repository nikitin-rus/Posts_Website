import { ChangeEvent, InputHTMLAttributes, memo, useState } from "react";
import { getClassName } from "../../../helpers/getClassName";
import { Input } from "./Input";
import CloseIcon from "../../../assets/icons/close_24dp.svg";
import SearchIcon from "../../../assets/icons/search_24dp.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    label?: string,
    onSearch: (search: string) => void,
    search: string,
}

const Search = memo(
    function ({
        className,
        onSearch,
        search: outerSearch,
        ...rest
    }: Props) {
        const componentClassName = "search";
        const finalClassName = getClassName(componentClassName, className);

        const [search, setSearch] = useState("");

        function handleClear() {
            setSearch("");
        }

        function handleChange(e: ChangeEvent<HTMLInputElement>) {
            setSearch(e.target.value);
        }

        function handleSearch() {
            onSearch(search);
        }

        return (
            <div className={finalClassName}>
                <Input className={componentClassName + "__input"}
                    value={search}
                    onChange={handleChange}
                    iconLeft={
                        <SearchIcon className={[
                            componentClassName + "__icon",
                            componentClassName + "__icon_search",
                        ].join(" ")} />
                    }
                    isIconLeftDisabled={outerSearch === search}
                    iconRight={
                        <CloseIcon className={[
                            componentClassName + "__icon",
                            componentClassName + "__icon_close",
                        ].join(" ")} />
                    }
                    onIconLeftClick={handleSearch}
                    onIconRightClick={handleClear}
                    {...rest}
                />
            </div>
        );
    }
);

export { Search };