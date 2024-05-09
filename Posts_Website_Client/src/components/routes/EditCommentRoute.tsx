import { Navigate, Params, useLoaderData } from "react-router-dom";
import { CommentDetailsDto } from "../../typescript/dtos/CommentDto";
import { getComment } from "../../fetchers/getComment";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { Page } from "../Page";
import { CommentForm } from "../forms/CommentForm";

export async function loader({ params }: { params: Params }) {
    return await getComment(params.postId!, params.commentId!);
}

export function EditCommentRoute() {
    const comment = useLoaderData() as CommentDetailsDto;
    const auth = useAppSelector(authSelector);

    if (auth.user?.userName !== comment.user.userName) {
        return <Navigate to={
            `/posts/${comment.postId}/comments/${comment.id}`}
        />
    }

    return (
        <div className="edit-comment-route">
            <Page>
                <CommentForm
                    initialData={comment}
                    method="PUT"
                    action={`/posts/${comment.postId}/comments/${comment.id}`}
                />
            </Page>
        </div>
    );
}