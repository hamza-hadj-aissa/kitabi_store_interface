import { useState } from "react";
import {
    MdAddShoppingCart,
    MdOutlinePayment,
    MdRemoveShoppingCart,
} from "react-icons/md";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import PopUpError from "../components/PopUpError";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useCart from "../hooks/useCart";
import "../styles/scss/productDetails.css";

function ProductDetails() {
    const [popupError, setPopupError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const loaction = useLocation();
    const axiosPrivateClient = useAxiosPrivate();
    const { auth } = useAuth;
    const Navigate = useNavigate();
    let { book, bookInCart, category } = useLoaderData();
    const { addToCart, removeFromCart } = useCart();

    const [bookIsInCart, setBookIsInCart] = useState(bookInCart);
    const getBookPrice = () => {
        if (book?.discount === 0) {
            return <div className="book-price-container">{book?.price} DA</div>;
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
                    <MdRemoveShoppingCart size={25} />
                </>
            );
        } else {
            return (
                <>
                    <div className="button-text">Add to cart</div>
                    <MdAddShoppingCart size={25} />
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

    const openPopup = (message) => {
        setErrorMessage(message);
        setPopupError(true);
    };

    const buyBook = async () => {
        await axiosPrivateClient
            .post("/orders/buy", {
                books: [{ id: book.id, quantity: 1 }],
            })
            .then((response) => {
                if (response.data.success) {
                    Navigate("/orders");
                } else {
                    openPopup(response.data.message);
                }
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    Navigate("/auth/login", {
                        state: { from: loaction },
                        replace: true,
                    });
                } else {
                    throw Response(
                        err.response.data.message ?? err.response.statusText,
                        err.response.status
                    );
                }
            });
    };

    return (
        <>
            <PopUpError
                popupError={popupError}
                setPopupError={setPopupError}
                message={errorMessage}
            />
            <div className="product-details-main-container">
                <img
                    src={`http://localhost:8080/images/${book?.image}`}
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
                        <div>Category: {category.name}</div>
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
                            className={`btn btn-buy-book${
                                "-" + !(auth?.role === "client" || !auth)
                                    ? "disabled"
                                    : null
                            }`}
                            onClick={buyBook}
                            disabled={!(auth?.role === "client" || !auth)}
                        >
                            <div className="button-text">Buy now</div>
                            <MdOutlinePayment size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;
