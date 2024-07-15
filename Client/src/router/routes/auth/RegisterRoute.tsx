import { useActionData } from "react-router-dom";
import { RegisterForm } from "../../../components/forms/RegisterForm";
import { Page } from "../../../components/Page";
import { AuthSchema } from "../../../schemas/auth/AuthSchema";

export function RegisterRoute() {
    const actionData = AuthSchema.nullish().parse(useActionData());

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