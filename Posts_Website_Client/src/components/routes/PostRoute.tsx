import { getPost } from "../../fetchers/getPost";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { Form, Link, Params, redirect, useLoaderData } from "react-router-dom";
import { PostDetailsDto } from "../../typescript/dtos/PostDto";
import { Button } from "../UI/Button";
import { Page } from "../Page";
import { ContentCard } from "../ContentCard";
import { postDtoToPost } from "../../helpers/mappers/postDtoToContent";
import { commentDtoToComment } from "../../helpers/mappers/commentDtoToContent";
import { CommentForm } from "../forms/CommentForm";
import { ContentCardList } from "../ContentCardList";
import EditIcon from "../../assets/edit_24dp.svg?react";
import DeleteIcon from "../../assets/delete_24dp.svg?react";
import { deletePost } from "../../fetchers/deletePost";
import { store } from "../../redux/store";
import { updatePost } from "../../fetchers/updatePost";

export async function loader({ params }: { params: Params }) {
    return getPost(params.id!);
}

export async function action({ params, request }: { params: Params, request: Request }) {
    const id: string = params.id!;
    const token = store.getState().jwtToken;

    switch (request.method) {
        case "PUT": {
            const formData = await request.formData();
            const content = formData.get("content")?.toString();

            if (!content) {
                throw new Response(`Форма не содержит поля с именем content`, {
                    statusText: "Bad Request",
                    status: 400,
                });
            }

            return await updatePost(
                id,
                { content: content },
                token!
            );
        }
        case "DELETE": {
            await deletePost(id, token!);
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
                            <Button>
                                <p className="post-route__btn-text">Удалить</p>
                                <DeleteIcon />
                            </Button>
                        </Form>
                    </div>
                )}

                <ContentCard className="post-route__card"
                    content={postDtoToPost(post)}
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

                <ContentCardList content={post.comments.map(commentDtoToComment)} />

                {post.comments.length === 0 && (
                    <p className="post-route__message">
                        Комментариев пока нет!
                    </p>
                )}
            </Page>
        </div>
    );
}