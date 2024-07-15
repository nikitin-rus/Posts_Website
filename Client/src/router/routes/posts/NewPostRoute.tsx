import { Navigate } from "react-router-dom";
import { PostForm } from "../../../components/forms/PostForm";
import { Page } from "../../../components/Page";
import { useAppSelector } from "../../../redux/hooks";
import { authSelector } from "../../../redux/slices/authSlice";

export function NewPostRoute() {
    const auth = useAppSelector(authSelector);

    if (!auth.user) {
        return <Navigate to="/posts" />
    }

    return (
        <div className="new-post-route">
            <Page>
                <h1 className="new-post-route__heading">
                    Создание нового поста
                </h1>
                
                <PostForm method="POST"
                    action="/posts/new"
                />
            </Page>
        </div>
    );
}