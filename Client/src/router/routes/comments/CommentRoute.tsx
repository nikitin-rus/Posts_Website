import { Form, Link, useLoaderData } from "react-router-dom";
import DeleteIcon from "../../../assets/icons/delete_24dp.svg";
import EditIcon from "../../../assets/icons/edit_24dp.svg";
import { CommentCard } from "../../../components/cards/CommentCard";
import { Page } from "../../../components/Page";
import { Button } from "../../../components/UI/Button";
import { useAppSelector } from "../../../redux/hooks";
import { authSelector } from "../../../redux/slices/authSlice";
import { CommentDetailsSchema } from "../../../schemas/comment/CommentDetailsSchema";

export function CommentRoute() {
    const auth = useAppSelector(authSelector);
    const comment = CommentDetailsSchema.parse(useLoaderData());

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