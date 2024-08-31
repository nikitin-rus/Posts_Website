interface ConditionalClassNames {
    [className: string]: boolean
}

type ClassName = string | ConditionalClassNames | undefined | null;

export function getClassName(...classNames: ClassName[]): string {
    let result: string[] = [];

    for (const className of classNames) {
        if (!className) {
            continue;
        }

        if (typeof className === "string") {
            result.push(className);
            continue;
        }

        for (const [name, isPresent] of Object.entries(className)) {
            if (isPresent) {
                result.push(name);
            }
        }
    }

    return result.join(" ");
}