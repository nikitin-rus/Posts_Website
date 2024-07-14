import { getClassName } from "../helpers/getClassName";
import { Button } from "./UI/Button";
import ChevronDown from "../assets/icons/chevron_down_24dp.svg";

interface Props {
    className?: string,
    pagesCount: number,
    currentPage: number,
    onNavigate: (page: number) => void,
}

interface PagesInfo {
    isPlain: boolean,
    pages: number[],
}

function getPages(currentPage: number, pagesCount: number): PagesInfo {
    if (pagesCount <= 5) {
        const result = [];

        for (let i = 0; i < pagesCount; i++) {
            result.push(i + 1);
        }

        return {
            isPlain: true,
            pages: result,
        }
    }

    if (currentPage <= 3) {
        return {
            isPlain: false,
            pages: [1, 2, 3, 4, pagesCount],
        }
    }

    if (currentPage >= pagesCount - 2) {
        return {
            isPlain: false,
            pages: [
                1,
                pagesCount - 3,
                pagesCount - 2,
                pagesCount - 1,
                pagesCount
            ],
        }
    }

    return {
        isPlain: false,
        pages: [
            1,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            pagesCount
        ],
    }
}

export function Pagination({
    className,
    pagesCount,
    currentPage,
    onNavigate,
}: Props) {
    const componentClassName = "pagination";
    const finalClassName = getClassName(componentClassName, className);

    const { isPlain, pages } = getPages(currentPage, pagesCount);

    const buttons = [];

    for (let i = 0; i < pages.length; i++) {
        const isCurrent = currentPage === pages[i];

        buttons.push(
            <Button className={[
                componentClassName + "__button",
                isCurrent ? (componentClassName + "__button_current") : "",
            ].join(" ")}
                key={i}
                onClick={() => onNavigate(pages[i])}
                theme={isCurrent ? "blue" : "default"}
            >
                {pages[i]}
            </Button>
        );
    }

    return (
        <div className={finalClassName}>
            <Button className={componentClassName + "__navigate"}
                onClick={() => onNavigate(currentPage - 1)}
                disabled={currentPage <= 1}
                isSquare={true}
            >
                <ChevronDown className={[
                    componentClassName + "__chevron-down",
                    componentClassName + "__chevron-down_left"
                ].join(" ")} />
            </Button>

            {isPlain ? (
                <div className={componentClassName + "__buttons"}>
                    {buttons}
                </div>
            ) : (
                <div className={componentClassName + "__buttons-wrapper"}>
                    {buttons[0]}

                    {currentPage > 3 &&
                        <div className={componentClassName + "__ellipsis"}>
                            ...
                        </div>
                    }

                    <div className={componentClassName + "__buttons"}>
                        {buttons.slice(1, buttons.length - 1)}
                    </div>

                    {pagesCount - currentPage > 2 &&
                        <div className={componentClassName + "__ellipsis"}>
                            ...
                        </div>
                    }

                    {buttons[buttons.length - 1]}
                </div>
            )}

            <Button className={componentClassName + "__navigate"}
                onClick={() => onNavigate(currentPage + 1)}
                disabled={currentPage >= pagesCount}
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