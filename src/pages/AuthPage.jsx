import "../css/scss/auth.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const AuthPage = ({ child }) => {
    return (
        <div>
            <NavBar />
            <div className="auth-container middle">{child}</div>
            <Footer />
        </div>
    );
};

export default AuthPage;
