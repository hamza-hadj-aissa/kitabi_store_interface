import {
    EmailOutlined,
    Facebook,
    Instagram,
    LocationOnOutlined,
    PhoneOutlined,
    Pinterest,
} from "@material-ui/icons";
import { Component } from "react";
import "../css/Footer.css";

class Footer extends Component {
    state = {};
    render() {
        return (
            <div className="footer-container">
                <div className="footer-left-container footer-element">
                    <h1 className="footer-left-element-logo">Kitabi store</h1>
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
                    <h1 className="footer-small-title">Useful links</h1>
                    <ul>
                        <li>
                            <a href="#x">Home</a>
                        </li>
                        <li>
                            <a href="#x">Cart</a>
                        </li>
                        <li>
                            <a href="#x">ders</a>
                        </li>
                        <li>
                            <a href="#x">ders</a>
                        </li>
                        <li>
                            <a href="#x">Home</a>
                        </li>
                        <li>
                            <a href="#x">Cart</a>
                        </li>
                        <li>
                            <a href="#x">ders</a>
                        </li>
                        <li>
                            <a href="#x">ders</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-right-container footer-element">
                    <h1 className="footer-small-title">Contact</h1>
                    <ul>
                        <li>
                            <EmailOutlined className="icon" />
                            <a href="mailto:kitabi.store@gmail.com">
                                kitabi.store@gmail.com
                            </a>
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
            </div>
        );
    }
}

export default Footer;
