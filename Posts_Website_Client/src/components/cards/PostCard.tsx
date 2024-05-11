import { forwardRef } from "react";
import { getClassName } from "../../helpers/getClassName";
import { CardHead } from "../CardHead";
import { PostDto } from "../../typescript/dtos/PostDto";

interface Props {
    className?: string,
    isPreview?: boolean
    post: PostDto
}

const PostCard = forwardRef<HTMLDivElement, Props>(({
    className,
    isPreview = false,
    post
}, ref) => {
    const finalClassName = getClassName(
        "post-card",
        className,
        { "post-card_preview": isPreview }
    );

    return (
        <div className={finalClassName}
            ref={ref}
        >
            <CardHead className="post-card__head"
                user={post.user}
                creationDate={new Date(post.publishedAt)}
                isUserLinked={!isPreview}
            />

            <div className="post-card__body">
                {post.content}
            </div>
        </div>
    );
});

export { PostCard };