import { useLoaderData } from "react-router-dom";
import { CommentCardList } from "../../../components/lists/CommentCardList";
import { CommentsSchema } from "../../../schemas/comment/CommentsSchema";

export function UserCommentsRoute() {
    const componentClassName = "user-comments-route";

    const { comments, totalCount } = CommentsSchema.parse(useLoaderData());

    return (
        <div className={componentClassName}>
            {comments.length > 0 ? (
                <CommentCardList className="user-route__list"
                    comments={comments}
                />
            ) : (
                <p className={componentClassName + "__message"}>
                    К сожалению, здесь пока пусто.
                </p>
            )}
        </div>
    );
}

