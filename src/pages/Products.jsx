import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Product from "../components/Product";
import useSearch from "../hooks/useSearch";
import "../styles/scss/products.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
function Products() {
    const { setSearchValue, searchValue } = useSearch();
    const Navigate = useNavigate();
    const { books, categories } = useLoaderData();
    const [booksListState, setbooksListState] = useState(books);
    const navigateToBookDetails = (id) => {
        Navigate(`/${id}`, {
            preventScrollReset: false,
        });
    };
    useEffect(() => {
        axios
            .get(
                `books/search/?value=${searchValue?.search ?? ""}&category=${
                    searchValue?.categoryId ?? ""
                }`
            )
            .then((response) => {
                if (response.data.success) {
                    setbooksListState(response.data.books);
                } else {
                    throw Error(response.data.message);
                }
            });
    }, [searchValue]);

    const scrollRight = () => {
        const slider = document.querySelector(".categories-slider");
        slider.scrollBy(200, 0);
    };

    const scrollLeft = () => {
        const slider = document.querySelector(".categories-slider");
        slider.scrollBy(-200, 0);
    };

    return (
        <>
            <div className="slider">
                <button onClick={() => scrollLeft()}>
                    <AiOutlineLeft className="icon" size={15} />
                </button>
                <ul className="categories-slider">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            onClick={() => {
                                if (category.id === searchValue?.categoryId) {
                                    setSearchValue((prev) => ({
                                        ...prev,
                                        categoryId: null,
                                    }));
                                } else {
                                    setSearchValue((prev) => ({
                                        ...prev,
                                        categoryId: category.id,
                                    }));
                                }
                            }}
                            className={
                                searchValue?.categoryId === category?.id
                                    ? "selected"
                                    : null
                            }
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
                <button onClick={() => scrollRight()}>
                    <AiOutlineRight className="icon" size={15} />
                </button>
            </div>
            {booksListState.length ? (
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
            ) : (
                <div className="no-books-container middle">
                    <h2>No books availble</h2>
                </div>
            )}
        </>
    );
}

export default Products;
