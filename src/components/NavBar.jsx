import { Badge } from "@material-ui/core";
import {
    LocalShippingOutlined,
    MenuOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import "../css/scss/navBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import axios from "../api/axios";
import Cookies from "js-cookie";

const NavBar = ({ setsearchValue, searchValue }) => {
    const { user, setUser } = useContext(AuthContext);

    const Navigate = useNavigate();
    const navigateToCart = () => {
        Navigate("/cart");
    };

    const navigateToOrders = () => {
        Navigate("/orders");
    };

    const navigateToRegister = () => {
        Navigate("/auth/register");
    };

    const navigateToLogin = () => {
        Navigate("/auth/login");
    };

    const logout = async () => {
        await axios
            .get("/auth/logout")
            .then((response) => {
                if (response.status === 200 && response.data.success) {
                    setUser({});
                    Navigate("/");
                } else {
                    throw Response(
                        response.data.message
                            ? response.data.message
                            : response.statusText,
                        response.status
                    );
                }
            })
            .catch((err) => {
                throw err;
            });
        setUser(Cookies.get("token") ? true : false);
    };

    // const categories = [
    //     { name: "Category 1" },
    //     { name: "Category 2" },
    //     { name: "Category 3" },
    //     { name: "Category 4" },
    // ];

    const getAuthButtons = () => {
        if (!user) {
            return (
                <>
                    <button
                        className="menu-item menu-item-register"
                        onClick={navigateToRegister}
                    >
                        Register
                    </button>
                    <button
                        className="menu-item menu-item-login"
                        onClick={navigateToLogin}
                    >
                        Login
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <button
                        className="menu-item menu-item-register"
                        onClick={async () => await logout()}
                    >
                        Logout
                    </button>
                    <div className="menu-item" onClick={navigateToOrders}>
                        <LocalShippingOutlined />
                    </div>
                </>
            );
        }
    };

    const { state } = useContext(CartContext);
    let value = "";
    return (
        <nav className="navbar-container">
            <div className="navbar-wrapper-left wrapper-element">
                <h1 className="logo">
                    <Link to="/" onClick={() => setsearchValue("")}>
                        Kitabi
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
                {/* <Categories
                    className="left-item menu-item categories-container"
                    categories={categories}
                /> */}
            </div>
            <div className="navbar-wrapper-right wrapper-element">
                {getAuthButtons()}
                <div className="menu-item-cart" onClick={navigateToCart}>
                    <Badge
                        className="menu-item"
                        badgeContent={state?.length}
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
