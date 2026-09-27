"use client";

import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-logo">
          <Link href="/">
            <img
              src="/logo.jpeg"
              alt="Weighing Balance Bangalore"
            />
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="navbar-links">
          <Link href="/">
            Home
          </Link>

          <Link href="/about">
            About Us
          </Link>

          <Link href="/products">
            Products
          </Link>

          <Link href="/applications">
            Applications
          </Link>

          <Link href="/blog">
            Blog
          </Link>

          <Link href="/contact">
            Contact Us
          </Link>

          {/* ADMIN LOGIN */}
          <Link
            href="/admin/login"
            className="navbar-login-btn"
          >
            <span className="login-icon">
              ⌕
            </span>
            <span>
              LOGIN
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
