import { useLoaderData } from "react-router";
import "../styles/scss/orders.css";

const Orders = () => {
    const orders = useLoaderData() ?? [];

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
            </tr>
        );
    };

    const getAllOrders = () => {
        return orders.map((order) => {
            return oneOrderElement(order);
        });
    };

    return (
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
                    </tr>
                </thead>
                <tbody>{getAllOrders()}</tbody>
            </table>
        </div>
    );
};

export default Orders;
