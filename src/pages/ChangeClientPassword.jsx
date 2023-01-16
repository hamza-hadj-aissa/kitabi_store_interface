import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../styles/scss/auth.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ChangeCLientPassword = () => {
    const axiosPrivateClient = useAxiosPrivate("client");
    const Navigate = useNavigate();

    const [oldPasswordState, setOldPasswordState] = useState("");
    const [newPasswordState, setNewPasswordState] = useState("");
    const [confirmNewPasswordState, setConfirmNewPasswordState] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [passwordVisible, setPasswordVisibble] = useState(false);
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();
    const errRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!oldPasswordState) {
            setErrMsg("Please enter old your password");
            oldPasswordRef.current.focus();
        } else if (!newPasswordState) {
            setErrMsg("Please enter your new password");
            newPasswordState.current.focus();
        } else if (!confirmNewPasswordState) {
            setErrMsg("Please confirm your password");
            confirmNewPasswordState.current.focus();
        } else {
            await axiosPrivateClient
                .put("/auth/change-password", {
                    oldPassword: oldPasswordState,
                    newPassword: newPasswordState,
                    newConfirmPassword: confirmNewPasswordState,
                })
                .then((response) => {
                    if (response.data.success) {
                        Navigate("/", { replace: true });
                    } else {
                        if (
                            response.data.message ===
                            '"password" length must be at least 8 characters long'
                        ) {
                            setErrMsg(
                                "Password length must be at least 8 characters long"
                            );
                        } else {
                            setErrMsg(response.data.message);
                        }
                    }
                })
                .catch((err) => {
                    setErrMsg(
                        err.response.data.message ?? err.response.statusText
                    );
                });
        }
    };

    return (
        <div className="auth-container middle">
            <form
                className="form-container"
                onSubmit={handleSubmit}
                onChange={() => {
                    setErrMsg("");
                }}
            >
                <h2>Change password</h2>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <label>Old password</label>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Old password"
                    ref={oldPasswordRef}
                    onChange={(e) => setOldPasswordState(e.target.value)}
                />
                <label>New password</label>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="New password"
                    ref={newPasswordRef}
                    onChange={(e) => setNewPasswordState(e.target.value)}
                />
                <label>Confirm new password</label>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Confirm new password"
                    ref={confirmNewPasswordRef}
                    onChange={(e) => setConfirmNewPasswordState(e.target.value)}
                />
                <div className="showpassword-container">
                    <input
                        type="checkbox"
                        checked={passwordVisible}
                        onChange={() => setPasswordVisibble(!passwordVisible)}
                    />
                    <div>Show password</div>
                </div>
                <button type="submit">Change password</button>
                <button
                    type="button"
                    onClick={() => Navigate(-1, { replace: true })}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ChangeCLientPassword;
