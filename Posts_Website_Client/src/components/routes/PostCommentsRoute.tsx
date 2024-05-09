import { Params } from "react-router-dom";
import { createComment } from "../../fetchers/createComment";
import { store } from "../../redux/store";

export async function action({
    request,
    params
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

    const formData = await request.formData();

    const content = formData.get("content")?.toString();

    if (!content) {
        throw new Response(`Форма поста не содержит поля с контентом`, {
            status: 400,
            statusText: "Bad Request",
        });
    }

    return await createComment(
        params.id!,
        { content: content },
        store.getState().jwtToken!
    );
}