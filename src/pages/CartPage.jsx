import { DeleteOutlined, PaymentOutlined } from "@material-ui/icons";
import { useContext } from "react";
import { useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router";
import axios from "../api/axios";
import Counter from "../components/Counter";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";
import "../css/scss/cart.css";

function Cart() {
    const Navigate = useNavigate();
    let books = useLoaderData();
    return (
        <div className="router-provider-container">
            <NavBar />
            <BooksListCart books={books} />
            <Footer />
        </div>
    );
}

function BooksListCart({ books }) {
    const { user } = useContext(AuthContext);
    const Navigate = useNavigate();
    const { removeFromCart, state } = useContext(CartContext);
    const [booksState, setbooksState] = useState(books);
    const [cartCounters, setcartCounters] = useState(
        books.map((book) => {
            return {
                id: book?.id,
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
            <tr key={book.id}>
                <td className="books-cart-left">
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
                </td>
                <td className="books-quantity">
                    <Counter
                        onDecrementCounter={onDecrementCounter}
                        onIncrementCounter={onIncrementCounter}
                        counter={cartCounters.find(
                            (counter) => counter.id === book.id
                        )}
                    />
                </td>
                <td className="price">{book.price}</td>
                <td className="price">
                    {book.price *
                        cartCounters.find((counter) => counter.id === book.id)
                            ?.value}{" "}
                    DA
                </td>
            </tr>
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
        await removeFromCart(id).then(() => {
            let newBooksState = [...booksState];
            setbooksState(newBooksState.filter((book) => book.id !== id));
        });
    };

    const buyBooks = async () => {
        if (!user) {
            Navigate("/auth/login", {
                replace: true,
            });
        } else {
            let booksToBuy = [];
            booksState.map((book) => {
                cartCounters.map((counter) => {
                    if (counter.id === book.id && counter.value > 0) {
                        booksToBuy.push({
                            id: book.id,
                            quantity: counter.value,
                        });
                    }
                });
            });
            booksToBuy.length
                ? await axios
                      .post("/orders/buy", {
                          books: booksToBuy,
                      })
                      .then((response) => {
                          if (
                              response.status === 200 &&
                              response.data.success
                          ) {
                              Navigate("/orders");
                          } else {
                              alert(
                                  response.data.message ?? response.statusText
                              );
                          }
                      })
                      .catch((err) => {
                          throw err;
                      })
                : alert("Please indicate the quantity you want to order");
        }
    };

    return (
        <div className="cart-container middle">
            <h1>My Cart</h1>
            <table>
                <thead>
                    <tr>
                        <td>books</td>
                        <td>Quantity</td>
                        <td className="price">Unit price</td>
                        <td className="price">Total price</td>
                    </tr>
                </thead>
            </table>
            <tbody>
                <BooksList />
            </tbody>
            <div
                className="cart-bottom"
                style={{ display: booksState.length ? null : "none" }}
            >
                <div className="total-price">{getTotalPrice()} DA</div>
                <button
                    className="btn btn-buy-books"
                    onClick={async () => await buyBooks()}
                >
                    <div className="button-text">Buy now</div>
                    <PaymentOutlined className="payement-icon" />
                </button>
            </div>
        </div>
    );
}

export default Cart;
