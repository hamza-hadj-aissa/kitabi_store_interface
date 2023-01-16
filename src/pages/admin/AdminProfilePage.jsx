import { useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import "../../styles/scss/profile.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { MdOutlineMailOutline } from "react-icons/md";

const AdminProfile = () => {
    const axiosPrivateAdmin = useAxiosPrivate("admin");
    const userCredentials = useLoaderData();
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
            await axiosPrivateAdmin
                .put("/auth/admin/change-password", {
                    oldPassword: oldPasswordState,
                    newPassword: newPasswordState,
                    newConfirmPassword: confirmNewPasswordState,
                })
                .then((response) => {
                    if (response.data.success) {
                        Navigate("/admin/dashboard", { replace: true });
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
        <div className="profile-container middle">
            <h1>
                {userCredentials.firstName} {userCredentials.lastName}
            </h1>
            <h2>
                <MdOutlineMailOutline /> {userCredentials.email}
            </h2>
            <form
                onSubmit={handleSubmit}
                onChange={() => {
                    setErrMsg("");
                }}
            >
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <div>
                    <label>Old password</label>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Old password"
                        ref={oldPasswordRef}
                        onChange={(e) => setOldPasswordState(e.target.value)}
                    />
                </div>
                <div>
                    <label>New password</label>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="New password"
                        ref={newPasswordRef}
                        onChange={(e) => setNewPasswordState(e.target.value)}
                    />
                </div>
                <div>
                    <label>Confirm new password</label>
                    <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Confirm new password"
                        ref={confirmNewPasswordRef}
                        onChange={(e) =>
                            setConfirmNewPasswordState(e.target.value)
                        }
                    />
                </div>
                <div className="showpassword-container">
                    <input
                        type="checkbox"
                        checked={passwordVisible}
                        onChange={() => setPasswordVisibble(!passwordVisible)}
                    />
                    <div>Show password</div>
                </div>
                <button type="submit">Change password</button>
            </form>
        </div>
    );
};

export default AdminProfile;
