import { memo } from "react";
import TitleIcon from "../assets/icons/title_24dp.svg";
import BoldIcon from "../assets/icons/bold_24dp.svg";
import ItalicIcon from "../assets/icons/italic_24dp.svg";
import QuoteIcon from "../assets/icons/quote_24dp.svg";
import StrikethroughIcon from "../assets/icons/strikethrough_24dp.svg";
import LinkIcon from "../assets/icons/link_24dp.svg";
import CodeIcon from "../assets/icons/code_24dp.svg";
import UnorderedListIcon from "../assets/icons/unordered_list_24dp.svg";
import NumberedListIcon from "../assets/icons/numbered_list_24dp.svg";
import { getClassName } from "../helpers/getClassName";
import { FormatType } from "../helpers/TextFormatter";
import { Button } from "./UI/Button";

type FormatToolInfo = {
    formatType: FormatType,
    icon: JSX.Element;
};

interface Props {
    className?: string,
    onFormat: (type: FormatType) => void,
    isDisabled: boolean,
}

const Toolbar = memo(function Toolbar({ className, onFormat, isDisabled }: Props) {
    const componentClassName = "toolbar";
    const finalClassName = getClassName(componentClassName, className);

    const formatTools: FormatToolInfo[] = [
        {
            formatType: "title",
            icon: <TitleIcon />
        },
        {
            formatType: "bold",
            icon: <BoldIcon />
        },
        {
            formatType: "code",
            icon: <CodeIcon />
        },
        {
            formatType: "italic",
            icon: <ItalicIcon />
        },
        {
            formatType: "link",
            icon: <LinkIcon />
        },
        {
            formatType: "quote",
            icon: <QuoteIcon />
        },
        {
            formatType: "strikethrough",
            icon: <StrikethroughIcon />
        },
        {
            formatType: "numbered-list",
            icon: <NumberedListIcon />
        },
        {
            formatType: "unordered-list",
            icon: <UnorderedListIcon />
        },
    ];

    return (
        <div className={finalClassName}>
            {formatTools.map(({
                formatType,
                icon
            }, index) => {
                return (
                    <Button className={componentClassName + "__tool"}
                        key={index}
                        disabled={isDisabled}
                        iconRight={icon}
                        onClick={() => onFormat(formatType)}
                    />
                );
            })}
        </div >
    );
});

export { Toolbar };