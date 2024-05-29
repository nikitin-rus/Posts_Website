import { createRef } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PostDto } from "../../typescript/dtos/PostDto";
import { getClassName } from "../../helpers/getClassName";
import { PostCard } from "../cards/PostCard";

interface Props {
    className?: string,
    posts: PostDto[]
}

export function PostCardList({ className, posts }: Props) {
    const finalClassName = getClassName("post-card-list", className);

    const listItems = posts.map(p => {
        return {
            post: p,
            nodeRef: createRef<HTMLAnchorElement>(),
        }
    });

    return (
        <TransitionGroup className={finalClassName}>
            {listItems.map(({ post, nodeRef }) =>
                <CSSTransition classNames="post-card-list__link"
                    key={post.id}
                    nodeRef={nodeRef}
                    timeout={300}
                >
                    <Link className="post-card-list__link"
                        ref={nodeRef}
                        to={`/posts/${post.id}`}
                    >
                        <PostCard className="post-card-list__post"
                            post={post}
                            isPreview={true}
                        />
                    </Link>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
}