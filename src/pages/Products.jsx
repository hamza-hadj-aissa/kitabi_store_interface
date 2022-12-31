import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Product from "../components/Product";
import useSearch from "../hooks/useSearch";
import "../styles/scss/products.css";

function Products() {
    const { searchValue } = useSearch();
    const Navigate = useNavigate();
    const { books } = useLoaderData();
    const [booksListState, setbooksListState] = useState(books);

    const navigateToBookDetails = (id) => {
        Navigate(`/${id}`, {
            preventScrollReset: false,
        });
    };

    useEffect(() => {
        axios
            .get(`books/search/?value=${searchValue ?? ""}`)
            .then((response) => {
                if (response.data.success) {
                    setbooksListState(response.data.books);
                } else {
                    throw Error(response.data.message);
                }
            });
    }, [searchValue]);

    if (booksListState.length) {
        return (
            <div className="products-container middle">
                {booksListState.map((book) => {
                    return (
                        <Product
                            key={book.id}
                            book={book}
                            onBookClicked={navigateToBookDetails}
                        />
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="no-books-container middle">
                <h2>No books availble</h2>
                {/* <button onClick={() => Navigate("/")}>Refresh page</button> */}
            </div>
        );
    }
}

export default Products;
