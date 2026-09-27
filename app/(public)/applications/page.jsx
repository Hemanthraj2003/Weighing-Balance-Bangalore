"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/applications.css";


const applications = [
    {
        id: "pharmaceutical",
        name: "Pharmaceutical Industry",
        icon: "⚛",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498282/weighing-balance/media/u45242vjoxyipeg6vlkm.png",
        description:
            "Accurate weighing for formulation, quality control, and research in pharmaceutical manufacturing.",
    },

    {
        id: "laboratories",
        name: "Laboratories",
        icon: "⚗",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498282/weighing-balance/media/u45242vjoxyipeg6vlkm.png",
        description:
            "Precision instruments for chemical analysis, sample preparation, and routine lab applications.",
    },

    {
        id: "manufacturing",
        name: "Manufacturing",
        icon: "⚙",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498283/weighing-balance/media/x0jllrusgmlsjfl49w9a.png",
        description:
            "Reliable weighing for production, process control, and quality assurance in industries.",
    },

    {
        id: "research",
        name: "Research & Development",
        icon: "🔬",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498281/weighing-balance/media/x3tvdjrqw8cyripqhrvz.png",
        description:
            "High-precision balances for R&D, experimentation, and innovation in scientific research.",
    },

    {
        id: "jewellery",
        name: "Jewellery Industry",
        icon: "♢",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498282/weighing-balance/media/jwu17soluef3tpogfqyz.png",
        description:
            "Accurate and delicate weighing of gold, diamonds, gemstones, and precious materials.",
    },

    {
        id: "food",
        name: "Food Industry",
        icon: "🍴",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498282/weighing-balance/media/jaigfqbcv5gc7tre2o2z.png",
        description:
            "Quality control and portion measurement for food processing and packaging industries.",
    },

    {
        id: "chemical",
        name: "Chemical Industry",
        icon: "⚗",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498281/weighing-balance/media/x3tvdjrqw8cyripqhrvz.png",
        description:
            "Safe and precise weighing for chemicals, reagents, and industrial chemical applications.",
    },

    {
        id: "education",
        name: "Educational Institutions",
        icon: "🎓",
        image: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498281/weighing-balance/media/myxdlmjeijxutthqp99t.png",
        description:
            "Ideal for teaching labs, practical sessions, and student experiments in science and technology.",
    },
];


const applicationAreas = [
    {
        id: "pharmaceutical",
        name: "Pharmaceutical Industry",
        icon: "⚛",
    },
    {
        id: "laboratories",
        name: "Laboratories",
        icon: "⚗",
    },
    {
        id: "manufacturing",
        name: "Manufacturing",
        icon: "⚙",
    },
    {
        id: "research",
        name: "Research & Development",
        icon: "🔬",
    },
    {
        id: "jewellery",
        name: "Jewellery Industry",
        icon: "♢",
    },
    {
        id: "food",
        name: "Food Industry",
        icon: "🍴",
    },
    {
        id: "chemical",
        name: "Chemical Industry",
        icon: "⚗",
    },
    {
        id: "education",
        name: "Educational Institutions",
        icon: "🎓",
    },
];


const Applications = () => {

    const [selectedApplication, setSelectedApplication] =
        useState(null);


    const filteredApplications =
        selectedApplication === null
            ? applications
            : applications.filter(
                (application) =>
                    application.id === selectedApplication
            );


    return (

        <div className="applications-page">


            {/* =========================
                TOP RED BANNER
            ========================= */}

            <section className="applications-banner">

                <div className="applications-banner-left">

                    <h1>Applications</h1>

                    <p>
                        Home <span>/</span> Applications
                    </p>

                </div>


                <div className="applications-banner-right">

                    <div className="applications-banner-icon">
                        ⚗
                    </div>

                    <div>

                        <h3>
                            Precision in Every Application
                        </h3>

                        <p>
                            Reliable weighing solutions for diverse
                            industries and critical applications.
                        </p>

                    </div>

                </div>

            </section>



            {/* =========================
                MAIN CONTENT
            ========================= */}

            <section className="applications-container">


                {/* =========================
                    LEFT SIDEBAR
                ========================= */}

                <aside className="applications-sidebar">


                    <div className="application-sidebar-box">

                        <h2>APPLICATION AREAS</h2>


                        <div className="application-category-list">

                            {applicationAreas.map((area) => (

                                <button
                                    key={area.id}

                                    className={`application-category-button ${
                                        selectedApplication === area.id
                                            ? "active"
                                            : ""
                                    }`}

                                    onClick={() =>
                                        setSelectedApplication(
                                            selectedApplication === area.id
                                                ? null
                                                : area.id
                                        )
                                    }
                                >

                                    <span className="application-category-icon">
                                        {area.icon}
                                    </span>

                                    <span>
                                        {area.name}
                                    </span>

                                </button>

                            ))}

                        </div>

                    </div>



                    {/* =========================
                        HELP BOX
                    ========================= */}

                    <div className="application-help-box">

                        <div className="help-icon">
                            🎧
                        </div>


                        <h3>
                            Need Help Finding the Right
                            <br />
                            Application Solution?
                        </h3>


                        <p>
                            Our experts are here to help you choose
                            the perfect weighing solution.
                        </p>


                        <Link href="/contact"
                            className="application-contact-button"
                        >
                            Contact Us <span>→</span>
                        </Link>

                    </div>


                </aside>



                {/* =========================
                    APPLICATION CARDS
                ========================= */}

                <main className="applications-main">


                    <div className="applications-grid">

                        {filteredApplications.map((application) => (

                            <div
                                className="application-card"
                                key={application.id}
                            >


                                {/* IMAGE */}

                                <div className="application-image-box">

                                    <img
                                        src={application.image}
                                        alt={application.name}
                                    />

                                </div>



                                {/* CARD CONTENT */}

                                <div className="application-card-content">

                                    <h3>
                                        {application.name}
                                    </h3>


                                    <p>
                                        {application.description}
                                    </p>


                                    <Link href={`/products?application=${application.id}`}
                                        className="application-view-link"
                                    >
                                        View Solutions
                                        <span>→</span>
                                    </Link>

                                </div>


                            </div>

                        ))}

                    </div>


                </main>


            </section>



            {/* =========================
                BOTTOM BENEFITS
            ========================= */}

            <section className="application-benefits">


                {/* BENEFIT 1 */}

                <div className="application-benefit">

                    <div className="benefit-icon">
                        ◎
                    </div>

                    <div>

                        <h3>
                            Industry Focused
                        </h3>

                        <p>
                            Solutions designed for specific
                            industry requirements.
                        </p>

                    </div>

                </div>



                {/* BENEFIT 2 */}

                <div className="application-benefit">

                    <div className="benefit-icon">
                        ♢
                    </div>

                    <div>

                        <h3>
                            High Accuracy
                        </h3>

                        <p>
                            Precise and reliable results for
                            critical applications.
                        </p>

                    </div>

                </div>



                {/* BENEFIT 3 */}

                <div className="application-benefit">

                    <div className="benefit-icon">
                        ⚙
                    </div>

                    <div>

                        <h3>
                            Advanced Technology
                        </h3>

                        <p>
                            Latest weighing technology for better
                            performance and efficiency.
                        </p>

                    </div>

                </div>



                {/* BENEFIT 4 */}

                <div className="application-benefit">

                    <div className="benefit-icon">
                        🎧
                    </div>

                    <div>

                        <h3>
                            Expert Support
                        </h3>

                        <p>
                            Dedicated support to help you
                            in every application.
                        </p>

                    </div>

                </div>


            </section>


        </div>

    );

};


export default Applications;