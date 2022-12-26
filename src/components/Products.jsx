import "../css/scss/products.css";
import Product from "./Product";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useContext } from "react";
import { SearchContext } from "../context/SearchProvider";

function Products() {
    const { searchValue } = useContext(SearchContext);
    const Navigate = useNavigate();
    const { books } = useLoaderData();
    const [booksListState, setbooksListState] = useState(books);

    const navigateToBookDetails = (id) => {
        Navigate(`/books/${id}`);
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
