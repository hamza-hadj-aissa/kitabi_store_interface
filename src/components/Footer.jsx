import {
    EmailOutlined,
    Facebook,
    Instagram,
    LocationOnOutlined,
    PhoneOutlined,
    Pinterest,
} from "@material-ui/icons";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

class Footer extends Component {
    state = {};
    render() {
        return (
            <footer className="footer-container">
                <div className="footer-left-container footer-element">
                    <h2 className="footer-left-element-logo">Kitabi store</h2>
                    <p className="footer-left-element-description">
                        Curabitur tristique rhoncus consequat. Sed ac orci
                        pulvinar, tristique ante eget, tincidunt ex. Aenean
                        lacinia vehicula rhoncus. Proin ullamcorper mauris
                        dolor, et sollicitudin libero ultrices quis. Nam
                        suscipit elit sed neque vehicula cursus. Ut eu enim
                        interdum, egestas risus non, pulvinar purus.
                    </p>
                    <div className="footer-left-element-socials">
                        <Facebook className="social-icon icon" />
                        <Instagram className="social-icon icon" />
                        <Pinterest className="social-icon icon" />
                    </div>
                </div>
                <div className="footer-center-container footer-element">
                    <h2 className="footer-small-title">Useful links</h2>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/">Cart</Link>
                        </li>
                        <li>
                            <Link to="/">ders</Link>
                        </li>
                        <li>
                            <Link to="/">ders</Link>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/">Cart</Link>
                        </li>
                        <li>
                            <Link to="/">ders</Link>
                        </li>
                        <li>
                            <Link to="/">ders</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-right-container footer-element">
                    <h2 className="footer-small-title">Contact</h2>
                    <ul>
                        <li>
                            <EmailOutlined className="icon" />
                            <Link to="mailto:kitabi.store@gmail.com">
                                kitabi.store@gmail.com
                            </Link>
                        </li>
                        <li>
                            <PhoneOutlined className="icon" />
                            +213 2346788254
                        </li>
                        <li>
                            <LocationOnOutlined className="icon" />2 Rue
                            didouche mourad, Université d'Alger 1 - Benyoucef
                            BENKHEDDA - Faculté des sciences - Département
                            Informatique
                        </li>
                    </ul>
                </div>
            </footer>
        );
    }
}

export default Footer;
