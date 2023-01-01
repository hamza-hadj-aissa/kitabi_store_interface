import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import axios from "./api/axios";
import Products from "./pages/Products";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLoginPage";
import AdminOrders from "./pages/admin/AdminOrdersPage";
import AdminProfile from "./pages/admin/AdminProfilePage";
import BookEdit from "./pages/admin/BookEdit";
import Books from "./pages/admin/BooksPage";
import Customers from "./pages/admin/CustomersPage";
import Dashboard from "./pages/admin/Dashboard";
import PersistLogin from "./pages/admin/PersistLogin";
import Cart from "./pages/CartPage";
import ChangeCLientPassword from "./pages/ChangeClientPassword";
import EmailVerification from "./pages/EmailVerificationPage";
import ErrorPage from "./pages/ErrorPage";
import ClientAuthLayout from "./pages/layouts/ClientAuthRequieredLayout";
import Layout from "./pages/layouts/Layout";
import Login from "./pages/LoginPage";
import Orders from "./pages/OrdersPage";
import ProductDetails from "./pages/ProductDetailsPage";
import Profile from "./pages/ProfilePage";
import Register from "./pages/RegisterPage";
import ResendVerificationEmail from "./pages/ResendVerificationEmail";
import "./styles/scss/app.css";

// TODO: state management cleanup
const App = () => {
    const axiosPrivateClient = useAxiosPrivate("client");
    const axiosPrivateAdmin = useAxiosPrivate("admin");

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ClientAuthLayout protectedRoute={false} />,
            children: [
                {
                    element: <Products />,
                    path: "",
                    index: true,
                    loader: async () => {
                        return await axios
                            .get("/books")
                            .then((response) => {
                                return response.data;
                            })
                            .catch((err) => {
                                throw Response(
                                    err.response.data.message
                                        ? err.response.data.message
                                        : err.response.statusText,
                                    err.response.status
                                );
                            });
                    },
                },
                {
                    path: "/:id",
                    element: <ProductDetails />,
                    loader: async ({ params }) => {
                        return await axios
                            .get(`/books/${params.id}`)
                            .then(async (bookRresponse) => {
                                let bookInCart = false;
                                return await axios
                                    .get("/cart")
                                    .then(async (cartResponse) => {
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
                                            category:
                                                bookRresponse.data.category,
                                        };
                                    });
                            })
                            .catch((err) => {
                                throw new Response(
                                    err.response.data.message
                                        ? err.response.data.message
                                        : err.response.statusText,
                                    err.response.status
                                );
                            });
                    },
                },
                {
                    path: "cart",
                    element: <Cart />,
                    loader: async () => {
                        let cart = await axios
                            .get("/cart")
                            .then((response) => {
                                return response.data.cart;
                            })
                            .catch((err) => {
                                throw new Response(
                                    err.response.data.message
                                        ? err.response.data.message
                                        : err.response.statusText,
                                    err.response.status
                                );
                            });
                        let booksList = [];
                        const promises = await cart.map(async (book) => {
                            const numBook = new Promise((resolve, reject) => {
                                resolve(
                                    axios
                                        .get(`/books/${book.id}`)
                                        .then((response) => {
                                            if (response.data.success) {
                                                booksList.push(
                                                    response.data.book
                                                );
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
                },
                {
                    path: "/auth/email-verification/:signature",
                    element: <EmailVerification />,
                    loader: async ({ params }) => {
                        return await axios
                            .get(
                                `/auth/confirm-email?signature=${params.signature}`
                            )
                            .then((response) => response.data)
                            .catch((err) => {
                                return err.response.data;
                            });
                    },
                },
                {
                    path: "/auth/send-verification-email",
                    element: <ResendVerificationEmail />,
                },
            ],
        },
        {
            path: "",
            element: (
                <PersistLogin
                    role="client"
                    children={<ClientAuthLayout protectedRoute={true} />}
                />
            ),
            children: [
                {
                    element: <Orders />,
                    path: "orders",
                    loader: async () => {
                        return await axiosPrivateClient
                            .get("/orders")
                            .then((response) => {
                                console.log(response.data);
                                return response.data?.orders;
                            })
                            .catch((err) => {
                                console.log(err.response.data);
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/auth/login");
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
                {
                    path: "profile",
                    element: <Profile />,
                    loader: async () => {
                        return await axiosPrivateClient
                            .get("/users")
                            .then((response) => {
                                return response.data?.user;
                            })
                            .catch((err) => {
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/auth/login");
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
                {
                    path: "/auth/change-password",
                    element: <ChangeCLientPassword />,
                    errorElement: <ErrorPage />,
                },
            ],
        },
        {
            path: "auth",
            element: <Layout />,
            children: [
                {
                    path: "login",
                    element: <Login />,
                    index: true,
                },
                {
                    path: "register",
                    element: <Register />,
                },
            ],
            errorElement: <ErrorPage />,
        },
        {
            path: "admin",
            element: <PersistLogin role="admin" children={<AdminLayout />} />,
            children: [
                {
                    path: "auth/login",
                    element: <AdminLogin />,
                },
                {
                    path: "profile",
                    element: <AdminProfile />,
                    loader: async () => {
                        return await axiosPrivateAdmin
                            .get("/users/admin/profile")
                            .then((response) => {
                                return response.data?.admin;
                            })
                            .catch((err) => {
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/admin/auth/login");
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
                {
                    index: true,
                    path: "dashboard",
                    element: <Dashboard />,
                    loader: async () => {
                        return await axiosPrivateAdmin
                            .get("/store/counts")
                            .then((response) => {
                                return response.data?.counts;
                            })
                            .catch((err) => {
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/admin/auth/login", {
                                        status: err.response.status,
                                        statusText: err.response.statusText,
                                    });
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
                {
                    path: "dashboard/customers",
                    element: <Customers />,
                    loader: async () => {
                        return await axiosPrivateAdmin
                            .get("/users/admin")
                            .then((response) => {
                                if (response.data.success) {
                                    return response.data.clients;
                                }
                                return null;
                            })
                            .catch((err) => {
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/admin/auth/login", {
                                        status: err.response.status,
                                        statusText: err.response.statusText,
                                    });
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
                {
                    path: "dashboard/books",
                    element: <Books />,
                    loader: async () => {
                        return await axiosPrivateAdmin
                            .get("/books/admin")
                            .then((response) => {
                                if (response.data.success) {
                                    return response.data.books;
                                }
                                return null;
                            })
                            .catch((err) => {
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/admin/auth/login", {
                                        status: err.response.status,
                                        statusText: err.response.statusText,
                                    });
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
                {
                    element: <AdminOrders />,
                    path: "dashboard/orders",
                    loader: async () => {
                        return await axiosPrivateAdmin
                            .get("/orders/admin")
                            .then((response) => {
                                if (response.data.success) {
                                    return response.data?.orders;
                                }
                                return null;
                            })
                            .catch((err) => {
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/admin/auth/login", {
                                        status: err.response.status,
                                        statusText: err.response.statusText,
                                    });
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
                {
                    path: "dashboard/books/add",
                    element: <BookEdit />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: "dashboard/books/edit/:id",
                    element: <BookEdit />,
                    loader: async ({ params }) => {
                        return await axiosPrivateAdmin
                            .get(`/books/admin/${params.id}`)
                            .then((response) => {
                                if (response.data.success) {
                                    return {
                                        book: response.data?.book,
                                        category: response.data?.category,
                                    };
                                }
                                return null;
                            })
                            .catch((err) => {
                                if (
                                    err.response.status === 403 ||
                                    err.response.status === 401
                                ) {
                                    return redirect("/admin/auth/login", {
                                        status: err.response.status,
                                        statusText: err.response.statusText,
                                    });
                                } else {
                                    throw new Response(
                                        err.response.data.message
                                            ? err.response.data.message
                                            : err.response.statusText,
                                        err.response.status
                                    );
                                }
                            });
                    },
                    errorElement: <ErrorPage />,
                },
            ],
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
