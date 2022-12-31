import { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/scss/footer.css";
import { GoLocation } from "react-icons/go";
import {
    MdOutlineFacebook,
    MdPhone,
    MdOutlineMailOutline,
} from "react-icons/md";
import { IoLogoInstagram, IoLogoPinterest } from "react-icons/io";
class Footer extends Component {
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
                        <MdOutlineFacebook className="icon" />
                        <IoLogoInstagram className="icon" />
                        <IoLogoPinterest className="icon" />
                    </div>
                </div>
                <div className="footer-center-container footer-element">
                    <h2 className="footer-small-title">Useful links</h2>
                    <ul>
                        <li>
                            <a href="/">Layout</a>
                        </li>
                        <li>
                            <a href="/">Cart</a>
                        </li>
                        <li>
                            <a href="/">ders</a>
                        </li>
                        <li>
                            <a href="/">ders</a>
                        </li>
                        <li>
                            <a href="/">Layout</a>
                        </li>
                        <li>
                            <a href="/">Cart</a>
                        </li>
                        <li>
                            <a href="/">ders</a>
                        </li>
                        <li>
                            <a href="/">ders</a>
                        </li>
                    </ul>
                </div>

                <div className="footer-right-container footer-element">
                    <h2 className="footer-small-title">Contact</h2>
                    <ul>
                        <li>
                            <MdOutlineMailOutline className="icon" />
                            <Link to="mailto:kitabi.store@gmail.com">
                                kitabi.store@gmail.com
                            </Link>
                        </li>
                        <li>
                            <MdPhone className="icon" />
                            +213 2346788254
                        </li>
                        <li>
                            <span>
                                <GoLocation className="icon" />
                            </span>
                            2 Rue didouche mourad, Université d'Alger 1 -
                            Benyoucef BENKHEDDA - Faculté des sciences -
                            Département Informatique
                        </li>
                    </ul>
                </div>
            </footer>
        );
    }
}

export default Footer;
