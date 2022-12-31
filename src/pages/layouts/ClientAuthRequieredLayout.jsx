import React from "react";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import useAuth from "../../hooks/useAuth";
import Login from "../LoginPage";
import Unauthorized from "../Unauthorized";

// Layout page - where all books are displayed
const ClientAuthLayout = ({ protectedRoute }) => {
    const { auth } = useAuth();
    return (
        <div className="router-provider-container">
            <NavBar />
            {protectedRoute ? (
                auth ? (
                    auth?.role === "client" ? (
                        <Outlet className="middle" />
                    ) : (
                        <Unauthorized />
                    )
                ) : (
                    <Login />
                )
            ) : (
                <Outlet className="middle" />
            )}
            <Footer />
        </div>
    );
};
export default ClientAuthLayout;
