import { useLoaderData } from "react-router-dom";
import { UserDetailsSchema } from "../../schemas/user/UserDetailsSchema";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { Page } from "../../components/Page";
import { CommentCardList } from "../../components/lists/CommentCardList";
import { PostCardList } from "../../components/lists/PostCardList";

export function UserRoute() {
    const user = UserDetailsSchema.parse(useLoaderData());
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