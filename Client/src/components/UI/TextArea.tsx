import { useEffect, useRef } from "react";
import { getClassName } from "../../helpers/getClassName";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

function setHeight(element: HTMLElement, defaultHeight: number) {
    element.style.minHeight = `${defaultHeight}px`;
    element.style.minHeight = `${element.scrollHeight}px`;
}

export function TextArea({ className, onChange, value, ...rest }: Props) {
    const finalClassName = getClassName("text-area", className);

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const resizeHandler = () => {
            if (textAreaRef.current) {
                setHeight(textAreaRef.current, 120);
            }
        };

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    useEffect(() => {
        if (textAreaRef.current) {
            setHeight(textAreaRef.current, 120);
        }
    }, [value]);

    return (
        <textarea className={finalClassName}
            spellCheck={false}
            value={value}
            onChange={onChange}
            ref={textAreaRef}
            {...rest}
        />
    );
}