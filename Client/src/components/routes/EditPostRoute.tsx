import { Page } from "../Page";
import { PostForm } from "../forms/PostForm";
import { PostDto } from "../../schemas/post/PostSchema";
import { Navigate, Params, useLoaderData } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { ApiWorker } from "../../helpers/ApiWorker";

export async function loader({ params }: { params: Params }) {
    return await ApiWorker.getPost(params.id!);
}

export function EditPostRoute() {
    const auth = useAppSelector(authSelector);

    if (!auth.user) {
        return <Navigate to="/posts" />
    }

    const post = useLoaderData() as PostDto;

    return (
        <div className="edit-post-route">
            <Page>
            <h1 className="edit-post-route__heading">Редактирование поста</h1>
                <PostForm
                    initialData={post}
                    method="PUT"
                    action={`/posts/${post.id}`}
                />
            </Page>
        </div>
    );
}