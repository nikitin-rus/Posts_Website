import { Field, Form, Formik, FormikFormProps } from "formik";
import { Button } from "../UI/Button";
import { getClassName } from "../../helpers/getClassName";
import { Input } from "../UI/inputs/Input";
import { useSubmit } from "react-router-dom";
import { LoginFormDto } from "../../schemas/auth/LoginFormSchema";

interface Props extends FormikFormProps {
    initialData?: LoginFormDto
}

export function LoginForm({
    className,
    initialData,
    ...rest
}: Props) {
    const submit = useSubmit();

    const finalClassName = getClassName("login-form", className);

    return (
        <Formik
            initialValues={initialData ?? {
                "email": "",
                "password": ""
            }}
            onSubmit={async (values) => {
                submit(
                    {
                        email: values.email,
                        password: values.password
                    },
                    {
                        method: "POST",
                        action: "/login"
                    }
                );
            }}
        >
            <Form className={finalClassName}
                method="POST"
                action="/"
                {...rest}
            >
                <Field className="login-form__input"
                    name="email"
                    type="email"
                    as={Input}
                    placeholder="example@gmail.com"
                    label="Почта"
                    required
                />

                <Field className="login-form__input"
                    name="password"
                    type="password"
                    as={Input}
                    label="Пароль"
                    required
                />

                <Button className="login-form__btn"
                    type="submit"
                    theme="blue"
                >
                    Подтвердить
                </Button>
            </Form>
        </Formik>
    );
}