import { ButtonHTMLAttributes, forwardRef } from "react";
import { getClassName } from "../../helpers/getClassName";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "default" | "blue",
    isSquare?: boolean
}

const Button = forwardRef<HTMLButtonElement, Props>(
    function ({
        className,
        children,
        theme = "default",
        isSquare = false,
        ...rest
    }, ref) {
        const componentClassName = "button";

        const finalClassName = getClassName(componentClassName, className, {
            [componentClassName + "_blue"]: theme === "blue",
            [componentClassName + "_square"]: isSquare
        });

        return (
            <button className={finalClassName}
                ref={ref}
                type={"button"}
                {...rest}
            >
                {children}
            </button>
        );
    }
);

export { Button };