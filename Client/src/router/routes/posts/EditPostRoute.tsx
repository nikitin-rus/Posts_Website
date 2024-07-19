import { Navigate, useLoaderData } from "react-router-dom";
import { PostForm } from "../../../components/forms/PostForm";
import { useAppSelector } from "../../../redux/hooks";
import { authSelector } from "../../../redux/slices/authSlice";
import { PostSchema } from "../../../schemas/post/PostSchema";

export function EditPostRoute() {
    const auth = useAppSelector(authSelector);

    if (!auth.user) {
        return <Navigate to="/posts" />
    }

    const post = PostSchema.parse(useLoaderData());

    return (
        <div className="edit-post-route">
            <h1 className="edit-post-route__heading">
                Редактирование поста
            </h1>
            <PostForm
                initialData={post}
                method="PUT"
                action={`/posts/${post.id}`}
            />
        </div>
    );
}