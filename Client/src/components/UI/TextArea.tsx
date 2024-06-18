import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { getClassName } from "../../helpers/getClassName";

function setHeight(element: HTMLElement, defaultHeight: number) {
    element.style.minHeight = `${defaultHeight}px`;
    element.style.minHeight = `${element.scrollHeight}px`;
}

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { };

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
    function ({
        className,
        value,
        onChange,
        ...rest
    }, ref) {
        const finalClassName = getClassName("text-area", className);
        const textAreaRef = useRef<null | HTMLTextAreaElement>(null);

        useImperativeHandle<null | HTMLTextAreaElement, null | HTMLTextAreaElement>(ref,
            () => textAreaRef.current
        );

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
        )
    }
);

export { TextArea };