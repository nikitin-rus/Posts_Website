import { Link } from "react-router-dom";
import { getClassName } from "../helpers/getClassName";
import { getFormattedDate } from "../helpers/getFormattedDate";
import { UserDto } from "../schemas/user/UserSchema";

interface Props {
    user: UserDto,
    creationDate: Date,
    className?: string,
    isUserLinked?: boolean
}

export function CardHead({ user, creationDate, isUserLinked = false, className }: Props) {
    const finalClassName = getClassName(
        "card-head",
        className
    );

    const formattedCreationDate = getFormattedDate(creationDate);

    const userNameMarkup = (
        <p className="card-head__userName">
            {user.userName}
        </p>
    );

    return (
        <div className={finalClassName}>
            {isUserLinked ? (
                <Link className="card-head__link"
                    to={`/users/${user.id}`}
                >
                    {userNameMarkup}
                </Link>
            ) : userNameMarkup}

            <p className="card-head__date">
                {formattedCreationDate}
            </p>
        </div>
    );
}