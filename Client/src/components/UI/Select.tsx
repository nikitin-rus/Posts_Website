import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ChevronDown from "../../assets/icons/chevron_down_24dp.svg";
import { isNode } from "../../typescript/validators/isNode";
import { getClassName } from "../../helpers/getClassName";

export interface SelectOption {
    name: string,
    value: string,
};

interface Props {
    className?: string,
    options: SelectOption[],
    selectedIndex: number,
    onSelect: (selectedIndex: number) => void,
    isUp?: boolean,
}

export function Select({
    className,
    selectedIndex,
    options,
    onSelect,
    isUp = false,
}: Props) {
    const [isOpened, setIsOpened] = useState(false);
    const hasOptions = options.length > 0;
    const isSelectedIndexValid = selectedIndex >= 0 && selectedIndex < options.length;
    const maxValueLength = Math.max(...options.map(o => o.value.length));

    const componentClassName = "select";
    const finalClassName = getClassName(
        componentClassName,
        className,
        {
            [componentClassName + "_opened"]: isOpened,
            [componentClassName + "_up"]: isUp,
        }
    );

    const barRef = useRef<null | HTMLDivElement>(null);
    const optionsRef = useRef<null | HTMLDivElement>(null);

    function handleBarClick() {
        setIsOpened(!isOpened);
    }

    function handleSelect(selectedIndex: number) {
        setIsOpened(false);
        onSelect(selectedIndex);
    }

    function handleOutsideClick(e: PointerEvent) {
        if (
            e.target &&
            isNode(e.target) &&
            !barRef.current?.contains(e.target) &&
            !optionsRef.current?.contains(e.target)
        ) {
            setIsOpened(false);
        }
    }

    useEffect(() => {
        document.addEventListener('pointerdown', handleOutsideClick);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
        };
    }, []);

    return (
        <div className={finalClassName}
            style={{ minWidth: 50 + maxValueLength * 10 }}
        >
            <div className={componentClassName + "__bar"}
                ref={barRef}
                onClick={handleBarClick}
            >
                <p className={componentClassName + "__text"}>
                    {hasOptions ?
                        isSelectedIndexValid ?
                            options[selectedIndex].value
                            : options[0].value
                        : ""
                    }
                </p>

                <ChevronDown className={componentClassName + "__icon"} />
            </div>

            <CSSTransition classNames={componentClassName + "__options"}
                nodeRef={optionsRef}
                in={isOpened}
                timeout={200}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                <div className={componentClassName + "__options"}
                    ref={optionsRef}
                    style={{ top: isUp ? (-40 * options.length - 8) : 48 }}
                >
                    {options.map((option, index) => {
                        return (
                            <div className={componentClassName + "__option"}
                                key={option.name}
                                onClick={() => handleSelect(index)}
                            >
                                <p className={componentClassName + "__text"}>
                                    {option.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </CSSTransition>
        </div>
    );
}