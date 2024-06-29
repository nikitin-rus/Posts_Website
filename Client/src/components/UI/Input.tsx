import { memo } from "react";
import { getClassName } from "../../helpers/getClassName";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Input = memo(function Input({
    className,
    label,
    ...rest
}: Props
) {
    const finalClassName = getClassName("input", className);

    return (
        <div className={finalClassName}>
            {label &&
                <label className="input__label">{label}</label>
            }
            <input className="input__input"
                {...rest}
            />
        </div>
    );
});

export { Input };