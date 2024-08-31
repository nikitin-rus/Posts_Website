import { useActionData } from "react-router-dom";
import { RegisterForm } from "../../../components/forms/RegisterForm";
import { AuthSchema } from "../../../schemas/auth/AuthSchema";

export function RegisterRoute() {
    const componentClassName = "register-route";
    const actionData = AuthSchema.nullish().parse(useActionData());

    return (
        <div className={componentClassName}>
            <h1 className={componentClassName + "__heading"}>
                Регистрация пользователя
            </h1>

            <RegisterForm className={componentClassName + "__form"}
                method="POST" initialData={{
                    userName: "dankul",
                    email: "dankul@gmail.com",
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