import React, { useRef, useState } from "react";
import "../styles/scss/app.css";
import "../styles/scss/auth.css";
import axios from "../api/axios";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ResendVerificationEmail = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [emailState, setEmailState] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailState) {
            setErrMsg("Please enter your email");
        } else if (!EMAIL_REGEX.test(emailState.toLowerCase())) {
            setErrMsg("Please enter a valid email");
        } else {
            await axios
                .post("/auth/resend-confirmation-email", {
                    email: emailState,
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        setSuccessMsg(
                            "Email sent successfully. Please check your inbox"
                        );
                    }
                })
                .catch((err) => {
                    console.log(err.response.data);
                    setErrMsg(
                        err.response.data.message ?? err.response.statusText
                    );
                });
        }
    };

    return (
        <div className="auth-container middle">
            <section about="Log in">
                <form
                    className="form-container"
                    onSubmit={handleSubmit}
                    onChange={(e) => {
                        setErrMsg("");
                        setSuccessMsg("");
                    }}
                >
                    <h1>
                        <MdOutlineMarkEmailRead />
                    </h1>
                    <h2>Send verification email</h2>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : null}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <p
                        ref={errRef}
                        className={successMsg ? "successMsg" : null}
                        aria-live="assertive"
                    >
                        {successMsg}
                    </p>
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        ref={emailRef}
                        value={emailState}
                        onChange={(e) => setEmailState(e.target.value)}
                    />

                    <button>Send</button>
                </form>
            </section>
        </div>
    );
};

export default ResendVerificationEmail;
