import { Component } from "react";
import "../css/Products.css";
import Product from "./Product";

class Products extends Component {
    state = {
        products: [
            { id: 1, title: "Atmoic habits" },
            { id: 2, title: "Atmoic" },
            { id: 3, title: "habits" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
            { id: 2, title: "Atmoic" },
        ],
    };
    render() {
        return (
            <div className="products-container">
                {this.state.products.map((product) => {
                    return <Product product={product} />;
                })}
            </div>
        );
    }
}

export default Products;
