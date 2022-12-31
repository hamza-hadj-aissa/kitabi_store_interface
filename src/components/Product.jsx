import { useState } from "react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import useCart from "../hooks/useCart";
import "../styles/scss/product.css";

const Product = ({ book, onBookClicked }) => {
    const { removeFromCart, addToCart, cart } = useCart();

    const [isInCart, setIsInCart] = useState(() => {
        let bookIsInCart = false;
        cart?.forEach((cart) => {
            if (parseInt(book?.id) === parseInt(cart.id)) {
                bookIsInCart = true;
            }
        });
        return bookIsInCart;
    });

    const _addToCart = async (e) => {
        e.stopPropagation();
        await addToCart(book?.id);
        setIsInCart(true);
    };

    const _removeFromCart = async (e) => {
        e.stopPropagation();
        await removeFromCart(book?.id);
        setIsInCart(false);
    };

    const getCartIcon = () => {
        if (isInCart) {
            return (
                <div className="icon-container" onClick={_removeFromCart}>
                    <MdRemoveShoppingCart size={22.5} />
                </div>
            );
        } else {
            return (
                <div className="icon-container" onClick={_addToCart}>
                    <MdAddShoppingCart size={22.5} />
                </div>
            );
        }
    };

    return (
        <div
            className="product-container"
            onClick={(e) => {
                onBookClicked(book?.id);
            }}
        >
            <div className="icons-image-container">
                <div className="icons-container">{getCartIcon()}</div>
                <img
                    className="image-container"
                    alt="book"
                    src={`http://localhost:8080/images/${book?.image}`}
                />
            </div>
            <div className="book-info-container">
                <div className="book-title">{book?.title}</div>
                <div className="book-author">{book?.author}</div>
                <div className="book-price">
                    {book?.price - (book?.price * book?.discount) / 100} DA
                </div>
            </div>
        </div>
    );
};

export default Product;
