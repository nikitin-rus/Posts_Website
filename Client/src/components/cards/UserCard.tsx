import { memo } from "react"
import { UserDto } from "../../schemas/user/UserSchema";
import { useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/slices/authSlice";
import { getClassName } from "../../helpers/getClassName";

interface Props {
    user: UserDto,
    className?: string,
    children?: React.ReactNode,
}

const UserCard = memo(function ({
    user,
    className,
    children,
}: Props) {
    const componentClassName = "user-card";
    const finalClassName = getClassName(componentClassName, className);

    const auth = useAppSelector(authSelector);

    return (
        <div className={finalClassName}>
            <h1 className={componentClassName + "__heading"}>
                @{user.userName}
            </h1>

            {auth.user?.userName === user.userName && (
                <p className={componentClassName + "__text"}>
                    Email: {user.email}
                </p>
            )}

            {children}
        </div>
    );
});

export { UserCard };