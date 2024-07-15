import { forwardRef, InputHTMLAttributes, memo, createElement, FunctionComponent, SVGProps } from "react";
import { getClassName } from "../../../helpers/getClassName";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    iconLeft?: FunctionComponent<SVGProps<SVGSVGElement>>,
    iconRight?: FunctionComponent<SVGProps<SVGSVGElement>>,
    isIconLeftDisabled?: boolean,
    isIconRightDisabled?: boolean,
    onIconLeftClick?: () => void,
    onIconRightClick?: () => void,
}

const Input = memo(forwardRef<HTMLInputElement, Props>(
    function ({
        className,
        label,
        iconLeft: IconLeft,
        iconRight: IconRight,
        isIconLeftDisabled = false,
        isIconRightDisabled = false,
        onIconLeftClick,
        onIconRightClick,
        ...rest
    }, ref) {
        const componentClassName = "input";
        const finalClassName = getClassName(componentClassName, className, {
            [componentClassName + "_icon-left"]: IconLeft !== undefined,
            [componentClassName + "_icon-right"]: IconRight !== undefined
        });

        return (
            <div className={finalClassName}>
                {label && <label className={componentClassName + "__label"}>
                    {label}
                </label>}

                <div className={componentClassName + "__input-form"}>
                    {IconLeft && <IconLeft className={
                        [
                            componentClassName + "__icon",
                            componentClassName + "__icon_left",
                            isIconLeftDisabled ? (componentClassName + "__icon_disabled") : "",
                        ].join(" ")
                    }
                        onClick={onIconLeftClick}
                    />}

                    <input className={componentClassName + "__input"}
                        ref={ref}
                        {...rest}
                    />

                    {IconRight && <IconRight className={
                        [
                            componentClassName + "__icon",
                            componentClassName + "__icon_right",
                            isIconRightDisabled ? (componentClassName + "__icon_disabled") : "",
                        ].join(" ")
                    }
                        onClick={onIconRightClick}
                    />}
                </div>
            </div>
        );
    }
));

export { Input };