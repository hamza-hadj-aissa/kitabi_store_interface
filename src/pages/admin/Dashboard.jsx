import {
    BookOutlined,
    LocalShippingOutlined,
    PersonOutline,
} from "@material-ui/icons";
import { useContext } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import "../../css/scss/dashboard.css";
import AdminNavBar from "./components/AdminNavBar";
const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { clients, books, orders } = useLoaderData();
    const Navigate = useNavigate();

    const navigateToCustomers = () => {
        Navigate("/admin/dashboard/customers");
    };

    const navigateToBooks = () => {
        Navigate("/admin/books");
    };

    const navigateToOrders = () => {
        Navigate("/admin/orders");
    };
    if (!user) {
        Navigate("/admin/auth/login");
    } else {
        return (
            <div className="dashboard-container">
                <div className="cards-container">
                    <div className="card" onClick={navigateToCustomers}>
                        <div>
                            <h2>{clients}</h2>
                            <h4>Customers</h4>
                        </div>
                        <div className="icon-container">
                            <PersonOutline />
                        </div>
                    </div>
                    <div className="card" onClick={navigateToBooks}>
                        <div>
                            <h2>{books}</h2>
                            <h4>Books</h4>
                        </div>
                        <div className="icon-container">
                            <BookOutlined />
                        </div>
                    </div>
                    <div className="card" onClick={navigateToOrders}>
                        <div>
                            <h2>{orders}</h2>
                            <h4>Orders</h4>
                        </div>
                        <div className="icon-container">
                            <LocalShippingOutlined />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;
