import { Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";
import Unauthorized from "../Unauthorized";
import AdminLogin from "./AdminLoginPage";
import AdminNavBar from "./components/AdminNavBar";

const AdminLayout = () => {
    const { auth } = useAuth();

    return (
        <>
            <AdminNavBar />
            {auth ? (
                auth?.role === "admin" ? (
                    <Outlet />
                ) : (
                    <Unauthorized />
                )
            ) : (
                <AdminLogin />
            )}
        </>
    );
};

export default AdminLayout;
