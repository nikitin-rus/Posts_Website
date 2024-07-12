import { ChangeEvent, InputHTMLAttributes, memo, useState } from "react";
import { getClassName } from "../../../helpers/getClassName";
import { Input } from "./Input";
import CloseIcon from "../../../assets/icons/close_24dp.svg";
import SearchIcon from "../../../assets/icons/search_24dp.svg";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    label?: string,
    onSearch: (search: string) => void;
}

const Search = memo(
    function ({
        className,
        onSearch,
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
                    iconLeft={SearchIcon}
                    iconRight={CloseIcon}
                    onIconLeftClick={handleSearch}
                    onIconRightClick={handleClear}
                    {...rest}
                />
            </div>
        );
    }
);

export { Search };