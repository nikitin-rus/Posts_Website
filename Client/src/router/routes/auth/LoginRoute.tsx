import { useActionData } from "react-router-dom";
import { LoginForm } from "../../../components/forms/LoginForm";
import { Page } from "../../../components/Page";
import { AuthSchema } from "../../../schemas/auth/AuthSchema";

export function LoginRoute() {
    const actionData = AuthSchema.nullish().parse(useActionData());

    return (
        <div className="login-route">
            <Page>
                <h1 className="login-route__heading">
                    Вход в аккаунт
                </h1>

                <LoginForm className="login-route__form"
                    method="POST"
                    initialData={{
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