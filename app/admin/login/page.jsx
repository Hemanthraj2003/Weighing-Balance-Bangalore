"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/admin.css";

function AdminLogin() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // =========================
    // ADMIN LOGIN
    // =========================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "/api/admin/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (
                !response.ok ||
                !data.success
            ) {

                setError(
                    data.message ||
                    "Invalid username or password"
                );

                return;
            }

            // Login successful
            window.location.href = "/admin";

        } catch (error) {

            console.error(
                "Admin login error:",
                error
            );

            setError(
                "Unable to connect to the server. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // PAGE
    // =========================

    return (

        <div className="admin-login-page">

            <div className="admin-login-box">


                {/* =========================
                    BRAND / ADMIN INFORMATION
                ========================== */}

                <div className="admin-login-brand">

                    <div className="admin-security-icon">
                        🔐
                    </div>

                    <span>
                        WEIGHING BALANCE BANGALORE
                    </span>

                </div>


                {/* =========================
                    HEADER
                ========================== */}

                <div className="admin-login-header">

                    <div className="admin-badge">
                        ADMINISTRATOR
                    </div>

                    <h1>
                        Admin Login
                    </h1>

                    <p>
                        Secure access to the administration panel
                    </p>

                </div>


                {/* =========================
                    SECURITY INFORMATION
                ========================== */}

                <div className="admin-login-info">

                    <strong>
                        Admin Access Only
                    </strong>

                    <p>
                        This portal is restricted to authorized
                        administrators for managing products,
                        categories and customer enquiries.
                    </p>

                </div>


                {/* =========================
                    LOGIN FORM
                ========================== */}

                <form
                    className="admin-login-form"
                    onSubmit={handleLogin}
                >


                    {/* USERNAME */}

                    <div className="admin-form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter admin username"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            autoComplete="username"
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="admin-form-group">

                        <label>
                            Password
                        </label>

                        <div className="admin-password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-eye-button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? "🙈"
                                    : "👁️"
                                }
                            </button>

                        </div>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <p className="admin-login-error">
                            {error}
                        </p>

                    )}


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >

                        {loading
                            ? "SIGNING IN..."
                            : "LOGIN TO ADMIN PANEL"
                        }

                    </button>


                    {/* BACK TO WEBSITE */}

                    <button
                        type="button"
                        className="admin-back-website-button"
                        onClick={() =>
                            router.push("/")
                        }
                    >
                        ← Back to Website
                    </button>

                </form>


                {/* =========================
                    FOOTER SECURITY TEXT
                ========================== */}

                <div className="admin-login-footer">

                    <span>
                        🔒 Secure Admin Portal
                    </span>

                    <span>
                        Authorized Personnel Only
                    </span>

                </div>


            </div>

        </div>

    );

}

export default AdminLogin;