import { useNavigate, useRouteError } from "react-router-dom";
import "../styles/scss/errorPage.css";

function ErrorPage() {
    const error = useRouteError();
    const Navigate = useNavigate();
    return (
        <div className="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <button onClick={() => Navigate(-1, { replace: true })}>
                Go back
            </button>
        </div>
    );
}

export default ErrorPage;
