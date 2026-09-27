"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/blog.css";

const blogPosts = [
    {
        id: 1,
        title: "How to Choose the Right Analytical Balance for Your Laboratory",
        date: "May 10, 2024",
        category: "Analytical Balances",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498284/weighing-balance/media/wbowvr6xtxhnck3ddwic.png",
        description:
            "Choosing the right analytical balance is crucial for accurate and reliable results. Learn the key factors to consider.",
    },
    {
        id: 2,
        title: "Importance of Regular Calibration for Weighing Instruments",
        date: "April 28, 2024",
        category: "Calibration & Maintenance",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498284/weighing-balance/media/bnp20wy7edbdvcsrqamt.png",
        description:
            "Regular calibration ensures accuracy, extends instrument life, and maintains compliance with industry standards.",
    },
    {
        id: 3,
        title: "Top 5 Applications of Precision Balances in Laboratories",
        date: "April 15, 2024",
        category: "Precision Balances",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498285/weighing-balance/media/fecv7w3bahitiocjgqtu.png",
        description:
            "From pharmaceuticals to research labs, precision balances play a vital role in ensuring accurate measurements.",
    },
    {
        id: 4,
        title: "Moisture Analyzers: Ensuring Quality and Consistency",
        date: "April 02, 2024",
        category: "Moisture Analyzers",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498285/weighing-balance/media/jty68wwcaz6y7q4dm5rx.png",
        description:
            "Moisture analysis is essential in many industries. Learn how moisture analyzers improve product quality.",
    },
    {
        id: 5,
        title: "Industrial Scales vs. Laboratory Scales: Key Differences",
        date: "March 20, 2024",
        category: "Industrial Scales",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498285/weighing-balance/media/ly1se70j7a0gpigdfrwv.png",
        description:
            "Understand the key differences between industrial scales and laboratory scales and choose the right one for your needs.",
    },
    {
        id: 6,
        title: "Best Practices for Accurate Weighing in Your Lab",
        date: "March 05, 2024",
        category: "Laboratory Tips",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498284/weighing-balance/media/anlmfyvvssualpdq1rjk.png",
        description:
            "Follow these best practices to minimize errors and achieve accurate and reliable weighing results every time.",
    },
];


const categories = [
    {
        name: "Analytical Balances",
        count: 12,
    },
    {
        name: "Precision Balances",
        count: 10,
    },
    {
        name: "Moisture Analyzers",
        count: 8,
    },
    {
        name: "Industrial Scales",
        count: 9,
    },
    {
        name: "Laboratory Tips",
        count: 15,
    },
    {
        name: "Calibration & Maintenance",
        count: 11,
    },
];


const Blog = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = blogPosts.filter((post) => {

        const searchText = searchTerm.toLowerCase();

        return (
            post.title.toLowerCase().includes(searchText) ||
            post.description.toLowerCase().includes(searchText) ||
            post.category.toLowerCase().includes(searchText)
        );
    });


    const recentPosts = blogPosts.slice(0, 3);


    return (

        <div className="blog-page">

            {/* =========================
                BLOG BANNER
            ========================= */}
            <section className="blog-banner">

                <div className="blog-banner-left">

                    <h1>Our Blog</h1>

                    <p>
                        Home <span>/</span> Blog
                    </p>

                </div>


                <div className="blog-banner-right">

                    <div className="blog-banner-icon">
                        📝
                    </div>

                    <div>

                        <h3>
                            Knowledge. Insights. Innovations.
                        </h3>

                        <p>
                            Stay updated with the latest trends, tips and
                            insights in precision weighing.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                MAIN BLOG CONTENT
            ========================= */}
            <section className="blog-container">


                {/* BLOG POSTS */}
                <main className="blog-main">

                    <div className="blog-grid">

                        {filteredPosts.length > 0 ? (

                            filteredPosts.map((post) => (

                                <article
                                    className="blog-card"
                                    key={post.id}
                                >

                                    {/* IMAGE */}
                                    <div className="blog-image">

                                        <img
                                            src={post.image}
                                            alt={post.title}
                                        />

                                    </div>


                                    {/* CONTENT */}
                                    <div className="blog-content">

                                        {/* DATE */}
                                        <div className="blog-date">

                                            <span className="calendar-icon">
                                                ▣
                                            </span>

                                            {post.date}

                                        </div>


                                        {/* TITLE */}
                                        <h2>
                                            {post.title}
                                        </h2>


                                        {/* DESCRIPTION */}
                                        <p className="blog-description">
                                            {post.description}
                                        </p>


                                        {/* READ MORE */}
                                        <Link href={`/blog/${post.id}`}
                                            className="read-more-link"
                                        >
                                            Read More
                                            <span>→</span>
                                        </Link>

                                    </div>

                                </article>

                            ))

                        ) : (

                            <div className="no-blog-results">

                                <h2>
                                    No Articles Found
                                </h2>

                                <p>
                                    Try searching with another keyword.
                                </p>

                            </div>

                        )}

                    </div>

                </main>


                {/* =========================
                    BLOG SIDEBAR
                ========================= */}
                <aside className="blog-sidebar">


                    {/* SEARCH BLOG */}
                    <div className="blog-sidebar-box search-box">

                        <h3>
                            Search Blog
                        </h3>

                        <div className="search-input-box">

                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                aria-label="Search"
                            >
                                🔍
                            </button>

                        </div>

                    </div>


                    {/* CATEGORIES */}
                    <div className="blog-sidebar-box categories-box">

                        <h3>
                            Categories
                        </h3>

                        <div className="blog-categories">

                            {categories.map((category) => (

                                <div
                                    className="blog-category-item"
                                    key={category.name}
                                >

                                    <span>
                                        {category.name}
                                    </span>

                                    <strong>
                                        ({category.count})
                                    </strong>

                                </div>

                            ))}

                        </div>

                    </div>


                    {/* RECENT POSTS */}
                    <div className="blog-sidebar-box recent-posts-box">

                        <h3>
                            Recent Posts
                        </h3>


                        <div className="recent-posts-list">

                            {recentPosts.map((post) => (

                                <Link href={`/blog/${post.id}`}
                                    className="recent-post"
                                    key={post.id}
                                >

                                    <img
                                        src={post.image}
                                        alt={post.title}
                                    />

                                    <div>

                                        <h4>
                                            {post.title}
                                        </h4>

                                        <p>
                                            {post.date}
                                        </p>

                                    </div>

                                </Link>

                            ))}

                        </div>


                        <Link href="/blog"
                            className="view-all-posts"
                            onClick={() => setSearchTerm("")}
                        >
                            View All Posts
                            <span>→</span>
                        </Link>

                    </div>


                </aside>

            </section>

        </div>
    );
};


export default Blog;