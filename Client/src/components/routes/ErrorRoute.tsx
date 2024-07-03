import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Page } from "../Page";

export function ErrorRoute() {
    const error = useRouteError();
    const isRouteError = isRouteErrorResponse(error);
    const componentClassName = "error-route";

    return (
        <div className={componentClassName}>
            <Page>
                <div className={componentClassName + "__message"}>
                    <h2 className={componentClassName + "__status"}>
                        {
                            isRouteError ?
                                `${error.status} ${error.statusText}` :
                                `500 Internal Server Error`
                        }
                    </h2>

                    <div className={componentClassName + "__body"}>
                        {
                            isRouteError ? <p>{error.data}</p> : (
                                <>
                                    <p>Произошла внутренняя ошибка сервера.</p>
                                    <p>Пожалуйста, попробуйте позже.</p>
                                </>
                            )
                        }
                    </div>
                </div>
            </Page>
        </div>
    );
}