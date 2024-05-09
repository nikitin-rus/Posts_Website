import { createRef } from "react";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ContentCard } from "./ContentCard";
import { getClassName } from "../helpers/getClassName";
import { getContentLinkTo } from "../helpers/getContentLinkTo";
import { Post } from "../typescript/models/Post";
import { Comment } from "../typescript/models/Comment";

interface Props {
    className?: string,
    content: Post[] | Comment[]
}

export function ContentCardList({ className, content }: Props) {
    const finalClassName = getClassName("content-card-list", className);

    const listItems = content.map(c => {
        return {
            content: c,
            nodeRef: createRef<HTMLAnchorElement>(),
        }
    });

    return (
        <TransitionGroup className={finalClassName}>
            {listItems.map(({ content, nodeRef }) =>
                <CSSTransition classNames="content-card-list__list-item"
                    key={content.id}
                    nodeRef={nodeRef}
                    timeout={300}
                >
                    <Link className="content-card-list__list-item"
                        ref={nodeRef}
                        to={getContentLinkTo(content)}
                    >
                        <ContentCard
                            content={content}
                            isPreview={true}
                        >
                        </ContentCard>
                    </Link>
                </CSSTransition>
            )}
        </TransitionGroup >
    );
}