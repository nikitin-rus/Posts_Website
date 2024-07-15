import { createRef } from "react";
import { Link } from "react-router-dom";
import { getClassName } from "../../helpers/getClassName";
import { CommentCard } from "../cards/CommentCard";
import { CommentDto } from "../../schemas/comment/Comment";

interface Props {
    className?: string,
    comments: CommentDto[]
}

export function CommentCardList({
    className,
    comments
}: Props) {
    const componentClassName = "comment-card-list";
    const finalClassName = getClassName(componentClassName, className);

    const listItems = comments.map(c => {
        return {
            comment: c,
            nodeRef: createRef<HTMLAnchorElement>(),
        }
    });

    return (
        <ul className={finalClassName}>
            {listItems.map(({ comment, nodeRef }) =>
                <Link className={componentClassName + "__link"}
                    key={comment.id}
                    ref={nodeRef}
                    to={`/posts/${comment.postId}/comments/${comment.id}`}
                >
                    <CommentCard className={componentClassName + "__comment"}
                        comment={comment}
                        isPreview={true}
                    />
                </Link>
            )}
        </ul>
    );
}