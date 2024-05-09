import { Page } from "../Page";
import { useActionData, useNavigate } from "react-router-dom";
import { AuthDto } from "../../typescript/dtos/AuthDto";
import { useEffect } from "react";
import { login as loginDispatcher } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { register } from "../../fetchers/register";
import { RegisterForm } from "../forms/RegisterForm";

export async function action({ request }: { request: Request }) {
    if (request.method !== "POST") {
        throw new Response("Недопустимый метод HTTP-запроса", {
            statusText: "Method Not Allowed",
            status: 405,
        });
    }

    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const userName = formData.get("userName")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !userName || !password) {
        throw new Response("Форма не содержит всех необходимых полей", {
            status: 400,
            statusText: "Bad Request",
        });
    }

    return await register({ email, userName, password });
}

export function RegisterRoute() {
    const dispatch = useAppDispatch();
    const actionData = useActionData() as AuthDto | undefined;
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData) {
            if (actionData.isSuccessful) {
                dispatch(loginDispatcher(actionData));
                navigate("/");
            }
        }
    }, [actionData]);

    return (
        <div className="register-route">
            <Page>
                <h1 className="register-route__heading">
                    Регистрация пользователя
                </h1>

                <RegisterForm className="register-route__form"
                    method="POST" initialData={{
                        userName: "dankul",
                        email: "dankul@gmail.com",
                        password: "12345678"
                    }}
                />

                {!actionData?.isSuccessful && actionData?.message && (
                    <h3 className="register-route__error">
                        {actionData.message}
                    </h3>
                )}
            </Page>
        </div>
    );
}