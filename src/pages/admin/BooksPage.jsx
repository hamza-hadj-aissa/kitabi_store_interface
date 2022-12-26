import { AddOutlined, EditOutlined } from "@material-ui/icons";
import { useLoaderData, useNavigate } from "react-router";
import "../../css/scss/booksInStore.css";

const Books = () => {
    const Navigate = useNavigate();
    const books = useLoaderData();
    const navigateToBookEdit = (id) => {
        Navigate(`/admin/books/edit/${id}`);
    };
    const navigateToBookAdd = () => {
        Navigate("/admin/books/add");
    };

    const getAllBooks = () => {
        return books.map((book) => {
            return (
                <tr key={book.id}>
                    <td className="books-cart-left">
                        <button
                            className="remove-from-cart-btn"
                            onClick={() => navigateToBookEdit(book.id)}
                        >
                            <EditOutlined />
                        </button>
                        <div className="book-link">
                            <img
                                alt="books"
                                src={`http://localhost:8080/${book.image}`}
                            />
                            <div className="books-title-author">
                                <h2>{book.title}</h2>
                                <p>{book.author}</p>
                            </div>
                        </div>
                    </td>
                    <td className="books-quantity numbers">{book.quantity}</td>
                    <td className="books-quantity numbers">
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
        <div className="books-in-store-container">
            <div>
                <h1>Books</h1>
                <button onClick={navigateToBookAdd}>
                    Add a Book
                    <AddOutlined />
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Book</td>
                        <td>Quantity</td>
                        <td>Discount</td>
                        <td className="price">Price</td>
                    </tr>
                </thead>
            </table>
            <tbody>{getAllBooks()}</tbody>
        </div>
    );
};

export default Books;
