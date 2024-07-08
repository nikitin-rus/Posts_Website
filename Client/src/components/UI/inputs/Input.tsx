import { FC, forwardRef, InputHTMLAttributes, memo, createElement, FunctionComponent, SVGProps } from "react";
import { getClassName } from "../../../helpers/getClassName";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    icon?: FunctionComponent<SVGProps<SVGSVGElement>>
    onIconClick?: () => void,
}

const Input = memo(forwardRef<HTMLInputElement, Props>(
    function ({
        className,
        label,
        icon: Icon,
        onIconClick,
        ...rest
    }, ref) {
        const componentClassName = "input";
        const finalClassName = getClassName(componentClassName, className, {
            [componentClassName + "_icon"]: Icon !== undefined
        });

        return (
            <div className={finalClassName}>
                {label && <label className={componentClassName + "__label"}>
                    {label}
                </label>}

                <div className={componentClassName + "__input-form"}>
                    <input className={componentClassName + "__input"}
                        ref={ref}
                        {...rest}
                    />

                    {Icon && <Icon className={componentClassName + "__icon"}
                        onClick={onIconClick}
                    />}
                </div>
            </div>
        );
    }
));

export { Input };