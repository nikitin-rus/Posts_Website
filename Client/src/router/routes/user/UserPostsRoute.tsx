import { useLoaderData } from "react-router-dom";
import { PostCardList } from "../../../components/lists/PostCardList";
import { PostsSchema } from "../../../schemas/post/PostsSchema";

export function UserPostsRoute() {
    const componentClassName = "user-posts-route";

    const { posts, totalCount } = PostsSchema.parse(useLoaderData());

    return (
        <div className={componentClassName}>
            {posts.length > 0 ? (
                <PostCardList className={componentClassName + "__list"}
                    posts={posts}
                />
            ) : (
                <p className={componentClassName + "__message"}>
                    К сожалению, здесь пока пусто.
                </p>
            )}
        </div>
    );
}