import React, { Component } from "react";
import "../css/scss/auth.css";
import "../css/scss/app.css";
import { useRef } from "react";
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const Register = () => {
    const Navigate = useNavigate();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const errRef = useRef();

    const [firstNameState, setFirstNameState] = useState("");
    const [lastNameState, setLastNameState] = useState("");
    const [emailState, setEmailState] = useState("");
    const [phoneNumberState, setphoneNumberState] = useState("");
    const [passwordState, setpasswordState] = useState("");
    const [confirmPasswordState, setConfirmPasswordState] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstNameState) {
            setErrMsg("Please enter your first name");
        } else if (!lastNameState) {
            setErrMsg("Please enter your last name");
        } else if (!emailState) {
            setErrMsg("Please enter your email");
        } else if (!phoneNumberState) {
            setErrMsg("Please enter your phone number");
        } else if (!passwordState) {
            setErrMsg("Please enter your phone password");
        } else if (!confirmPasswordState) {
            setErrMsg("Please confirm your password");
        } else if (!EMAIL_REGEX.test(emailState.toLowerCase())) {
            setErrMsg("Please enter a valid email");
        } else {
            await axios
                .post("/auth/register", {
                    firstName: firstNameState,
                    lastName: lastNameState,
                    phone_number: phoneNumberState,
                    email: emailState,
                    address: null,
                    password: passwordState,
                    confirmPassword: confirmPasswordState,
                    user_type: 0,
                })
                .then((response) => {
                    if (response.status === 200 && response.data.success) {
                        Navigate("/");
                    } else {
                        setErrMsg(response.data.message);
                    }
                });
        }
    };

    return (
        <section about="Sign up">
            <form
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
                            onChange={(e) => setFirstNameState(e.target.value)}
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
                            onChange={(e) => setLastNameState(e.target.value)}
                        />
                    </div>
                </div>

                <label>Email</label>
                <input
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

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    ref={passwordRef}
                    value={passwordState}
                    onChange={(e) => setpasswordState(e.target.value)}
                    autoComplete="false"
                />

                <label>Confirm password</label>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    name="firstName"
                    autoComplete="false"
                    ref={confirmPasswordRef}
                    value={confirmPasswordState}
                    onChange={(e) => setConfirmPasswordState(e.target.value)}
                />
                <p>
                    Already have an account ?{" "}
                    <Link className="click-here-link" to="/auth/login">
                        Click here to login
                    </Link>
                </p>
                <button>Sign up</button>
            </form>
        </section>
    );
};
