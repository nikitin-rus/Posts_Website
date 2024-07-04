import { Field, Form, Formik, FormikFormProps } from "formik";
import { Button } from "../UI/Button";
import { RegisterFormDto } from "../../schemas/auth/RegisterFormSchema";
import { getClassName } from "../../helpers/getClassName";
import { Input } from "../UI/Input";
import { useSubmit } from "react-router-dom";

interface Props extends FormikFormProps {
    initialData?: RegisterFormDto
}

export function RegisterForm({
    className,
    initialData,
    ...rest
}: Props) {
    const finalClassName = getClassName("register-form", className);

    const submit = useSubmit();

    return (
        <Formik
            initialValues={initialData ?? {
                "userName": "",
                "email": "",
                "password": ""
            }}
            onSubmit={async (values) => {
                submit(
                    {
                        userName: values.userName,
                        email: values.email,
                        password: values.password
                    },
                    {
                        method: "POST",
                        action: "/register"
                    }
                );
            }}
        >
            <Form className={finalClassName}
                {...rest}
            >
                <Field className="register-form__input"
                    name="userName"
                    type="text"
                    as={Input}
                    placeholder="my_user_name"
                    label="Имя пользователя"
                    required
                />

                <Field className="register-form__input"
                    name="email"
                    type="email"
                    as={Input}
                    placeholder="example@gmail.com"
                    label="Почта"
                    required
                />

                <Field className="register-form__input"
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