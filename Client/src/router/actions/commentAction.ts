import { CommentRouteParamsSchema } from "../../schemas/params/CommentRouteParamsSchema";
import { CommentFormSchema } from "../../schemas/comment/CommentFormSchema";
import { Params, redirect } from "react-router-dom";
import { store } from "../../redux/store";
import { ApiWorker } from "../../helpers/ApiWorker";

export async function commentAction({
    request,
    params,
}: {
    request: Request,
    params: Params,
}) {
    const {
        postId,
        commentId
    } = CommentRouteParamsSchema.parse(params);

    const token = store.getState().jwtToken;

    if (!token) {
        return new Response("Отсутствие JWT-токена.", {
            status: 401,
            statusText: "Unauthorized"
        });
    }

    if (request.method === "PUT") {
        const formData = await request.formData();

        const commentFormData = CommentFormSchema.parse({
            content: formData.get("content")?.toString()
        });

        return await ApiWorker.updateComment(
            postId,
            commentId,
            commentFormData,
            token
        );
    } else if (request.method === "DELETE") {
        await ApiWorker.deleteComment(postId, commentId, token);
        return redirect(`/posts/${postId}`);
    }

    throw new Response("Недопустимый метод HTTP-запроса.", {
        statusText: "Method Not Allowed",
        status: 405,
    });
}