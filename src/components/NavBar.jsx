import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
    MdOutlineAdminPanelSettings,
    MdOutlinePersonOutline,
    MdOutlineShoppingCart,
    MdSearch,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import useRefreshToken from "../hooks/useRefreshToken";
import useSearch from "../hooks/useSearch";
import "../styles/scss/navBar.css";
import Menu from "./Menu";

const NavBar = () => {
    const refresh = useRefreshToken("client");
    const { setSearchValue } = useSearch();
    const [search, setSearch] = useState();
    const searchRef = useRef();
    const { auth, setAuth } = useAuth();
    const { cart } = useCart();
    const Navigate = useNavigate();

    const navigateToCart = () => {
        Navigate("/cart");
    };

    const navigateToRegister = () => {
        Navigate("/auth/register");
    };

    const navigateToLogin = () => {
        Navigate("/auth/login");
    };

    const navigateToHome = () => {
        searchRef.current.value = "";
        setSearchValue(null);
        setSearch(null);
        Navigate("/", { replace: true });
    };

    const submitSearch = (e) => {
        e.preventDefault();
        setSearchValue((prev) => ({
            ...prev,
            search,
        }));
        Navigate("/", { replace: true });
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

    return (
        <nav className="navbar-container">
            <div className="navbar-wrapper-left wrapper-element">
                <h1 className="logo" onClick={navigateToHome}>
                    Kitabi
                </h1>
            </div>
            <div className="navbar-wrapper-center wrapper-element">
                <form className="search-form" onSubmit={submitSearch}>
                    <input
                        type="search"
                        placeholder="Search a book, author, category"
                        className="search-input"
                        ref={searchRef}
                        onChange={(e) => setSearch(searchRef.current.value)}
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
                    {auth ? <Menu auth={auth} setAuth={setAuth} /> : null}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
