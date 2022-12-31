import { useEffect, useRef, useState } from "react";
import {
    MdOutlineAdminPanelSettings,
    MdOutlineClose,
    MdOutlineKeyboardArrowDown,
    MdOutlineLogout,
    MdOutlineMenu,
    MdOutlinePersonOutline,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import "../../../styles/scss/adminNavBar.css";

const AdminNavBar = () => {
    const Navigate = useNavigate();
    const { setAuth, auth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const navigateToProfile = () => {
        Navigate("/admin/profile");
    };

    const logout = async () => {
        await axios
            .delete("/auth/logout")
            .then((response) => {
                if (response.data.success) {
                    setAuth(null);
                    Navigate("/admin/auth/login");
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
                throw Response(
                    err.response.data.message
                        ? err.response.data.message
                        : err.response.statusText,
                    err.response.status
                );
            });
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
                    <ul onClick={() => setMenuOpen(false)}>
                        <li onClick={navigateToProfile}>
                            <MdOutlinePersonOutline size={25} /> Profile
                        </li>
                        <li onClick={async () => await logout()}>
                            <MdOutlineLogout size={25} /> Logout
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <nav className="admin-navbar-container">
            <h1 className="logo">
                <Link to="/admin/dashboard">Kitabi Dashboard</Link>
            </h1>
            <ul>
                <li className="drop-down">
                    <div className="you-are">
                        You are ? <MdOutlineKeyboardArrowDown size={25} />
                    </div>
                    <div className="dropdown-list-container">
                        <ul>
                            <li
                                onClick={() => Navigate("/", { replace: true })}
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
                <li>
                    {auth ? auth?.role === "admin" ? <Menu /> : null : null}
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavBar;
