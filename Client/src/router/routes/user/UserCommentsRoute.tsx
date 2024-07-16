import { useLoaderData } from "react-router-dom";
import { CommentSchema } from "../../../schemas/comment/Comment";
import { CommentCardList } from "../../../components/lists/CommentCardList";

export function UserCommentsRoute() {
    const componentClassName = "user-comments-route";

    const comments = CommentSchema.array().parse(useLoaderData());

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

