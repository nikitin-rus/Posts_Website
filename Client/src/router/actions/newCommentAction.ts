import { store } from "../../redux/store";
import { ApiWorker } from "../../helpers/ApiWorker";
import { CommentFormSchema } from "../../schemas/comment/CommentFormSchema";
import { PostRouteParamsSchema } from "../../schemas/params/PostRouteParamsSchema";
import { Params } from "react-router-dom";

export async function newCommentAction({
    request,
    params,
}: {
    request: Request,
    params: Params
}) {
    if (request.method !== "POST") {
        throw new Response("Недопустимый метод HTTP-запроса", {
            statusText: "Method Not Allowed",
            status: 405,
        });
    }

    const { id: postId } = PostRouteParamsSchema.parse(params);

    const token = store.getState().jwtToken;

    if (!token) {
        return new Response("Отсутствие JWT-токена.", {
            status: 401,
            statusText: "Unauthorized"
        });
    }

    const formData = await request.formData();

    const commentFormData = CommentFormSchema.parse({
        content: formData.get("content")?.toString(),
    });

    return await ApiWorker.createComment(
        postId,
        commentFormData,
        token
    );
}