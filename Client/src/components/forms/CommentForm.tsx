import { Field, Form, Formik, FormikFormProps } from "formik";
import { TextArea } from "../UI/inputs/TextArea";
import { Button } from "../UI/Button";
import { CommentFormDto } from "../../schemas/comment/CommentFormSchema";
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
    const componentClassName = "comment-form";
    const finalClassName = getClassName(componentClassName, className);

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
                <Field className={componentClassName + "__text-area"}
                    name="content"
                    as={TextArea}
                    placeholder="Что вы думаете о данном посте?"
                    required
                />

                <Button className={componentClassName + "__button"}
                    value="Сохранить"
                    type="submit"
                />
            </Form>
        </Formik>
    );
}