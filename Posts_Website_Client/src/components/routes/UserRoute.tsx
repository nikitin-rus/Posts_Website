import { Params, useLoaderData } from "react-router-dom";
import { getUser } from "../../fetchers/getUser";
import { UserDetailsDto } from "../../typescript/dtos/UserDto";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { Page } from "../Page";
import { postDtoToPost } from "../../helpers/mappers/postDtoToContent";
import { ContentCardList } from "../ContentCardList";
import { commentDtoToComment } from "../../helpers/mappers/commentDtoToContent";

export async function loader({ params }: { params: Params }) {
    return await getUser(params.id!);
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

                    <ContentCardList className="user-route__list"
                        content={user.posts.map(postDtoToPost)}
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

                    <ContentCardList className="user-route__list"
                        content={user.comments.map(commentDtoToComment)}
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