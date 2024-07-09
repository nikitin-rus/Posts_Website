import { forwardRef, Fragment } from "react";
import { getClassName } from "../../helpers/getClassName";
import { CardHead } from "../CardHead";
import Markdown from "markdown-to-jsx";
import { PostDto } from "../../schemas/post/PostSchema";

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

            <h3 className="post-card__title">
                {post.title}
            </h3>

            <div className="post-card__body">
                <Markdown>
                    {post.content}
                </Markdown>
            </div>
        </div>
    );
});

export { PostCard };