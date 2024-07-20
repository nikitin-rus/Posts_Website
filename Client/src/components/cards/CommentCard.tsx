import { forwardRef, memo } from "react";
import { getClassName } from "../../helpers/getClassName";
import { CardHead } from "../CardHead";
import { CommentDto } from "../../schemas/comment/CommentSchema";

interface Props {
    className?: string,
    isPreview?: boolean
    comment: CommentDto
}

const CommentCard = memo(forwardRef<HTMLDivElement, Props>(({
    className,
    isPreview = false,
    comment
}, ref) => {
    const componentClassName = "comment-card";

    const finalClassName = getClassName(
        componentClassName,
        className,
        {
            [componentClassName + "_preview"]: isPreview
        }
    );

    return (
        <div className={finalClassName}
            ref={ref}
        >
            <CardHead className={componentClassName + "__head"}
                user={comment.user}
                creationDate={new Date(comment.writtenAt)}
                isUserLinked={!isPreview}
            />

            <div className={componentClassName + "__body"}>
                {comment.content}
            </div>
        </div>
    );
}));

export { CommentCard };