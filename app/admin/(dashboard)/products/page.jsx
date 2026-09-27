"use client";

import { useEffect, useState } from "react";
import "@/styles/adminproducts.css";

const API_URL = "/api";

// =========================================
// FILE SIZE LIMITS
// =========================================

const MAX_PDF_SIZE = 20 * 1024 * 1024; // 20 MB

const initialFormData = {
    name: "",
    model: "",
    category: "",
    description: "",
    brandImageUrl: "",
    imageUrl: "",
    pdfUrl: "",
    features: "",
    status: true,
};

function AdminProducts({ addOnly = false }) {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState(initialFormData);

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(false);

    const [uploadingBrandImage, setUploadingBrandImage] = useState(false);
    const [uploadingProductImage, setUploadingProductImage] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);

    const [selectedBrandFile, setSelectedBrandFile] = useState(null);
    const [selectedProductFile, setSelectedProductFile] = useState(null);
    const [selectedPdfFile, setSelectedPdfFile] = useState(null);


    // =========================================
    // FETCH PRODUCTS
    // =========================================

    const fetchProducts = async () => {

        try {

            const response = await fetch(
                `${API_URL}/products`,
                {
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();

            setProducts(
                Array.isArray(data) ? data : []
            );

        } catch (error) {

            console.error(
                "Products fetch error:",
                error
            );

        }

    };


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
                "Categories fetch error:",
                error
            );

        }

    };


    // =========================================
    // INITIAL LOAD
    // =========================================

    useEffect(() => {

        fetchProducts();
        fetchCategories();

    }, []);


    // =========================================
    // HANDLE INPUT
    // =========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // =========================================
    // UPLOAD FILE TO CLOUDINARY
    // =========================================

    const uploadFile = async (file, type) => {

        if (!file) {
            return null;
        }

        const data = new FormData();

        data.append("file", file);

        try {

            if (type === "brand") {
                setUploadingBrandImage(true);
            }

            if (type === "image") {
                setUploadingProductImage(true);
            }

            if (type === "pdf") {
                setUploadingPdf(true);
            }

            let endpoint;

            if (type === "pdf") {

                endpoint = `${API_URL}/upload/pdf`;

            } else {

                endpoint = `${API_URL}/upload/image`;

            }

            const response = await fetch(
                endpoint,
                {
                    method: "POST",
                    body: data,
                    credentials: "include",
                }
            );

            if (!response.ok) {

                let errorMessage =
                    "File upload failed.";

                try {

                    const errorData =
                        await response.json();

                    if (errorData.message) {
                        errorMessage =
                            errorData.message;
                    }

                } catch {
                    // Ignore JSON parsing error
                }

                throw new Error(errorMessage);
            }

            const result =
                await response.json();

            if (
                !result.success ||
                !result.url
            ) {

                throw new Error(
                    result.message ||
                    "Cloudinary did not return a file URL."
                );

            }

            console.log(
                `${type} uploaded URL:`,
                result.url
            );

            return result.url;

        } catch (error) {

            console.error(
                "Cloudinary upload error:",
                error
            );

            alert(
                error.message ||
                "File upload failed. Please try again."
            );

            return null;

        } finally {

            if (type === "brand") {
                setUploadingBrandImage(false);
            }

            if (type === "image") {
                setUploadingProductImage(false);
            }

            if (type === "pdf") {
                setUploadingPdf(false);
            }

        }

    };


    // =========================================
    // BRAND IMAGE CHANGE
    // =========================================

    const handleBrandImageChange = async (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            alert(
                "Please select a valid image file."
            );

            event.target.value = "";

            return;
        }

        setSelectedBrandFile(file);

        const url = await uploadFile(
            file,
            "brand"
        );

        if (url) {

            setFormData((previous) => ({
                ...previous,
                brandImageUrl: url,
            }));

            console.log(
                "NEW BRAND IMAGE URL:",
                url
            );

        }

    };


    // =========================================
    // PRODUCT IMAGE CHANGE
    // =========================================

    const handleProductImageChange = async (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            alert(
                "Please select a valid product image."
            );

            event.target.value = "";

            return;
        }

        setSelectedProductFile(file);

        const url = await uploadFile(
            file,
            "image"
        );

        if (url) {

            setFormData((previous) => ({
                ...previous,
                imageUrl: url,
            }));

        }

    };


    // =========================================
    // PDF CHANGE
    // =========================================

    const handlePdfChange = async (event) => {

        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const isPdf =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");

        if (!isPdf) {

            alert(
                "Please select a PDF file."
            );

            event.target.value = "";

            return;
        }


        // =====================================
        // PDF SIZE CHECK - MAXIMUM 20 MB
        // =====================================

        if (file.size > MAX_PDF_SIZE) {

            const fileSizeMB =
                (file.size / (1024 * 1024)).toFixed(2);

            alert(
                `PDF file is too large.\n\n` +
                `Your file: ${fileSizeMB} MB\n` +
                `Maximum allowed: 20 MB`
            );

            event.target.value = "";

            return;
        }


        setSelectedPdfFile(file);

        const url = await uploadFile(
            file,
            "pdf"
        );

        if (url) {

            setFormData((previous) => ({
                ...previous,
                pdfUrl: url,
            }));

        }

    };


    // =========================================
    // RESET FORM
    // =========================================

    const resetForm = () => {

        setFormData({
            ...initialFormData
        });

        setEditingId(null);

        setSelectedBrandFile(null);
        setSelectedProductFile(null);
        setSelectedPdfFile(null);

    };


    // =========================================
    // SUBMIT PRODUCT
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!formData.name.trim()) {

            alert(
                "Please enter product name."
            );

            return;
        }

        if (!formData.category) {

            alert(
                "Please select a category."
            );

            return;
        }


        // Brand image is required for NEW product

        if (
            !editingId &&
            !formData.brandImageUrl
        ) {

            alert(
                "Please upload a brand image."
            );

            return;
        }


        // Make sure all uploads are completed

        if (
            uploadingBrandImage ||
            uploadingProductImage ||
            uploadingPdf
        ) {

            alert(
                "Please wait until all uploads are completed."
            );

            return;
        }


        // Extra PDF safety check

        if (
            selectedPdfFile &&
            selectedPdfFile.size > MAX_PDF_SIZE
        ) {

            alert(
                "PDF file is larger than the maximum allowed size of 20 MB."
            );

            return;
        }


        try {

            setLoading(true);


            // =================================
            // BRAND IMAGE
            // =================================

            let finalBrandImageUrl =
                formData.brandImageUrl;

            if (selectedBrandFile) {

                const newBrandUrl =
                    await uploadFile(
                        selectedBrandFile,
                        "brand"
                    );

                if (!newBrandUrl) {

                    throw new Error(
                        "New brand image could not be uploaded."
                    );

                }

                finalBrandImageUrl =
                    newBrandUrl;
            }


            // =================================
            // PRODUCT IMAGE
            // =================================

            let finalImageUrl =
                formData.imageUrl;

            if (selectedProductFile) {

                const newImageUrl =
                    await uploadFile(
                        selectedProductFile,
                        "image"
                    );

                if (!newImageUrl) {

                    throw new Error(
                        "Product image could not be uploaded."
                    );

                }

                finalImageUrl =
                    newImageUrl;
            }


            // =================================
            // PDF
            // =================================

            let finalPdfUrl =
                formData.pdfUrl;

            if (selectedPdfFile) {

                const newPdfUrl =
                    await uploadFile(
                        selectedPdfFile,
                        "pdf"
                    );

                if (!newPdfUrl) {

                    throw new Error(
                        "Product PDF could not be uploaded."
                    );

                }

                finalPdfUrl =
                    newPdfUrl;
            }


            // =================================
            // FINAL PRODUCT DATA
            // =================================

            const productData = {

                name:
                    formData.name.trim(),

                model:
                    formData.model.trim(),

                category:
                    formData.category,

                description:
                    formData.description.trim(),

                brandImageUrl:
                    finalBrandImageUrl,

                imageUrl:
                    finalImageUrl,

                pdfUrl:
                    finalPdfUrl,

                features:
                    formData.features.trim(),

                status:
                    formData.status,

            };


            console.log(
                "PRODUCT DATA BEING SAVED:",
                productData
            );

            console.log(
                "BRAND IMAGE URL BEING SAVED:",
                finalBrandImageUrl
            );


            let response;


            // =================================
            // UPDATE
            // =================================

            if (editingId) {

                response = await fetch(
                    `${API_URL}/products/${editingId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        credentials: "include",

                        body:
                            JSON.stringify(
                                productData
                            ),
                    }
                );

            }


            // =================================
            // CREATE
            // =================================

            else {

                response = await fetch(
                    `${API_URL}/products`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        credentials: "include",

                        body:
                            JSON.stringify(
                                productData
                            ),
                    }
                );

            }


            // =================================
            // RESPONSE CHECK
            // =================================

            if (!response.ok) {

                let message =
                    "Failed to save product.";

                try {

                    const errorData =
                        await response.json();

                    if (errorData.message) {

                        message =
                            errorData.message;
                    }

                } catch {
                    // Ignore JSON parsing error
                }

                throw new Error(message);
            }


            // =================================
            // READ SAVED PRODUCT
            // =================================

            const savedProduct =
                await response.json();

            console.log(
                "PRODUCT SAVED BY BACKEND:",
                savedProduct
            );

            console.log(
                "SAVED BRAND IMAGE URL:",
                savedProduct.brandImageUrl
            );


            alert(
                editingId
                    ? "Product updated successfully."
                    : "Product added successfully."
            );


            resetForm();

            await fetchProducts();

        } catch (error) {

            console.error(
                "Product save error:",
                error
            );

            alert(
                error.message ||
                "Something went wrong while saving the product."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // EDIT PRODUCT
    // =========================================

    const editProduct = (product) => {

        console.log(
            "EDITING PRODUCT:",
            product
        );

        console.log(
            "CURRENT BRAND IMAGE:",
            product.brandImageUrl
        );

        setEditingId(product.id);

        setSelectedBrandFile(null);
        setSelectedProductFile(null);
        setSelectedPdfFile(null);

        setFormData({

            name:
                product.name || "",

            model:
                product.model || "",

            category:
                product.category || "",

            description:
                product.description || "",

            brandImageUrl:
                product.brandImageUrl || "",

            imageUrl:
                product.imageUrl || "",

            pdfUrl:
                product.pdfUrl || "",

            features:
                product.features || "",

            status:
                product.status ?? true,

        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    };


    // =========================================
    // DELETE PRODUCT
    // =========================================

    const deleteProduct = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this product?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/products/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to delete product."
                );

            }

            alert(
                "Product deleted successfully."
            );

            await fetchProducts();

        } catch (error) {

            console.error(
                "Delete error:",
                error
            );

            alert(
                "Unable to delete product."
            );

        }

    };


    // =========================================
    // RENDER
    // =========================================

    return (

        <div className="admin-products-page">


            {/* =================================
                PRODUCT FORM
            ================================= */}

            {(addOnly || editingId) && (

                <div className="product-form-card">

                    <div className="product-form-header">

                        <div>

                            <span className="admin-page-tag">
                                PRODUCT MANAGEMENT
                            </span>

                            <h2>
                                {editingId
                                    ? "Edit Product"
                                    : "Add Product"}
                            </h2>

                            <p>
                                Add product information,
                                images and documents.
                            </p>

                        </div>


                        {editingId && (

                            <button
                                type="button"
                                className="close-form-btn"
                                onClick={resetForm}
                            >
                                ×
                            </button>

                        )}

                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* =================================
                            BRAND IMAGE
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Brand Image *
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleBrandImageChange
                                }
                            />

                            {uploadingBrandImage && (

                                <p className="upload-status">
                                    Uploading brand image...
                                </p>

                            )}

                            {formData.brandImageUrl &&
                                !uploadingBrandImage && (

                                    <div className="admin-upload-preview brand-preview">

                                        <img
                                            src={
                                                formData.brandImageUrl
                                            }
                                            alt="Brand Logo"
                                        />

                                    </div>

                                )}

                        </div>


                        {/* =================================
                            PRODUCT NAME
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Product Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                required
                            />

                        </div>


                        {/* =================================
                            MODEL
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Model Number
                            </label>

                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="Enter model number"
                            />

                        </div>


                        {/* =================================
                            CATEGORY
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Category *
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                {categories.map(
                                    (category) => (

                                        <option
                                            key={
                                                category.id
                                            }
                                            value={
                                                category.name
                                            }
                                        >
                                            {
                                                category.name
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =================================
                            DESCRIPTION
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter product description"
                                rows="5"
                            />

                        </div>


                        {/* =================================
                            PRODUCT IMAGE
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Product Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleProductImageChange
                                }
                            />

                            {uploadingProductImage && (

                                <p className="upload-status">
                                    Uploading product image...
                                </p>

                            )}

                            {formData.imageUrl &&
                                !uploadingProductImage && (

                                    <div className="admin-upload-preview product-preview">

                                        <img
                                            src={
                                                formData.imageUrl
                                            }
                                            alt="Product"
                                        />

                                    </div>

                                )}

                        </div>


                        {/* =================================
                            PRODUCT PDF
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Product PDF
                            </label>

                            <input
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={
                                    handlePdfChange
                                }
                            />

                            <small
                                style={{
                                    display: "block",
                                    marginTop: "6px",
                                    color: "#666",
                                }}
                            >
                                Maximum PDF size: 20 MB
                            </small>

                            {uploadingPdf && (

                                <p className="upload-status">
                                    Uploading PDF...
                                </p>

                            )}

                            {formData.pdfUrl &&
                                !uploadingPdf && (

                                    <p className="upload-success">
                                        ✓ PDF uploaded successfully
                                    </p>

                                )}

                        </div>


                        {/* =================================
                            FEATURES
                        ================================= */}

                        <div className="admin-input-group">

                            <label>
                                Features
                            </label>

                            <textarea
                                name="features"
                                value={
                                    formData.features
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter product features"
                                rows="8"
                            />

                        </div>


                        {/* =================================
                            FORM BUTTONS
                        ================================= */}

                        <div className="product-form-buttons">

                            {editingId && (

                                <button
                                    type="button"
                                    className="cancel-product-btn"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                            )}

                            <button
                                type="submit"
                                className="save-product-btn"
                                disabled={
                                    loading ||
                                    uploadingBrandImage ||
                                    uploadingProductImage ||
                                    uploadingPdf
                                }
                            >

                                {loading
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Product"
                                        : "Add Product"}

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =================================
                PRODUCTS LIST
            ================================= */}

            {!addOnly && (

                <div className="products-list-card">

                    <div className="products-list-header">

                        <h2>
                            Products
                        </h2>

                        <p>
                            Manage all products
                            from the database.
                        </p>

                    </div>


                    <div className="admin-products-table-wrapper">

                        <table className="admin-products-table">

                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Brand
                                    </th>

                                    <th>
                                        Product
                                    </th>

                                    <th>
                                        Model
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {products.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="no-products"
                                        >
                                            No products found.
                                        </td>

                                    </tr>

                                ) : (

                                    products.map(
                                        (product) => (

                                            <tr
                                                key={
                                                    product.id
                                                }
                                            >

                                                {/* ID */}

                                                <td>
                                                    {
                                                        product.id
                                                    }
                                                </td>


                                                {/* BRAND */}

                                                <td>

                                                    <div className="admin-brand-image">

                                                        {product.brandImageUrl ? (

                                                            <img
                                                                src={
                                                                    product.brandImageUrl
                                                                }
                                                                alt="Brand"
                                                            />

                                                        ) : (

                                                            <span>
                                                                No Logo
                                                            </span>

                                                        )}

                                                    </div>

                                                </td>


                                                {/* PRODUCT */}

                                                <td>

                                                    <strong>
                                                        {
                                                            product.name
                                                        }
                                                    </strong>

                                                </td>


                                                {/* MODEL */}

                                                <td>
                                                    {
                                                        product.model ||
                                                        "—"
                                                    }
                                                </td>


                                                {/* CATEGORY */}

                                                <td>

                                                    <span className="admin-category-badge">

                                                        {
                                                            product.category
                                                        }

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    {
                                                        product.status
                                                            ? "Active"
                                                            : "Inactive"
                                                    }

                                                </td>


                                                {/* ACTIONS */}

                                                <td>

                                                    <div className="admin-action-buttons">

                                                        <button
                                                            type="button"
                                                            className="edit-product-btn"
                                                            onClick={() =>
                                                                editProduct(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="delete-product-btn"
                                                            onClick={() =>
                                                                deleteProduct(
                                                                    product.id
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

            )}

        </div>
    );
}

export default AdminProducts;