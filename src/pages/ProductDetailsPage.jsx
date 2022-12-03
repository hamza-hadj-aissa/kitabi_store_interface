import {
    AddShoppingCartOutlined,
    PaymentOutlined,
    RemoveShoppingCartOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { useLoaderData } from "react-router";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import "../css/ProductDetails.css";

function ProductDetails({ addToCart, removeFromCart, badgeState }) {
    let { book, bookInCart } = useLoaderData();

    return (
        <>
            <NavBar badgeState={badgeState} />
            <ProductInfo
                book={book}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                bookInCart={bookInCart}
            />
            <Footer />
        </>
    );
}

function ProductInfo({ book, addToCart, removeFromCart, bookInCart }) {
    const [bookIsInCart, setBookIsInCart] = useState(bookInCart);
    const getCartAction = () => {
        return bookIsInCart ? _removeFromCart : _addToCart;
    };

    const getBookPrice = () => {
        if (book?.discount === 0) {
            return <div className="book-price-container">{book?.price}</div>;
        } else {
            return (
                <div className="book-price-container">
                    <div className="book-price-container before-discount">
                        {book?.price} DA
                    </div>
                    <div className="book-price-container">
                        {book?.price - (book?.price * book?.discount) / 100} DA
                    </div>
                </div>
            );
        }
    };

    const getCartButton = () => {
        if (bookIsInCart === true) {
            return (
                <>
                    <div className="button-text">Remove from cart</div>
                    <RemoveShoppingCartOutlined className="add-to-cart-icon" />
                </>
            );
        } else {
            return (
                <>
                    <div className="button-text">Add to cart</div>
                    <AddShoppingCartOutlined className="add-to-cart-icon" />
                </>
            );
        }
    };

    const _addToCart = async () => {
        await addToCart(book.id).then((isInCart) => {
            setBookIsInCart(isInCart);
        });
    };

    const _removeFromCart = async () => {
        await removeFromCart(book.id).then((isInCart) => {
            setBookIsInCart(isInCart);
        });
    };

    return (
        <div className="product-details-main-container">
            <img
                src={`http://localhost:8080/${book?.image}`}
                className="image-container"
                alt="bookk"
            />
            <div className="book-info-container">
                <div className="book-details">
                    <h1 className="book-title">{book?.title}</h1>
                    <h3 className="book-title">{book?.author}</h3>
                    <p className="book-description-container">
                        {book?.description}
                    </p>
                </div>
                <div className="book-category-pages-container">
                    <div>Category: {book?.category}</div>
                    <div>Number of pages: {book?.pages_number}</div>
                </div>
                {getBookPrice()}
                <div className="buttons-container">
                    <button
                        className="btn btn-add-to-cart"
                        onClick={getCartAction()}
                    >
                        {getCartButton()}
                    </button>
                    <button className="btn btn-buy-book">
                        <div className="button-text">Buy now</div>
                        <PaymentOutlined className="payement-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
