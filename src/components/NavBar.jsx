import { Badge } from "@material-ui/core";
import {
    CloseOutlined,
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
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { SearchContext } from "../context/SearchProvider";

const NavBar = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);
    const { user, setUser } = useContext(AuthContext);
    const { state } = useContext(CartContext);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const navigateToHome = () => {
        setSearchValue(null);
        Navigate("/");
    };

    const navigateToProfile = () => {
        Navigate("/profile");
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
        }
    };

    const Menu = () => {
        const wrapperRef = useRef(null);
        function useOutsideAlerter(ref) {
            useEffect(() => {
                function handleClickOutside(event) {
                    if (ref.current && !ref.current.contains(event.target)) {
                        setMenuOpen(false);
                    }
                }
                if (menuOpen) {
                    document.addEventListener("mousedown", handleClickOutside);
                    return () => {
                        document.removeEventListener(
                            "mousedown",
                            handleClickOutside
                        );
                    };
                }
            }, [ref]);
        }
        useOutsideAlerter(wrapperRef);
        return (
            <div className="dropdown-menu-container" ref={wrapperRef}>
                <div onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? (
                        <CloseOutlined className="menu-item menu-item-toggleMenu" />
                    ) : (
                        <MenuOutlined className="menu-item menu-item-toggleMenu" />
                    )}
                </div>
                <div
                    className={`dropdown-menu ${
                        menuOpen ? "active" : "inactive"
                    }`}
                >
                    <ul>
                        <li onClick={navigateToProfile}>Profile</li>
                        {user?.role === "client" ? (
                            <li onClick={navigateToOrders}>My orders</li>
                        ) : null}
                        <li onClick={logout}>Logout</li>
                    </ul>
                </div>
            </div>
        );
    };

    const submitSearch = async (e) => {
        e.preventDefault();
        Navigate("/");
    };

    let value = "";
    return (
        <nav className="navbar-container">
            <div className="navbar-wrapper-left wrapper-element">
                <h1 className="logo">
                    <Link to="/" onClick={() => setSearchValue(null)}>
                        Kitabi
                    </Link>
                </h1>
            </div>
            <div className="navbar-wrapper-center wrapper-element">
                <form className="search-form" onSubmit={submitSearch}>
                    <input
                        type="search"
                        placeholder="Search a book, author, category"
                        className="search-input"
                        // defaultValue={searchValue}
                        onChange={(event) => {
                            value = event.target.value;
                        }}
                    />
                    <button
                        className="search-button"
                        type="submit"
                        onClick={() => setSearchValue(value)}
                    >
                        <div className="icon-search">
                            <SearchOutlined />
                        </div>
                    </button>
                </form>
            </div>
            <div className="navbar-wrapper-right wrapper-element">
                <ul>
                    <li onClick={navigateToHome}>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                </ul>
                {getAuthButtons()}
                {user?.role === "client" || !user ? (
                    <div className="menu-item-cart" onClick={navigateToCart}>
                        <Badge
                            className="menu-item"
                            badgeContent={state?.length}
                            color="secondary"
                        >
                            <ShoppingCartOutlined />
                        </Badge>
                    </div>
                ) : null}
                {user ? <Menu /> : null}
            </div>
        </nav>
    );
};

export default NavBar;
