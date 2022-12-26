import { AddOutlined, DeleteOutlined } from "@material-ui/icons";
import axios from "../../api/axios";
import { useState } from "react";
import { useRef } from "react";
import "../../css/scss/bookEdit.css";
import { useLoaderData, useNavigate } from "react-router";
const BookEdit = () => {
    const Navigate = useNavigate();
    const book = useLoaderData() ?? null;

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

    const [titleState, setTitleState] = useState(book?.title ?? null);
    const [authorState, setAuthorState] = useState(book?.author ?? null);
    const [descritionState, setDescriptionState] = useState(
        book?.description ?? null
    );
    const [pagesNumberState, setPagesNumberState] = useState(
        book?.pages_number ?? 0
    );
    const [categoryState, setCategoryState] = useState();
    const [priceState, setPriceState] = useState(book?.price ?? 0);
    const [discountState, setDiscountState] = useState(book?.discount ?? 0);
    const [quantityState, setQuantityState] = useState(book?.quantity ?? 0);
    const [imageState, setImageState] = useState(book?.image ?? null);

    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titleState) {
            setErrMsg("Please enter book title");
            titleRef.current.focus();
        } else if (!authorState) {
            setErrMsg("Please enter book's author name");
            authorRef.current.focus();
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
            let formData = new FormData();
            formData.append("image", imageState);
            formData.append("title", titleState);
            formData.append("author", authorState);
            formData.append("description", descritionState);
            formData.append("pages_number", pagesNumberState);
            formData.append("price", priceState);
            formData.append("discount", discountState);
            formData.append("quantity", quantityState);
            if (book === null) {
                await axios
                    .post("/books/create", formData)
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            Navigate("/admin/books");
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            } else {
                await axios
                    .put(`/books/update/${book.id}`, formData)
                    .then((response) => {
                        if (response.data.success && response.status === 200) {
                            Navigate("/admin/books");
                        } else {
                            throw new Response(
                                response.data.message
                                    ? response.data.message
                                    : response.statusText,
                                response.status
                            );
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            }
        }
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

                        {/* <label>Category</label>
                <input
                    type=""
                    placeholder="Enter book's author"
                    name="author"
                    ref={categoryRef}
                    value={categoryState}
                    onChange={(e) => setCategoryState(e.target.value)}
                /> */}

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

                        <label>
                            Book cover (Only .jpg, .jpeg, .png are accepted)
                        </label>
                        <label className="image-input">
                            {imageState ? (
                                <div className="image-info">
                                    <button
                                        onClick={() => {
                                            setImageState(null);
                                        }}
                                    >
                                        <DeleteOutlined />
                                    </button>
                                    {imageState.name ?? imageState}
                                </div>
                            ) : (
                                <div>
                                    Add book cover
                                    <AddOutlined />
                                    <input
                                        type="file"
                                        name="image"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={(e) => {
                                            // setImageState(e.target.files[0]);
                                            if (
                                                e.target.files[0].name.includes(
                                                    ".jpg"
                                                ) ||
                                                e.target.files[0].name.includes(
                                                    ".jpeg"
                                                ) ||
                                                e.target.files[0].name.includes(
                                                    ".png"
                                                )
                                            ) {
                                                setImageState(
                                                    e.target.files[0]
                                                );
                                            }
                                        }}
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
