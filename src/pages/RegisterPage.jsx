import React, { useRef, useState } from "react";
import { MdOutlineLogin } from "react-icons/md";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "../styles/scss/app.css";
import "../styles/scss/auth.css";

const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const Register = () => {
    const Navigate = useNavigate();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const addressRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const errRef = useRef();

    const [firstNameState, setFirstNameState] = useState("");
    const [lastNameState, setLastNameState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [phoneNumberState, setphoneNumberState] = useState("");
    const [addressState, setAddressState] = useState("");
    const [passwordState, setpasswordState] = useState("");
    const [confirmPasswordState, setConfirmPasswordState] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const [passwordVisibleState, setPasswordVisibleState] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstNameState) {
            setErrMsg("Please enter your first name");
            firstNameRef.current.focus();
        } else if (!lastNameState) {
            setErrMsg("Please enter your last name");

            lastNameState.current.focus();
        } else if (!emailState) {
            setErrMsg("Please enter your email");
            emailState.current.focus();
        } else if (!EMAIL_REGEX.test(emailState.toLowerCase())) {
            setErrMsg("Please enter a valid email");
            emailState.current.focus();
        } else if (!phoneNumberState) {
            setErrMsg("Please enter your phone number");
            phoneNumberState.current.focus();
        } else if (!addressState) {
            setErrMsg("Please enter your delivery address");
            addressState.current.focus();
        } else if (!passwordState) {
            setErrMsg("Please enter your phone password");
            passwordState.current.focus();
        } else if (!confirmPasswordState) {
            setErrMsg("Please confirm your password");
            confirmPasswordState.current.focus();
        } else {
            await axios
                .post("/auth/register", {
                    firstName: firstNameState,
                    lastName: lastNameState,
                    phone_number: phoneNumberState,
                    email: emailState,
                    address: addressState,
                    password: passwordState,
                    confirmPassword: confirmPasswordState,
                })
                .then((response) => {
                    if (response.data.success) {
                        Navigate("/auth/login", {
                            replace: true,
                            state: {
                                message:
                                    "Please check your inbox to confirm your email",
                            },
                        });
                    } else {
                        setErrMsg(response.data.message);
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
            <section about="Sign up">
                <form
                    autoComplete={false}
                    className="form-container"
                    onSubmit={handleSubmit}
                    onChange={() => setErrMsg("")}
                >
                    <h2>Sign up</h2>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <div>
                        <div>
                            <label>First name</label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                name="firstName"
                                ref={firstNameRef}
                                value={firstNameState}
                                onChange={(e) =>
                                    setFirstNameState(e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label>Last name</label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                name="lastName"
                                ref={lastNameRef}
                                value={lastNameState}
                                onChange={(e) =>
                                    setLastNameState(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <label>Email</label>
                    <input
                        autoComplete={false}
                        type="text"
                        placeholder="Enter your email"
                        name="email"
                        ref={emailRef}
                        value={emailState}
                        onChange={(e) => setEmailState(e.target.value)}
                    />

                    <label>Phone number</label>
                    <input
                        type="tel"
                        maxLength={10}
                        placeholder="Enter your phone number"
                        name="email"
                        ref={phoneNumberRef}
                        value={phoneNumberState}
                        onChange={(e) => setphoneNumberState(e.target.value)}
                    />

                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="Enter your delivery address"
                        name="address"
                        ref={addressRef}
                        value={addressState}
                        onChange={(e) => setAddressState(e.target.value)}
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

                    <label>Confirm password</label>
                    <input
                        type={passwordVisibleState ? "text" : "password"}
                        placeholder="Confirm your password"
                        name="firstName"
                        autoComplete="false"
                        ref={confirmPasswordRef}
                        value={confirmPasswordState}
                        onChange={(e) =>
                            setConfirmPasswordState(e.target.value)
                        }
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
                        Already have an account ?{" "}
                        <Link className="click-here-link" to="/auth/login">
                            Click here to login
                        </Link>
                    </p>
                    <button>
                        Sign up <MdOutlineLogin />
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Register;
