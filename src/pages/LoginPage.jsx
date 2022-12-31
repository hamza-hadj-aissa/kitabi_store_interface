import React, { useEffect, useRef, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import "../styles/scss/app.css";
import "../styles/scss/auth.css";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [passwordVisibleState, setPasswordVisibleState] = useState(false);
    const Navigate = useNavigate();
    const loaction = useLocation();
    const { setAuth } = useAuth();

    const emailRef = useRef();
    const passwordRef = useRef();
    const errRef = useRef();
    const successRef = useRef();

    const [emailState, setEmailState] = useState(null);
    const [passwordState, setpasswordState] = useState(null);

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(
        loaction?.state?.message ?? null
    );
    const [verifyEmail, setVerifyEmail] = useState(false);
    // const [emailErrMsg, setemailErrMsg] = useState("");
    // const [passwordErr, setpasswordErr] = useState("");

    useEffect(() => {
        let isMounted = true;
        if (!isLoading && hasLoggedIn) {
            Navigate(from, {
                replace: true,
            });
        }
        isMounted && setIsLoading(false);
        return () => {
            isMounted = false;
        };
    }, [isLoading, hasLoggedIn]);

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const navigateToResendEmail = () =>
        Navigate("/auth/send-verification-email");

    const handleSubmit = async (e) => {
        setIsLoading(true);
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
                .then(async (response) => {
                    if (response.data.success) {
                        setHasLoggedIn(true);
                        setAuth({
                            id: response.data.id,
                            role: response.data.role,
                            accessToken: response.data.accessToken,
                        });
                        // Navigate(from, {
                        //     replace: true,
                        // });
                        // window.location = `http://localhost:3000${from}`;
                    }
                })
                .catch((err) => {
                    if (err.response.data.message === "incorrect password") {
                        setErrMsg("Incorrect password");
                        passwordRef.current.focus();
                    } else if (err.response.data.message === "user not found") {
                        setErrMsg("User does not exist");
                        emailRef.current.focus();
                    } else if (
                        err.response.data.message === "email is not verified"
                    ) {
                        setErrMsg("Please verify your email");
                        setVerifyEmail(true);
                    } else {
                        setErrMsg(
                            err.response.data.message ?? err.response.statusText
                        );
                    }
                });
        }
        setIsLoading(false);
    };

    return (
        <div className="auth-container middle">
            <section about="Log in">
                <form
                    className="form-container"
                    onSubmit={handleSubmit}
                    onChange={(e) => {
                        setErrMsg(null);
                        setVerifyEmail(false);
                        setSuccessMsg(null);
                    }}
                >
                    <h2>Log in</h2>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <p
                        ref={successRef}
                        className={successMsg ? "successMsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {successMsg}
                    </p>
                    <p>
                        {verifyEmail ? (
                            <p
                                className="click-here-link"
                                onClick={navigateToResendEmail}
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
                        type={passwordVisibleState ? "text" : "password"}
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
                            checked={passwordVisibleState}
                            onChange={(e) =>
                                setPasswordVisibleState(!passwordVisibleState)
                            }
                        />
                        <div>Show password</div>
                    </div>
                    <p>
                        Don't have an account ?{" "}
                        <Link className="click-here-link" to="/auth/register">
                            Click here to register
                        </Link>
                    </p>
                    <button>
                        Log in <MdOutlineLogin />
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Login;
