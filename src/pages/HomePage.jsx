import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Products from "../components/Products";

// Home page - where all books are displayed
const Home = () => {
    return (
        <div className="router-provider-container">
            <NavBar />
            <Products className="middle" />
            <Footer />
        </div>
    );
};
export default Home;
