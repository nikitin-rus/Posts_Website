import { Outlet, useLoaderData } from "react-router-dom";
import { UserSchema } from "../../schemas/user/UserSchema";
import { UserCard } from "../../components/cards/UserCard";
import { Tabs } from "../../components/Tabs";

export function UserRoute() {
    const componentClassName = "user-route";
    const user = UserSchema.parse(useLoaderData());

    return (
        <div className={componentClassName}>
            <div className={componentClassName + "__content"}>
                <UserCard className={componentClassName + "__user-card"}
                    user={user}
                >
                    <Tabs className={componentClassName + "__tabs"}
                        tabs={[
                            { title: "Посты", link: `/users/${user.id}/posts` },
                            { title: "Комментарии", link: `/users/${user.id}/comments` },
                        ]}
                    />
                </UserCard>

                <Outlet />
            </div>
        </div>
    );
}