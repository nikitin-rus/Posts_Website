import Markdown from "markdown-to-jsx";
import { getClassName } from "../helpers/getClassName";

interface Props {
    className?: string,
    children: string,
}

export function MyMarkdown({
    className,
    children
}: Props) {
    const componentClassName = "my-markdown";
    const finalClassName = getClassName(componentClassName, className);

    return (
        <div className={finalClassName}>
            <Markdown options={{
                disableParsingRawHTML: true
            }}>
                {children}
            </Markdown>
        </div>
    );
}