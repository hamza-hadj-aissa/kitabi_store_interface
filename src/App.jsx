import Home from "./pages/HomePage";
import "./css/scss/app.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetails from "./pages/ProductDetailsPage";
import ErrorPage from "./pages/ErrorPage";
import axios from "./api/axios";
import Cart from "./pages/CartPage";
import { useState } from "react";
import { Register } from "./pages/RegisterPage";
import { Login } from "./pages/LoginPage";
import AuthPage from "./pages/AuthPage";
import Orders from "./pages/OrdersPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Profile from "./pages/ProfilePage";
import AdminLogin from "./pages/admin/AdminLoginPage";
import Dashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/CustomersPage";
import Books from "./pages/admin/BooksPage";
import BookEdit from "./pages/admin/BookEdit";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminOrders from "./pages/admin/AdminOrdersPage";
// TODO: state management cleanup
const App = () => {
    const [searchValue, setsearchValue] = useState("");
    const router = createBrowserRouter([
        {
            element: (
                <Home
                    setsearchValue={setsearchValue}
                    searchValue={searchValue}
                />
            ),
            path: "/",
            index: true,
            loader: async () => {
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
            path: "/books/:id",
            element: <ProductDetails />,
            loader: async ({ params }) => {
                return await axios
                    .get(`http://localhost:8000/books/${params.id}`)
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
                                        let { cart } = cartResponse.data;
                                        cart.map((book) => {
                                            if (
                                                book.id === parseInt(params.id)
                                            ) {
                                                bookInCart = true;
                                            }
                                        });
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
            element: <Cart />,
            loader: async () => {
                let cart = await axios
                    .get("http://localhost:8000/cart", {
                        withCredentials: true,
                    })
                    .then((response) => {
                        if (response.status === 200 && response.data.success) {
                            return response.data.cart;
                        } else {
                            throw Response(
                                response.data.message ?? response.statusText,
                                response.status
                            );
                        }
                    });
                let booksList = [];
                const promises = await cart.map(async (book) => {
                    const numBook = new Promise((resolve, reject) => {
                        resolve(
                            axios
                                .get(`http://localhost:8000/books/${book.id}`, {
                                    withCredentials: true,
                                })
                                .then((response) => {
                                    if (
                                        response.data.success &&
                                        response.status === 200
                                    ) {
                                        booksList.push(response.data.book);
                                    } else {
                                        throw Response(
                                            response.data.message
                                                ? response.data.message
                                                : response.statusText,
                                            response.status
                                        );
                                    }
                                })
                        );
                    });
                    return numBook;
                });
                await Promise.all(promises);
                return booksList;
            },
            errorElement: <ErrorPage />,
        },
        {
            element: (
                <>
                    <NavBar />
                    <Orders />
                    <Footer />
                </>
            ),
            path: "/orders",
            loader: async () => {
                return await axios
                    .get("/orders")
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            return response.data?.orders;
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            },
            errorElement: <ErrorPage />,
        },
        {
            path: "/auth/register",
            element: <AuthPage child={<Register />} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/auth/login",
            element: <AuthPage child={<Login />} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/profile",
            element: (
                <>
                    <NavBar />
                    <Profile />
                    <Footer />
                </>
            ),
            loader: async () => {
                return await axios.get("/users").then((response) => {
                    if (response.data.success && response.status === 200) {
                        return response.data.user;
                    } else {
                        throw new Response(
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
            path: "/admin/auth/login",
            element: <AdminLogin />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/admin/dashboard",
            element: <AdminHomePage child={<Dashboard />} />,
            loader: async () => {
                return await axios
                    .get("/store/counts")
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            return response.data.counts;
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            },
            errorElement: <ErrorPage />,
        },
        {
            path: "/admin/dashboard/customers",
            element: <AdminHomePage child={<Customers />} />,
            loader: async () => {
                return await axios
                    .get("/users/admin")
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            return response.data.clients;
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            },
            errorElement: <ErrorPage />,
        },
        {
            path: "/admin/books",
            element: <AdminHomePage child={<Books />} />,
            loader: async () => {
                return await axios
                    .get("/books")
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            return response.data.books;
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            },
            errorElement: <ErrorPage />,
        },
        {
            path: "/admin/books/add",
            element: <AdminHomePage child={<BookEdit />} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/admin/books/edit/:id",
            element: <AdminHomePage child={<BookEdit />} />,
            loader: async ({ params }) => {
                return await axios
                    .get(`http://localhost:8000/books/${params.id}`)
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            return response.data.book;
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            },
            errorElement: <ErrorPage />,
        },
        {
            element: <AdminHomePage child={<AdminOrders />} />,
            path: "/admin/orders",
            loader: async () => {
                return await axios
                    .get("/orders/admin")
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            return response.data?.orders;
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            },
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
    // return <Orders />;
};

export default App;
