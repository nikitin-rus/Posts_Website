import { TextareaHTMLAttributes, useRef, useState } from "react";
import { getClassName } from "../../helpers/getClassName";
import { Button } from "./Button";
import { TextArea } from "./TextArea";
import Markdown from "markdown-to-jsx";
import TitleIcon from "../../assets/icons/title_24dp.svg";
import FormatBoldIcon from "../../assets/icons/format_bold_24dp.svg";
import { FormatType, TextFormatter } from "../../helpers/TextFormatter";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string,
    onFormat: (value: string) => void,
}

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
        },
        {
            format: "bold",
            icon: <FormatBoldIcon />
        }
    ];

    function handleModeClick() { setIsPreviewShown(!isPreviewShown); }

    function handleFormat(type: FormatType) {
        let res = "";

        const el = textAreaRef.current;
        if (el) {
            const textFormatter = new TextFormatter(el.value, type, {
                selectionStart: el.selectionStart,
                selectionEnd: el.selectionEnd
            });
            res = textFormatter.format();
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