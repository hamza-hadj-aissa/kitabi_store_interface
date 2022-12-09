import "../css/scss/auth.css";
import NavBar from "../components/NavBar";

const AuthPage = ({ child }) => {
    return <div className="auth-container middle">{child}</div>;
};

export default AuthPage;
