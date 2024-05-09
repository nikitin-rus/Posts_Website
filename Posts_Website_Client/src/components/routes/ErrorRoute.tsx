import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Page } from "../Page";

export function ErrorRoute() {
    const error = useRouteError();
    const isRouteError = isRouteErrorResponse(error);

    return (
        <div className="error-route">
            <Page>
                <div className="error-route__message">
                    <h2 className="error-route__status">
                        {isRouteError ? (
                            `${error.status} ${error.statusText}`
                        ) : (
                            `Неизвестная ошибка`
                        )}
                    </h2>

                    {isRouteError && <p className="error-message__body">
                        {isRouteError ? error.data : "Неизвестная ошибка"}
                    </p>}
                </div>
            </Page>
        </div>
    );
}