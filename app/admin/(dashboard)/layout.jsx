"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/styles/admin.css";

const API_URL = "";

function AdminLayout({ children }) {

    const router = useRouter();


    // =========================
    // ADMIN LOGOUT
    // =========================

    const handleLogout = async () => {

        try {

            const response = await fetch(
                `${API_URL}/api/admin/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );


            if (response.ok) {

                router.push("/admin/login", {
                    replace: true,
                });

            } else {

                alert(
                    "Unable to logout. Please try again."
                );
            }

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

            alert(
                "Unable to connect to the server."
            );
        }
    };


    return (
        <div className="admin-layout">

            {/* =========================
                SIDEBAR
            ========================== */}

            <aside className="admin-sidebar">


                {/* =========================
                    LOGO
                ========================== */}

                <div className="admin-logo">

                    <h1>
                        WEIGHING
                    </h1>

                    <p>
                        BALANCE ADMIN
                    </p>

                </div>


                <hr />


                {/* =========================
                    NAVIGATION
                ========================== */}

                <nav className="admin-nav">

                    <Link href="/admin">
                        Dashboard
                    </Link>


                    <Link href="/admin/products">
                        Products
                    </Link>


                    <Link href="/admin/add-product">
                        Add Product
                    </Link>


                    {/* =========================
                        CATEGORIES
                    ========================== */}

                    <Link href="/admin/categories">
                        Categories
                    </Link>


                    <Link href="/admin/enquiries">
                        Customer Enquiries
                    </Link>

                </nav>


                {/* =========================
                    BOTTOM ACTIONS
                ========================== */}

                <div className="admin-back">

                    <Link href="/">
                        ← Back to Website
                    </Link>


                    <button
                        type="button"
                        className="admin-logout-btn"
                        onClick={handleLogout}
                    >
                        LOGOUT
                    </button>

                </div>

            </aside>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="admin-content">

                {children}

            </main>

        </div>
    );
}

export default AdminLayout;