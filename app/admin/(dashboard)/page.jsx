"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = "";

function AdminDashboard() {

    const [products, setProducts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);

    const [loading, setLoading] = useState(true);


    // =========================
    // LOAD DASHBOARD DATA
    // =========================

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const [productsResponse, enquiriesResponse] =
                await Promise.all([

                    fetch(
                        `${API_URL}/api/products`,
                        {
                            credentials: "include",
                        }
                    ),

                    fetch(
                        `${API_URL}/api/enquiries`,
                        {
                            credentials: "include",
                        }
                    ),

                ]);


            if (
                !productsResponse.ok ||
                !enquiriesResponse.ok
            ) {
                throw new Error(
                    "Unable to load dashboard data"
                );
            }


            const productsData =
                await productsResponse.json();

            const enquiriesData =
                await enquiriesResponse.json();


            setProducts(productsData);
            setEnquiries(enquiriesData);

        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // =========================
    // LOAD ON PAGE OPEN
    // =========================

    useEffect(() => {

        loadDashboard();

    }, []);


    // =========================
    // COUNTS
    // =========================

    const totalProducts =
        products.length;


    const totalEnquiries =
        enquiries.length;


    const newEnquiries =
        enquiries.filter(
            (enquiry) =>
                enquiry.status === "NEW"
        ).length;


    const contactedEnquiries =
        enquiries.filter(
            (enquiry) =>
                enquiry.status === "CONTACTED"
        ).length;


    // =========================
    // RECENT ENQUIRIES
    // =========================

    const recentEnquiries =
        [...enquiries]
            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )
            .slice(0, 5);


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="admin-dashboard">

                <div className="admin-page-header">

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Loading dashboard...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    return (
        <div className="admin-dashboard">


            {/* =========================
                HEADER
            ========================== */}

            <div className="admin-page-header">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Overview of your weighing
                        balance website.
                    </p>

                </div>


                <button
                    type="button"
                    onClick={loadDashboard}
                    className="dashboard-refresh-btn"
                >
                    ↻ Refresh
                </button>

            </div>


            {/* =========================
                STAT CARDS
            ========================== */}

            <div className="dashboard-stats">


                {/* PRODUCTS */}

                <div className="dashboard-stat-card">

                    <div className="dashboard-stat-icon">
                        📦
                    </div>

                    <div>

                        <p>
                            Total Products
                        </p>

                        <h2>
                            {totalProducts}
                        </h2>

                    </div>

                </div>


                {/* TOTAL ENQUIRIES */}

                <div className="dashboard-stat-card">

                    <div className="dashboard-stat-icon">
                        📩
                    </div>

                    <div>

                        <p>
                            Total Enquiries
                        </p>

                        <h2>
                            {totalEnquiries}
                        </h2>

                    </div>

                </div>


                {/* NEW ENQUIRIES */}

                <div className="dashboard-stat-card">

                    <div className="dashboard-stat-icon">
                        🆕
                    </div>

                    <div>

                        <p>
                            New Enquiries
                        </p>

                        <h2>
                            {newEnquiries}
                        </h2>

                    </div>

                </div>


                {/* CONTACTED */}

                <div className="dashboard-stat-card">

                    <div className="dashboard-stat-icon">
                        📞
                    </div>

                    <div>

                        <p>
                            Contacted
                        </p>

                        <h2>
                            {contactedEnquiries}
                        </h2>

                    </div>

                </div>

            </div>


            {/* =========================
                QUICK ACTIONS
            ========================== */}

            <div className="dashboard-section">

                <div className="dashboard-section-header">

                    <div>

                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Manage your website
                            quickly.
                        </p>

                    </div>

                </div>


                <div className="dashboard-actions">

                    <Link href="/admin/products"
                        className="dashboard-action-card"
                    >

                        <strong>
                            Manage Products
                        </strong>

                        <span>
                            Add, edit or delete
                            products
                        </span>

                    </Link>


                    <Link href="/admin/add-product"
                        className="dashboard-action-card"
                    >

                        <strong>
                            Add Product
                        </strong>

                        <span>
                            Add a new weighing
                            product
                        </span>

                    </Link>


                    <Link href="/admin/enquiries"
                        className="dashboard-action-card"
                    >

                        <strong>
                            Customer Enquiries
                        </strong>

                        <span>
                            View and manage
                            enquiries
                        </span>

                    </Link>

                </div>

            </div>


            {/* =========================
                RECENT ENQUIRIES
            ========================== */}

            <div className="dashboard-section">

                <div className="dashboard-section-header">

                    <div>

                        <h2>
                            Recent Enquiries
                        </h2>

                        <p>
                            Latest customer enquiries
                        </p>

                    </div>


                    <Link href="/admin/enquiries"
                        className="dashboard-view-all"
                    >
                        View All
                    </Link>

                </div>


                {recentEnquiries.length === 0 ? (

                    <div className="dashboard-empty">

                        <p>
                            No customer enquiries yet.
                        </p>

                    </div>

                ) : (

                    <div className="dashboard-enquiries-table-wrapper">

                        <table className="dashboard-enquiries-table">

                            <thead>

                                <tr>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Message
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {recentEnquiries.map(
                                    (enquiry) => (

                                        <tr
                                            key={
                                                enquiry.id
                                            }
                                        >

                                            <td>

                                                <strong>
                                                    {
                                                        enquiry.customerName ||
                                                        "-"
                                                    }
                                                </strong>

                                                {enquiry.companyName && (

                                                    <small>
                                                        {
                                                            enquiry.companyName
                                                        }
                                                    </small>

                                                )}

                                            </td>


                                            <td>
                                                {
                                                    enquiry.phone ||
                                                    "-"
                                                }
                                            </td>


                                            <td>
                                                {
                                                    enquiry.email ||
                                                    "-"
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className="dashboard-message"
                                                    title={
                                                        enquiry.message
                                                    }
                                                >
                                                    {
                                                        enquiry.message ||
                                                        "-"
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                <span
                                                    className={`dashboard-status status-${(
                                                        enquiry.status ||
                                                        "NEW"
                                                    ).toLowerCase()}`}
                                                >
                                                    {
                                                        enquiry.status ||
                                                        "NEW"
                                                    }
                                                </span>

                                            </td>


                                            <td>

                                                {enquiry.createdAt
                                                    ? new Date(
                                                        enquiry.createdAt
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )
                                                    : "-"
                                                }

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminDashboard;