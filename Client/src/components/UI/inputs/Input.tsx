import { forwardRef, InputHTMLAttributes, memo, createElement, FunctionComponent, SVGProps } from "react";
import { getClassName } from "../../../helpers/getClassName";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    iconLeft?: JSX.Element,
    iconRight?: JSX.Element,
    isIconLeftDisabled?: boolean,
    isIconRightDisabled?: boolean,
    onIconLeftClick?: () => void,
    onIconRightClick?: () => void,
}

const Input = memo(forwardRef<HTMLInputElement, Props>(
    function ({
        className,
        label,
        iconLeft,
        iconRight,
        isIconLeftDisabled = false,
        isIconRightDisabled = false,
        onIconLeftClick,
        onIconRightClick,
        ...rest
    }, ref) {
        const componentClassName = "input";
        const finalClassName = getClassName(componentClassName, className, {
            [componentClassName + "_icon-left"]: iconLeft !== undefined,
            [componentClassName + "_icon-right"]: iconRight !== undefined
        });

        return (
            <div className={finalClassName}>
                {label && <label className={componentClassName + "__label"}>
                    {label}
                </label>}

                <div className={componentClassName + "__input-form"}>
                    {iconLeft && (
                        <div className={[
                            componentClassName + "__icon-wrapper",
                            componentClassName + "__icon-wrapper_left",
                            isIconLeftDisabled ? (componentClassName + "__icon-wrapper_disabled") : "",
                        ].join(" ")}
                            onClick={onIconLeftClick}
                        >
                            {iconLeft}
                        </div>
                    )}

                    <input className={componentClassName + "__input"}
                        ref={ref}
                        {...rest}
                    />

                    {iconRight && (
                        <div className={[
                            componentClassName + "__icon-wrapper",
                            componentClassName + "__icon-wrapper_right",
                            isIconRightDisabled ? (componentClassName + "__icon-wrapper_disabled") : "",
                        ].join(" ")}
                            onClick={onIconRightClick}
                        >
                            {iconRight}
                        </div>
                    )}
                </div>
            </div>
        );
    }
));

export { Input };