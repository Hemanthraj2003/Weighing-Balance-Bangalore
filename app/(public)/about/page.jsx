"use client";

import { useEffect } from "react";
import "@/styles/about.css";

const About = () => {
    useEffect(() => {
        document.title =
            "About Weighing Balance Banglore | Precision Weighing & Laboratory Instruments";
    }, []);

    const advantages = [
        {
            icon: "✦",
            title: "Product Quality",
            text: "Reliable weighing and laboratory instruments designed for accurate and dependable performance.",
        },
        {
            icon: "💡",
            title: "Innovation",
            text: "Modern weighing solutions for laboratories, research, industrial and quality control applications.",
        },
        {
            icon: "⚙",
            title: "Reliable Service",
            text: "Professional support to help customers choose the right weighing solution for their requirements.",
        },
        {
            icon: "◉",
            title: "Customer Support",
            text: "Dedicated assistance for product enquiries, technical guidance and customer requirements.",
        },
        {
            icon: "🤝",
            title: "Value for Money",
            text: "High-quality laboratory and weighing instruments offering dependable performance and long-term value.",
        },
        {
            icon: "✓",
            title: "Trusted Solutions",
            text: "Reliable precision weighing solutions for laboratories, industries, research and educational institutions.",
        },
    ];

    return (
        <main className="about-page">

            {/* SEO FRIENDLY BANNER */}
            <section className="about-banner">
                <div className="about-container">
                    <h1>About Weighing Balance Banglore</h1>

                    <div className="about-breadcrumb">
                        <span>Home</span>
                        <span>/</span>
                        <strong>About Us</strong>
                    </div>
                </div>
            </section>


            {/* MAIN ABOUT SECTION */}
            <section className="about-intro-section">
                <div className="about-container">

                    <div className="about-intro-grid">

                        {/* Image */}
                        <div className="about-image-wrapper">
                            <img
                                src="https://res.cloudinary.com/hehl57yx/image/upload/v1790498288/weighing-balance/media/hcfk5yujmgf3w0lxxe44.png"
                                alt="Precision laboratory balances and weighing instruments from Bangalore Lab Balances"
                                className="about-main-image"
                            />
                        </div>


                        {/* Content */}
                        <div className="about-content">

                            <span className="about-small-title">
                                About Weighing Balance Banglore
                            </span>

                            <h2>
                                Precision. Accuracy. Reliability.
                            </h2>

                            <div className="about-title-line"></div>

                            <p>
                                <strong>Weighing Balance Banglore</strong> is a trusted
                                supplier of precision weighing and laboratory
                                instruments, providing reliable measurement solutions
                                for laboratories, industries, research institutions,
                                educational organizations and quality control
                                applications.
                            </p>

                            <p>
                                Our product range includes <strong>Analytical
                                Balances, Precision Balances, Semi Micro Balances,
                                Micro Balances, Moisture Analyzers, Platform Scales,
                                Table Top Balances</strong> and other precision
                                laboratory weighing instruments.
                            </p>

                            <p>
                                With a strong focus on product quality, measurement
                                accuracy and customer satisfaction, we help customers
                                find the right weighing solution for their specific
                                applications. Our goal is to deliver dependable,
                                durable and high-performance instruments supported
                                by professional service.
                            </p>

                            <a href="/products" className="about-primary-btn">
                                Explore Our Products
                                <span>→</span>
                            </a>

                        </div>

                    </div>

                </div>
            </section>


            {/* WHY CHOOSE US */}
            <section className="about-features-section">

                <div className="about-container">

                    <div className="about-section-heading">
                        <span>WHY CHOOSE US</span>
                        <h2>Trusted Precision Weighing Solutions</h2>
                        <div className="about-heading-line"></div>
                    </div>


                    <div className="about-features-grid">

                        {advantages.map((item, index) => (
                            <div
                                className="about-feature-item"
                                key={index}
                            >
                                <div className="about-feature-icon">
                                    {item.icon}
                                </div>

                                <h3>{item.title}</h3>

                                <p>{item.text}</p>
                            </div>
                        ))}

                    </div>

                </div>

            </section>


            {/* PRODUCT EXPERTISE */}
            <section className="about-expertise-section">

                <div className="about-container">

                    <div className="about-expertise-content">

                        <span className="about-small-title">
                            OUR EXPERTISE
                        </span>

                        <h2>
                            Laboratory and Industrial Weighing Instruments
                        </h2>

                        <div className="about-title-line"></div>

                        <p>
                            Bangalore Lab Balances provides weighing solutions for
                            a wide range of measurement requirements. Whether you
                            need high-precision laboratory balances for research
                            and analytical applications or robust industrial scales
                            for daily operations, our product range is designed to
                            support accurate and efficient measurement.
                        </p>

                        <div className="about-product-tags">

                            <span>Analytical Balances</span>
                            <span>Precision Balances</span>
                            <span>Micro Balances</span>
                            <span>Semi Micro Balances</span>
                            <span>Moisture Analyzers</span>
                            <span>Platform Scales</span>
                            <span>Table Top Balances</span>
                            <span>Laboratory Instruments</span>

                        </div>

                    </div>

                </div>

            </section>


            {/* VISION & MISSION */}
            <section className="about-mission-section">

                <div className="about-container">

                    <div className="about-mission-grid">

                        {/* Vision */}
                        <article className="about-mission-card">

                            <div className="about-mission-icon">
                                ◉
                            </div>

                            <div className="about-mission-content">

                                <h2>OUR VISION</h2>

                                <div className="about-card-line"></div>

                                <p>
                                    To be a trusted provider of precision weighing
                                    and laboratory instruments, delivering accurate,
                                    reliable and innovative solutions that support
                                    laboratories, industries, research and quality
                                    measurement applications.
                                </p>

                            </div>

                        </article>


                        {/* Mission */}
                        <article className="about-mission-card">

                            <div className="about-mission-icon">
                                ◎
                            </div>

                            <div className="about-mission-content">

                                <h2>OUR MISSION</h2>

                                <div className="about-card-line"></div>

                                <p>
                                    To provide high-quality laboratory balances and
                                    weighing solutions with reliable products,
                                    professional support and customer-focused
                                    service, helping our customers achieve accurate
                                    and efficient measurement results.
                                </p>

                            </div>

                        </article>

                    </div>

                </div>

            </section>


            {/* SEO CONTENT SECTION */}
            <section className="about-seo-section">

                <div className="about-container">

                    <div className="about-seo-content">

                        <h2>
                            Your Partner for Precision Weighing and Laboratory Solutions
                        </h2>

                        <p>
                            At Weighing Balance Banglore, we understand that accurate
                            measurement is essential for laboratory testing,
                            scientific research, manufacturing, quality control and
                            industrial operations. Our range of precision weighing
                            instruments is selected to meet diverse application
                            requirements while supporting reliable and consistent
                            measurement.
                        </p>

                        <p>
                            From analytical and precision balances to micro balances,
                            moisture analyzers and industrial weighing scales, we
                            provide solutions for organizations looking for
                            dependable laboratory weighing instruments in Bangalore
                            and across India.
                        </p>

                    </div>

                </div>

            </section>


            {/* CTA SECTION */}
            <section className="about-cta-section">

                <div className="about-container">

                    <div className="about-cta-content">

                        <div>
                            <span>GET IN TOUCH</span>

                            <h2>
                                Looking for the Right Weighing Solution?
                            </h2>

                            <p>
                                Contact Bangalore Lab Balances for product
                                information, technical guidance and assistance in
                                selecting the right instrument for your application.
                            </p>
                        </div>

                        <a
                            href="/contact"
                            className="about-cta-btn"
                        >
                            Request a Quote
                        </a>

                    </div>

                </div>

            </section>

        </main>
    );
};

export default About;