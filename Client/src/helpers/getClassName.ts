interface ClassNames {
    [className: string]: boolean
}

export function getClassName(
    innerClassName: string,
    outerClassName?: string,
    extraClassNames: ClassNames = {}
) {
    const classNames = [innerClassName];

    if (outerClassName) {
        classNames.push(outerClassName);
    }

    for (const [className, isPresent] of Object.entries(extraClassNames)) {
        if (isPresent) {
            classNames.push(className);
        }
    };

    return classNames.join(" ");
}