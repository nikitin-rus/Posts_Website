import { forwardRef } from "react";
import { getClassName } from "../../helpers/getClassName";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { };

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
    function ({
        className,
        value,
        onChange,
        ...rest
    }, ref) {
        const finalClassName = getClassName("text-area", className);

        return (
            <textarea className={finalClassName}
                ref={ref}
                value={value}
                onChange={onChange}
                spellCheck={false}
                {...rest}
            />
        )
    }
);

export { TextArea };