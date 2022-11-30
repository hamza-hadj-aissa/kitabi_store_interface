import { Badge } from "@material-ui/core";
import { MenuOutlined, Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import "../../css/NavBar.css";
import Categories from "./Categories";
import axios from "axios";

const NavBar = () => {
    // const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:8000/books/categories")
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // setCategories(json.categories);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [categories]);

    const categories = [
        { name: "Category 1" },
        { name: "Category 2" },
        { name: "Category 3" },
        { name: "Category 4" },
    ];

    return (
        <div className="navbar-container">
            <div className="navbar-wrapper">
                <div className="navbar-wrapper-left wrapper-element">
                    {/* <div className="left-item search-container"> */}
                    {/* <input
                            className="search-container-input"
                            placeholder="Find a book"
                        /> */}
                    <form className="search-form">
                        <input
                            type="search"
                            placeholder="Search a book, author, category"
                            className="search-input"
                        />
                    </form>
                    <Categories
                        className="left-item menu-item categories"
                        categories={categories}
                    />
                </div>
                <div className="navbar-wrapper-center wrapper-element">
                    <h1 className="logo">Kitabi store</h1>
                </div>
                <div className="navbar-wrapper-right wrapper-element">
                    <button className="menu-item menu-item-register">
                        Register
                    </button>
                    <button className="menu-item menu-item-login">Login</button>
                    <Badge
                        className="menu-item menu-item-cart"
                        badgeContent="5"
                        color="secondary"
                    >
                        <ShoppingCartOutlined />
                    </Badge>
                    <MenuOutlined className="menu-item menu-item-toggleMenu" />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
