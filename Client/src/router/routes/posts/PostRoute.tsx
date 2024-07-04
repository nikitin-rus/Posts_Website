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
    const auth = useAppSelector(authSelector);
    const post = PostDetailsSchema.parse(useLoaderData());

    return (
        <div className="post-route">
            <Page>
                {post.user.userName === auth.user?.userName && (
                    <div className="post-route__controls">
                        <Link to="edit">
                            <Button>
                                <p className="post-route__btn-text">Изменить</p>
                                <EditIcon />
                            </Button>
                        </Link>

                        <Form method="DELETE">
                            <Button type="submit">
                                <p className="post-route__btn-text">Удалить</p>
                                <DeleteIcon />
                            </Button>
                        </Form>
                    </div>
                )}

                <PostCard className="post-route__card"
                    post={post}
                />

                <h1 className="post-route__heading">
                    Комментарии
                </h1>

                {auth.user && (
                    <CommentForm className="post-route__comment-form"
                        method="POST"
                        action={`/posts/${post.id}/comments`}
                        initialData={{
                            content: "",
                        }}
                    />
                )}

                <CommentCardList className="post-route__list"
                    comments={post.comments}
                />

                {post.comments.length === 0 && (
                    <p className="post-route__message">
                        Комментариев пока нет!
                    </p>
                )}
            </Page>
        </div>
    );
}