import { useEffect, useRef } from "react";
import { getClassName } from "../../helpers/getClassName";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

function setHeight(element: HTMLElement, defaultHeight: number) {
    element.style.minHeight = `${defaultHeight}px`;
    element.style.minHeight = `${element.scrollHeight}px`;
}

export function TextArea({ className, onChange, ...rest }: Props) {
    const finalClassName = getClassName("text-area", className);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            entries.forEach(() => {
                if (textAreaRef.current) {
                    setHeight(textAreaRef.current, 120);
                }
            });
        });

        if (textAreaRef.current) {
            observer.observe(textAreaRef.current);
        }
    }, []);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        if (onChange) {
            onChange(e);
        }
        setHeight(e.target, 120);
    }

    return (
        <textarea className={finalClassName}
            spellCheck={false}
            onChange={handleChange}
            ref={textAreaRef}
            {...rest}
        />
    );
}