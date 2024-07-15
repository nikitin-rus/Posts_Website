import { createRef } from "react";
import { Link } from "react-router-dom";
import { getClassName } from "../../helpers/getClassName";
import { PostCard } from "../cards/PostCard";
import { PostDto } from "../../schemas/post/PostSchema";

interface Props {
    className?: string,
    posts: PostDto[]
}

export function PostCardList({
    className,
    posts
}: Props) {
    const componentClassName = "post-card-list";
    const finalClassName = getClassName(componentClassName, className);

    const listItems = posts.map(p => {
        return {
            post: p,
            nodeRef: createRef<HTMLAnchorElement>(),
        }
    });

    return (
        <ul className={finalClassName}>
            {listItems.map(({ post, nodeRef }) =>
                <Link className={componentClassName + "__link"}
                    key={post.id}
                    ref={nodeRef}
                    to={`/posts/${post.id}`}
                >
                    <PostCard className={componentClassName + "__post"}
                        post={post}
                        isPreview={true}
                    />
                </Link>
            )}
        </ul>
    );
}