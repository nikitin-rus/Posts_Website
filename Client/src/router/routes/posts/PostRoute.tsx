import { useLoaderData, Link, Form } from "react-router-dom";
import { PostCard } from "../../../components/cards/PostCard";
import { CommentForm } from "../../../components/forms/CommentForm";
import { CommentCardList } from "../../../components/lists/CommentCardList";
import { Page } from "../../../components/Page";
import { Button } from "../../../components/UI/Button";
import { useAppSelector } from "../../../redux/hooks";
import { authSelector } from "../../../redux/slices/authSlice";
import { PostDetailsSchema } from "../../../schemas/post/PostDetailsSchema";
import EditIcon from "../../../assets/icons/edit_24dp.svg";
import DeleteIcon from "../../../assets/icons/delete_24dp.svg";

export function PostRoute() {
    const componentClassName = "post-route";

    const auth = useAppSelector(authSelector);
    const post = PostDetailsSchema.parse(useLoaderData());

    return (
        <div className={componentClassName}>
            <Page>
                <section className={componentClassName + "__section"}>
                    {post.user.userName === auth.user?.userName && (
                        <div className={componentClassName + "__controls"}>
                            <Link to="edit">
                                <Button>
                                    <p className={componentClassName + "__btn-text"}>Изменить</p>
                                    <EditIcon />
                                </Button>
                            </Link>

                            <Form method="DELETE">
                                <Button type="submit">
                                    <p className={componentClassName + "__btn-text"}>Удалить</p>
                                    <DeleteIcon />
                                </Button>
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

                    {post.comments.length > 0 ? (
                        <CommentCardList className={componentClassName + "__list"}
                            comments={post.comments}
                        />
                    ) : (
                        <p className={componentClassName + "__message"}>
                            Комментариев пока нет!
                        </p>
                    )}
                </section>
            </Page>
        </div>
    );
}