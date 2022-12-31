import React from "react";
import { Outlet } from "react-router";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";

// Layout page - where all books are displayed
const Layout = () => {
    return (
        <div className="router-provider-container">
            <NavBar />
            <Outlet className="middle" />
            <Footer />
        </div>
    );
};
export default Layout;
