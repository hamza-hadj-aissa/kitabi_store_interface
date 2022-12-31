import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaBookMedical } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../styles/scss/booksInStore.css";

const Books = () => {
    const Navigate = useNavigate();
    const [books, setBooks] = useState(useLoaderData());
    const axiosPrivate = useAxiosPrivate("admin");
    const navigateToBookEdit = (id) => {
        Navigate(`/admin/dashboard/books/edit/${id}`);
    };
    const navigateToBookAdd = () => {
        Navigate("/admin/dashboard/books/add");
    };

    const deleteBook = async (id) => {
        await axiosPrivate
            .delete(`/books/delete/${id}`)
            .then((response) => {
                if (response.data.success) {
                    setBooks((books) =>
                        books.filter((book) => book?.id !== id)
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getAllBooks = () => {
        return books.map((book) => {
            return (
                <tr key={book.id}>
                    <td className="books-cart-left">
                        <div className="icons-container">
                            <button
                                className="remove-from-cart-btn"
                                onClick={() => navigateToBookEdit(book.id)}
                            >
                                <BiEdit className="icon" size={25} />
                            </button>
                            <button
                                className="remove-from-cart-btn"
                                onClick={async () => await deleteBook(book?.id)}
                            >
                                <MdOutlineDelete className="icon" size={25} />
                            </button>
                        </div>
                        <div
                            className="book-link"
                            onClick={() => Navigate(`/${book?.id}`)}
                        >
                            <img
                                alt="books"
                                src={`http://localhost:8080/images/${book.image}`}
                            />
                            <div className="books-title-author">
                                <h2>{book.title}</h2>
                                <p>{book.author}</p>
                            </div>
                        </div>
                    </td>
                    <td className="books-quantity numbers price">
                        {book.quantity}
                    </td>
                    <td className="books-quantity numbers price">
                        {book.discount} %
                    </td>
                    <td className="price numbers">
                        <div
                            className={
                                book.discount > 0
                                    ? "price-before-discount"
                                    : null
                            }
                        >
                            {book.price} DA
                        </div>
                        <div>
                            {book.discount > 0
                                ? book.price -
                                  (book.price * book.discount) / 100 +
                                  " DA"
                                : null}
                        </div>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="books-in-store">
            <div className="books-in-store-container">
                <div>
                    <h1>Books</h1>
                    <button onClick={navigateToBookAdd}>
                        Add a Book
                        <FaBookMedical />
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Book</td>
                            <td className="price">Quantity</td>
                            <td className="price">Discount</td>
                            <td className="price">Price</td>
                        </tr>
                    </thead>
                </table>
                <tbody>{getAllBooks()}</tbody>
            </div>
        </div>
    );
};

export default Books;
