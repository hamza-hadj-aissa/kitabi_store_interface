import { useState } from "react";
import { useEffect, useRef } from "react";
import {
    MdOutlineClose,
    MdOutlineLocalShipping,
    MdOutlineLogout,
    MdOutlineMenu,
    MdOutlinePersonOutline,
} from "react-icons/md";
import { useNavigate } from "react-router";
import axios from "../api/axios";

const Menu = ({ auth, setAuth }) => {
    const wrapperRef = useRef(null);
    const Navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    function useOutsideAlerter() {
        useEffect(() => {
            function handleClickOutside(event) {
                if (
                    wrapperRef.current &&
                    !wrapperRef.current.contains(event.target)
                ) {
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
        }, [menuOpen]);
    }
    useOutsideAlerter();
    const navigateToProfile = () => {
        if (auth?.role === "client") {
            Navigate("/profile");
        } else {
            Navigate("/admin/profile");
        }
    };

    const navigateToOrders = () => {
        Navigate("/orders");
    };

    const logout = async () => {
        await axios
            .delete("/auth/logout")
            .then((response) => {
                if (response.data.success) {
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
                className={`dropdown-menu ${menuOpen ? "active" : "inactive"}`}
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

export default Menu;
