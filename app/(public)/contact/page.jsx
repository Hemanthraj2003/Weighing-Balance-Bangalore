"use client";

import { useState } from "react";
import "@/styles/contact.css";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [responseType, setResponseType] = useState("");


    /* =====================================================
       HANDLE INPUT CHANGE
    ===================================================== */

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    /* =====================================================
       HANDLE FORM SUBMIT
    ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSubmitting(true);
        setResponseMessage("");
        setResponseType("");


        const enquiryMessage = `
Subject: ${formData.subject}

${formData.message}
        `.trim();


        const enquiryData = {

            customerName: formData.name,

            companyName: formData.company,

            phone: formData.phone,

            email: formData.email,

            productId: null,

            message: enquiryMessage,

            status: "NEW"

        };


        try {

            /* =============================================
               SAVE ENQUIRY TO SPRING BOOT
            ============================================= */

            const response = await fetch(
                "/api/enquiries",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(enquiryData),
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to submit enquiry"
                );

            }


            const savedEnquiry =
                await response.json();

            console.log(
                "Enquiry saved:",
                savedEnquiry
            );


            /* =============================================
               SUCCESS MESSAGE
            ============================================= */

            setResponseMessage(
                "Thank you! Your enquiry has been submitted successfully."
            );

            setResponseType("success");


            /* =============================================
               OPEN WHATSAPP
            ============================================= */

            const whatsappMessage = `
Hello Weighing Balance Bangalore,

Name: ${formData.name}
Company: ${formData.company}
Phone: ${formData.phone}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
            `;

            const whatsappUrl =
                `https://wa.me/917022191487?text=${encodeURIComponent(
                    whatsappMessage
                )}`;


            window.open(
                whatsappUrl,
                "_blank"
            );


            /* =============================================
               CLEAR FORM
            ============================================= */

            setFormData({
                name: "",
                company: "",
                phone: "",
                email: "",
                subject: "",
                message: "",
            });


        } catch (error) {

            console.error(
                "Enquiry submission error:",
                error
            );

            setResponseMessage(
                "Unable to submit your enquiry. Please try again."
            );

            setResponseType("error");

        } finally {

            setSubmitting(false);

        }

    };


    /* =====================================================
       NEW CUBBONPET LOCATION
    ===================================================== */

    const mapQuery = encodeURIComponent(
        "Weighing Balance Bangalore, No.5/4, 3rd Floor, 4th Cross, Beside Vinayaka School, Cubbonpet, Bengaluru, Karnataka 560002"
    );


    const mapUrl =
        `https://www.google.com/maps?q=${mapQuery}&output=embed`;


    const locationUrl =
        `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;


    return (

        <div className="contact-page">


            {/* =====================================================
                CONTACT BANNER
            ===================================================== */}

            <section className="contact-banner">

                <div className="contact-banner-left">

                    <h1>
                        Contact Us
                    </h1>

                    <p>

                        <span>
                            Home
                        </span>

                        <b>
                            /
                        </b>

                        Contact Us

                    </p>


                    <div className="banner-help">

                        <div className="banner-help-icon">
                            ☎
                        </div>

                        <div>

                            <h3>
                                We're Here to Help!
                            </h3>

                            <p>

                                Have questions or need support?

                                <br />

                                Reach out to us anytime.

                            </p>

                        </div>

                    </div>

                </div>


                {/* BANNER IMAGE */}

                <div className="contact-banner-image">

                    <img
                        src="/images/contact/contact-weighing-balances.png"
                        alt="Weighing Balance Bangalore"
                    />

                </div>

            </section>


            {/* =====================================================
                MAIN CONTACT AREA
            ===================================================== */}

            <section className="contact-container">


                {/* =================================================
                    LEFT - GET IN TOUCH
                ================================================= */}

                <div className="contact-left contact-box">

                    <h2>
                        Get in Touch
                    </h2>

                    <div className="red-line">
                    </div>

                    <p className="contact-intro">

                        We are here to answer your questions, provide
                        product information, and help you find the right
                        weighing solution for your needs.

                    </p>


                    {/* ADDRESS */}

                    <div className="contact-info-item">

                        <div className="contact-info-icon">
                            ⌖
                        </div>

                        <div>

                            <h4>
                                Address
                            </h4>

                            <p>

                                No.5/4, 3rd Floor,

                                <br />

                                4th Cross, Beside Vinayaka School,

                                <br />

                                Cubbonpet, Bengaluru,

                                <br />

                                Karnataka - 560002

                            </p>

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="contact-info-item">

                        <div className="contact-info-icon">
                            ☎
                        </div>

                        <div>

                            <h4>
                                Phone
                            </h4>

                            <p>
                                +91 9590451006
                            </p>

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="contact-info-item">

                        <div className="contact-info-icon">
                            ✉
                        </div>

                        <div>

                            <h4>
                                Email
                            </h4>

                            <p>
                                weighingbalanceblr@gmail.com
                            </p>

                        </div>

                    </div>


                    {/* WORKING HOURS */}

                    <div className="contact-info-item">

                        <div className="contact-info-icon">
                            ◷
                        </div>

                        <div>

                            <h4>
                                Working Hours
                            </h4>

                            <p>

                                Mon - Sat: 9:00 AM - 7:00 PM

                                <br />

                                Sunday: Closed

                            </p>

                        </div>

                    </div>


                    {/* WEBSITE */}

                    <div className="contact-info-item contact-info-last">

                        <div className="contact-info-icon">
                            ◎
                        </div>

                        <div>

                            <h4>
                                Website
                            </h4>

                            <p>
                                www.weighingbalanceblr.com
                            </p>

                        </div>

                    </div>


                    {/* SOCIAL MEDIA */}

                    <div className="contact-social-title">
                        Follow Us
                    </div>

                    <div className="contact-socials">

                        <a
                            href="#"
                            aria-label="Facebook"
                        >
                            f
                        </a>

                        <a
                            href="#"
                            aria-label="LinkedIn"
                        >
                            in
                        </a>

                        <a
                            href="#"
                            aria-label="YouTube"
                        >
                            ▶
                        </a>

                        <a
                            href="#"
                            aria-label="Instagram"
                        >
                            ◎
                        </a>

                    </div>

                </div>


                {/* =================================================
                    CENTER - CONTACT FORM
                ================================================= */}

                <div className="contact-form-box contact-box">

                    <h2>
                        Send Us a Message
                    </h2>

                    <div className="red-line">
                    </div>


                    <form onSubmit={handleSubmit}>


                        {/* NAME + COMPANY */}

                        <div className="form-row">

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name *"
                                required
                            />

                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Company Name"
                            />

                        </div>


                        {/* PHONE */}

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number *"
                            required
                        />


                        {/* EMAIL */}

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address *"
                            required
                        />


                        {/* SUBJECT */}

                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Subject *"
                            required
                        />


                        {/* MESSAGE */}

                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message *"
                            required
                        >
                        </textarea>


                        {/* CAPTCHA STYLE BOX */}

                        <div className="captcha-box">

                            <div className="captcha-left">

                                <div className="captcha-checkbox">
                                </div>

                                <span>
                                    I'm not a robot
                                </span>

                            </div>

                            <div className="captcha-right">

                                <div className="captcha-logo">
                                    ↻
                                </div>

                                <small>
                                    reCAPTCHA
                                </small>

                                <small>
                                    Privacy - Terms
                                </small>

                            </div>

                        </div>


                        {/* RESPONSE MESSAGE */}

                        {responseMessage && (

                            <p
                                className={`response-text ${
                                    responseType === "error"
                                        ? "error-message"
                                        : "success-message"
                                }`}
                            >
                                {responseMessage}
                            </p>

                        )}


                        {/* SEND BUTTON */}

                        <button
                            type="submit"
                            className="send-message-btn"
                            disabled={submitting}
                        >

                            <span>

                                {submitting
                                    ? "Sending..."
                                    : "Send Message"}

                            </span>

                            <span>
                                ➜
                            </span>

                        </button>


                        {!responseMessage && (

                            <p className="response-text">
                                We typically respond within 24 hours.
                            </p>

                        )}

                    </form>

                </div>


                {/* =================================================
                    RIGHT - FIND US
                ================================================= */}

                <div className="contact-right">


                    {/* FIND US */}

                    <div className="contact-box find-us-section">

                        <h2>
                            Find Us
                        </h2>

                        <div className="red-line">
                        </div>


                        <div className="selected-location-name">

                            <strong>
                                Head Office
                            </strong>

                            <span>
                                Weighing Balance Bangalore
                            </span>

                        </div>


                        {/* GOOGLE MAP */}

                        <div className="map-box">

                            <iframe
                                title="Weighing Balance Bangalore - Cubbonpet Bengaluru"
                                src={mapUrl}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            >
                            </iframe>

                        </div>

                    </div>


                    {/* =================================================
                        OFFICE
                    ================================================= */}

                    <div className="contact-box office-card-section">

                        <h2>
                            Our Office
                        </h2>

                        <div className="red-line">
                        </div>


                        <div className="single-office-card">


                            {/* OFFICE IMAGE */}

                            <div className="office-image">

                                <img
                                    src="/images/contact/contact-side-image.png"
                                    alt="Weighing Balance Bangalore office"
                                />

                            </div>


                            {/* OFFICE DETAILS */}

                            <div className="office-card-details">

                                <span className="office-badge">
                                    Head Office
                                </span>

                                <h3>
                                    Weighing Balance Bangalore
                                </h3>


                                {/* ADDRESS */}

                                <div className="office-detail-row">

                                    <span className="office-detail-icon">
                                        ⌖
                                    </span>

                                    <p>

                                        No.5/4, 3rd Floor,

                                        <br />

                                        4th Cross, Beside Vinayaka School,

                                        <br />

                                        Cubbonpet, Bengaluru,

                                        <br />

                                        Karnataka - 560002

                                    </p>

                                </div>


                                {/* PHONE */}

                                <div className="office-detail-row">

                                    <span className="office-detail-icon">
                                        ☎
                                    </span>

                                    <p>
                                        +91 70221 91487
                                    </p>

                                </div>


                                {/* VIEW LOCATION */}

                                <a
                                    href={locationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="view-location-btn"
                                >

                                    View Location

                                    <span>
                                        ➜
                                    </span>

                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default Contact;