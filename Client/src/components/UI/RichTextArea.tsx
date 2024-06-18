import { TextareaHTMLAttributes, useRef, useState } from "react";
import { getClassName } from "../../helpers/getClassName";
import { Button } from "./Button";
import { TextArea } from "./TextArea";
import Markdown from "markdown-to-jsx";
import TitleIcon from "../../assets/icons/title_24dp.svg";
import { findWordAroundCaret } from "../../helpers/findWordAroundCaret";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string,
    onFormat: (value: string) => void,
}

function formatTitle(value: string, selectionStart: number, selectionEnd: number) {
    let result = value;

    const formatSymbols = "###";
    const left = value.slice(0, selectionStart);
    const selected = value.slice(selectionStart, selectionEnd);
    const right = value.slice(selectionEnd);

    /**
     * Если что-то выделено, то перед выделением ставим ###
     * 
     * Если ничего не выделено, но каретка стоит перед буквой в слове, то
     * ставим ### перед этим словом
     * 
     * Иначе просто добавляем ### в конец
    */
    if (selected) {
        result = left + formatSymbols + " " + selected + right;
    } else if (
        value[selectionStart] !== " "
        && value[selectionStart] !== undefined
    ) {
        const pos = findWordAroundCaret(value, selectionStart);

        if (pos) {
            const [i, j] = pos;
            result = (
                value.slice(0, i)
                + formatSymbols
                + " "
                + value.slice(i, j + 1)
                + value.slice(j + 1)
            );
        }
    } else {
        result = left + right + formatSymbols + " ";
    }

    return result;
}

type FormatType = "title";
type ToolInfo = {
    format: FormatType,
    icon: React.ReactElement;
};

export function RichTextArea({
    className,
    value = "",
    onFormat,
    ...rest
}: Props) {
    const [isPreviewShown, setIsPreviewShown] = useState(false);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const componentClassName = "rich-text-area";
    const finalClassName = getClassName(componentClassName, className);

    const tools: ToolInfo[] = [
        {
            format: "title",
            icon: <TitleIcon />
        }
    ];

    function handleModeClick() { setIsPreviewShown(!isPreviewShown); }

    function handleFormat(type: FormatType) {
        let res = "";

        const el = textAreaRef.current;
        if (el) {
            switch (type) {
                case "title":
                    res = formatTitle(value, el.selectionStart, el.selectionEnd);
                    break;
                default:
                    throw new Error(`Нет способа форматирования типа ${type}`);
            }
        }

        onFormat(res);
    }

    return (
        <div className={finalClassName}>
            {!isPreviewShown && (
                <div className={componentClassName + "__toolbar"}>
                    {tools.map((t, index) => {
                        return (
                            <Button className={componentClassName + "__button"}
                                key={index}
                                isSquare={true}
                                onClick={() => handleFormat(t.format)}
                            >
                                {t.icon}
                            </Button>
                        );
                    })}
                </div>
            )}

            {isPreviewShown ? (
                <div className={componentClassName + "__preview"}>
                    <Markdown options={{
                        forceBlock: true
                    }}>
                        {value.length === 0 ? "Пустое превью!" : value}
                    </Markdown>
                </div>
            ) : (
                <TextArea className={componentClassName + "__text-area"}
                    value={value}
                    ref={textAreaRef}
                    {...rest}
                />
            )}

            <div className={componentClassName + "__buttons"}>
                <Button className={componentClassName + "__button"}
                    onClick={handleModeClick}
                    disabled={value.length === 0}
                >
                    Показать {isPreviewShown ? "черновик" : "превью"}
                </Button>
            </div>
        </div >
    );
}