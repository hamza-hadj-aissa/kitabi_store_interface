import { CloseOutlined, MenuOutlined } from "@material-ui/icons";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { AuthContext } from "../../../context/AuthProvider";
import "../../../css/scss/adminNavBar.css";
const AdminNavBar = () => {
    const Navigate = useNavigate();
    const { setUser, user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigateToProfile = () => {
        Navigate("profile");
    };

    const logout = async () => {
        await axios
            .get("/auth/logout")
            .then((response) => {
                if (response.status === 200 && response.data.success) {
                    setUser(null);
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
                throw err;
            });
        setUser(Cookies.get("token") ? true : false);
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
                        <li onClick={logout}>Logout</li>
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
            <Menu />
        </nav>
    );
};

export default AdminNavBar;
