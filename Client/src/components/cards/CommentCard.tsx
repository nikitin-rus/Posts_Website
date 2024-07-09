import { forwardRef } from "react";
import { getClassName } from "../../helpers/getClassName";
import { CardHead } from "../CardHead";
import { CommentDto } from "../../schemas/comment/Comment";

interface Props {
    className?: string,
    isPreview?: boolean
    comment: CommentDto
}

const CommentCard = forwardRef<HTMLDivElement, Props>(({
    className,
    isPreview = false,
    comment
}, ref) => {
    const finalClassName = getClassName(
        "comment-card",
        className,
        { "comment-card_preview": isPreview }
    );

    return (
        <div className={finalClassName}
            ref={ref}
        >
            <CardHead className="comment-card__head"
                user={comment.user}
                creationDate={new Date(comment.writtenAt)}
                isUserLinked={!isPreview}
            />

            <div className="comment-card__body">
                {comment.content}
            </div>
        </div>
    );
});

export { CommentCard };