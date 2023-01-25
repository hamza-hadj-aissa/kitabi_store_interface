import { useState } from "react";
import {
    MdOutlineAdminPanelSettings,
    MdOutlineKeyboardArrowDown,
    MdOutlinePersonOutline,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../../components/Menu";
import useAuth from "../../../hooks/useAuth";
import "../../../styles/scss/adminNavBar.css";

const AdminNavBar = () => {
    const Navigate = useNavigate();
    const { setAuth, auth } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

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
                    {auth ? (
                        <Menu
                            auth={auth}
                            setAuth={setAuth}
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                        />
                    ) : null}
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavBar;
