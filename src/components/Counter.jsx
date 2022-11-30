import { AddOutlined, RemoveOutlined } from "@material-ui/icons";
import React, { Component } from "react";

class Counter extends Component {
    render() {
        return (
            <div className="counter-container">
                <button className="btn-minus btn">
                    <RemoveOutlined className="minus-icon" />
                </button>
                <span className="counter-number">1</span>
                <button className="btn-plus btn">
                    <AddOutlined className="plus-icon" />
                </button>
            </div>
        );
    }
}

export default Counter;
