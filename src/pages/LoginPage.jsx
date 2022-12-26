import React from "react";
import "../css/scss/auth.css";
import "../css/scss/app.css";
import { useRef } from "react";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const Login = () => {
    const { passwordVisible, setPasswordVisibble } = useState(false);
    const Navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const emailRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef();

    const [emailState, setEmailState] = useState("");
    const [passwordState, setpasswordState] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [verifyEmail, setVerifyEmail] = useState(false);
    // const [emailErrMsg, setemailErrMsg] = useState("");
    // const [passwordErr, setpasswordErr] = useState("");

    const sendEmailVerification = async () => {
        await axios
            .post("/auth/resend-confirmation-email", {
                email: emailState,
            })
            .then((response) => {
                if (response.status === 200 && response.data.success) {
                    setErrMsg("Please check your inbox");
                } else {
                    throw Response(
                        response.data.message ?? response.statusText,
                        response.status
                    );
                }
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailState) {
            setErrMsg("Please enter your email");
        } else if (!EMAIL_REGEX.test(emailState.toLowerCase())) {
            setErrMsg("Please enter a valid email");
        } else if (!passwordState) {
            setErrMsg("Please enter your password");
        } else {
            await axios
                .post("/auth/login", {
                    email: emailState,
                    password: passwordState,
                })
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.success) {
                            setUser({
                                id: response.data.id,
                                role: response.data.role,
                                email: emailState,
                            });
                            Navigate("/");
                        } else {
                            if (
                                response.data.message === "incorrect password"
                            ) {
                                setErrMsg("Incorrect password");
                                passwordRef.current.focus();
                            } else if (
                                response.data.message === "user not found"
                            ) {
                                setErrMsg("User does not exist");
                                emailRef.current.focus();
                            } else if (
                                response.data.message ===
                                "email is not verified"
                            ) {
                                setErrMsg("Please verify your email");
                                setVerifyEmail(true);
                            }
                        }
                    } else {
                        setErrMsg(response.statusText);
                    }
                });
        }
    };

    return (
        <section about="Sign up">
            <form
                className="form-container"
                onSubmit={handleSubmit}
                onChange={(e) => {
                    setErrMsg("");
                    setVerifyEmail(false);
                }}
            >
                <h2>Log in</h2>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                    {verifyEmail ? (
                        <p
                            className="click-here-link"
                            onClick={async () => await sendEmailVerification()}
                        >
                            Click here to verify your email
                        </p>
                    ) : null}
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
                <label>Password</label>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    ref={passwordRef}
                    value={passwordState}
                    onChange={(e) => setpasswordState(e.target.value)}
                    autoComplete="false"
                />
                <div className="showpassword-container">
                    <input
                        type="checkbox"
                        checked={passwordVisible}
                        onClick={() => setPasswordVisibble(!passwordVisible)}
                    />
                    <div>Show password</div>
                </div>
                <p>
                    Don't have an account ?{" "}
                    <Link className="click-here-link" to="/auth/register">
                        Click here to register
                    </Link>
                </p>
                <button>Log in</button>
            </form>
        </section>
    );
};
