import { redirect } from "react-router-dom";
import { ApiWorker } from "../../helpers/ApiWorker";
import { login } from "../../redux/slices/authSlice";
import { store } from "../../redux/store";
import { LoginFormSchema } from "../../schemas/auth/LoginFormSchema";

export async function loginAction({
    request
}: {
    request: Request
}) {
    if (request.method !== "POST") {
        throw new Response("Недопустимый метод HTTP-запроса", {
            statusText: "Method Not Allowed",
            status: 405,
        });
    }

    const formData = await request.formData();

    const loginResponse = await ApiWorker.login(
        LoginFormSchema.parse({
            email: formData.get("email")?.toString(),
            password: formData.get("password")?.toString()
        })
    );

    if (loginResponse.isSuccessful) {
        store.dispatch(login({
            jwtToken: loginResponse.jwtToken,
            user: loginResponse.user,
        }));

        return redirect("/");
    }

    return loginResponse;
}