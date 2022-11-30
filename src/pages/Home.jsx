import React from "react";
// import Product from "../components/Product";
import Products from "../components/Products";
import NavBar from "../components/NavBar/NavBar";
import ProductDetails from "./ProductDetails";
import Footer from "../components/Footer";
const Home = () => {
    return (
        <div>
            {/* <Products /> */}
            <ProductDetails />
            <Footer />
        </div>
    );
};
export default Home;
