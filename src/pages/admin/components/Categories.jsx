import React, { useEffect } from "react";
import { useState } from "react";
import axios from "../../../api/axios";
import "../../../styles/scss/categories.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export const Categories = ({ defaultCategory, onCategorySelected, ref }) => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategoy] = useState(defaultCategory);
    useEffect(() => {
        axios
            .get("/books/categories")
            .then((response) => {
                if (response.data.success) {
                    setCategoriesList(response.data?.categories);
                }
            })
            .catch((err) => {
                throw Response(
                    err.response.data.message ?? err.response.statusText,
                    err.response.status
                );
            });
    }, []);

    const getCategoriesListComponenet = () => {
        return categoriesList.map((categorie) => (
            <div
                ref={ref}
                className="category-element"
                key={categorie.id}
                onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategoy(categorie?.name);
                    setOpen(false);
                    return onCategorySelected(categorie?.id);
                }}
            >
                {categorie?.name}
            </div>
        ));
    };

    return (
        <>
            <label>Category</label>
            <div
                className="categories-container"
                onClick={() => setOpen((prev) => !prev)}
            >
                <div className="categories-input">
                    {selectedCategory ?? "Select a category"}
                    {open ? (
                        <div className="categories-list">
                            {getCategoriesListComponenet()}
                        </div>
                    ) : null}

                    <MdOutlineKeyboardArrowDown
                        className={open ? "arrow-left" : "arrow-down"}
                    />
                </div>
            </div>
        </>
    );
};

export default Categories;
