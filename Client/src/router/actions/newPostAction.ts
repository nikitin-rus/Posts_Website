import { store } from "../../redux/store";
import { ApiWorker } from "../../helpers/ApiWorker";
import { PostFormSchema } from "../../schemas/post/PostFormSchema";
import { redirect } from "react-router-dom";

export async function newPostAction({
    request,
}: {
    request: Request,
}) {
    if (request.method !== "POST") {
        throw new Response("Недопустимый метод HTTP-запроса", {
            statusText: "Method Not Allowed",
            status: 405,
        });
    }

    const token = store.getState().jwtToken;

    if (!token) {
        return new Response("Отсутствие JWT-токена.", {
            status: 401,
            statusText: "Unauthorized"
        });
    }

    const formData = await request.formData();

    const postFormData = PostFormSchema.parse({
        title: formData.get("title")?.toString(),
        content: formData.get("content")?.toString(),
    });

    const newPostResponse = await ApiWorker.createPost(
        postFormData,
        token
    );

    return redirect(`/posts/${newPostResponse.id}`)
}