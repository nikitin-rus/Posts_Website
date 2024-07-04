import { Field, Form, Formik, FormikFormProps } from "formik";
import { TextArea } from "../UI/TextArea";
import { Button } from "../UI/Button";
import { CommentFormDto } from "../../typescript/dtos/CommentDto";
import { getClassName } from "../../helpers/getClassName";
import { useFetcher, useSubmit } from "react-router-dom";

interface Props extends FormikFormProps {
    initialData?: CommentFormDto
}

export function CommentForm({
    className,
    initialData,
    ...rest
}: Props) {
    const finalClassName = getClassName("comment-form", className);
    const submit = useSubmit();
    const fetcher = useFetcher();

    return (
        <Formik
            initialValues={initialData ?? {
                "content": ""
            }}
            onSubmit={async (values) => {
                if (
                    rest.method !== "PUT"
                    && rest.method !== "POST"
                ) {
                    return;
                }

                if (rest.method === "POST") {
                    fetcher.submit(
                        { content: values.content },
                        {
                            method: rest.method,
                            action: rest.action
                        }
                    );
                } else if (rest.method === "PUT") {
                    submit(
                        { content: values.content },
                        {
                            method: rest.method,
                            action: rest.action
                        }
                    )
                }
            }}
        >
            <Form className={finalClassName}
                {...rest}
            >
                <Field className="comment-form__text-area"
                    name="content"
                    as={TextArea}
                    placeholder="Что вы думаете о данном посте?"
                    required
                />

                <Button className="comment-form__btn"
                    type="submit"
                >
                    Сохранить
                </Button>
            </Form>
        </Formik>
    );
}