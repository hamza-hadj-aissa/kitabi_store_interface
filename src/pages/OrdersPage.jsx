import { useLoaderData } from "react-router";
import "../css/scss/orders.css";

const Orders = () => {
    const orders = useLoaderData();

    const oneOrderElement = (order) => {
        console.table(orders);
        return (
            <tr>
                <td>{order.date}</td>
                <td>
                    <ul>
                        {order.books.map((book) => {
                            return <li key={book.id}>{book.title}</li>;
                        })}
                    </ul>
                </td>
                <td>{order.quantity}</td>
                <td>On route</td>
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
