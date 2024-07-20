import { ButtonHTMLAttributes, forwardRef, memo } from "react";
import { getClassName } from "../../helpers/getClassName";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: "default" | "blue",
    iconRight?: JSX.Element,
}

const Button = memo(forwardRef<HTMLButtonElement, Props>(
    function ({
        className,
        value,
        theme = "default",
        iconRight,
        ...rest
    }, ref) {
        const componentClassName = "button";

        const isSquare = iconRight !== undefined && !value;

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
                {value && (
                    <p className={componentClassName + "__text"}>
                        {value}
                    </p>
                )}

                {iconRight}
            </button>
        );
    }
));

export { Button };