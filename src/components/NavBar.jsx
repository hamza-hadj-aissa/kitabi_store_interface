import { useEffect, useRef, useState } from "react";
import {
    MdOutlineAdminPanelSettings,
    MdOutlineClose,
    MdOutlineLocalShipping,
    MdOutlineLogout,
    MdOutlineMenu,
    MdOutlinePersonOutline,
    MdOutlineShoppingCart,
    MdSearch,
} from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useRefreshToken from "../hooks/useRefreshToken";
import useSearch from "../hooks/useSearch";
import "../styles/scss/navBar.css";

const NavBar = () => {
    const refresh = useRefreshToken("client");
    const { setSearchValue } = useSearch();
    const [search, setSearch] = useState(null);
    const searchRef = useRef();
    const { auth, setAuth } = useAuth();
    const { cart } = useCart();
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
        setSearch(null);
        Navigate("/");
    };

    const navigateToProfile = () => {
        Navigate("/profile");
    };

    const logout = async () => {
        await axios
            .delete("/auth/logout")
            .then((response) => {
                if (response.data.success) {
                    // setHasLoggedOut(true);
                    // setIsLoading(false);
                    // Navigate("/", { replace: true });
                    setAuth(null);
                    window.location = "http://localhost:3000/";
                }
            })
            .catch((err) => {
                throw Response(
                    err.response.data.message
                        ? err.response.data.message
                        : err.response.statusText,
                    err.response.status
                );
            });
    };

    const getAuthButtons = () => {
        return auth ? null : (
            <div className="auth-buttons-container">
                <button
                    className="menu-item menu-item-auth"
                    onClick={navigateToRegister}
                >
                    Register
                </button>
                <button
                    className="menu-item menu-item-auth"
                    onClick={navigateToLogin}
                >
                    Login
                </button>
            </div>
        );
    };

    useEffect(() => {
        let isMounted = true;
        const verifyAccessToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            }
        };
        if (!auth) {
            isMounted && verifyAccessToken();
        }
        return () => (isMounted = false);
    }, []);

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
                        <MdOutlineClose
                            size={25}
                            className="menu-item menu-item-toggleMenu"
                        />
                    ) : (
                        <MdOutlineMenu
                            size={25}
                            className="menu-item menu-item-toggleMenu"
                        />
                    )}
                </div>
                <div
                    className={`dropdown-menu ${
                        menuOpen ? "active" : "inactive"
                    }`}
                >
                    <ul onClick={() => (menuOpen ? setMenuOpen(false) : null)}>
                        <li onClick={navigateToProfile}>
                            <MdOutlinePersonOutline size={25} /> Profile
                        </li>
                        {auth?.role === "client" ? (
                            <li onClick={navigateToOrders}>
                                <MdOutlineLocalShipping size={25} /> My orders
                            </li>
                        ) : null}
                        <li onClick={async () => await logout()}>
                            <MdOutlineLogout size={25} /> Logout
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    const submitSearch = (e) => {
        e.preventDefault();
        setSearchValue((prev) => ({
            ...prev,
            search,
        }));
        Navigate("/");
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-wrapper-left wrapper-element">
                <h1 className="logo">
                    <Link
                        to="/"
                        onClick={() =>
                            setSearchValue((prev) => ({
                                ...prev,
                                search: null,
                            }))
                        }
                    >
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
                        ref={searchRef}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button className="search-button" type="submit">
                        <div className="icon-search">
                            <MdSearch size={25} />
                        </div>
                    </button>
                </form>
            </div>
            <div className="navbar-wrapper-right wrapper-element">
                <ul>
                    <li onClick={navigateToHome}>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li className="drop-down">
                        <div className="you-are">
                            You are ? <IoIosArrowDown />
                        </div>
                        <div className="dropdown-list-container">
                            <ul>
                                <li
                                    onClick={() =>
                                        Navigate("/", { replace: true })
                                    }
                                >
                                    <MdOutlinePersonOutline size={25} />
                                    Cutomer
                                </li>
                                <li
                                    onClick={() =>
                                        Navigate("/admin/dashboard", {
                                            replace: true,
                                            preventScrollReset: false,
                                        })
                                    }
                                >
                                    <MdOutlineAdminPanelSettings size={25} />
                                    Personal
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                {getAuthButtons()}
                <div className="navbar-icons-container">
                    <div className="menu-item-cart shopping-cart-icon">
                        <MdOutlineShoppingCart
                            onClick={navigateToCart}
                            size={25}
                        />
                        {cart?.length > 0 ? (
                            <div className="cart-badge">{cart?.length}</div>
                        ) : null}
                    </div>
                    {auth ? auth?.role === "client" ? <Menu /> : null : null}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
