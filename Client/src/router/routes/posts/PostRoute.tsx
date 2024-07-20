import { useLoaderData, Link, Form, Outlet } from "react-router-dom";
import { PostCard } from "../../../components/cards/PostCard";
import { CommentForm } from "../../../components/forms/CommentForm";
import { Button } from "../../../components/UI/Button";
import { useAppSelector } from "../../../redux/hooks";
import { authSelector } from "../../../redux/slices/authSlice";
import EditIcon from "../../../assets/icons/edit_24dp.svg";
import DeleteIcon from "../../../assets/icons/delete_24dp.svg";
import { PostSchema } from "../../../schemas/post/PostSchema";

export function PostRoute() {
    const componentClassName = "post-route";

    const auth = useAppSelector(authSelector);
    const post = PostSchema.parse(useLoaderData());

    return (
        <div className={componentClassName}>
            <div className={componentClassName + "__content"}>
                <section className={componentClassName + "__section"}>
                    {post.user.userName === auth.user?.userName && (
                        <div className={componentClassName + "__controls"}>
                            <Link to="edit">
                                <Button className={componentClassName + "__button"}
                                    value="Редактировать"
                                    iconRight={<EditIcon />}
                                />
                            </Link>

                            <Form method="DELETE">
                                <Button className={componentClassName + "__button"}
                                    value="Удалить"
                                    iconRight={<DeleteIcon />}
                                    type="submit"
                                />
                            </Form>
                        </div>
                    )}

                    <PostCard className={componentClassName + "__card"}
                        post={post}
                    />
                </section>

                <section className={componentClassName + "__section"}>
                    <h1 className={componentClassName + "__heading"}>
                        Комментарии
                    </h1>

                    {auth.user && (
                        <CommentForm className={componentClassName + "__comment-form"}
                            method="POST"
                            action={`/posts/${post.id}/comments`}
                            initialData={{
                                content: "",
                            }}
                        />
                    )}

                    <Outlet />
                </section>
            </div>
        </div>
    );
}