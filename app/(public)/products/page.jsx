"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/products.css";

const API_URL = "/api";
const WENSAR_LOGO = "https://res.cloudinary.com/hehl57yx/image/upload/v1790498287/weighing-balance/media/cqockatjkpzj8a1xqriq.png";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedReadability, setSelectedReadability] = useState([]);
    const [selectedCapacity, setSelectedCapacity] = useState([]);
    const [sortBy, setSortBy] = useState("popularity");

    // SEARCH
    const [searchTerm, setSearchTerm] = useState("");

    /* =========================================================
       LOAD PRODUCTS
    ========================================================= */

    useEffect(() => {

        fetch(`${API_URL}/products`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to load products");
                }

                return response.json();
            })
            .then((data) => {

                console.log("PRODUCTS FROM DATABASE:", data);

                setProducts(
                    Array.isArray(data) ? data : []
                );

                setLoading(false);
            })
            .catch((error) => {

                console.error("Product API Error:", error);

                setError("Unable to load products.");

                setLoading(false);
            });

    }, []);

    /* =========================================================
       GET PRODUCT FEATURE VALUE
    ========================================================= */

    const getFeatureValue = (product, label) => {

        const directKey = label.toLowerCase();

        if (
            product[directKey] !== undefined &&
            product[directKey] !== null &&
            product[directKey] !== ""
        ) {
            return String(product[directKey]).trim();
        }

        let features = product.features;

        if (typeof features === "string") {

            features = features
                .split("|")
                .map((item) => item.trim())
                .filter(Boolean);
        }

        if (Array.isArray(features)) {

            const feature = features.find((item) => {

                if (typeof item !== "string") {
                    return false;
                }

                return item
                    .trim()
                    .toLowerCase()
                    .startsWith(`${label.toLowerCase()}:`);
            });

            if (feature) {

                return feature
                    .split(":")
                    .slice(1)
                    .join(":")
                    .trim();
            }
        }

        return "Not Specified";
    };

    /* =========================================================
       CHECK VALID VALUE
    ========================================================= */

    const hasValidValue = (value) => {

        if (value === undefined || value === null) {
            return false;
        }

        const cleanedValue = String(value).trim();

        if (!cleanedValue) {
            return false;
        }

        if (
            cleanedValue.toLowerCase() ===
            "not specified"
        ) {
            return false;
        }

        return true;
    };

    /* =========================================================
       CATEGORY HELPERS

       DISPLAY NAMES ONLY

       Database values are NOT changed.
    ========================================================= */

    const getCategoryName = (product) => {

        const category =
            product.categoryName ||
            product.category ||
            "Other Products";

        const normalized =
            String(category)
                .trim()
                .toLowerCase();

        /* ---------------------------------------------
           ANALYTICAL BALANCES
        --------------------------------------------- */

        if (normalized === "analytical balances") {
            return "Analytical Weighing Balances";
        }

        /* ---------------------------------------------
           SEMI MICRO BALANCES
        --------------------------------------------- */

        if (normalized === "semi micro balances") {
            return "Semi Micro Weighing Balances";
        }

        /* ---------------------------------------------
           PRECISION BALANCES
        --------------------------------------------- */

        if (normalized === "precision balances") {
            return "Precision Weighing Balances";
        }

        /* ---------------------------------------------
           TABLE TOP BALANCES
        --------------------------------------------- */

        if (
            normalized === "table top balances" ||
            normalized === "tabletop balances"
        ) {
            return "Table Top Weighing Balances";
        }

        /* ---------------------------------------------
           PLATFORM BALANCES
        --------------------------------------------- */

        if (normalized === "platform balances") {
            return "Platform Weighing Balances";
        }

        /* ---------------------------------------------
           HIGH PRECISION BALANCES
        --------------------------------------------- */

        if (
            normalized ===
            "high precision balances"
        ) {
            return "High Precision Weighing Balances";
        }

        /* ---------------------------------------------
           DENSITY / MICRO BALANCE
        --------------------------------------------- */

        if (
            normalized ===
            "density balance / micro balance"
        ) {
            return "Density Weighing Balance / Micro Weighing Balance";
        }

        /* ---------------------------------------------
           OTHER CATEGORIES
        --------------------------------------------- */

        if (normalized === "moisture analyzers") {
            return "Moisture Analyzers";
        }

        return String(category).trim();
    };

    /* =========================================================
       CATEGORY VALUE

       Used for filtering.

       Original database value is preserved.
    ========================================================= */

    const getCategoryValue = (product) => {

        return (
            product.category ||
            "Other Products"
        );
    };

    /* =========================================================
       CATEGORY ICONS
    ========================================================= */

    const getCategoryIcon = (categoryName) => {

        const name =
            String(categoryName).toLowerCase();

        if (name.includes("analytical")) {
            return "⚖";
        }

        if (name.includes("precision")) {
            return "⚖";
        }

        if (name.includes("micro")) {
            return "◉";
        }

        if (name.includes("moisture")) {
            return "♨";
        }

        if (name.includes("table")) {
            return "▣";
        }

        if (name.includes("platform")) {
            return "▤";
        }

        if (name.includes("printer")) {
            return "▤";
        }

        if (name.includes("density")) {
            return "◉";
        }

        if (name.includes("gsm")) {
            return "◉";
        }

        if (name.includes("weight")) {
            return "⚖";
        }

        if (name.includes("ionizer")) {
            return "⚡";
        }

        if (name.includes("pad")) {
            return "◫";
        }

        if (name.includes("display")) {
            return "▤";
        }

        if (name.includes("kit")) {
            return "⚙";
        }

        if (name.includes("accessor")) {
            return "⚙";
        }

        return "⚙";
    };

    /* =========================================================
       CREATE PRODUCT CATEGORIES

       Analytical Balances
       analytical balances

       become ONE category.
    ========================================================= */

    const categoryMap = new Map();

    products.forEach((product) => {

        const originalCategory =
            getCategoryValue(product);

        const categoryId =
            String(originalCategory)
                .trim()
                .toLowerCase();

        const name =
            getCategoryName(product);

        if (!categoryMap.has(categoryId)) {

            categoryMap.set(
                categoryId,
                {
                    id: categoryId,
                    name: name,
                    icon: getCategoryIcon(name),
                }
            );
        }
    });

    const categories = [
        {
            id: "all",
            name: "All Products",
            icon: "▦",
        },
        ...Array.from(categoryMap.values()),
    ];

    /* =========================================================
       FILTER OPTIONS
    ========================================================= */

    const readabilityOptions = [
        ...new Set(
            products
                .map((product) =>
                    getFeatureValue(
                        product,
                        "Readability"
                    )
                )
                .filter((value) =>
                    hasValidValue(value)
                )
        ),
    ];

    const capacityOptions = [
        ...new Set(
            products
                .map((product) =>
                    getFeatureValue(
                        product,
                        "Capacity"
                    )
                )
                .filter((value) =>
                    hasValidValue(value)
                )
        ),
    ];

    /* =========================================================
       TOGGLE READABILITY
    ========================================================= */

    const toggleReadability = (value) => {

        setSelectedReadability((previous) => {

            if (previous.includes(value)) {

                return previous.filter(
                    (item) => item !== value
                );
            }

            return [
                ...previous,
                value,
            ];
        });
    };

    /* =========================================================
       TOGGLE CAPACITY
    ========================================================= */

    const toggleCapacity = (value) => {

        setSelectedCapacity((previous) => {

            if (previous.includes(value)) {

                return previous.filter(
                    (item) => item !== value
                );
            }

            return [
                ...previous,
                value,
            ];
        });
    };

    /* =========================================================
       CLEAR FILTERS

       ALSO CLEARS SEARCH
    ========================================================= */

    const clearFilters = () => {

        setSelectedCategory("all");
        setSelectedReadability([]);
        setSelectedCapacity([]);
        setSortBy("popularity");
        setSearchTerm("");
    };

    /* =========================================================
       SELECTED CATEGORY NAME
    ========================================================= */

    const selectedCategoryName =
        selectedCategory === "all"
            ? "All Products"
            : categories.find(
                (category) =>
                    category.id === selectedCategory
            )?.name || "Products";

    /* =========================================================
       FILTER PRODUCTS
    ========================================================= */

    let filteredProducts =
        products.filter((product) => {

            /* ---------------------------------------------
               CATEGORY
            --------------------------------------------- */

            const productCategory =
                String(
                    getCategoryValue(product)
                )
                    .trim()
                    .toLowerCase();

            /* ---------------------------------------------
               READABILITY
            --------------------------------------------- */

            const productReadability =
                getFeatureValue(
                    product,
                    "Readability"
                );

            /* ---------------------------------------------
               CAPACITY
            --------------------------------------------- */

            const productCapacity =
                getFeatureValue(
                    product,
                    "Capacity"
                );

            /* ---------------------------------------------
               CATEGORY MATCH
            --------------------------------------------- */

            const categoryMatch =
                selectedCategory === "all" ||
                productCategory === selectedCategory;

            /* ---------------------------------------------
               READABILITY MATCH
            --------------------------------------------- */

            const readabilityMatch =
                selectedReadability.length === 0 ||
                selectedReadability.includes(
                    productReadability
                );

            /* ---------------------------------------------
               CAPACITY MATCH
            --------------------------------------------- */

            const capacityMatch =
                selectedCapacity.length === 0 ||
                selectedCapacity.includes(
                    productCapacity
                );

            /* ---------------------------------------------
               SEARCH MATCH

               Searches:
               - Product Name
               - Model
               - Category
            --------------------------------------------- */

            const searchValue =
                searchTerm
                    .trim()
                    .toLowerCase();

            const productName =
                String(
                    product.name || ""
                ).toLowerCase();

            const productModel =
                String(
                    product.model || ""
                ).toLowerCase();

            const productCategoryName =
                String(
                    getCategoryName(product) || ""
                ).toLowerCase();

            const searchMatch =
                !searchValue ||
                productName.includes(searchValue) ||
                productModel.includes(searchValue) ||
                productCategoryName.includes(searchValue);

            /* ---------------------------------------------
               FINAL MATCH
            --------------------------------------------- */

            return (
                categoryMatch &&
                readabilityMatch &&
                capacityMatch &&
                searchMatch
            );
        });

    /* =========================================================
       SORT PRODUCTS
    ========================================================= */

    if (sortBy === "name-asc") {

        filteredProducts = [
            ...filteredProducts,
        ].sort(
            (a, b) =>
                (
                    a.name ||
                    a.model ||
                    ""
                ).localeCompare(
                    b.name ||
                    b.model ||
                    ""
                )
        );
    }

    if (sortBy === "name-desc") {

        filteredProducts = [
            ...filteredProducts,
        ].sort(
            (a, b) =>
                (
                    b.name ||
                    b.model ||
                    ""
                ).localeCompare(
                    a.name ||
                    a.model ||
                    ""
                )
        );
    }

    /* =========================================================
       LOADING
    ========================================================= */

    if (loading) {

        return (
            <div className="products-page">

                <div className="no-products">

                    <h2>
                        Loading Products...
                    </h2>

                    <p>
                        Please wait while we
                        load our products.
                    </p>

                </div>

            </div>
        );
    }

    /* =========================================================
       ERROR
    ========================================================= */

    if (error) {

        return (
            <div className="products-page">

                <div className="no-products">

                    <h2>
                        Unable to Load Products
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        Try Again
                    </button>

                </div>

            </div>
        );
    }

    /* =========================================================
       PAGE
    ========================================================= */

    return (

        <div className="products-page">

            {/* TOP BANNER */}

            <section className="products-banner">

                <div className="products-banner-left">

                    <h1>
                        {selectedCategoryName}
                    </h1>

                    <p className="breadcrumb">

                        Home

                        <span>
                            /
                        </span>

                        Products

                        {selectedCategory !== "all" && (
                            <>

                                <span>
                                    /
                                </span>

                                {selectedCategoryName}

                            </>
                        )}

                    </p>

                </div>

                <div className="products-banner-right">

                    <div className="banner-icon">
                        ⚖
                    </div>

                    <div>

                        <h3>
                            High Precision | Accurate | Reliable
                        </h3>

                        <p>
                            Professional laboratory
                            and industrial weighing
                            solutions
                        </p>

                    </div>

                </div>

            </section>

            {/* MAIN PRODUCTS AREA */}

            <section className="products-layout">

                {/* SIDEBAR */}

                <aside className="products-sidebar">

                    {/* PRODUCT CATEGORIES */}

                    <div className="sidebar-box">

                        <h2>
                            PRODUCT CATEGORIES
                        </h2>

                        {categories.map(
                            (category) => (

                                <button
                                    key={category.id}
                                    className={
                                        `category-item ${
                                            selectedCategory ===
                                            category.id
                                                ? "active-category"
                                                : ""
                                        }`
                                    }
                                    onClick={() => {

                                        setSelectedCategory(
                                            category.id
                                        );

                                    }}
                                >

                                    <span className="category-icon">

                                        {category.icon}

                                    </span>

                                    <span>
                                        {category.name}
                                    </span>

                                </button>

                            )
                        )}

                    </div>

                    {/* FILTER BOX */}

                    <div className="sidebar-box filter-box">

                        <h2>
                            FILTER BY
                        </h2>

                        {/* READABILITY */}

                        <h3>
                            Readability
                        </h3>

                        <div className="filter-options">

                            {readabilityOptions.map(
                                (value) => (

                                    <label key={value}>

                                        <input
                                            type="checkbox"
                                            checked={selectedReadability.includes(
                                                value
                                            )}
                                            onChange={() =>
                                                toggleReadability(
                                                    value
                                                )
                                            }
                                        />

                                        <span>
                                            {value}
                                        </span>

                                    </label>

                                )
                            )}

                        </div>

                        {/* CAPACITY */}

                        <h3 className="capacity-heading">
                            Capacity
                        </h3>

                        <div className="filter-options">

                            {capacityOptions.map(
                                (value) => (

                                    <label key={value}>

                                        <input
                                            type="checkbox"
                                            checked={selectedCapacity.includes(
                                                value
                                            )}
                                            onChange={() =>
                                                toggleCapacity(
                                                    value
                                                )
                                            }
                                        />

                                        <span>
                                            {value}
                                        </span>

                                    </label>

                                )
                            )}

                        </div>

                        {/* CLEAR FILTERS */}

                        <button
                            className="clear-filters-btn"
                            onClick={clearFilters}
                        >
                            ↻ Clear Filters
                        </button>

                    </div>

                </aside>

                {/* PRODUCTS CONTENT */}

                <main className="products-content">

                    {/* PRODUCTS TOOLBAR */}

                    <div className="products-toolbar">

                        <p>

                            Showing{" "}

                            {
                                filteredProducts.length > 0
                                    ? `1–${filteredProducts.length}`
                                    : "0"
                            }{" "}

                            of{" "}

                            {filteredProducts.length}{" "}

                            results

                        </p>

                        {/* SEARCH */}

                        <div className="product-search">

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                        {/* SORT */}

                        <div className="sort-area">

                            <span>
                                Sort by:
                            </span>

                            <select
                                value={sortBy}
                                onChange={(event) =>
                                    setSortBy(
                                        event.target.value
                                    )
                                }
                            >

                                <option value="popularity">
                                    Popularity
                                </option>

                                <option value="name-asc">
                                    Name: A-Z
                                </option>

                                <option value="name-desc">
                                    Name: Z-A
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* PRODUCT GRID */}

                    {filteredProducts.length > 0 ? (

                        <div className="products-grid">

                            {filteredProducts.map(
                                (product) => {

                                    const capacity =
                                        getFeatureValue(
                                            product,
                                            "Capacity"
                                        );

                                    const readability =
                                        getFeatureValue(
                                            product,
                                            "Readability"
                                        );

                                    const productName =
                                        product.name ||
                                        "Product";

                                    const model =
                                        hasValidValue(
                                            product.model
                                        )
                                            ? product.model
                                            : "";

                                    const category =
                                        getCategoryName(
                                            product
                                        );

                                    return (

                                        <article
                                            className="product-card"
                                            key={product.id}
                                        >

                                            {/* BRAND IMAGE */}

                                            <div className="product-brand-logo">

                                                <img
                                                    src={
                                                        product.brandImageUrl ||
                                                        WENSAR_LOGO
                                                    }
                                                    alt={
                                                        `${productName} brand`
                                                    }
                                                    onError={(event) => {

                                                        if (
                                                            event.currentTarget
                                                                .dataset
                                                                .fallback ===
                                                            "true"
                                                        ) {

                                                            event.currentTarget.style.display =
                                                                "none";

                                                            return;
                                                        }

                                                        event.currentTarget
                                                            .dataset
                                                            .fallback =
                                                            "true";

                                                        event.currentTarget.src =
                                                            WENSAR_LOGO;

                                                    }}
                                                />

                                            </div>

                                            {/* PRODUCT IMAGE */}

                                            <div className="product-image-box">

                                                {product.imageUrl ? (

                                                    <img
                                                        src={
                                                            product.imageUrl
                                                        }
                                                        alt={
                                                            `${productName}${
                                                                model
                                                                    ? ` - ${model}`
                                                                    : ""
                                                            }`
                                                        }
                                                        onError={(event) => {

                                                            event.currentTarget.style.display =
                                                                "none";

                                                        }}
                                                    />

                                                ) : (

                                                    <div className="product-image-placeholder">

                                                        No Product Image

                                                    </div>

                                                )}

                                            </div>

                                            {/* PRODUCT INFORMATION */}

                                            <div className="product-card-content">

                                                <div className="product-info">

                                                    {/* PRODUCT NAME */}

                                                    <div className="product-info-row">

                                                        <span className="product-info-label">
                                                            Product Name
                                                        </span>

                                                        <span className="product-info-value">
                                                            {productName}
                                                        </span>

                                                    </div>

                                                    {/* MODEL */}

                                                    {hasValidValue(
                                                        product.model
                                                    ) && (

                                                        <div className="product-info-row">

                                                            <span className="product-info-label">
                                                                Model
                                                            </span>

                                                            <span className="product-info-value">
                                                                {product.model}
                                                            </span>

                                                        </div>

                                                    )}

                                                    {/* CAPACITY */}

                                                    {hasValidValue(
                                                        capacity
                                                    ) && (

                                                        <div className="product-info-row">

                                                            <span className="product-info-label">
                                                                Capacity
                                                            </span>

                                                            <span className="product-info-value">
                                                                {capacity}
                                                            </span>

                                                        </div>

                                                    )}

                                                    {/* READABILITY */}

                                                    {hasValidValue(
                                                        readability
                                                    ) && (

                                                        <div className="product-info-row">

                                                            <span className="product-info-label">
                                                                Readability
                                                            </span>

                                                            <span className="product-info-value">
                                                                {readability}
                                                            </span>

                                                        </div>

                                                    )}

                                                    {/* CATEGORY */}

                                                    {hasValidValue(
                                                        category
                                                    ) && (

                                                        <div className="product-info-row category-info-row">

                                                            <span className="product-info-label">
                                                                Category
                                                            </span>

                                                            <span className="product-info-value">
                                                                {category}
                                                            </span>

                                                        </div>

                                                    )}

                                                </div>

                                                {/* VIEW DETAILS */}

                                                <Link href={`/products/${product.id}`}
                                                    className="view-details-link"
                                                >

                                                    View Details

                                                    <span>
                                                        →
                                                    </span>

                                                </Link>

                                                {/* REQUEST QUOTE */}

                                                <Link href={
                                                        `/contact?product=${encodeURIComponent(
                                                            model ||
                                                            productName
                                                        )}`
                                                    }
                                                    className="quote-btn"
                                                >

                                                    Get Contact / Request Quote

                                                </Link>

                                            </div>

                                        </article>

                                    );

                                }
                            )}

                        </div>

                    ) : (

                        <div className="no-products">

                            <h2>
                                No Products Found
                            </h2>

                            <p>
                                Try clearing the filters or
                                selecting another category.
                            </p>

                            <button
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}

                </main>

            </section>

        </div>
    );
};

export default Products;