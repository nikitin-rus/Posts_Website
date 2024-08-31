import { Navigate, useLoaderData } from "react-router-dom";
import { CommentForm } from "../../../components/forms/CommentForm";
import { useAppSelector } from "../../../redux/hooks";
import { authSelector } from "../../../redux/slices/authSlice";
import { CommentDetailsSchema } from "../../../schemas/comment/CommentDetailsSchema";

export function EditCommentRoute() {
    const comment = CommentDetailsSchema.parse(useLoaderData());
    const auth = useAppSelector(authSelector);

    if (auth.user?.userName !== comment.user.userName) {
        return <Navigate to={
            `/posts/${comment.postId}/comments/${comment.id}`}
        />
    }

    return (
        <div className="edit-comment-route">
            <CommentForm
                initialData={comment}
                method="PUT"
                action={`/posts/${comment.postId}/comments/${comment.id}`}
            />
        </div>
    );
}