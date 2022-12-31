import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import "../styles/scss/emailVerification.css";
import { MdOutlineMarkEmailRead, MdErrorOutline } from "react-icons/md";
const EmailVerification = () => {
    const Navigate = useNavigate();
    const navigateToLoginPage = () => Navigate("/auth/login");
    const navigateToResendEmailPage = () =>
        Navigate("/auth/send-verification-email");
    const isEmailVerified = useLoaderData();

    return (
        <div className="email-verification-container middle">
            {isEmailVerified?.success ? (
                <>
                    <MdOutlineMarkEmailRead />
                    <h2>Your email has been verified successfully</h2>
                    <button onClick={navigateToLoginPage}>Login here</button>
                </>
            ) : (
                <>
                    <MdErrorOutline />
                    <h2>Your email has not been verified</h2>
                    <h3>{isEmailVerified?.message}</h3>
                    <button onClick={navigateToResendEmailPage}>
                        Resend verification email
                    </button>
                </>
            )}
        </div>
    );
};

export default EmailVerification;
