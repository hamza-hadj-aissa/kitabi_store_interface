import { useState } from "react";
import { useLoaderData } from "react-router";
import "../../styles/scss/orders.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PopUpError from "../../components/PopUpError";

const AdminOrders = () => {
    const orders = useLoaderData() ?? [];
    const [popupError, setPopupError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const openPopup = (message) => {
        setErrorMessage(message);
        setPopupError(true);
    };
    const getAllOrders = () => {
        return orders.map((order) => {
            return OneOrderElement(order);
        });
    };

    const OneOrderElement = (order) => {
        const [statusState, setStatusState] = useState(parseInt(order.status));
        const axiosPrivateAdmin = useAxiosPrivate("admin");
        const submitChange = async (e) => {
            await axiosPrivateAdmin
                .put(`/orders/update/${order.id}`, {
                    status: e.target.value,
                })
                .then((response) => {
                    if (response.data.success) {
                        return response.data?.orders;
                    } else {
                        openPopup(response.data.message);
                    }
                })
                .catch((err) => {
                    throw err;
                });
        };
        return (
            <tr key={order.id}>
                <td className="half-flex">{order.id}</td>
                <td>{order.date}</td>
                <td>{order.address}</td>
                <td>
                    <ul>
                        {order.books.map((book) => {
                            return <li key={book.id}>{book.title}</li>;
                        })}
                    </ul>
                </td>
                <td>{order.quantity}</td>
                <td>
                    <select
                        onChange={async (e) => {
                            setStatusState(e.target.value);
                            console.log(statusState === 3);
                            await submitChange(e);
                        }}
                        disabled={statusState === 3}
                        value={statusState}
                    >
                        <option value={0}>Paid</option>
                        <option value={1}>In route</option>
                        <option value={2}>Delivered</option>
                        <option value={3}>Cancelled</option>
                    </select>
                </td>
                <td className="half-flex">{order.totalAmount} DA</td>
            </tr>
        );
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
                            <td className="half-flex">ID</td>
                            <td>Date</td>
                            <td>Delivery address</td>
                            <td>Books</td>
                            <td>Quantity</td>
                            <td>Delivery status</td>
                            <td className="half-flex">Total price</td>
                        </tr>
                    </thead>
                    <tbody>{getAllOrders()}</tbody>
                </table>
            </div>
        </>
    );
};

export default AdminOrders;
