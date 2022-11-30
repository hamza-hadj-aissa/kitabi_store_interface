import { AddShoppingCartOutlined, PaymentOutlined } from "@material-ui/icons";
import React, { Component } from "react";
import Counter from "../components/Counter";
import "../css/ProductDetails.css";

class ProductDetails extends Component {
    state = {};
    render() {
        return (
            <div className="product-details-main-container">
                <div className="image-container">
                    <img alt="book" src="images/atomic_habits_image.jpg" />
                </div>
                <div className="book-info-container">
                    <div className="book-details">
                        <h1 className="book-title">
                            Atomic habits - James Clear
                        </h1>
                        <p className="book-description-container">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Suspendisse id mauris porttitor, volutpat arcu
                            eu, hendrerit tellus. Maecenas commodo nisi ligula,
                            at pharetra nunc tincidunt in. Maecenas feugiat est
                            sit amet lorem semper, nec auctor augue congue.
                            Aenean non bibendum lacus. Phasellus non varius
                            nulla. Nam ut sagittis neque. Pellentesque iaculis
                            tristique ante. Fusce et pulvinar sem. Integer
                            aliquam faucibus accumsan. Nam vitae cursus est.
                            Proin eleifend, risus id aliquam pharetra, nisl quam
                            vulputate quam, sit amet convallis purus diam at
                            metus. Donec dolor augue, cursus non arcu a, dapibus
                            egestas massa. Aliquam dignissim imperdiet magna in
                            sollicitudin. Nam in justo turpis. Suspendisse
                            tincidunt, ipsum dictum pellentesque consequat,
                            nulla ipsum placerat elit, a mollis nibh mi et
                            magna. Quisque eget libero et dui blandit rhoncus.
                            Quisque dapibus euismod augue at blandit. Duis
                            posuere orci libero. Proin porttitor elit a lacus
                            egestas, id maximus arcu dictum. Lorem ipsum dolor
                            sit amet, consectetur adipiscing elit. Suspendisse
                            id mauris porttitor, volutpat arcu eu, hendrerit
                            tellus. Maecenas commodo nisi ligula, at pharetra
                            nunc tincidunt in. Maecenas feugiat est sit amet
                            lorem semper, nec auctor augue congue. Aenean non
                            bibendum lacus. Phasellus non varius nulla. Nam ut
                            sagittis neque. Pellentesque iaculis tristique ante.
                            Fusce et pulvinar sem. Integer aliquam faucibus
                            accumsan. Nam vitae cursus est. Proin eleifend,
                            {/* risus id aliquam pharetra, nisl quam vulputate quam,
                            sit amet convallis purus diam at metus. Donec dolor
                            augue, cursus non arcu a, dapibus egestas massa.
                            Aliquam dignissim imperdiet magna in sollicitudin.
                            Nam in justo turpis. Suspendisse tincidunt, ipsum
                            dictum pellentesque consequat, nulla ipsum placerat
                            elit, a mollis nibh mi et magna. Quisque eget libero
                            et dui blandit rhoncus. Quisque dapibus euismod
                            augue at blandit. Duis posuere orci libero. Proin
                            porttitor elit a lacus egestas, id maximus arcu
                            dictum. */}
                        </p>
                    </div>
                    <div className="book-price-container">2000 DA</div>
                    <div className="buttons-container">
                        <Counter />
                        <button className="btn btn-add-to-cart">
                            <div className="button-text">Add to cart</div>
                            <AddShoppingCartOutlined className="add-to-cart-icon" />
                        </button>
                        <button className="btn btn-buy-book">
                            <div className="button-text">Buy now</div>
                            <PaymentOutlined className="payement-icon" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetails;
