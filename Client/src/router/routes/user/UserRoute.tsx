import { Outlet, useLoaderData } from "react-router-dom";
import { Page } from "../../../components/Page";
import { Tabs } from "../../../components/Tabs";
import { UserSchema } from "../../../schemas/user/UserSchema";
import { authSelector } from "../../../redux/slices/authSlice";
import { useAppSelector } from "../../../redux/hooks";

export function UserRoute() {
    const componentClassName = "user-route";

    const auth = useAppSelector(authSelector);

    const user = UserSchema.parse(useLoaderData());

    return (
        <div className={componentClassName}>
            <Page>
                <section className={componentClassName + "__section"}>
                    <div className={componentClassName + "__info"}>
                        <h1 className={componentClassName + "__heading"}>
                            @{user.userName}
                        </h1>

                        {auth.user?.userName === user.userName && (
                            <p className={componentClassName + "__text"}>
                                Email: {user.email}
                            </p>
                        )}
                    </div>

                    <Tabs className={componentClassName + "__tabs"}
                        tabs={[
                            { title: "Посты", link: `/users/${user.id}/posts` },
                            { title: "Комментарии", link: `/users/${user.id}/comments` },
                        ]}
                    />
                </section>

                <Outlet />
            </Page>
        </div>
    );
}