import { useRouteError } from "react-router-dom";
import "../css/ErrorPage.css";
function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;
