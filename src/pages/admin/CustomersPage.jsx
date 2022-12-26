import { useLoaderData } from "react-router";
import "../../css/scss/customers.css";

const Customers = () => {
    const customers = useLoaderData();

    const CustomersList = () => {
        return customers.map((customer) => {
            return Customer(customer);
        });
    };

    const Customer = (customer) => {
        return (
            <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                    {customer.firstName} {customer.lastName}
                </td>
                <td>
                    <a href={`mailto:${customer.email}`}>{customer.email}</a>
                </td>
                <td>{customer.phone_number}</td>
            </tr>
        );
    };

    return (
        <div className="customers-container middle">
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td className="price">Phone number</td>
                    </tr>
                </thead>
            </table>
            <tbody>{CustomersList()}</tbody>
        </div>
    );
};

export default Customers;
