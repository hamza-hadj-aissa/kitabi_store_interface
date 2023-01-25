import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
const PopUpError = ({ popupError, setPopupError, message }) => {
    var [timeout, setTimeoutState] = useState();
    useEffect(() => {
        if (popupError) {
            var localTimout = setTimeout(() => {
                setPopupError(false);
            }, 3500);
            setTimeoutState(localTimout);
        } else {
            clearTimeout(timeout);
        }
    }, [popupError]);
    return (
        <div className={`popup ${!popupError ? "popup-inactive" : null}`}>
            <div className="popup-inner">
                <AiOutlineClose
                    className="icon"
                    onClick={() => setPopupError(false)}
                />
                <h3>{message}</h3>
                <button onClick={() => setPopupError(false)}>Close</button>
            </div>
        </div>
    );
};

export default PopUpError;
