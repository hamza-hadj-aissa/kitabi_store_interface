import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { Component } from "react";
import "../css/Product.css";

class Product extends Component {
    state = {
        book: this.props.book,
    };
    render() {
        return (
            <div
                className="product-container"
                onClick={() => this.props.onBookClicked(this.state.book.id)}
            >
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
                        src={`http://localhost:8080/${this.state.book.image}`}
                    />
                </div>
                <div className="book-info-container">
                    <div className="book-title">{this.state.book.title}</div>
                    <div className="book-author">{this.state.book.author}</div>
                    <div className="book-price">{this.state.book.price} DA</div>
                </div>
            </div>
        );
    }
}

export default Product;
