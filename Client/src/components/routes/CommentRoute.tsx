import { Form, Link, Params, redirect, useLoaderData } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete_24dp.svg";
import EditIcon from "../../assets/icons/edit_24dp.svg";
import { ApiWorker } from "../../helpers/ApiWorker";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { store } from "../../redux/store";
import { CommentDetailsDto } from "../../schemas/comment/CommentDetailsSchema";
import { Page } from "../Page";
import { Button } from "../UI/Button";
import { CommentCard } from "../cards/CommentCard";

export async function loader({ params }: { params: Params }) {
    return await ApiWorker.getComment(params.postId!, params.commentId!);
}

export async function action({ request, params }: { request: Request, params: Params }) {
    const postId: string = params.postId!;
    const commentId: string = params.commentId!;
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

            return await ApiWorker.updateComment(
                postId,
                commentId,
                { content: content },
                token!
            );
        }
        case "DELETE": {
            await ApiWorker.deleteComment(postId, commentId, token!);
            return redirect(`/posts/${postId}`);
        }
    }

    throw new Response("Недопустимый метод HTTP-запроса", {
        statusText: "Method Not Allowed",
        status: 405,
    });
}

export function CommentRoute() {
    const auth = useAppSelector(authSelector);
    const comment = useLoaderData() as CommentDetailsDto;

    return (
        <div className="comment-route">
            <Page>
                <h1 className="comment-route__heading">
                    Комментарий к {
                        <Link className="comment-route__link"
                            to={`/posts/${comment.post.id}`}
                        >
                            посту {comment.post.user.userName}
                        </Link>
                    }
                </h1>

                {comment.user.userName === auth.user?.userName && (
                    <div className="comment-route__controls">
                        <Link to="edit">
                            <Button>
                                <p className="comment-route__btn-text">Изменить</p>
                                <EditIcon />
                            </Button>
                        </Link>

                        <Form method="DELETE">
                            <Button type="submit">
                                <p className="comment-route__btn-text">Удалить</p>
                                <DeleteIcon />
                            </Button>
                        </Form>
                    </div>
                )}

                <CommentCard className="comment-route__card"
                    comment={comment}
                />
            </Page>
        </div>
    );
}