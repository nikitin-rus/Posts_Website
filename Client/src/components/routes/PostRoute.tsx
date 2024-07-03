import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { Form, Link, Params, redirect, useLoaderData } from "react-router-dom";
import { PostDetailsDto } from "../../schemas/post/PostDetailsSchema";
import { Button } from "../UI/Button";
import { Page } from "../Page";
import { CommentForm } from "../forms/CommentForm";
import EditIcon from "../../assets/icons/edit_24dp.svg";
import DeleteIcon from "../../assets/icons/delete_24dp.svg";
import { store } from "../../redux/store";
import { PostCard } from "../cards/PostCard";
import { CommentCardList } from "../lists/CommentCardList";
import { ApiWorker } from "../../helpers/ApiWorker";

export async function loader({ params }: { params: Params }) {
    return ApiWorker.getPost(params.id!);
}

export async function action({ params, request }: { params: Params, request: Request }) {
    const id: string = params.id!;
    const token = store.getState().jwtToken;

    switch (request.method) {
        case "PUT": {
            const formData = await request.formData();
            const title = formData.get("title")?.toString();
            const content = formData.get("content")?.toString();

            if (!content || !title) {
                throw new Response(`Форма не содержит всех необходимых полей`, {
                    statusText: "Bad Request",
                    status: 400,
                });
            }

            return await ApiWorker.updatePost(
                id,
                { title: title, content: content },
                token!
            );
        }
        case "DELETE": {
            await ApiWorker.deletePost(id, token!);
            return redirect(`/`);
        }
    }

    throw new Response("Недопустимый метод HTTP-запроса", {
        statusText: "Method Not Allowed",
        status: 405,
    });
}

export function PostRoute() {
    const auth = useAppSelector(authSelector);
    const post = useLoaderData() as PostDetailsDto;

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