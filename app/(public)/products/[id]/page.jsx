"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "@/styles/productdetails.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";


/* =========================================================
   PRODUCT-SPECIFIC FEATURES
========================================================= */

const productFeatures = {

    TAB9T: [
        {
            icon: "◎",
            title: "EMFC Technology",
            description:
                "Electromagnetic force compensation technology supports highly precise and stable weighing."
        },
        {
            icon: "▣",
            title: "Touch Screen Display",
            description:
                "Large touch screen provides convenient access to weighing functions and settings."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Built-in calibration helps maintain dependable weighing accuracy."
        },
        {
            icon: "◈",
            title: "GLP Data Support",
            description:
                "Supports laboratory documentation and traceable weighing information."
        },
        {
            icon: "ϟ",
            title: "Advanced Weighing Functions",
            description:
                "Supports practical functions such as piece counting, percentage and check weighing."
        },
        {
            icon: "✓",
            title: "USB & RS232 Connectivity",
            description:
                "Provides convenient connectivity for compatible data transfer and peripherals."
        }
    ],

    TAB10T: [
        {
            icon: "◎",
            title: "High Precision EMFC Sensor",
            description:
                "EMFC weighing technology provides precise and repeatable measurement performance."
        },
        {
            icon: "▣",
            title: "Touch Screen Operation",
            description:
                "User-friendly touch display makes everyday operation simple and convenient."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Built-in calibration supports reliable measurement accuracy."
        },
        {
            icon: "◈",
            title: "Density Determination",
            description:
                "Supports density measurement applications with compatible accessories."
        },
        {
            icon: "ϟ",
            title: "Multiple Weighing Modes",
            description:
                "Supports useful laboratory functions including percentage and piece counting."
        },
        {
            icon: "✓",
            title: "Data Connectivity",
            description:
                "Communication interfaces support connection with compatible laboratory equipment."
        }
    ],

    TAB21T: [
        {
            icon: "◎",
            title: "Semi-Micro Precision",
            description:
                "Designed for highly accurate measurement of small laboratory samples."
        },
        {
            icon: "▣",
            title: "Advanced Display",
            description:
                "Clear display provides convenient viewing of measurement results."
        },
        {
            icon: "⚖",
            title: "Calibration Support",
            description:
                "Helps maintain consistent and dependable weighing performance."
        },
        {
            icon: "◈",
            title: "Draft Protection",
            description:
                "Protected weighing area helps reduce the influence of air movement."
        },
        {
            icon: "ϟ",
            title: "Fast Stabilization",
            description:
                "Quick response supports efficient laboratory weighing operations."
        },
        {
            icon: "✓",
            title: "Professional Laboratory Use",
            description:
                "Suitable for demanding analytical and research applications."
        }
    ],

    TAB61T: [
        {
            icon: "◎",
            title: "Ultra-High Precision",
            description:
                "Designed for highly sensitive micro weighing and advanced laboratory applications."
        },
        {
            icon: "▣",
            title: "Touch Screen Interface",
            description:
                "Convenient display interface provides easy access to operating functions."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Automatic calibration support helps maintain dependable measurement accuracy."
        },
        {
            icon: "◈",
            title: "Draft Shield Protection",
            description:
                "Helps protect sensitive measurements from air disturbance."
        },
        {
            icon: "ϟ",
            title: "Fast & Stable Results",
            description:
                "Designed to provide stable readings efficiently for sensitive samples."
        },
        {
            icon: "✓",
            title: "Laboratory Connectivity",
            description:
                "Supports communication with compatible laboratory data systems and peripherals."
        }
    ],

    TAB2T: [
        {
            icon: "◎",
            title: "EMFC Weighing Technology",
            description:
                "Provides accurate and stable analytical weighing performance."
        },
        {
            icon: "▣",
            title: "Touch Screen Display",
            description:
                "Easy-to-use display interface for convenient laboratory operation."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Built-in calibration helps maintain reliable measurement performance."
        },
        {
            icon: "◈",
            title: "Draft Shield",
            description:
                "Helps reduce air disturbance during sensitive analytical weighing."
        },
        {
            icon: "ϟ",
            title: "Multiple Weighing Functions",
            description:
                "Supports common functions such as percentage and piece counting."
        },
        {
            icon: "✓",
            title: "Data Connectivity",
            description:
                "Supports communication with compatible printers and laboratory systems."
        }
    ],

    TAB3T: [
        {
            icon: "◎",
            title: "High Analytical Accuracy",
            description:
                "Designed for precise and repeatable analytical weighing."
        },
        {
            icon: "▣",
            title: "User-Friendly Display",
            description:
                "Clear operating interface supports convenient daily laboratory use."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Helps maintain dependable weighing accuracy."
        },
        {
            icon: "◈",
            title: "Protected Weighing Chamber",
            description:
                "Draft protection helps improve stability during measurement."
        },
        {
            icon: "ϟ",
            title: "Fast Stabilization",
            description:
                "Provides efficient response for routine analytical work."
        },
        {
            icon: "✓",
            title: "Advanced Laboratory Functions",
            description:
                "Supports practical weighing and measurement applications."
        }
    ],

    TAB5T: [
        {
            icon: "◎",
            title: "0.1mg Analytical Readability",
            description:
                "Designed for precise analytical weighing of laboratory samples."
        },
        {
            icon: "▣",
            title: "Clear Digital Display",
            description:
                "Provides easy viewing of measurement results and operating information."
        },
        {
            icon: "⚖",
            title: "Reliable Calibration",
            description:
                "Supports calibration procedures for dependable weighing performance."
        },
        {
            icon: "◈",
            title: "Draft Shield",
            description:
                "Helps minimize the effect of air currents during sensitive weighing."
        },
        {
            icon: "ϟ",
            title: "Multiple Weighing Functions",
            description:
                "Suitable for common laboratory functions including percentage and piece counting."
        },
        {
            icon: "✓",
            title: "Professional Laboratory Design",
            description:
                "Designed for dependable use in research, quality control and laboratory environments."
        }
    ],

    EPB6T: [
        {
            icon: "◎",
            title: "EMFC Technology",
            description:
                "Electromagnetic force compensation supports precise and stable weighing."
        },
        {
            icon: "▣",
            title: "Touch Screen Display",
            description:
                "User-friendly touch interface provides convenient access to balance functions."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Built-in calibration helps maintain reliable measurement accuracy."
        },
        {
            icon: "◈",
            title: "Multiple Weighing Units",
            description:
                "Supports different weighing units for versatile laboratory applications."
        },
        {
            icon: "ϟ",
            title: "Piece Counting Function",
            description:
                "Supports efficient counting applications based on sample weight."
        },
        {
            icon: "✓",
            title: "Data Communication",
            description:
                "Connectivity supports communication with compatible peripherals and systems."
        }
    ],

    EPB14T: [
        {
            icon: "◎",
            title: "High Precision Weighing",
            description:
                "Designed for accurate and repeatable professional laboratory measurements."
        },
        {
            icon: "▣",
            title: "Easy-to-Read Display",
            description:
                "Clear display helps users monitor measurement results conveniently."
        },
        {
            icon: "⚖",
            title: "Calibration Support",
            description:
                "Supports dependable calibration for consistent measurement performance."
        },
        {
            icon: "◈",
            title: "Multiple Application Modes",
            description:
                "Suitable for percentage, piece counting and other weighing applications."
        },
        {
            icon: "ϟ",
            title: "Fast Stabilization",
            description:
                "Provides efficient response for productive daily operation."
        },
        {
            icon: "✓",
            title: "Reliable Laboratory Performance",
            description:
                "Designed for professional laboratory and quality control applications."
        }
    ],

    EPB15T: [
        {
            icon: "◎",
            title: "Precise Measurement",
            description:
                "Designed to provide dependable and repeatable precision weighing results."
        },
        {
            icon: "▣",
            title: "Clear Digital Display",
            description:
                "Easy-to-read measurement display supports convenient operation."
        },
        {
            icon: "⚖",
            title: "Calibration Function",
            description:
                "Supports accurate performance through regular calibration procedures."
        },
        {
            icon: "◈",
            title: "Versatile Weighing Functions",
            description:
                "Suitable for multiple professional weighing and measurement applications."
        },
        {
            icon: "ϟ",
            title: "Quick Response",
            description:
                "Fast stabilization helps improve daily weighing productivity."
        },
        {
            icon: "✓",
            title: "Durable Professional Design",
            description:
                "Designed for dependable regular use in laboratories and quality environments."
        }
    ],

    KAB4L: [
        {
            icon: "◎",
            title: "High Precision Performance",
            description:
                "Designed for accurate and repeatable precision weighing applications."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Built-in calibration supports dependable measurement accuracy."
        },
        {
            icon: "◈",
            title: "Density Measurement Support",
            description:
                "Supports density determination applications with compatible accessories."
        },
        {
            icon: "▣",
            title: "Multiple Weighing Functions",
            description:
                "Supports useful applications including percentage, piece counting and check weighing."
        },
        {
            icon: "ϟ",
            title: "Underhook Weighing",
            description:
                "Supports selected below-balance weighing applications."
        },
        {
            icon: "✓",
            title: "Environmental Adaptation",
            description:
                "Operating settings help support stable weighing in different laboratory environments."
        }
    ],

    KAB7L: [
        {
            icon: "◎",
            title: "Precision Weighing",
            description:
                "Designed for accurate and repeatable measurement in professional applications."
        },
        {
            icon: "⚖",
            title: "Internal Calibration",
            description:
                "Helps maintain reliable weighing accuracy during regular operation."
        },
        {
            icon: "◈",
            title: "Density Function Support",
            description:
                "Suitable for density measurement with compatible density accessories."
        },
        {
            icon: "▣",
            title: "Advanced Application Functions",
            description:
                "Supports practical weighing modes for different measurement requirements."
        },
        {
            icon: "ϟ",
            title: "Below-Balance Weighing",
            description:
                "Supports selected underhook weighing applications."
        },
        {
            icon: "✓",
            title: "Stable Laboratory Operation",
            description:
                "Designed for dependable performance in laboratory environments."
        }
    ],

    LMB1: [
        {
            icon: "◎",
            title: "Accurate Moisture Measurement",
            description:
                "Designed for dependable moisture determination of laboratory samples."
        },
        {
            icon: "ϟ",
            title: "Fast Testing",
            description:
                "Supports efficient moisture analysis for routine testing applications."
        },
        {
            icon: "▣",
            title: "Clear Result Display",
            description:
                "Easy viewing of moisture measurement results and test information."
        },
        {
            icon: "⚖",
            title: "1mg Readability",
            description:
                "Provides fine weighing resolution for accurate sample measurement."
        },
        {
            icon: "◈",
            title: "Laboratory Applications",
            description:
                "Suitable for routine moisture analysis and quality control work."
        },
        {
            icon: "✓",
            title: "User-Friendly Operation",
            description:
                "Designed for convenient operation during regular testing."
        }
    ],

    LMB5: [
        {
            icon: "◎",
            title: "Compact Moisture Analyzer",
            description:
                "Space-efficient design suitable for laboratory moisture testing."
        },
        {
            icon: "ϟ",
            title: "Fast Moisture Testing",
            description:
                "Supports efficient moisture determination for routine samples."
        },
        {
            icon: "▣",
            title: "Easy Result Viewing",
            description:
                "Clear display helps users monitor measurement information."
        },
        {
            icon: "⚖",
            title: "Precise Weighing Resolution",
            description:
                "Fine sample measurement supports dependable moisture analysis."
        },
        {
            icon: "◈",
            title: "Routine Laboratory Use",
            description:
                "Suitable for regular testing and quality control applications."
        },
        {
            icon: "✓",
            title: "Simple Operation",
            description:
                "Designed for convenient and efficient everyday use."
        }
    ],

    LMB16: [
        {
            icon: "◎",
            title: "Accurate Moisture Determination",
            description:
                "Designed for dependable moisture analysis of laboratory and industrial samples."
        },
        {
            icon: "ϟ",
            title: "Fast Analysis",
            description:
                "Supports efficient testing for routine moisture measurement."
        },
        {
            icon: "▣",
            title: "Clear Operating Display",
            description:
                "Easy viewing of measurement results and test information."
        },
        {
            icon: "⚖",
            title: "Fine Sample Resolution",
            description:
                "Supports accurate sample weighing for moisture analysis."
        },
        {
            icon: "◈",
            title: "Repeatable Testing",
            description:
                "Designed to support consistent results during routine measurements."
        },
        {
            icon: "✓",
            title: "Professional Applications",
            description:
                "Suitable for laboratory, production and quality control environments."
        }
    ],

    LMB17T: [
        {
            icon: "◎",
            title: "Accurate Moisture Testing",
            description:
                "Designed for dependable and repeatable moisture measurement."
        },
        {
            icon: "ϟ",
            title: "Efficient Analysis",
            description:
                "Supports productive routine testing of different sample materials."
        },
        {
            icon: "▣",
            title: "User-Friendly Interface",
            description:
                "Convenient controls and display simplify everyday operation."
        },
        {
            icon: "⚖",
            title: "Precise Sample Measurement",
            description:
                "Fine weighing resolution supports accurate analysis."
        },
        {
            icon: "◈",
            title: "Quality Control Ready",
            description:
                "Suitable for professional laboratory and quality testing work."
        },
        {
            icon: "✓",
            title: "Reliable Performance",
            description:
                "Designed for consistent moisture determination applications."
        }
    ],

    LMB20: [
        {
            icon: "◎",
            title: "High Sample Capacity",
            description:
                "Designed to handle larger samples for professional moisture analysis."
        },
        {
            icon: "ϟ",
            title: "Efficient Moisture Testing",
            description:
                "Supports dependable analysis for laboratory and industrial applications."
        },
        {
            icon: "▣",
            title: "Clear Measurement Information",
            description:
                "Display supports convenient monitoring of analysis results."
        },
        {
            icon: "⚖",
            title: "1mg Readability",
            description:
                "Fine resolution supports accurate sample weighing."
        },
        {
            icon: "◈",
            title: "Repeatable Results",
            description:
                "Designed to support consistent routine moisture determination."
        },
        {
            icon: "✓",
            title: "Industrial & Laboratory Use",
            description:
                "Suitable for quality control and professional testing applications."
        }
    ],

    EMB11: [
        {
            icon: "◎",
            title: "High Resolution Measurement",
            description:
                "Fine 0.1mg readability supports precise sample measurement."
        },
        {
            icon: "ϟ",
            title: "Fast Moisture Determination",
            description:
                "Designed for efficient analysis of sample moisture content."
        },
        {
            icon: "▣",
            title: "Clear Digital Interface",
            description:
                "Provides convenient viewing of test information and results."
        },
        {
            icon: "⚖",
            title: "Precise Sample Weighing",
            description:
                "High resolution supports accurate moisture analysis."
        },
        {
            icon: "◈",
            title: "Professional Testing Applications",
            description:
                "Suitable for laboratory and quality control moisture determination."
        },
        {
            icon: "✓",
            title: "Dependable Performance",
            description:
                "Designed for accurate and repeatable professional moisture testing."
        }
    ],

    LDK20: [
        {
            icon: "◎",
            title: "Density Determination",
            description:
                "Designed to support density measurement of compatible sample materials."
        },
        {
            icon: "⚖",
            title: "Balance Compatibility",
            description:
                "Designed for use with compatible laboratory weighing instruments."
        },
        {
            icon: "▣",
            title: "Complete Measurement Setup",
            description:
                "Provides the components required for practical density determination."
        },
        {
            icon: "◈",
            title: "Laboratory Applications",
            description:
                "Suitable for research, testing and material measurement applications."
        },
        {
            icon: "ϟ",
            title: "Easy Density Testing",
            description:
                "Supports a convenient workflow for routine density measurement."
        },
        {
            icon: "✓",
            title: "Professional Accessory",
            description:
                "Designed to extend the application capability of compatible balances."
        }
    ]

};


