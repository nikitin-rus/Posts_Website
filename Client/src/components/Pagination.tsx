import { getClassName } from "../helpers/getClassName";
import { Button } from "./UI/Button";
import ChevronDown from "../assets/icons/chevron_down_24dp.svg";

interface Props {
    className?: string,
    pages: number,
    page: number,
    onNavigate: (page: number) => void;
}

export function Pagination({
    className,
    pages,
    page,
    onNavigate
}: Props) {
    const componentClassName = "pagination";
    const finalClassName = getClassName(componentClassName, className);

    let buttons = [];
    for (let i = 0; i < pages; i++) {
        buttons.push(
            <Button className={[
                componentClassName + "__button",
                page === i + 1 ? (componentClassName + "__button_current") : "",
            ].join(" ")}
                key={i}
                onClick={() => onNavigate(i + 1)}
            >
                {i + 1}
            </Button>
        );
    }

    return (
        <div className={finalClassName}>
            <Button className={[
                componentClassName + "__button",
                componentClassName + "__button_navigate",
            ].join(" ")}
                onClick={() => onNavigate(page - 1)}
                disabled={page <= 1}
                isSquare={true}
            >
                <ChevronDown className={[
                    componentClassName + "__chevron-down",
                    componentClassName + "__chevron-down_left"
                ].join(" ")} />
            </Button>

            <ul className={componentClassName + "__buttons"}>
                {buttons}
            </ul>

            <Button className={[
                componentClassName + "__button",
                componentClassName + "__button_navigate",
            ].join(" ")}
                onClick={() => onNavigate(page + 1)}
                disabled={page >= pages}
                isSquare={true}
            >
                <ChevronDown className={[
                    componentClassName + "__chevron-down",
                    componentClassName + "__chevron-down_right",
                ].join(" ")} />
            </Button>
        </div>
    );
}