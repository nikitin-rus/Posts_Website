import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Page } from "../../components/Page";
import axios from "axios";

export function ErrorRoute() {
    const error = useRouteError();
    const isRouteError = isRouteErrorResponse(error);
    const isAxiosError = axios.isAxiosError(error);
    const componentClassName = "error-route";

    let errorStatus = "500 Internal Server Error";

    if (isRouteError) {
        errorStatus = `${error.status} ${error.statusText}`;
    } else if (isAxiosError && error.response) {
        errorStatus = `${error.response.status} ${error.response.statusText}`
    }

    return (
        <div className={componentClassName}>
            <Page>
                <div className={componentClassName + "__message"}>
                    <h2 className={componentClassName + "__status"}>
                        {errorStatus}
                    </h2>

                    <div className={componentClassName + "__body"}>
                        {
                            isRouteError ? <p>{error.data}</p> : (
                                isAxiosError ? <p>{error.message}</p> : (
                                    <>
                                        <p>Произошла внутренняя ошибка сервера.</p>
                                        <p>Пожалуйста, попробуйте позже.</p>
                                    </>
                                )
                            )
                        }
                    </div>
                </div>
            </Page>
        </div>
    );
}