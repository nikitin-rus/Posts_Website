import { Page } from "../Page";
import { LoginForm } from "../forms/LoginForm";
import { login } from "../../fetchers/login";
import { useActionData, useNavigate } from "react-router-dom";
import { AuthDto } from "../../typescript/dtos/AuthDto";
import { useEffect } from "react";
import { login as loginDispatcher } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/hooks";

export async function action({ request }: { request: Request }) {
    if (request.method !== "POST") {
        throw new Response("Недопустимый метод HTTP-запроса", {
            statusText: "Method Not Allowed",
            status: 405,
        });
    }

    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Response("Форма не содержит всех необходимых полей", {
            status: 400,
            statusText: "Bad Request",
        });
    }

    return await login({ email, password });
}

export function LoginRoute() {
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
        <div className="login-route">
            <Page>
                <h1 className="login-route__heading">
                    Вход в аккаунт
                </h1>

                <LoginForm className="login-route__form"
                    method="POST" initialData={{
                        email: "rusnik@gmail.com",
                        password: "12345678"
                    }}
                />

                {!actionData?.isSuccessful && actionData?.message && (
                    <h3 className="login-route__error">
                        {actionData.message}
                    </h3>
                )}
            </Page>
        </div>
    );
}