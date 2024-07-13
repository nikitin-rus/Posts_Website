import { forwardRef, memo } from "react";
import { getClassName } from "../../helpers/getClassName";
import { CardHead } from "../CardHead";
import { PostDto } from "../../schemas/post/PostSchema";
import { MyMarkdown } from "../MyMarkdown";

interface Props {
    className?: string,
    isPreview?: boolean
    post: PostDto
}

const PostCard = memo(forwardRef<HTMLDivElement, Props>(
    function ({
        className,
        isPreview = false,
        post
    }, ref) {
        const componentClassName = "post-card";
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
                    user={post.user}
                    creationDate={new Date(post.publishedAt)}
                    isUserLinked={!isPreview}
                />

                <h3 className={componentClassName + "__title"}>
                    {post.title}
                </h3>

                <MyMarkdown className={componentClassName + "__markdown"}>
                    {post.content}
                </MyMarkdown>
            </div>
        );
    }
));

export { PostCard };