/* =========================================================
   CATEGORY-BASED FEATURES
========================================================= */

const categoryFeatures = {

    "Table Top Balances": [
        {
            icon: "◎",
            title: "Accurate Weighing",
            description:
                "Designed for reliable and repeatable daily weighing."
        },
        {
            icon: "⚖",
            title: "High Capacity Design",
            description:
                "Suitable for routine commercial and industrial weighing applications."
        },
        {
            icon: "▣",
            title: "Clear Digital Display",
            description:
                "Easy-to-read measurement display supports convenient operation."
        },
        {
            icon: "ϟ",
            title: "Fast Stabilization",
            description:
                "Provides quick and stable readings for efficient workflow."
        },
        {
            icon: "◈",
            title: "Durable Construction",
            description:
                "Designed for dependable regular use in professional environments."
        },
        {
            icon: "✓",
            title: "User-Friendly Operation",
            description:
                "Simple controls make routine weighing convenient and efficient."
        }
    ],

    "Platform Balances": [
        {
            icon: "◎",
            title: "Heavy-Duty Weighing",
            description:
                "Designed for dependable weighing of larger loads."
        },
        {
            icon: "⚖",
            title: "High Load Capacity",
            description:
                "Suitable for industrial, warehouse and commercial applications."
        },
        {
            icon: "▣",
            title: "Clear Weight Display",
            description:
                "Provides easy viewing of measurement results."
        },
        {
            icon: "ϟ",
            title: "Stable Measurement",
            description:
                "Designed to provide dependable readings during routine operation."
        },
        {
            icon: "◈",
            title: "Robust Platform Design",
            description:
                "Built for regular professional and industrial use."
        },
        {
            icon: "✓",
            title: "Easy Operation",
            description:
                "Simple operation supports efficient everyday weighing."
        }
    ],

    "Thermal Printers": [
        {
            icon: "◎",
            title: "Measurement Data Printing",
            description:
                "Designed for printing weighing and measurement information."
        },
        {
            icon: "▣",
            title: "Clear Printed Records",
            description:
                "Provides readable documentation for professional record keeping."
        },
        {
            icon: "⚖",
            title: "Compatible Instrument Connection",
            description:
                "Designed for connection with compatible weighing instruments."
        },
        {
            icon: "ϟ",
            title: "Fast Data Output",
            description:
                "Supports efficient printing of measurement information."
        },
        {
            icon: "◈",
            title: "Compact Professional Design",
            description:
                "Suitable for laboratory and professional work environments."
        },
        {
            icon: "✓",
            title: "Easy Operation",
            description:
                "Designed for convenient routine data documentation."
        }
    ],

    "Dot Matrix Printers": [
        {
            icon: "◎",
            title: "Measurement Data Printing",
            description:
                "Designed for printing weighing and measurement information."
        },
        {
            icon: "▣",
            title: "Clear Printed Records",
            description:
                "Provides readable documentation for professional record keeping."
        },
        {
            icon: "⚖",
            title: "Compatible Instrument Connection",
            description:
                "Designed for connection with compatible weighing instruments."
        },
        {
            icon: "ϟ",
            title: "Fast Data Output",
            description:
                "Supports efficient printing of measurement information."
        },
        {
            icon: "◈",
            title: "Compact Professional Design",
            description:
                "Suitable for laboratory and professional work environments."
        },
        {
            icon: "✓",
            title: "Easy Operation",
            description:
                "Designed for convenient routine data documentation."
        }
    ],

    accessories: [
        {
            icon: "◎",
            title: "Specialized Laboratory Accessory",
            description:
                "Designed to extend the capability of compatible instruments."
        },
        {
            icon: "⚖",
            title: "Compatible Operation",
            description:
                "Suitable for use with relevant laboratory weighing equipment."
        },
        {
            icon: "▣",
            title: "Practical Design",
            description:
                "Supports convenient use in professional applications."
        },
        {
            icon: "ϟ",
            title: "Efficient Workflow",
            description:
                "Helps support specialized weighing and measurement tasks."
        },
        {
            icon: "◈",
            title: "Laboratory Ready",
            description:
                "Suitable for research, testing and quality applications."
        },
        {
            icon: "✓",
            title: "Reliable Accessory Solution",
            description:
                "Designed for dependable professional use."
        }
    ]

};


