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
                disabled={counter.value <= 0}
                style={counter.value <= 0 ? disabledButtonStyle : null}
            >
                -
            </button>
            <span className="counter-number">{counter.value}</span>
            <button
                className="btn-plus btn"
                onClick={() => onIncrementCounter(counter.id)}
            >
                +
            </button>
        </div>
    );
}

export default Counter;
