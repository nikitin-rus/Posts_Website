import { useActionData } from "react-router-dom";
import { LoginForm } from "../../../components/forms/LoginForm";
import { Page } from "../../../components/Page";
import { AuthSchema } from "../../../schemas/auth/AuthSchema";

export function LoginRoute() {
    const componentClassName = "login-route";
    const actionData = AuthSchema.nullish().parse(useActionData());

    return (
        <div className={componentClassName}>
            <h1 className={componentClassName + "__heading"}>
                Вход в аккаунт
            </h1>

            <LoginForm className={componentClassName + "__form"}
                method="POST"
                initialData={{
                    email: "rusnik@gmail.com",
                    password: "12345678"
                }}
            />

            {!actionData?.isSuccessful && actionData?.message && (
                <h3 className={componentClassName + "__error"}>
                    {actionData.message}
                </h3>
            )}
        </div>
    );
}