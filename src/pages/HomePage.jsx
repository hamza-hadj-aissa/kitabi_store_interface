import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import axios from "../api/axios";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Products from "../components/Products";

// Home page - where all books are displayed
const Home = ({ setsearchValue, searchValue }) => {
    return (
        <div className="router-provider-container">
            <NavBar setsearchValue={setsearchValue} searchValue={searchValue} />
            <Products searchValue={searchValue} className="middle" />
            <Footer />
        </div>
    );
};
export default Home;
