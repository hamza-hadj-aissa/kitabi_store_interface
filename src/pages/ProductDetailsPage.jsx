import {
    AddShoppingCartOutlined,
    PaymentOutlined,
    RemoveShoppingCartOutlined,
} from "@material-ui/icons";
import { useContext } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import axios from "../api/axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { CartContext, CartDispatchContext } from "../context/CartProvider";
import "../css/scss/productDetails.css";

function ProductDetails() {
    return (
        <>
            <NavBar />
            <ProductInfo />
            <Footer />
        </>
    );
}

function ProductInfo() {
    let { book, bookInCart } = useLoaderData();
    const { addToCart, removeFromCart } = useContext(CartContext);

    const [bookIsInCart, setBookIsInCart] = useState(bookInCart);
    const { state } = useContext(CartContext);

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
        if (bookIsInCart) {
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
        await addToCart(book.id).then(() => setBookIsInCart(true));
    };

    const _removeFromCart = async () => {
        await removeFromCart(book.id).then(() => setBookIsInCart(false));
    };

    const buyBook = async () => {
        await axios
            .get("/orders")
            .then((response) => console.log(response.data));
        // await axios
        //     .post("/orders/buy", {
        //         books: [{ id: book.id, quantity: 1 }],
        //     })
        //     .then((response) => {
        //         console.log("response", response.data);
        //     });
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
                        onClick={async () =>
                            bookIsInCart
                                ? await _removeFromCart()
                                : await _addToCart()
                        }
                    >
                        {getCartButton()}
                    </button>
                    <button
                        className="btn btn-buy-book"
                        onClick={async () => await buyBook()}
                    >
                        <div className="button-text">Buy now</div>
                        <PaymentOutlined className="payement-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
