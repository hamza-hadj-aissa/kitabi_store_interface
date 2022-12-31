import { FaShippingFast } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbBooks } from "react-icons/tb";
import { useLoaderData, useNavigate } from "react-router";
import "../../styles/scss/dashboard.css";

const Dashboard = () => {
    const { clients, books, orders } = useLoaderData();
    const Navigate = useNavigate();

    const navigateToCustomers = () => {
        Navigate("/admin/dashboard/customers");
    };

    const navigateToBooks = () => {
        Navigate("/admin/dashboard/books");
    };

    const navigateToOrders = () => {
        Navigate("/admin/dashboard/orders");
    };
    return (
        <div className="dashboard-container middle">
            <div className="cards-container">
                <div className="card" onClick={navigateToCustomers} key={0}>
                    <div>
                        <h2>{clients}</h2>
                        <h4>Customers</h4>
                    </div>
                    <div className="icon-container">
                        <HiOutlineUserGroup />
                    </div>
                </div>
                <div className="card" onClick={navigateToBooks} key={1}>
                    <div>
                        <h2>{books}</h2>
                        <h4>Books</h4>
                    </div>
                    <div className="icon-container">
                        <TbBooks />
                    </div>
                </div>
                <div className="card" onClick={navigateToOrders} key={2}>
                    <div>
                        <h2>{orders}</h2>
                        <h4>Orders</h4>
                    </div>
                    <div className="icon-container">
                        <FaShippingFast />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
