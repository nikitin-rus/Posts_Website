import { createRef } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getClassName } from "../../helpers/getClassName";
import { CommentCard } from "../cards/CommentCard";
import { CommentDto } from "../../schemas/comment/Comment";

interface Props {
    className?: string,
    comments: CommentDto[]
}

export function CommentCardList({ className, comments }: Props) {
    const finalClassName = getClassName("comment-card-list", className);

    const listItems = comments.map(c => {
        return {
            comment: c,
            nodeRef: createRef<HTMLAnchorElement>(),
        }
    });

    return (
        <TransitionGroup className={finalClassName}>
            {listItems.map(({ comment, nodeRef }) =>
                <CSSTransition classNames="comment-card-list__link"
                    key={comment.id}
                    nodeRef={nodeRef}
                    timeout={300}
                >
                    <Link className="comment-card-list__link"
                        ref={nodeRef}
                        to={`/posts/${comment.postId}/comments/${comment.id}`}
                    >
                        <CommentCard className="comment-card-list__comment"
                            comment={comment}
                            isPreview={true}
                        />
                    </Link>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}