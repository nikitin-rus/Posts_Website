import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { getClassName } from "../helpers/getClassName";
import { getFormattedDate } from "../helpers/getFormattedDate";
import { Post } from "../typescript/models/Post";
import { Comment } from "../typescript/models/Comment";

interface Props {
    className?: string,
    content: Comment | Post
    isPreview?: boolean
}

const ContentCard = forwardRef<HTMLDivElement, Props>(({
    className,
    isPreview = false,
    content
}, ref) => {
    const finalClassName = getClassName(
        "content-card",
        className,
        { "content-card_preview": isPreview }
    );
    const formattedCreationDate = getFormattedDate(new Date(
        content.type === "comment" ? content.writtenAt : content.publishedAt
    ));

    const userNameMarkup = <p className="content-card__username">
        {content.user.userName}
    </p>;

    return (
        <div className={finalClassName}
            ref={ref}
        >
            <div className="content-card__head">
                {!isPreview ? (
                    <Link className="content-card__link"
                        to={`/users/${content.user.id}`}
                    >
                        {userNameMarkup}
                    </Link>
                ) : userNameMarkup}

                <p className="content-card__date">
                    {formattedCreationDate}
                </p>
            </div>

            <div className="content-card__body">
                {content.content}
            </div>
        </div>
    );
}
);

export { ContentCard };