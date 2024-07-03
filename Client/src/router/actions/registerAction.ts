import { ApiWorker } from "../../helpers/ApiWorker";
import { RegisterFormSchema } from "../../schemas/auth/RegisterFormSchema";
import { login } from "../../redux/slices/authSlice";
import { store } from "../../redux/store";
import { redirect } from "react-router-dom";

export async function registerAction({
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

    const registerResponse = await ApiWorker.register(
        RegisterFormSchema.parse({
            email: formData.get("email")?.toString(),
            userName: formData.get("userName")?.toString(),
            password: formData.get("password")?.toString(),
        })
    );

    if (registerResponse.isSuccessful) {
        store.dispatch(login({
            jwtToken: registerResponse.jwtToken,
            user: registerResponse.user,
        }));

        return redirect("/");
    }

    return registerResponse;
}