/* =========================================================
   PRODUCT DETAILS COMPONENT
========================================================= */

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    /* =====================================================
       LOAD PRODUCT FROM SPRING BOOT API
    ===================================================== */

    useEffect(() => {

        let isMounted = true;

        setLoading(true);
        setError("");

        fetch(`${API_URL}/api/products/${id}`)
            .then((response) => {

                if (response.status === 404) {
                    throw new Error("Product Not Found");
                }

                if (!response.ok) {
                    throw new Error("Failed to load product");
                }

                return response.json();
            })
            .then((data) => {

                if (!isMounted) {
                    return;
                }

                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {

                if (!isMounted) {
                    return;
                }

                console.error(
                    "Product Details API Error:",
                    error
                );

                setError(error.message);
                setLoading(false);
            });

        return () => {
            isMounted = false;
        };

    }, [id]);


    /* =====================================================
       SEO
    ===================================================== */

    useEffect(() => {

        if (!product) {
            return;
        }

        const categoryName =
            product.categoryName ||
            product.category ||
            "Laboratory Balance";

        const productImage =
            product.imageUrl ||
            "/images/product-placeholder.png";

        const seoTitle =
            `${product.name}${product.model ? ` ${product.model}` : ""} | Weighing Balance Bangalore`;

        const seoDescription =
            `${product.name}${product.model ? ` ${product.model}` : ""} - ${categoryName} for precise and reliable weighing applications. Weighing Balance Bangalore provides laboratory, analytical and professional weighing solutions in Bangalore.`;

        const canonicalUrl =
            `${window.location.origin}/products/${product.id}`;

        document.title = seoTitle;


        const updateMetaTag = (
            attribute,
            value,
            content
        ) => {

            let element =
                document.head.querySelector(
                    `meta[${attribute}="${value}"]`
                );

            if (!element) {

                element =
                    document.createElement("meta");

                element.setAttribute(
                    attribute,
                    value
                );

                document.head.appendChild(element);
            }

            element.setAttribute(
                "content",
                content
            );
        };


        /* DESCRIPTION */

        updateMetaTag(
            "name",
            "description",
            seoDescription
        );


        /* ROBOTS */

        updateMetaTag(
            "name",
            "robots",
            "index, follow"
        );


        /* OPEN GRAPH */

        updateMetaTag(
            "property",
            "og:title",
            seoTitle
        );

        updateMetaTag(
            "property",
            "og:description",
            seoDescription
        );

        updateMetaTag(
            "property",
            "og:type",
            "product"
        );

        updateMetaTag(
            "property",
            "og:url",
            canonicalUrl
        );

        updateMetaTag(
            "property",
            "og:image",
            productImage
        );


        /* TWITTER */

        updateMetaTag(
            "name",
            "twitter:card",
            "summary_large_image"
        );

        updateMetaTag(
            "name",
            "twitter:title",
            seoTitle
        );

        updateMetaTag(
            "name",
            "twitter:description",
            seoDescription
        );

        updateMetaTag(
            "name",
            "twitter:image",
            productImage
        );


        /* CANONICAL */

        let canonical =
            document.head.querySelector(
                'link[rel="canonical"]'
            );

        if (!canonical) {

            canonical =
                document.createElement("link");

            canonical.setAttribute(
                "rel",
                "canonical"
            );

            document.head.appendChild(canonical);
        }

        canonical.setAttribute(
            "href",
            canonicalUrl
        );


        /* CLEANUP */

        return () => {

            document.title =
                "Weighing Balance Bangalore | Precision Weighing Balances & Scales";
        };

    }, [product]);


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (
            <div className="product-not-found">

                <h2>
                    Loading Product...
                </h2>

                <p>
                    Please wait while we load the product details.
                </p>

            </div>
        );
    }


    /* =====================================================
       PRODUCT NOT FOUND / ERROR
    ===================================================== */

    if (!product || error) {

        return (
            <div className="product-not-found">

                <h2>
                    Product Not Found
                </h2>

                <p>
                    The product you are looking for is not available.
                </p>

                <Link href="/products"
                    className="back-products-btn"
                >
                    Back to Products
                </Link>

            </div>
        );
    }


    /* =====================================================
       SELECT FEATURES
       
       IMPORTANT:
       DATABASE FEATURES ARE USED FIRST.
    ===================================================== */

    const parseDatabaseFeatures = (featureText) => {

        if (!featureText) {
            return [];
        }

        const text = String(featureText).trim();

        if (!text) {
            return [];
        }

        /*
           Supports multiple formats:

           High Accuracy
           Easy Operation
           Large Display

           OR

           High Accuracy | Easy Operation | Large Display

           OR

           Capacity: 2.1g
           Readability: 0.001mg
        */

        const items = text
            .split(/\r?\n|\|/)
            .map((item) => item.trim())
            .filter(Boolean);

        return items.map((item) => {

            /*
               Format:

               Title: Description
            */

            if (item.includes(":")) {

                const parts = item.split(":");

                const title =
                    parts.shift().trim();

                const description =
                    parts.join(":").trim();

                return {
                    icon: "✓",
                    title: title || "Feature",
                    description:
                        description || item,
                };
            }


            /*
               Normal feature:

               High Accuracy
            */

            return {
                icon: "✓",
                title: item,
                description: "",
            };

        });

    };


    /* =====================================================
       GET FEATURES FROM DATABASE
    ===================================================== */

    const databaseFeatures =
        parseDatabaseFeatures(product.features);


    /* =====================================================
       OLD FALLBACK FEATURES
       
       Existing products without database features
       will continue using the old feature system.
    ===================================================== */

    const modelKey = (
        product.model ||
        product.name ||
        ""
    )
        .split(",")[0]
        .split("/")[0]
        .trim()
        .toUpperCase();


    const fallbackFeatures =
        productFeatures[modelKey] ||
        categoryFeatures[product.category] ||
        categoryFeatures.accessories;


    /* =====================================================
       FINAL FEATURES

       New/Admin product features:
       USE DATABASE FEATURES

       Existing products:
       USE OLD FEATURES
    ===================================================== */

    const features =
        databaseFeatures.length > 0
            ? databaseFeatures
            : fallbackFeatures;


    /* =====================================================
       PRODUCT INFORMATION
    ===================================================== */

    const categoryName =
        product.categoryName ||
        product.category ||
        "Laboratory Balance";


    const productDescription =
        product.description ||
        `${product.name} is designed for accurate and reliable weighing applications. It offers dependable performance and convenient operation for laboratory and professional use.`;


    /* =====================================================
       PRODUCT IMAGE
    ===================================================== */

    const productImage =
        product.imageUrl ||
        "/images/product-placeholder.png";


    /* =====================================================
       PRODUCT PDF
    ===================================================== */

    const productPdf =
        product.pdfUrl || "";


    /* =====================================================
       WHATSAPP MESSAGES
    ===================================================== */

    const whatsappMessage =
        encodeURIComponent(
            `Hello, I am interested in ${product.name} (${product.model || ""}). Please provide more information.`
        );


    const pdfRequestMessage =
        encodeURIComponent(
            `Hello, I would like the product brochure for ${product.name} (${product.model || ""}). Please send it to me.`
        );


    /* =====================================================
       PAGE
    ===================================================== */

    return (

        <div className="product-details-page">


            {/* =================================================
               BREADCRUMB
            ================================================= */}

            <div className="details-breadcrumb">

                <Link href="/">
                    Home
                </Link>

                <span className="breadcrumb-arrow">
                    ›
                </span>

                <Link href="/products">
                    Products
                </Link>

                <span className="breadcrumb-arrow">
                    ›
                </span>

                <span>
                    {categoryName}
                </span>

            </div>


            {/* =================================================
               MAIN PRODUCT SECTION
            ================================================= */}

            <div className="product-details-main">


                {/* =================================================
                   LEFT SIDE - PRODUCT IMAGE
                ================================================= */}

                <div className="product-details-image-section">

                    <div className="product-details-image-box">

                        <img
                            src={productImage}
                            alt={`${product.name} ${product.model || ""} weighing balance in Bangalore`}
                            onError={(event) => {
                                event.currentTarget.src =
                                    "/images/product-placeholder.png";
                            }}
                        />

                    </div>

                </div>


                {/* =================================================
                   RIGHT SIDE - PRODUCT INFORMATION
                ================================================= */}

                <div className="product-details-content">


                    {/* CATEGORY */}

                    <div className="details-category">
                        {categoryName}
                    </div>


                    {/* PRODUCT NAME */}

                    <h1>
                        {product.name}
                    </h1>


                    {/* MODEL */}

                    <div className="details-model">

                        Model:

                        {" "}

                        <strong>
                            {product.model}
                        </strong>

                    </div>


                    {/* DIVIDER */}

                    <div className="details-line">
                    </div>


                    {/* DESCRIPTION */}

                    <p className="details-description">
                        {productDescription}
                    </p>


                    {/* =================================================
                       FEATURES
                    ================================================= */}

                    <div className="details-features">

                        {features.map(
                            (feature, index) => (

                                <div
                                    className="details-feature-item"
                                    key={index}
                                >

                                    <div className="feature-icon">
                                        {feature.icon}
                                    </div>

                                    <div className="feature-content">

                                        <h3>
                                            {feature.title}
                                        </h3>

                                        {feature.description && (
                                            <p>
                                                {feature.description}
                                            </p>
                                        )}

                                    </div>

                                </div>

                            )
                        )}

                    </div>


                    {/* =================================================
                       ACTION BUTTONS
                    ================================================= */}

                    <div className="details-action-buttons">


                        {/* =================================================
                           PRODUCT PDF
                        ================================================= */}

                        {productPdf ? (

                            <a
                                href={productPdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="download-pdf-btn"
                                aria-label={`Download ${product.name} ${product.model || ""} product PDF`}
                            >

                                <span className="button-icon">
                                    ▧
                                </span>

                                <div>

                                    <strong>
                                        GET PRODUCT PDF
                                    </strong>

                                    <small>
                                        Download product brochure
                                    </small>

                                </div>

                            </a>

                        ) : (

                            <a
                                href={`https://wa.me/917022191487?text=${pdfRequestMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="download-pdf-btn"
                                aria-label={`Request ${product.name} ${product.model || ""} product PDF`}
                            >

                                <span className="button-icon">
                                    ▧
                                </span>

                                <div>

                                    <strong>
                                        REQUEST PRODUCT PDF
                                    </strong>

                                    <small>
                                        Contact us for product brochure
                                    </small>

                                </div>

                            </a>

                        )}


                        {/* =================================================
                           WHATSAPP CONTACT
                        ================================================= */}

                        <a
                            href={`https://wa.me/919590451006?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="details-contact-btn"
                            aria-label={`Contact Weighing Balance Bangalore about ${product.name}`}
                        >

                            <span className="button-icon">
                                ☎
                            </span>

                            <div>

                                <strong>
                                    GET CONTACT
                                </strong>

                                <small>
                                    Send your inquiry or request a quote
                                </small>

                            </div>

                        </a>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default ProductDetails;