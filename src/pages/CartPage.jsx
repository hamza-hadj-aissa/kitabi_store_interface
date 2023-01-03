import { useState } from "react";
import { MdOutlineDelete, MdOutlinePayment } from "react-icons/md";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import Counter from "../components/Counter";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useCart from "../hooks/useCart";
import "../styles/scss/cart.css";

function Cart() {
    const location = useLocation();
    const axiosPrivateClient = useAxiosPrivate("client");
    let books = useLoaderData();
    const { auth } = useAuth();
    const Navigate = useNavigate();
    const { removeFromCart } = useCart();
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
                        <MdOutlineDelete className="icon" size={25} />
                    </button>
                    <div
                        className="book-link"
                        onClick={() => Navigate(`/${book.id}`)}
                    >
                        <img
                            alt="books"
                            src={`http://localhost:8080/images/${book.image}`}
                        />
                        <div className="books-title-author">
                            <div>
                                <h2>{book.title}</h2>
                                <h3>{book.author}</h3>
                            </div>
                            <p>{book.quantity} remainings in stock</p>
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
            ? await axiosPrivateClient
                  .post("/orders/buy", {
                      books: booksToBuy,
                  })
                  .then((response) => {
                      if (response.data.success) {
                          Navigate("/orders");
                      } else {
                          alert(response.data.message ?? response.statusText);
                      }
                  })
                  .catch((err) => {
                      if (err.response.status === 403) {
                          Navigate("/auth/login", {
                              state: { from: location },
                          });
                      }
                  })
            : alert("Please indicate the quantity you want to order");
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
                    className={`btn btn-buy-book${
                        "-" + !(auth?.role === "client" || !auth)
                            ? "disabled"
                            : null
                    }`}
                    onClick={buyBooks}
                    disabled={!(auth?.role === "client" || !auth)}
                >
                    <div className="button-text">Buy now</div>
                    <MdOutlinePayment size={25} />
                </button>
            </div>
        </div>
    );
}

export default Cart;
