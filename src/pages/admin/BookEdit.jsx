import { useState } from "react";
import { useRef } from "react";
import "../../styles/scss/bookEdit.css";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Categories from "./components/Categories";
import { MdOutlineDelete } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
const BookEdit = () => {
    const Navigate = useNavigate();
    const { book, category } = useLoaderData() ?? {
        book: null,
        category: null,
    };
    const axiosPrivateAdmin = useAxiosPrivate("admin");
    const titleRef = useRef();
    const authorRef = useRef();
    const descriptionRef = useRef();
    const pagesNumberRef = useRef();
    const categoryRef = useRef();
    const priceRef = useRef();
    const discountRef = useRef();
    const quantityRef = useRef();
    const imageRef = useRef();

    const errRef = useRef();

    const [titleState, setTitleState] = useState(
        book ? book?.title ?? null : null
    );
    const [authorState, setAuthorState] = useState(
        book ? book?.author ?? null : null
    );
    const [descritionState, setDescriptionState] = useState(
        book ? book?.description ?? null : null
    );
    const [pagesNumberState, setPagesNumberState] = useState(
        book ? book?.pages_number ?? 0 : null
    );

    const [categoryState, setCategoryState] = useState(
        category ? category?.id ?? null : null
    );
    const [priceState, setPriceState] = useState(
        book ? book?.price ?? 0 : null
    );
    const [discountState, setDiscountState] = useState(
        book ? book?.discount ?? 0 : null
    );
    const [quantityState, setQuantityState] = useState(
        book ? book?.quantity ?? 0 : null
    );
    const [imageState, setImageState] = useState(book ? book?.image : null);
    const [serverImageState, setServerImageState] = useState(
        book ? book?.image : null
    );

    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titleState) {
            setErrMsg("Please enter book title");
            titleRef.current.focus();
        } else if (!authorState) {
            setErrMsg("Please enter book's author name");
            authorRef.current.focus();
        } else if (!categoryState) {
            setErrMsg("Please enter book's category");
        } else if (!pagesNumberState) {
            setErrMsg("Please enter book's pages number");
            pagesNumberRef.current.focus();
        } else if (!priceState) {
            setErrMsg("Please enter book's price");
            priceRef.current.focus();
        } else if (!quantityState) {
            setErrMsg("Please enter book's quantity");
            quantityRef.current.focus();
        } else if (!descritionState) {
            setErrMsg("Please enter book's description");
            descriptionRef.current.focus();
        } else if (!imageState) {
            setErrMsg("Please insert book's cover");
            imageRef.current.focus();
        } else {
            // appending data to be sent as form data
            let formData = new FormData();
            formData.append("title", titleState);
            formData.append("author", authorState);
            formData.append("category", categoryState);
            formData.append("description", descritionState);
            formData.append("pages_number", pagesNumberState);
            formData.append("price", priceState);
            formData.append("discount", discountState);
            formData.append("quantity", quantityState);

            if (book === null) {
                // when adding a book, image attribute will have
                // the new book's cover value
                formData.append("image", imageState);

                await axiosPrivateAdmin
                    .post("/books/create", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            Navigate("/admin/dashboard/books");
                        } else {
                            setErrMsg(response.data.message);
                            errRef.current.focus();
                        }
                    })
                    .catch((err) => {
                        setErrMsg(err.response.data.message);
                        errRef.current.focus();
                    });
            } else {
                // when editing a book, if the book's cover has been changed,
                // serverImageState is set to null. So the new book's cover
                // value will be sent
                formData.append("image", serverImageState ?? imageState);

                await axiosPrivateAdmin
                    .put(`/books/update/${book.id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            Navigate("/admin/dashboard/books", {
                                replace: true,
                            });
                        } else {
                            setErrMsg(response.data.message);
                            errRef.current.focus();
                        }
                    })
                    .catch((err) => {
                        setErrMsg(err.response.data.message);
                        errRef.current.focus();
                    });
            }
        }
    };

    const onCategorySelected = (id) => {
        setCategoryState(id);
    };

    return (
        <div className="edit-book-container">
            <form
                onSubmit={handleSubmit}
                onChange={(e) => {
                    setErrMsg("");
                }}
            >
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <div>
                    <div className="left-side">
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Enter book title"
                            name="title"
                            ref={titleRef}
                            value={titleState}
                            onChange={(e) => setTitleState(e.target.value)}
                        />

                        <label>Author</label>
                        <input
                            type="text"
                            placeholder="Enter book's author"
                            name="author"
                            ref={authorRef}
                            value={authorState}
                            onChange={(e) => setAuthorState(e.target.value)}
                        />

                        <Categories
                            onCategorySelected={onCategorySelected}
                            ref={categoryRef}
                            defaultCategory={category?.name}
                        />

                        <label>Pages number</label>
                        <input
                            type="number"
                            min={0}
                            placeholder="Enter book's pages number"
                            name="pages_number"
                            ref={pagesNumberRef}
                            value={pagesNumberState}
                            onChange={(e) =>
                                setPagesNumberState(e.target.value)
                            }
                        />

                        <div className="price-discount">
                            <div>
                                <label>Price</label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Enter book's price"
                                    name="price"
                                    ref={priceRef}
                                    value={priceState}
                                    onChange={(e) =>
                                        setPriceState(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label>Discount</label>
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Enter book's discount"
                                    name="discount"
                                    ref={discountRef}
                                    value={discountState}
                                    onChange={(e) =>
                                        setDiscountState(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <label>Quantity</label>
                        <input
                            type="number"
                            min={0}
                            placeholder="Enter book's quantity"
                            name="quantity"
                            ref={quantityRef}
                            value={quantityState}
                            onChange={(e) => setQuantityState(e.target.value)}
                        />
                    </div>

                    <div className="right-side">
                        <label>Description</label>
                        <textarea
                            className="description-input"
                            type="text"
                            placeholder="Enter book's description..."
                            name="description"
                            ref={descriptionRef}
                            value={descritionState}
                            onChange={(e) =>
                                setDescriptionState(e.target.value)
                            }
                        />
                    </div>
                    <div className="right-side">
                        <label>
                            Book cover (Only .jpg, .jpeg, .png are accepted)
                        </label>
                        <label className="image-input">
                            {imageState ? (
                                <div className="image-info">
                                    <img
                                        src={
                                            serverImageState
                                                ? `http://localhost:8080/images/${serverImageState}`
                                                : URL.createObjectURL(
                                                      imageState
                                                  )
                                        }
                                        alt={imageState.name}
                                    />
                                    <button
                                        className="delete-pic-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImageState(null);
                                            setServerImageState(null);
                                        }}
                                    >
                                        <MdOutlineDelete
                                            className="icon"
                                            size={25}
                                        />
                                    </button>
                                </div>
                            ) : (
                                <div className="add-book-cover">
                                    Add book cover
                                    <RiImageAddLine />
                                    <input
                                        type="file"
                                        name="image"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={(e) =>
                                            setImageState(e.target.files[0])
                                        }
                                        disabled={imageState}
                                    />
                                </div>
                            )}
                        </label>
                    </div>
                </div>
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
};

export default BookEdit;
