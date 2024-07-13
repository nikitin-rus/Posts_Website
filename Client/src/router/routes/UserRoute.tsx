import { useLoaderData } from "react-router-dom";
import { UserDetailsSchema } from "../../schemas/user/UserDetailsSchema";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { Page } from "../../components/Page";
import { CommentCardList } from "../../components/lists/CommentCardList";
import { PostCardList } from "../../components/lists/PostCardList";

export function UserRoute() {
    const componentClassName = "user-route";

    const user = UserDetailsSchema.parse(useLoaderData());
    const auth = useAppSelector(authSelector);
    const isSameUser = user.id === auth.user?.id;

    return (
        <div className={componentClassName}>
            <Page>
                <section className={componentClassName + "__section"}>
                    <h1 className={componentClassName + "__heading"}>
                        {isSameUser ?
                            "Мои посты" :
                            `Посты ${user.userName}`
                        }
                    </h1>

                    {user.posts.length > 0 ? (
                        <PostCardList className={componentClassName + "__list"}
                            posts={user.posts}
                        />
                    ) : (
                        <p className={componentClassName + "__message"}>
                            {isSameUser ?
                                "У вас еще нет постов" :
                                `${user.userName} еще не имеет постов`
                            }
                        </p>
                    )}
                </section>

                <section className={componentClassName + "__section"}>
                    <h1 className={componentClassName + "__heading"}>
                        {isSameUser ?
                            "Мои комментарии" :
                            `Комментарии ${user.userName}`
                        }
                    </h1>

                    {user.comments.length > 0 ? (
                        <CommentCardList className="user-route__list"
                            comments={user.comments}
                        />
                    ) : (
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