import {
    AddShoppingCartOutlined,
    RemoveShoppingCartOutlined,
} from "@material-ui/icons";
import { useContext } from "react";
import "../css/scss/product.css";
import { CartContext } from "../context/CartProvider";
import { useState } from "react";
import { useNavigate } from "react-router";

const Product = ({ book }) => {
    const Navigate = useNavigate();
    const { removeFromCart, addToCart, state } = useContext(CartContext);
    const [isInCart, setIsInCart] = useState(() => {
        let bookIsInCart = false;
        state.forEach((cart) => {
            if (parseInt(book.id) === parseInt(cart.id)) {
                bookIsInCart = true;
            }
        });
        return bookIsInCart;
    });

    const _addToCart = async (e) => {
        e.stopPropagation();
        await addToCart(book.id);
        setIsInCart(true);
    };

    const _removeFromCart = async (e) => {
        e.stopPropagation();
        await removeFromCart(book.id);
        setIsInCart(false);
    };

    const getCartIcon = () => {
        if (isInCart) {
            return (
                <div className="icon-container" onClick={_removeFromCart}>
                    <RemoveShoppingCartOutlined />
                </div>
            );
        } else {
            return (
                <div className="icon-container" onClick={_addToCart}>
                    <AddShoppingCartOutlined />
                </div>
            );
        }
    };

    return (
        <div
            className="product-container"
            onClick={(e) => {
                Navigate(`/books/${book.id}`);
            }}
        >
            <div className="icons-image-container">
                <div className="icons-container">{getCartIcon()}</div>
                <img
                    className="image-container"
                    alt="book"
                    src={`http://localhost:8080/${book.image}`}
                />
            </div>
            <div className="book-info-container">
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
                <div className="book-price">{book.price} DA</div>
            </div>
        </div>
    );
};

export default Product;
