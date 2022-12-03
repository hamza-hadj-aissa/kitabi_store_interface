import React from "react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar/NavBar";
import Products from "../components/Products";

// Home page - where all books are displayed
const Home = ({ badgeState, setsearchValue, searchValue }) => {
    let loaderData = useLoaderData();
    return (
        <div className="router-provider-container">
            <NavBar
                setsearchValue={setsearchValue}
                searchValue={searchValue}
                badgeState={badgeState}
            />
            <Products
                searchValue={searchValue}
                books={loaderData.book}
                className="middle"
            />
            <Footer />
        </div>
    );
};
export default Home;
