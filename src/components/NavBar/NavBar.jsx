import { Badge } from "@material-ui/core";
import {
    MenuOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import "../../css/NavBar.css";
import Categories from "./Categories";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = ({ setsearchValue, badgeState, searchValue }) => {
    const Navigate = useNavigate();
    const navigateToCart = () => {
        Navigate("/cart");
    };
    const categories = [
        { name: "Category 1" },
        { name: "Category 2" },
        { name: "Category 3" },
        { name: "Category 4" },
    ];

    const [badgeNumber, setbadgeNumber] = useState(badgeState);
    let value = "";
    return (
        <nav className="navbar-container">
            <div className="navbar-wrapper-left wrapper-element">
                <h1 className="logo">
                    <Link to="/" onClick={() => setsearchValue("")}>
                        Kitabi store
                    </Link>
                </h1>
            </div>
            <div className="navbar-wrapper-center wrapper-element">
                <form className="search-form">
                    <input
                        type="search"
                        placeholder="Search a book, author, category"
                        className="search-input"
                        defaultValue={searchValue}
                        onChange={(event) => {
                            value = event.target.value;
                        }}
                    />
                    <button
                        className="search-button"
                        type="button"
                        onClick={() => setsearchValue(value)}
                    >
                        <div className="icon-search">
                            <SearchOutlined />
                        </div>
                    </button>
                </form>
                <Categories
                    className="left-item menu-item categories-container"
                    categories={categories}
                />
            </div>
            <div className="navbar-wrapper-right wrapper-element">
                <button className="menu-item menu-item-register">
                    Register
                </button>
                <button className="menu-item menu-item-login">Login</button>
                <div className="menu-item-cart" onClick={navigateToCart}>
                    <Badge
                        className="menu-item"
                        badgeContent={badgeNumber}
                        color="secondary"
                    >
                        <ShoppingCartOutlined />
                    </Badge>
                </div>
                <MenuOutlined className="menu-item menu-item-toggleMenu" />
            </div>
        </nav>
    );
};

export default NavBar;
