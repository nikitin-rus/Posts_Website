import { getClassName } from "../../helpers/getClassName";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export function Input({
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
}