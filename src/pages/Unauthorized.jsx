import React from "react";
import { useNavigate } from "react-router";
import "../styles/scss/unauthorized.css";

const Unauthorized = () => {
    const Navigate = useNavigate();

    const goBack = () => {
        Navigate(-1, { replace: true });
    };
    return (
        <div className="unauthorized">
            <h1>403</h1>
            <h2>Unauthorized</h2>
            <button onClick={goBack}>Go back</button>
        </div>
    );
};

export default Unauthorized;
