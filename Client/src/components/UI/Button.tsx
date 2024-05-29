import { ButtonHTMLAttributes, forwardRef } from "react";
import { getClassName } from "../../helpers/getClassName";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "default" | "blue"
}

const Button = forwardRef<HTMLButtonElement, Props>(
    function ({
        theme,
        className,
        children,
        ...rest
    }, ref) {
        const finalClassName = getClassName("button", className, {
            "button_blue": theme === "blue"
        });

        return (
            <button className={finalClassName}
                ref={ref}
                {...rest}
            >
                {children}
            </button>
        );
    }
);

export { Button };