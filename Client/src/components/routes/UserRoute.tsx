import { Params, useLoaderData } from "react-router-dom";
import { UserDetailsDto } from "../../typescript/dtos/UserDto";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { Page } from "../Page";
import { CommentCardList } from "../lists/CommentCardList";
import { PostCardList } from "../lists/PostCardList";
import { ApiWorker } from "../../helpers/ApiWorker";

export async function loader({ params }: { params: Params }) {
    return await ApiWorker.getUser(params.id!);
}

export function UserRoute() {
    const user = useLoaderData() as UserDetailsDto;
    const auth = useAppSelector(authSelector);
    const isSameUser = user.id === auth.user?.id;

    return (
        <div className="user-route">
            <Page>
                <section className="user-route__section">
                    <h1 className="user-route__heading">
                        {isSameUser ?
                            "Мои посты" :
                            `Посты ${user.userName}`
                        }
                    </h1>

                    <PostCardList className="user-route__list"
                        posts={user.posts}
                    />

                    {user.posts.length === 0 && (
                        <p className="user-route__message">
                            {isSameUser ?
                                "У вас еще нет постов" :
                                `${user.userName} еще не имеет постов`
                            }
                        </p>
                    )}
                </section>

                <section className="user-route__section">
                    <h1 className="user-route__heading">
                        {isSameUser ?
                            "Мои комментарии" :
                            `Комментарии ${user.userName}`
                        }
                    </h1>

                    <CommentCardList className="user-route__list"
                        comments={user.comments}
                    />

                    {user.comments.length === 0 && (
                        <p className="user-route__message">
                            {isSameUser ?
                                "Вы еще не написали ни одного комментария" :
                                `${user.userName} еще не написал ни одного комментария`
                            }
                        </p>
                    )}
                </section>
            </Page>
        </div>
    );
}