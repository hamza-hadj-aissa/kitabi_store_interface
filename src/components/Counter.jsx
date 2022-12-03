import { AddOutlined, RemoveOutlined } from "@material-ui/icons";
import React from "react";

function Counter({ counter, onIncrementCounter, onDecrementCounter }) {
    const disabledButtonStyle = {
        opacity: "0.65",
        pointer: "none",
        // "pointer-events": "none",
    };
    return (
        <div className="counter-container">
            <button
                className="btn-minus btn"
                onClick={() => onDecrementCounter(counter.id)}
                disabled={counter.value <= 1}
                style={counter.value <= 1 ? disabledButtonStyle : null}
            >
                <RemoveOutlined className="minus-icon" />
            </button>
            <span className="counter-number">{counter.value}</span>
            <button
                className="btn-plus btn"
                onClick={() => onIncrementCounter(counter.id)}
            >
                <AddOutlined className="plus-icon" />
            </button>
        </div>
    );
}

export default Counter;
