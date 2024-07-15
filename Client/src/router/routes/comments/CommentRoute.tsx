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
    const componentClassName = "comment-route";

    const auth = useAppSelector(authSelector);
    const comment = CommentDetailsSchema.parse(useLoaderData());

    return (
        <div className={componentClassName}>
            <Page>
                <h1 className={componentClassName + "__heading"}>
                    Комментарий к {
                        <Link className={componentClassName + "__link"}
                            to={`/posts/${comment.post.id}`}
                        >
                            посту {comment.post.user.userName}
                        </Link>
                    }
                </h1>

                {comment.user.userName === auth.user?.userName && (
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

                <CommentCard className={componentClassName + "__card"}
                    comment={comment}
                />
            </Page>
        </div>
    );
}