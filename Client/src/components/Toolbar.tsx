import TitleIcon from "../assets/icons/title_24dp.svg";
import BoldIcon from "../assets/icons/bold_24dp.svg";
import ItalicIcon from "../assets/icons/italic_24dp.svg";
import QuoteIcon from "../assets/icons/quote_24dp.svg";
import StrikethroughIcon from "../assets/icons/strikethrough_24dp.svg";
import LinkIcon from "../assets/icons/link_24dp.svg";
import CodeIcon from "../assets/icons/code_24dp.svg";
import { getClassName } from "../helpers/getClassName";
import { FormatType } from "../helpers/TextFormatter";
import { Button } from "./UI/Button";
import { memo } from "react";

type ToolInfo = {
    format: FormatType,
    icon: React.ReactElement;
};

interface Props {
    className?: string,
    onFormat: (type: FormatType) => void,
    isDisabled: boolean,
}

const Toolbar = memo(function Toolbar({ className, onFormat, isDisabled }: Props) {
    const componentClassName = "toolbar";
    const finalClassName = getClassName(componentClassName, className);

    const tools: ToolInfo[] = [
        {
            format: "title",
            icon: <TitleIcon />
        },
        {
            format: "bold",
            icon: <BoldIcon />
        },
        {
            format: "italic",
            icon: <ItalicIcon />
        },
        {
            format: "strikethrough",
            icon: <StrikethroughIcon />
        },
        {
            format: "link",
            icon: <LinkIcon />
        },
        {
            format: "code",
            icon: <CodeIcon />
        },
        {
            format: "quote",
            icon: <QuoteIcon />
        },
    ];

    return (
        <div className={finalClassName}>
            {tools.map((t, index) => {
                return (
                    <Button className={componentClassName + "__tool"}
                        key={index}
                        isSquare={true}
                        disabled={isDisabled}
                        onClick={() => onFormat(t.format)}
                    >
                        {t.icon}
                    </Button>
                );
            })}
        </div>
    );
});

export { Toolbar };