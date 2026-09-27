"use client";

import { useEffect, useState } from "react";
import "@/styles/adminproducts.css";

const API_URL = "/api";

function AdminCategories() {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // =========================================
    // FETCH CATEGORIES
    // =========================================

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                `${API_URL}/categories`,
                {
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }

            const data = await response.json();

            setCategories(
                Array.isArray(data) ? data : []
            );

        } catch (error) {
            console.error(
                "Category fetch error:",
                error
            );
        }
    };

    // =========================================
    // LOAD CATEGORIES
    // =========================================

    useEffect(() => {
        fetchCategories();
    }, []);

    // =========================================
    // ADD / UPDATE CATEGORY
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        const name = categoryName.trim();

        if (!name) {
            alert("Please enter a category name.");
            return;
        }

        try {

            setLoading(true);

            let response;

            if (editingId) {

                response = await fetch(
                    `${API_URL}/categories/${editingId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            name: name,
                        }),
                    }
                );

            } else {

                response = await fetch(
                    `${API_URL}/categories`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            name: name,
                        }),
                    }
                );
            }

            if (!response.ok) {

                let message =
                    "Unable to save category.";

                try {

                    const errorData =
                        await response.json();

                    if (errorData.message) {
                        message =
                            errorData.message;
                    }

                } catch {
                    // Ignore response parsing error
                }

                throw new Error(message);
            }

            alert(
                editingId
                    ? "Category updated successfully."
                    : "Category added successfully."
            );

            setCategoryName("");
            setEditingId(null);

            await fetchCategories();

        } catch (error) {

            console.error(
                "Category save error:",
                error
            );

            alert(
                error.message ||
                "Something went wrong."
            );

        } finally {

            setLoading(false);
        }
    };

    // =========================================
    // EDIT CATEGORY
    // =========================================

    const editCategory = (category) => {

        setEditingId(category.id);

        setCategoryName(
            category.name || ""
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // =========================================
    // CANCEL EDIT
    // =========================================

    const cancelEdit = () => {

        setEditingId(null);
        setCategoryName("");
    };

    // =========================================
    // DELETE CATEGORY
    // =========================================

    const deleteCategory = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/categories/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to delete category."
                );
            }

            alert(
                "Category deleted successfully."
            );

            await fetchCategories();

        } catch (error) {

            console.error(
                "Category delete error:",
                error
            );

            alert(
                "Unable to delete category."
            );
        }
    };

    return (

        <div className="admin-products-page admin-categories-page">

            {/* =================================
                PAGE HEADER
            ================================= */}

            <div className="admin-products-header">

                <div>

                    <span className="admin-page-tag">
                        CATEGORY MANAGEMENT
                    </span>

                    <h1>
                        Categories
                    </h1>

                    <p>
                        Create and manage product
                        categories.
                    </p>

                </div>

            </div>


            {/* =================================
                CATEGORY FORM
            ================================= */}

            <div className="category-form-card">

                <div className="category-form-header">

                    <div>

                        <h2>
                            {editingId
                                ? "Edit Category"
                                : "Add New Category"}
                        </h2>

                        <p>
                            {editingId
                                ? "Update the selected product category."
                                : "Add a category that can be selected when creating a product."}
                        </p>

                    </div>

                    {editingId && (

                        <button
                            type="button"
                            className="category-close-btn"
                            onClick={cancelEdit}
                        >
                            ×
                        </button>

                    )}

                </div>


                <form
                    className="category-form"
                    onSubmit={handleSubmit}
                >

                    <div className="category-input-group">

                        <label>
                            Category Name <span>*</span>
                        </label>

                        <input
                            type="text"
                            value={categoryName}
                            onChange={(event) =>
                                setCategoryName(
                                    event.target.value
                                )
                            }
                            placeholder="Enter category name"
                            required
                        />

                    </div>


                    <div className="category-form-buttons">

                        {editingId && (

                            <button
                                type="button"
                                className="category-cancel-btn"
                                onClick={cancelEdit}
                            >
                                Cancel
                            </button>

                        )}

                        <button
                            type="submit"
                            className="category-save-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : editingId
                                    ? "Update Category"
                                    : "Add Category"}
                        </button>

                    </div>

                </form>

            </div>


            {/* =================================
                CATEGORY LIST
            ================================= */}

            <div className="category-list-card">

                <div className="category-list-header">

                    <div>

                        <h2>
                            Existing Categories
                        </h2>

                        <p>
                            Categories available for
                            your products.
                        </p>

                    </div>

                    <div className="category-count">
                        {categories.length} Categories
                    </div>

                </div>


                <div className="admin-products-table-wrapper">

                    <table className="admin-products-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Category Name
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {categories.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="3"
                                        className="no-products"
                                    >
                                        No categories found.
                                    </td>

                                </tr>

                            ) : (

                                categories.map(
                                    (category) => (

                                        <tr
                                            key={
                                                category.id
                                            }
                                        >

                                            <td>
                                                {category.id}
                                            </td>

                                            <td>

                                                <strong>
                                                    {
                                                        category.name
                                                    }
                                                </strong>

                                            </td>

                                            <td>

                                                <div className="admin-action-buttons">

                                                    <button
                                                        type="button"
                                                        className="edit-product-btn"
                                                        onClick={() =>
                                                            editCategory(
                                                                category
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="delete-product-btn"
                                                        onClick={() =>
                                                            deleteCategory(
                                                                category.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminCategories;