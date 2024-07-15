import { Params, redirect } from "react-router-dom";
import { PostRouteParamsSchema } from "../../schemas/params/PostRouteParamsSchema";
import { store } from "../../redux/store";
import { ApiWorker } from "../../helpers/ApiWorker";
import { PostFormSchema } from "../../schemas/post/PostFormSchema";

export async function postAction({
    request,
    params,
}: {
    request: Request,
    params: Params,
}) {
    const { id } = PostRouteParamsSchema.parse(params);

    const token = store.getState().jwtToken;

    if (!token) {
        return new Response("Отсутствие JWT-токена.", {
            status: 401,
            statusText: "Unauthorized"
        });
    }

    if (request.method === "PUT") {
        const formData = await request.formData();

        const postFormData = PostFormSchema.parse({
            title: formData.get("title")?.toString(),
            content: formData.get("content")?.toString(),
        });

        return await ApiWorker.updatePost(
            id,
            postFormData,
            token
        );
    } else if (request.method === "DELETE") {
        await ApiWorker.deletePost(id, token);
        return redirect(`/`);
    }

    throw new Response("Недопустимый метод HTTP-запроса.", {
        statusText: "Method Not Allowed",
        status: 405,
    });
}