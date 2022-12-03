import { DeleteOutlined, PaymentOutlined } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Counter from "../components/Counter";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import "../css/Cart.css";

function Cart({ badgeState, removeFromCart }) {
    let books = useLoaderData();

    return (
        <div className="router-provider-container">
            <NavBar badgeState={badgeState} />
            <BooksListCart books={books} removeFromCart={removeFromCart} />
            <Footer />
        </div>
    );
}

function BooksListCart({ books, removeFromCart }) {
    const Navigate = useNavigate();
    const [booksState, setbooksState] = useState(books);
    const [cartCounters, setcartCounters] = useState(
        books.map((book) => {
            return {
                id: book.id,
                value: 1,
            };
        })
    );

    const BooksList = () => {
        if (booksState.length) {
            return (
                <div className="books-in-cart-container">
                    {booksState.map((book) => bookInCart(book))}
                </div>
            );
        } else {
            return <div className="empty-cart">Cart is empty</div>;
        }
    };

    const bookInCart = (book) => {
        return (
            <div className="book-element" key={book.id}>
                <div className="books-cart-left">
                    <button
                        className="remove-from-cart-btn"
                        onClick={async () => await removeBookFromCart(book.id)}
                    >
                        <DeleteOutlined />
                    </button>
                    <div
                        className="book-link"
                        onClick={() => Navigate(`/books/${book.id}`)}
                    >
                        <img
                            className="image-container"
                            alt="books"
                            src={`http://localhost:8080/${book.image}`}
                        />
                        <div className="books-title-author">
                            <div>
                                <h2>{book.title}</h2>
                                <h3>{book.author}</h3>
                            </div>
                            <p>39 In stock remaining</p>
                        </div>
                    </div>
                </div>
                <div className="books-quantity">
                    <Counter
                        onDecrementCounter={onDecrementCounter}
                        onIncrementCounter={onIncrementCounter}
                        counter={cartCounters.find(
                            (counter) => counter.id === book.id
                        )}
                    />
                </div>
                <div className="price-right price">
                    {book.price *
                        cartCounters.find((counter) => counter.id === book.id)
                            ?.value}{" "}
                    DA
                </div>
            </div>
        );
    };

    const onIncrementCounter = (id) => {
        let counters = cartCounters.map((counter) => {
            if (counter.id === id) {
                counter.value++;
            }
            return counter;
        });
        setcartCounters(counters);
    };

    const onDecrementCounter = (id) => {
        let counters = cartCounters.map((counter) => {
            if (counter.id === id) {
                counter.value--;
            }
            return counter;
        });
        setcartCounters(counters);
    };

    const getTotalPrice = () => {
        let total = 0;
        booksState.forEach((book) => {
            total +=
                book.price *
                cartCounters.find((counter) => counter.id === book.id)?.value;
        });
        return total;
    };

    const removeBookFromCart = async (id) => {
        // await axios
        //     .delete(`http://localhost:8000/cart/remove-from-cart/${id}`, {
        //         withCredentials: true,
        //     })
        //     .then((response) => {
        //         if (response.data.success) {
        //             setbooksState(() =>
        //                 booksState.filter((book) => book.id !== id)
        //             );
        //         }
        //     })
        //     .catch((err) => {
        //         throw Error(err.message);
        //     });
        await removeFromCart(id).then((bookIsInCart) => {
            console.log(bookIsInCart);
            if (!bookIsInCart) {
                setbooksState(() =>
                    booksState.filter((book) => book.id !== id)
                );
            }
        });
    };

    return (
        <div
            className="cart-container middle"
            setbadgeState={booksState?.length}
        >
            <div className="cart-top">
                <div className="cart-titles">
                    <li>books</li>
                    <li>Quantity</li>
                    <li>Price</li>
                </div>
                <BooksList />
            </div>
            <div
                className="cart-bottom"
                style={{ display: booksState.length ? null : "none" }}
            >
                <div className="total-price price">{getTotalPrice()} DA</div>
                <button className="btn btn-buy-books">
                    <div className="button-text">Buy now</div>
                    <PaymentOutlined className="payement-icon" />
                </button>
            </div>
        </div>
    );
}

export default Cart;
