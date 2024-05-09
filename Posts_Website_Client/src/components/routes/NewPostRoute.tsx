import { redirect, Navigate } from "react-router-dom";
import { Page } from "../Page";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { PostForm } from "../forms/PostForm";
import { createPost } from "../../fetchers/createPost";
import { store } from "../../redux/store";

export async function action({ request }: { request: Request }) {
    if (request.method !== "POST") {
        throw new Response("Недопустимый метод HTTP-запроса", {
            statusText: "Method Not Allowed",
            status: 405,
        });
    }

    const formData = await request.formData();

    const content = formData.get("content")?.toString();

    if (!content) {
        throw new Response(`Форма не содержит поля с именем content`, {
            statusText: "Bad Request",
            status: 400,
        });
    }

    const post = await createPost(
        { content: content },
        store.getState().jwtToken!
    );

    return redirect(`/posts/${post.id}`);
}

export function NewPostRoute() {
    const auth = useAppSelector(authSelector);

    if (!auth.user) {
        return <Navigate to="/posts" />
    }

    return (
        <div className="new-post-route">
            <Page>
                <h1 className="new-post-route__heading">Создание нового поста</h1>
                <PostForm method="POST" />
            </Page>
        </div>
    );
}