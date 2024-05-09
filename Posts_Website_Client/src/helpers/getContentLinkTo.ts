import { Post } from "../typescript/models/Post";
import { Comment } from "../typescript/models/Comment";

export function getContentLinkTo(content: Post | Comment) {
    let path = "";

    switch (content.type) {
        case "comment":
            path = `posts/${content.postId}/comments`;
            break;
        case "post":
            path = "posts";
            break;
    }

    return `/${path}/${content.id}`;
}