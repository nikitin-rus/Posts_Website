import { Field, Form, Formik, FormikFormProps } from "formik";
import { Button } from "../UI/Button";
import { PostFormDto } from "../../schemas/post/PostFormSchema";
import { getClassName } from "../../helpers/getClassName";
import { useSubmit } from "react-router-dom";
import { Input } from "../UI/inputs/Input";
import { RichTextArea } from "../UI/inputs/RichTextArea";

interface Props extends FormikFormProps {
    initialData?: PostFormDto,
}

export function PostForm({
    className,
    initialData,
    ...rest
}: Props) {
    const finalClassName = getClassName("post-form", className);

    const submit = useSubmit();

    return (
        <Formik
            initialValues={initialData ?? {
                "title": "",
                "content": ""
            }}
            onSubmit={async (values) => {
                if (
                    rest.method === "POST"
                    || rest.method === "PUT"
                ) {
                    submit(
                        {
                            title: values.title,
                            content: values.content
                        },
                        {
                            method: rest.method,
                            action: rest.action,
                        }
                    );
                }
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className={finalClassName}
                    {...rest}
                >
                    <Field className="post-form__input"
                        name="title"
                        as={Input}
                        placeholder="Заголовок поста"
                        required
                    />

                    <Field className="post-form__input"
                        name="content"
                        as={RichTextArea}
                        onFormat={(value: string) => setFieldValue("content", value)}
                        placeholder="Расскажите о чем-нибудь..."
                        required
                    />

                    <Button className="post-form__btn"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Сохранить
                    </Button>
                </Form>
            )}
        </Formik>
    );
}