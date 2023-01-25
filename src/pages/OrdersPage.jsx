import { useState } from "react";
import { useLoaderData } from "react-router";
import PopUpError from "../components/PopUpError";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/scss/orders.css";

const Orders = () => {
    const [orders, setOrders] = useState(useLoaderData() ?? []);
    const axiosPrivateClient = useAxiosPrivate();
    const [popupError, setPopupError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const openPopup = (message) => {
        setErrorMessage(message);
        setPopupError(true);
    };

    const cancelOrder = async (id) => {
        await axiosPrivateClient
            .put(`/orders/client/update/${id}`, { status: 3 })
            .then((response) => {
                if (response.data.success) {
                    setOrders(
                        orders?.map((order) => {
                            if (order?.id === id) {
                                return { ...order, status: 3 };
                            }
                            return order;
                        })
                    );
                } else {
                    openPopup(response.data.message);
                }
            })
            .catch((err) => {
                openPopup(err.response.data.message);
            });
    };

    const getStatus = (status) => {
        switch (status) {
            case 0:
                return "On route";
            case 1:
                return "In delivery";
            case 2:
                return "Delivered";
            case 3:
                return "Cancelled";
            default:
                return "";
        }
    };

    const oneOrderElement = (order) => {
        return (
            <tr>
                <td>{order.date}</td>
                <td>
                    <ul>
                        {order.books.map((bookLine) => {
                            return (
                                <li key={bookLine.book.id}>
                                    {bookLine.book.title}
                                </li>
                            );
                        })}
                    </ul>
                </td>
                <td>
                    <ul className="quantity">
                        {order.books.map((book) => {
                            return <li key={book.id}>{book.quantity}</li>;
                        })}
                    </ul>
                </td>
                <td>{getStatus(order.status)}</td>
                <td>{order.totalAmount} DA</td>
                <td className="small-flex">
                    <button
                        disabled={order?.status === 3}
                        onClick={async () => await cancelOrder(order?.id)}
                    >
                        Cancel
                    </button>
                </td>
            </tr>
        );
    };

    const getAllOrders = () => {
        return orders.map((order) => {
            return oneOrderElement(order);
        });
    };

    return (
        <>
            <PopUpError
                popupError={popupError}
                setPopupError={setPopupError}
                message={errorMessage}
            />
            <div className="orders-container middle">
                <h1>My Orders</h1>
                <table className="table">
                    <thead className="cart-titles">
                        <tr>
                            <td>Date</td>
                            <td>Books</td>
                            <td>Quantity</td>
                            <td>Delivery status</td>
                            <td>Total price</td>
                            <td className="small-flex"></td>
                        </tr>
                    </thead>
                    <tbody>{getAllOrders()}</tbody>
                </table>
            </div>
        </>
    );
};

export default Orders;
