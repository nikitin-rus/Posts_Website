import { ChangeEvent, PointerEvent } from "react";
import CloseIcon from "../../assets/icons/close_24dp.svg";
import { Input } from "./Input";

interface Props {
    labelText?: string,
    placeholder?: string,
    search: string,
    onClear: (e: PointerEvent<SVGSVGElement>) => void,
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void,
}

export function Search({
    labelText,
    placeholder,
    search,
    onClear,
    onSearch,
}: Props) {
    return (
        <div className="search">
            <label>{labelText}</label>
            <div className="search__form">
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={onSearch}
                />
                <div className="search__icon">
                    <CloseIcon
                        width={18}
                        height={18}
                        onPointerDown={onClear}
                    />
                </div>
            </div>
        </div>
    );
}