"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import "@/styles/products.css";

const API_URL = "/api";
const WENSAR_LOGO = "https://res.cloudinary.com/hehl57yx/image/upload/v1790498287/weighing-balance/media/cqockatjkpzj8a1xqriq.png";
const LIMIT = 10;

/* =========================================================
   GLASSCARD SKELETON PLACEHOLDER COMPONENT
   Matches real product card layout, specs rows and buttons
========================================================= */
const ProductCardSkeleton = () => (
    <article className="product-card glass-card glass-skeleton">
        {/* Brand logo placeholder */}
        <div className="product-brand-logo skeleton-box">
            <div className="skeleton-line skeleton-brand-line" />
        </div>

        {/* Product image placeholder */}
        <div className="product-image-box skeleton-box">
            <div className="skeleton-image-placeholder">
                <span className="skeleton-image-icon">⚖</span>
            </div>
        </div>

        {/* Product info content placeholder */}
        <div className="product-card-content">
            <div className="product-info">
                {/* Product Name */}
                <div className="product-info-row skeleton-row">
                    <span className="skeleton-line skeleton-label-line" style={{ width: "65%" }} />
                    <span className="skeleton-line skeleton-value-line" style={{ width: "85%" }} />
                </div>

                {/* Model */}
                <div className="product-info-row skeleton-row">
                    <span className="skeleton-line skeleton-label-line" style={{ width: "45%" }} />
                    <span className="skeleton-line skeleton-value-line" style={{ width: "60%" }} />
                </div>

                {/* Capacity */}
                <div className="product-info-row skeleton-row">
                    <span className="skeleton-line skeleton-label-line" style={{ width: "55%" }} />
                    <span className="skeleton-line skeleton-value-line" style={{ width: "50%" }} />
                </div>

                {/* Readability */}
                <div className="product-info-row skeleton-row">
                    <span className="skeleton-line skeleton-label-line" style={{ width: "60%" }} />
                    <span className="skeleton-line skeleton-value-line" style={{ width: "45%" }} />
                </div>

                {/* Category */}
                <div className="product-info-row skeleton-row category-info-row">
                    <span className="skeleton-line skeleton-label-line" style={{ width: "50%" }} />
                    <span className="skeleton-line skeleton-value-line" style={{ width: "75%" }} />
                </div>
            </div>

            {/* View Details button placeholder (matching red button) */}
            <div className="view-details-link skeleton-btn skeleton-btn-red">
                <span>View Details</span>
                <span>→</span>
            </div>

            {/* Request Quote button placeholder (matching green button) */}
            <div className="quote-btn skeleton-btn skeleton-btn-green">
                <span>Get Contact / Request Quote</span>
            </div>
        </div>
    </article>
);

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");

    // Pagination & Infinite Scroll State
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedReadability, setSelectedReadability] = useState([]);
    const [selectedCapacity, setSelectedCapacity] = useState([]);
    const [sortBy, setSortBy] = useState("popularity");

    // Search
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Mobile/Toolbar Filter Drawer State
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    // All database filter options (readability & capacity)
    const [allFilterOptions, setAllFilterOptions] = useState({ readability: [], capacity: [] });

    // Sticky toolbar & search input refs for sticky tracking
    const toolbarRef = useRef(null);
    const searchInputRef = useRef(null);

    // In-memory page cache: cacheKey -> { products, total, totalPages, hasMore }
    const cacheRef = useRef(new Map());

    // Helper: prefetch / pre-cache images in browser HTTP cache
    const prefetchImages = (items) => {
        if (typeof window === "undefined" || !Array.isArray(items)) return;
        items.forEach((item) => {
            if (item.imageUrl) {
                const img = new Image();
                img.src = item.imageUrl;
            }
            if (item.brandImageUrl) {
                const brandImg = new Image();
                brandImg.src = item.brandImageUrl;
            }
        });
    };

    // Helper: read from in-memory cache or sessionStorage
    const getCachedData = (key) => {
        if (cacheRef.current.has(key)) {
            return cacheRef.current.get(key);
        }
        if (typeof window !== "undefined") {
            try {
                const item = sessionStorage.getItem(`wb_cache_${key}`);
                if (item) {
                    const parsed = JSON.parse(item);
                    cacheRef.current.set(key, parsed);
                    return parsed;
                }
            } catch (e) {}
        }
        return null;
    };

    // Helper: write to in-memory cache and sessionStorage
    const setCachedData = (key, data) => {
        cacheRef.current.set(key, data);
        if (typeof window !== "undefined") {
            try {
                sessionStorage.setItem(`wb_cache_${key}`, JSON.stringify(data));
            } catch (e) {}
        }
    };

    // Debounce search input (350ms)
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(searchInput);
        }, 350);
        return () => clearTimeout(handler);
    }, [searchInput]);

    // Fetch all categories for sidebar on mount
    useEffect(() => {
        const cachedCats = getCachedData("all_categories");
        if (cachedCats) {
            setCategoriesList(cachedCats);
        } else {
            fetch(`${API_URL}/categories`)
                .then((res) => (res.ok ? res.json() : []))
                .then((data) => {
                    if (Array.isArray(data)) {
                        setCategoriesList(data);
                        setCachedData("all_categories", data);
                    }
                })
                .catch((err) => console.error("Categories fetch error:", err));
        }
    }, []);

    // Fetch all database filter options (readability & capacity) on mount
    useEffect(() => {
        const cachedFilters = getCachedData("all_filter_options");
        if (cachedFilters) {
            setAllFilterOptions(cachedFilters);
        } else {
            fetch(`${API_URL}/products/filters`)
                .then((res) => (res.ok ? res.json() : null))
                .then((data) => {
                    if (data && Array.isArray(data.readability) && Array.isArray(data.capacity)) {
                        setAllFilterOptions(data);
                        setCachedData("all_filter_options", data);
                    }
                })
                .catch((err) => console.error("Filters fetch error:", err));
        }
    }, []);

    // Core fetch function with caching & batch loading
    const fetchProducts = useCallback(
        async (targetPage, isLoadMore = false) => {
            if (isLoadMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            setError("");

            const rKey = [...selectedReadability].sort().join(",");
            const cKey = [...selectedCapacity].sort().join(",");
            const cacheKey = `${selectedCategory}_${searchTerm.trim().toLowerCase()}_r:${rKey}_c:${cKey}_p${targetPage}`;
            const cached = getCachedData(cacheKey);

            if (cached) {
                if (isLoadMore) {
                    setProducts((prev) => {
                        const existingIds = new Set(prev.map((p) => p.id));
                        const newItems = cached.products.filter((p) => !existingIds.has(p.id));
                        return [...prev, ...newItems];
                    });
                } else {
                    setProducts(cached.products);
                }
                setTotalProducts(cached.total);
                setTotalPages(cached.totalPages);
                setHasMore(cached.hasMore);
                setPage(targetPage);
                prefetchImages(cached.products);
                setLoading(false);
                setLoadingMore(false);
                return;
            }

            try {
                const params = new URLSearchParams({
                    page: String(targetPage),
                    limit: String(LIMIT),
                });
                if (selectedCategory && selectedCategory !== "all") {
                    params.set("category", selectedCategory);
                }
                if (searchTerm.trim()) {
                    params.set("search", searchTerm.trim());
                }
                if (selectedReadability.length > 0) {
                    params.set("readability", selectedReadability.join(","));
                }
                if (selectedCapacity.length > 0) {
                    params.set("capacity", selectedCapacity.join(","));
                }

                const response = await fetch(`${API_URL}/products?${params.toString()}`);
                if (!response.ok) {
                    throw new Error("Failed to load products");
                }

                const data = await response.json();
                const fetchedProducts = Array.isArray(data) ? data : data.products || [];
                const total = data.total ?? fetchedProducts.length;
                const tPages = data.totalPages ?? Math.ceil(total / LIMIT);
                const more = data.hasMore ?? targetPage < tPages;

                const resultToCache = {
                    products: fetchedProducts,
                    total,
                    totalPages: tPages,
                    hasMore: more,
                };
                setCachedData(cacheKey, resultToCache);
                prefetchImages(fetchedProducts);

                if (isLoadMore) {
                    setProducts((prev) => {
                        const existingIds = new Set(prev.map((p) => p.id));
                        const newItems = fetchedProducts.filter((p) => !existingIds.has(p.id));
                        return [...prev, ...newItems];
                    });
                } else {
                    setProducts(fetchedProducts);
                }
                setTotalProducts(total);
                setTotalPages(tPages);
                setHasMore(more);
                setPage(targetPage);
            } catch (err) {
                console.error("Product API Error:", err);
                setError("Unable to load products.");
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [selectedCategory, searchTerm, selectedReadability, selectedCapacity]
    );

    // Re-fetch page 1 when category, search, readability, or capacity changes
    useEffect(() => {
        fetchProducts(1, false);
    }, [fetchProducts]);

    /* =========================================================
       INFINITE SCROLL INTERSECTION OBSERVER
       Triggers loading next 10 products when user reaches
       the 9th product of the current batch.
    ========================================================= */
    const observer = useRef(null);
    const triggerItemRef = useCallback(
        (node) => {
            if (loading || loadingMore) return;
            if (observer.current) observer.current.disconnect();

            if (!node || !hasMore) return;

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
                        fetchProducts(page + 1, true);
                    }
                },
                {
                    root: null,
                    rootMargin: "150px", // Trigger slightly before reaching the 9th item for seamless scrolling
                    threshold: 0.1,
                }
            );

            observer.current.observe(node);
        },
        [loading, loadingMore, hasMore, page, fetchProducts]
    );

    // Disconnect observer on unmount
    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
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

        if (cleanedValue.toLowerCase() === "not specified") {
            return false;
        }

        return true;
    };

    /* =========================================================
       CATEGORY HELPERS
    ========================================================= */
    const getCategoryName = (product) => {
        const category =
            product.categoryName ||
            product.category ||
            "Other Products";

        const normalized = String(category).trim().toLowerCase();

        if (normalized === "analytical balances") {
            return "Analytical Weighing Balances";
        }
        if (normalized === "semi micro balances") {
            return "Semi Micro Weighing Balances";
        }
        if (normalized === "precision balances") {
            return "Precision Weighing Balances";
        }
        if (
            normalized === "table top balances" ||
            normalized === "tabletop balances"
        ) {
            return "Table Top Weighing Balances";
        }
        if (normalized === "platform balances") {
            return "Platform Weighing Balances";
        }
        if (normalized === "high precision balances") {
            return "High Precision Weighing Balances";
        }
        if (normalized === "density balance / micro balance") {
            return "Density Weighing Balance / Micro Weighing Balance";
        }
        if (normalized === "moisture analyzers") {
            return "Moisture Analyzers";
        }

        return String(category).trim();
    };

    const getCategoryValue = (product) => {
        return product.category || "Other Products";
    };

    const getCategoryIcon = (categoryName) => {
        const name = String(categoryName).toLowerCase();

        if (name.includes("analytical")) return "⚖";
        if (name.includes("precision")) return "⚖";
        if (name.includes("micro")) return "◉";
        if (name.includes("moisture")) return "♨";
        if (name.includes("table")) return "▣";
        if (name.includes("platform")) return "▤";
        if (name.includes("printer")) return "▤";
        if (name.includes("density")) return "◉";
        if (name.includes("gsm")) return "◉";
        if (name.includes("weight")) return "⚖";
        if (name.includes("ionizer")) return "⚡";
        if (name.includes("pad")) return "◫";
        if (name.includes("display")) return "▤";
        if (name.includes("kit")) return "⚙";
        if (name.includes("accessor")) return "⚙";

        return "⚙";
    };

    /* =========================================================
       CREATE PRODUCT CATEGORIES FOR SIDEBAR & DRAWER
    ========================================================= */
    const categoryMap = new Map();

    // 1. Populate all categories from DB categories API
    categoriesList.forEach((cat) => {
        const rawName = cat.name || cat;
        const categoryId = String(rawName).trim().toLowerCase();
        const displayName = getCategoryName({ category: rawName });

        if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, {
                id: categoryId,
                name: displayName,
                icon: getCategoryIcon(displayName),
            });
        }
    });

    // 2. Also incorporate any categories from loaded products
    products.forEach((product) => {
        const originalCategory = getCategoryValue(product);
        const categoryId = String(originalCategory).trim().toLowerCase();
        const name = getCategoryName(product);

        if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, {
                id: categoryId,
                name: name,
                icon: getCategoryIcon(name),
            });
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
       FILTER OPTIONS (Readability & Capacity)
    ========================================================= */
    const readabilityOptions =
        allFilterOptions.readability.length > 0
            ? allFilterOptions.readability
            : [
                  ...new Set(
                      products
                          .map((product) => getFeatureValue(product, "Readability"))
                          .filter((value) => hasValidValue(value))
                  ),
              ];

    const capacityOptions =
        allFilterOptions.capacity.length > 0
            ? allFilterOptions.capacity
            : [
                  ...new Set(
                      products
                          .map((product) => getFeatureValue(product, "Capacity"))
                          .filter((value) => hasValidValue(value))
                  ),
              ];

    const toggleReadability = (value) => {
        setSelectedReadability((previous) => {
            if (previous.includes(value)) {
                return previous.filter((item) => item !== value);
            }
            return [...previous, value];
        });
    };

    const toggleCapacity = (value) => {
        setSelectedCapacity((previous) => {
            if (previous.includes(value)) {
                return previous.filter((item) => item !== value);
            }
            return [...previous, value];
        });
    };

    const clearFilters = () => {
        setSelectedCategory("all");
        setSelectedReadability([]);
        setSelectedCapacity([]);
        setSortBy("popularity");
        setSearchInput("");
        setSearchTerm("");
    };

    const selectedCategoryName =
        selectedCategory === "all"
            ? "All Products"
            : categories.find((c) => c.id === selectedCategory)?.name || "Products";

    const activeFiltersCount =
        (selectedCategory !== "all" ? 1 : 0) +
        selectedReadability.length +
        selectedCapacity.length +
        (searchTerm ? 1 : 0);

    /* =========================================================
       PRODUCTS (SERVER-FILTERED BY CATEGORY, SEARCH, READABILITY & CAPACITY)
    ========================================================= */
    let filteredProducts = products;

    /* =========================================================
       SORT PRODUCTS
    ========================================================= */
    if (sortBy === "name-asc") {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            (a.name || a.model || "").localeCompare(b.name || b.model || "")
        );
    }

    if (sortBy === "name-desc") {
        filteredProducts = [...filteredProducts].sort((a, b) =>
            (b.name || b.model || "").localeCompare(a.name || a.model || "")
        );
    }

    /* =========================================================
       ERROR STATE
    ========================================================= */
    if (error && products.length === 0) {
        return (
            <div className="products-page">
                <div className="no-products">
                    <h2>Unable to Load Products</h2>
                    <p>{error}</p>
                    <button onClick={() => fetchProducts(1, false)}>Try Again</button>
                </div>
            </div>
        );
    }

    /* =========================================================
       MAIN RENDER
    ========================================================= */
    return (
        <div className="products-page">
            {/* TOP BANNER */}
            <section className="products-banner">
                <div className="products-banner-left">
                    <h1>{selectedCategoryName}</h1>
                    <p className="breadcrumb">
                        Home
                        <span>/</span>
                        Products
                        {selectedCategory !== "all" && (
                            <>
                                <span>/</span>
                                {selectedCategoryName}
                            </>
                        )}
                    </p>
                </div>

                <div className="products-banner-right">
                    <div className="banner-icon">
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path d="M12 3v17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M10 5.5h4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M4 8h16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                            <path d="M5 8L2.5 14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M5 8L7.5 14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M2.2 14h5.6c0 2.2-1.2 3.5-2.8 3.5s-2.8-1.3-2.8-3.5z" fill="#ffffff" />
                            <path d="M19 8L16.5 14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M19 8L21.5 14" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M16.2 14h5.6c0 2.2-1.2 3.5-2.8 3.5s-2.8-1.3-2.8-3.5z" fill="#ffffff" />
                        </svg>
                    </div>
                    <div>
                        <h3>High Precision | Accurate | Reliable</h3>
                        <p>Professional laboratory and industrial weighing solutions</p>
                    </div>
                </div>
            </section>

            {/* MAIN PRODUCTS AREA */}
            <section className="products-layout">
                {/* DESKTOP STICKY SIDEBAR (Hidden on mobile/tablet) */}
                <aside className="products-sidebar">
                    {/* PRODUCT CATEGORIES */}
                    <div className="sidebar-box">
                        <h2>PRODUCT CATEGORIES</h2>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-item ${
                                    selectedCategory === category.id ? "active-category" : ""
                                }`}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                }}
                            >
                                <span className="category-icon">{category.icon}</span>
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* FILTER BOX */}
                    <div className="sidebar-box filter-box">
                        <h2>FILTER BY</h2>

                        {/* READABILITY */}
                        {readabilityOptions.length > 0 && (
                            <>
                                <h3>Readability</h3>
                                <div className="filter-options">
                                    {readabilityOptions.map((value) => (
                                        <label key={value}>
                                            <input
                                                type="checkbox"
                                                checked={selectedReadability.includes(value)}
                                                onChange={() => toggleReadability(value)}
                                            />
                                            <span>{value}</span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* CAPACITY */}
                        {capacityOptions.length > 0 && (
                            <>
                                <h3 className="capacity-heading">Capacity</h3>
                                <div className="filter-options">
                                    {capacityOptions.map((value) => (
                                        <label key={value}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCapacity.includes(value)}
                                                onChange={() => toggleCapacity(value)}
                                            />
                                            <span>{value}</span>
                                        </label>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* CLEAR FILTERS */}
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            ↻ Clear Filters
                        </button>
                    </div>
                </aside>

                {/* PRODUCTS CONTENT */}
                <main className="products-content">
                    {/* PRODUCTS TOOLBAR (STICKY ON SCROLL - 1 COMPACT ROW: 85% SEARCH, 15% FILTER) */}
                    <div ref={toolbarRef} className="products-toolbar-sticky">
                        <div className="toolbar-main-controls">
                            {/* SEARCH BAR (85%) */}
                            <div className="toolbar-search-box">
                                <div className="product-search">
                                    <svg
                                        className="search-svg-icon"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Search products by model, name, capacity..."
                                        value={searchInput}
                                        onChange={(event) => setSearchInput(event.target.value)}
                                        aria-label="Search products"
                                    />
                                    {searchInput && (
                                        <button
                                            type="button"
                                            className="search-clear-btn"
                                            onClick={() => {
                                                setSearchInput("");
                                                setSearchTerm("");
                                            }}
                                            aria-label="Clear search"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* FILTER BUTTON NEXT TO SEARCH (15%) */}
                            <button
                                type="button"
                                className={`toolbar-filter-btn ${
                                    activeFiltersCount > 0 ? "has-filters" : ""
                                }`}
                                onClick={() => setFilterDrawerOpen(true)}
                                aria-label="Open filter drawer"
                                title="Filter by Category, Readability & Capacity"
                            >
                                <svg
                                    className="filter-svg-icon"
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="4" y1="21" x2="4" y2="14" />
                                    <line x1="4" y1="10" x2="4" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12" y2="3" />
                                    <line x1="20" y1="21" x2="20" y2="16" />
                                    <line x1="20" y1="12" x2="20" y2="3" />
                                    <line x1="1" y1="14" x2="7" y2="14" />
                                    <line x1="9" y1="8" x2="15" y2="8" />
                                    <line x1="17" y1="16" x2="23" y2="16" />
                                </svg>
                                <span className="filter-label-text">Filters</span>
                                {activeFiltersCount > 0 && (
                                    <span className="filter-badge">{activeFiltersCount}</span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* RESULTS COUNT STATUS (NON-STICKY) */}
                    <div className="toolbar-status-row">
                        <p className="toolbar-count-text">
                            {loading && products.length === 0 ? (
                                "Loading products..."
                            ) : (
                                <>
                                    Showing{" "}
                                    <strong>
                                        {filteredProducts.length > 0
                                            ? `1–${filteredProducts.length}`
                                            : "0"}
                                    </strong>{" "}
                                    of <strong>{totalProducts || filteredProducts.length}</strong> results
                                </>
                            )}
                        </p>
                        {activeFiltersCount > 0 && (
                            <button
                                type="button"
                                className="toolbar-quick-clear"
                                onClick={clearFilters}
                            >
                                Reset filters
                            </button>
                        )}
                    </div>

                    {/* PRODUCT GRID */}
                    {loading && products.length === 0 ? (
                        /* INITIAL SKELETON PLACEHOLDERS */
                        <div className="products-grid">
                            {[...Array(9)].map((_, i) => (
                                <ProductCardSkeleton key={`init-skeleton-${i}`} />
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <div className="products-grid">
                                {filteredProducts.map((product, index) => {
                                    const capacity = getFeatureValue(product, "Capacity");
                                    const readability = getFeatureValue(product, "Readability");
                                    const productName = product.name || "Product";
                                    const model = hasValidValue(product.model)
                                        ? product.model
                                        : "";
                                    const category = getCategoryName(product);

                                    // The 9th product of the current batch triggers loading next 10 on scroll
                                    const isTriggerItem =
                                        hasMore &&
                                        index === Math.max(0, filteredProducts.length - 2);

                                    return (
                                        <article
                                            className="product-card glass-card"
                                            key={product.id}
                                            ref={isTriggerItem ? triggerItemRef : null}
                                        >
                                            {/* BRAND IMAGE */}
                                            <div className="product-brand-logo">
                                                <img
                                                    src={product.brandImageUrl || WENSAR_LOGO}
                                                    alt={`${productName} brand`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    onError={(event) => {
                                                        if (
                                                            event.currentTarget.dataset
                                                                .fallback === "true"
                                                        ) {
                                                            event.currentTarget.style.display =
                                                                "none";
                                                            return;
                                                        }
                                                        event.currentTarget.dataset.fallback =
                                                            "true";
                                                        event.currentTarget.src = WENSAR_LOGO;
                                                    }}
                                                />
                                            </div>

                                            {/* PRODUCT IMAGE */}
                                            <div className="product-image-box">
                                                {product.imageUrl ? (
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={`${productName}${
                                                            model ? ` - ${model}` : ""
                                                        }`}
                                                        loading="lazy"
                                                        decoding="async"
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
                                                    {hasValidValue(product.model) && (
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
                                                    {hasValidValue(capacity) && (
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
                                                    {hasValidValue(readability) && (
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
                                                    {hasValidValue(category) && (
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
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    className="view-details-link"
                                                >
                                                    View Details
                                                    <span>→</span>
                                                </Link>

                                                {/* REQUEST QUOTE */}
                                                <Link
                                                    href={`/contact?product=${encodeURIComponent(
                                                        model || productName
                                                    )}`}
                                                    className="quote-btn"
                                                >
                                                    Get Contact / Request Quote
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}

                                {/* SKELETON SHIMMER PLACEHOLDERS DURING INFINITE SCROLL LOAD */}
                                {loadingMore && (
                                    <>
                                        {[...Array(4)].map((_, i) => (
                                            <ProductCardSkeleton key={`more-skeleton-${i}`} />
                                        ))}
                                    </>
                                )}
                            </div>

                            {/* INFINITE SCROLL BOTTOM STATUS */}
                            {totalProducts > 0 && (
                                <div className="infinite-scroll-container">
                                    {/* Progress indicator */}
                                    <div className="pagination-progress">
                                        <span>
                                            Showing <strong>{filteredProducts.length}</strong> of{" "}
                                            <strong>{totalProducts}</strong> products
                                        </span>
                                        <div className="progress-bar-bg">
                                            <div
                                                className="progress-bar-fill"
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        Math.round(
                                                            (filteredProducts.length / totalProducts) * 100
                                                        )
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Loading indicator */}
                                    {loadingMore && (
                                        <div className="infinite-scroll-loading">
                                            <div className="infinite-scroll-spinner" />
                                            <span>Loading next 10 products...</span>
                                        </div>
                                    )}

                                    {/* End of list indicator */}
                                    {!hasMore && filteredProducts.length > 0 && (
                                        <div className="infinite-scroll-end">
                                            <span>✓</span> All {totalProducts} products loaded
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="no-products">
                            <h2>No Products Found</h2>
                            <p>Try clearing the filters or selecting another category.</p>
                            <button onClick={clearFilters}>Clear Filters</button>
                        </div>
                    )}
                </main>
            </section>

            {/* UNIFIED FILTER DRAWER (MODAL / BOTTOM SHEET) */}
            {filterDrawerOpen && (
                <div
                    className="mobile-filter-drawer-overlay"
                    onClick={() => setFilterDrawerOpen(false)}
                >
                    <div
                        className="mobile-filter-drawer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="drawer-header">
                            <h3>Filters & Categories</h3>
                            <button
                                type="button"
                                className="drawer-close-btn"
                                onClick={() => setFilterDrawerOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="drawer-body">
                            {/* ALL PRODUCTS OPTION */}
                            <button
                                type="button"
                                className={`drawer-cat-all ${
                                    selectedCategory === "all" ? "active" : ""
                                }`}
                                onClick={() => setSelectedCategory("all")}
                            >
                                <span className="cat-icon">▦</span>
                                <span>All Products (Show Everything)</span>
                                {selectedCategory === "all" && (
                                    <span className="cat-check">✓</span>
                                )}
                            </button>

                            {/* PRODUCT CATEGORIES (33 categories) */}
                            <div className="drawer-section">
                                <h4>Product Categories ({categories.length - 1})</h4>
                                <div className="drawer-categories-list">
                                    {categories
                                        .filter((c) => c.id !== "all")
                                        .map((category) => (
                                            <button
                                                key={category.id}
                                                type="button"
                                                className={`drawer-cat-item ${
                                                    selectedCategory === category.id
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    setSelectedCategory(category.id);
                                                }}
                                            >
                                                <span className="cat-icon">{category.icon}</span>
                                                <span className="cat-name">{category.name}</span>
                                                {selectedCategory === category.id && (
                                                    <span className="cat-check">✓</span>
                                                )}
                                            </button>
                                        ))}
                                </div>
                            </div>

                            {/* READABILITY */}
                            {readabilityOptions.length > 0 && (
                                <div className="drawer-section">
                                    <h4>Readability</h4>
                                    <div className="drawer-filter-options">
                                        {readabilityOptions.map((value) => (
                                            <label key={value}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedReadability.includes(value)}
                                                    onChange={() => toggleReadability(value)}
                                                />
                                                <span>{value}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CAPACITY */}
                            {capacityOptions.length > 0 && (
                                <div className="drawer-section">
                                    <h4>Capacity</h4>
                                    <div className="drawer-filter-options">
                                        {capacityOptions.map((value) => (
                                            <label key={value}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCapacity.includes(value)}
                                                    onChange={() => toggleCapacity(value)}
                                                />
                                                <span>{value}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="drawer-footer">
                            <button
                                type="button"
                                className="drawer-clear-btn"
                                onClick={clearFilters}
                            >
                                Clear All
                            </button>
                            <button
                                type="button"
                                className="drawer-apply-btn"
                                onClick={() => setFilterDrawerOpen(false)}
                            >
                                Apply Filters ({totalProducts || filteredProducts.length})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;