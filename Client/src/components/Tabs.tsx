import { memo } from "react";
import { getClassName } from "../helpers/getClassName";
import { NavLink } from "react-router-dom";

interface Tab {
    title: string,
    link: string,
}

interface Props {
    className?: string,
    tabs: Tab[],
}

const Tabs = memo(function ({
    className,
    tabs,
}: Props) {
    const componentClassName = "tabs";
    const finalClassName = getClassName(componentClassName, className);

    return (
        <div className={finalClassName}>
            {tabs.map(({
                title,
                link,
            }, index) => {
                return (
                    <NavLink className={componentClassName + "__link"}
                        to={link}
                        key={index}
                    >
                        <div className={componentClassName + "__tab"}>
                            <p className={componentClassName + "__title"}>
                                {title}
                            </p>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
});

export { Tabs };