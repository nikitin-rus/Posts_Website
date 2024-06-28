import { TextareaHTMLAttributes, useCallback, useRef, useState } from "react";
import { getClassName } from "../../helpers/getClassName";
import { Button } from "./Button";
import { TextArea } from "./TextArea";
import Markdown from "markdown-to-jsx";
import { FormatType, TextFormatter } from "../../helpers/TextFormatter";
import { Toolbar } from "../Toolbar";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string,
    onFormat: (value: string) => void,
}

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

    const handleFormat = useCallback((type: FormatType) => {
        let res = "";

        const el = textAreaRef.current;
        if (el) {
            const textFormatter = new TextFormatter(type, {
                text: el.value,
                selectionStart: el.selectionStart,
                selectionEnd: el.selectionEnd
            });
            res = textFormatter.format();
        }

        onFormat(res);
    }, []);

    const handleModeChange = () => setIsPreviewShown(!isPreviewShown);

    return (
        <div className={finalClassName}>
            <Toolbar className={componentClassName + "__toolbar"}
                onFormat={handleFormat}
                isDisabled={isPreviewShown}
            />

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

            <Button className={componentClassName + "__button"}
                onClick={handleModeChange}
                disabled={value.length === 0}
            >
                Показать {isPreviewShown ? "черновик" : "превью"}
            </Button>
        </div >
    );
}