"use client";

import { useState } from "react";
import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-logo">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <img
              src="/logo.jpeg"
              alt="Weighing Balance Bangalore"
            />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* NAVIGATION */}
        <nav className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>

          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>

          <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
            Products
          </Link>

          <Link href="/applications" onClick={() => setMobileMenuOpen(false)}>
            Applications
          </Link>

          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
            Blog
          </Link>

          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
            Contact Us
          </Link>

          {/* ADMIN LOGIN */}
          <Link
            href="/admin/login"
            className="navbar-login-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="login-icon">⌕</span>
            <span>LOGIN</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
