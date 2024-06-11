import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ExpandMoreIcon from "../../assets/icons/expand_more_24dp.svg";
import { isNode } from "../../typescript/validators/isNode";

export type SelectOption = {
    name: string,
    value: string
};

interface Props {
    options: SelectOption[],
    selectedIndex: number,
    onSelect: (selectedIndex: number) => void,
}

export function Select({
    selectedIndex,
    options,
    onSelect,
}: Props) {
    const [isOpened, setIsOpened] = useState(false);

    const selectRef = useRef<null | HTMLDivElement>(null);
    const optionsRef = useRef<null | HTMLDivElement>(null);

    const handleSelectClick = () => setIsOpened(!isOpened);

    function handleSelect(selectedIndex: number) {
        setIsOpened(false);
        onSelect(selectedIndex);
    }

    function handleOutsideClick(e: PointerEvent) {
        if (
            e.target &&
            isNode(e.target) &&
            !selectRef.current?.contains(e.target) &&
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
        <div
            className={isOpened ?
                "select select_opened" : "select"
            }
        >
            <div
                ref={selectRef}
                className="select__bar"
                onClick={handleSelectClick}
            >
                {selectedIndex >= 0 ?
                    options[selectedIndex].value : ""
                }
                <ExpandMoreIcon />
            </div>

            <CSSTransition
                in={isOpened}
                timeout={200}
                mountOnEnter={true}
                unmountOnExit={true}
                nodeRef={optionsRef}
                classNames="select__options"
            >
                <div
                    ref={optionsRef}
                    className="select__options"
                >
                    {options.map((option, index) => {
                        return (
                            <div
                                key={option.name}
                                className="select__option"
                                onClick={() => handleSelect(index)}
                            >
                                {option.value}
                            </div>
                        );
                    })}
                </div>
            </CSSTransition>
        </div>
    );
}