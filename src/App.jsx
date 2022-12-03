import Home from "./pages/HomePage";
import "./css/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./pages/ProductDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import axios from "axios";
import Cart from "./pages/CartPage";
import { useState } from "react";
// TODO: state management cleanup
const App = () => {
    const [badgeState, setbadgeState] = useState(0);
    const [searchValue, setsearchValue] = useState("");

    const addToCart = async (id) => {
        return await axios
            .get(`http://localhost:8000/cart/add-to-cart/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200 && response.data.success) {
                    let bookIsInCart = false;
                    response.data.cart.forEach((book) => {
                        if (book.id === id) {
                            bookIsInCart = true;
                        }
                    });
                    setbadgeState(response.data.cart.length);
                    return bookIsInCart;
                } else {
                    throw Response(
                        response.data.message
                            ? response.data.message
                            : response.statusText,
                        response.status
                    );
                }
            });
    };

    const removeFromCart = async (id) => {
        return await axios
            .delete(`http://localhost:8000/cart/remove-from-cart/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200 && response.data.success) {
                    let bookIsInCart = false;
                    response.data.cart.forEach((book) => {
                        if (book.id === id) {
                            bookIsInCart = true;
                        }
                    });
                    setbadgeState(response.data.cart.length);
                    return bookIsInCart;
                } else {
                    throw Response(
                        response.data.message
                            ? response.data.message
                            : response.statusText,
                        response.status
                    );
                }
            });
    };

    const router = createBrowserRouter([
        {
            element: (
                <Home
                    badgeState={badgeState}
                    searchValue={searchValue}
                    setsearchValue={setsearchValue}
                />
            ),
            path: "/",
            index: true,
            loader: async ({ params }) => {
                return await axios
                    .get("http://localhost:8000/books")
                    .then((response) => {
                        if (response.status === 200 && response.data.success) {
                            return response.data;
                        } else {
                            throw Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    });
            },
            errorElement: <ErrorPage />,
        },
        {
            path: "/books/:bookId",
            element: (
                <ProductDetails
                    badgeState={badgeState}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ),
            loader: async ({ params }) => {
                return await axios
                    .get(`http://localhost:8000/books/${params.bookId}`)
                    .then(async (bookRresponse) => {
                        if (
                            bookRresponse.status === 200 &&
                            bookRresponse.data.success
                        ) {
                            let bookInCart = false;
                            return await axios
                                .get(`http://localhost:8000/cart`, {
                                    withCredentials: true,
                                })
                                .then((cartResponse) => {
                                    if (
                                        cartResponse.status === 200 &&
                                        cartResponse.data.success
                                    ) {
                                        cartResponse.data.cart.forEach(
                                            (book) => {
                                                if (
                                                    book.id ===
                                                    parseInt(params.bookId)
                                                ) {
                                                    bookInCart = true;
                                                }
                                            }
                                        );
                                        return {
                                            book: bookRresponse.data.book,
                                            bookInCart,
                                        };
                                    } else {
                                        throw Response(
                                            cartResponse.data.message
                                                ? cartResponse.data.message
                                                : cartResponse.statusText,
                                            cartResponse.status
                                        );
                                    }
                                });
                        } else {
                            throw Response(
                                bookRresponse.data.message
                                    ? bookRresponse.data.message
                                    : bookRresponse.statusText,
                                bookRresponse.status
                            );
                        }
                    });
            },
            errorElement: <ErrorPage />,
        },
        {
            path: "/cart",
            element: (
                <Cart
                    badgeState={badgeState}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                />
            ),
            loader: async () => {
                return await axios
                    .get(`http://localhost:8000/cart`, {
                        withCredentials: true,
                    })
                    .then((response) => {
                        if (!response.data.success) {
                            throw new Response(
                                response.data.message,
                                response.status
                            );
                        }
                        return response.data.cart;
                    })
                    .then(async (cart) => {
                        let booksList = [];
                        const promises = await cart.map(async (book) => {
                            const numBook = new Promise((resolve, reject) => {
                                resolve(
                                    axios
                                        .get(
                                            `http://localhost:8000/books/${book.id}`,
                                            {
                                                withCredentials: true,
                                            }
                                        )
                                        .then((response) => {
                                            if (response.data.success) {
                                                booksList.push(
                                                    response.data.book
                                                );
                                            } else {
                                                throw Error(
                                                    response.data.message
                                                );
                                            }
                                        })
                                );
                            });
                            return numBook;
                        });
                        await Promise.all(promises);
                        console.log(booksList);
                        return booksList;
                    });
            },
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
