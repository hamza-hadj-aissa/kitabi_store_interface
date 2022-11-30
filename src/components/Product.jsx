import { Icon } from "@material-ui/core";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { Component } from "react";
import "../css/Product.css";

class Product extends Component {
    imageURL = "images/atomic_habits_image.jpg";
    render() {
        return (
            <div className="product-container">
                <div className="icons-image-container">
                    <div className="icons-container">
                        <div className="icon-container">
                            <ShoppingCartOutlined />
                        </div>
                        <div className="icon-container">
                            <SearchOutlined />
                        </div>
                        <div className="icon-container">
                            <FavoriteBorderOutlined />
                        </div>
                    </div>
                    <img
                        className="image-container"
                        alt="book"
                        src={this.imageURL}
                    />
                </div>
                <div className="book-info-container">
                    <div className="book-title">
                        {this.props.product.title} - James clear
                    </div>
                    <div className="book-price">1800 DA</div>
                </div>
            </div>
        );
    }
}

export default Product;
