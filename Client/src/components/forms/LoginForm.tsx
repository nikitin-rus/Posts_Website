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

    const componentClassName = "login-form";
    const finalClassName = getClassName(componentClassName, className);

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
                <Field className={componentClassName + "__input"}
                    name="email"
                    type="email"
                    as={Input}
                    placeholder="example@gmail.com"
                    label="Почта"
                    required
                />

                <Field className={componentClassName + "__input"}
                    name="password"
                    type="password"
                    as={Input}
                    label="Пароль"
                    required
                />

                <Button className={componentClassName + "__button"}
                    value="Подтвердить"
                    type="submit"
                    theme="blue"
                />
            </Form>
        </Formik>
    );
}