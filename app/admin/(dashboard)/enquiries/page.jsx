"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL = "";

function AdminEnquiries() {

    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");


    // =========================
    // GET ALL ENQUIRIES
    // =========================

    const fetchEnquiries = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/enquiries`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );


            if (!response.ok) {

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    setError(
                        "Admin login required."
                    );

                } else {

                    setError(
                        "Unable to load enquiries."
                    );

                }

                return;
            }


            const data =
                await response.json();


            setEnquiries(data);

        } catch (error) {

            console.error(
                "Error loading enquiries:",
                error
            );

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================
    // LOAD WHEN PAGE OPENS
    // =========================

    useEffect(() => {

        fetchEnquiries();

    }, []);


    // =========================
    // UPDATE STATUS
    // =========================

    const updateStatus = async (
        id,
        status
    ) => {

        try {

            const response = await fetch(
                `${API_URL}/api/enquiries/${id}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    credentials: "include",

                    body:
                        JSON.stringify(status),
                }
            );


            if (!response.ok) {

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    alert(
                        "Admin authentication required."
                    );

                } else {

                    alert(
                        "Unable to update enquiry status."
                    );

                }

                return;
            }


            await fetchEnquiries();

        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            alert(
                "Unable to connect to the server."
            );

        }

    };


    // =========================
    // DELETE ENQUIRY
    // =========================

    const deleteEnquiry = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this enquiry?"
            );


        if (!confirmed) {
            return;
        }


        try {

            const response = await fetch(
                `${API_URL}/api/enquiries/${id}`,
                {
                    method: "DELETE",

                    credentials: "include",
                }
            );


            if (!response.ok) {

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    alert(
                        "Admin authentication required."
                    );

                } else {

                    alert(
                        "Unable to delete enquiry."
                    );

                }

                return;
            }


            await fetchEnquiries();

        } catch (error) {

            console.error(
                "Delete enquiry error:",
                error
            );

            alert(
                "Unable to connect to the server."
            );

        }

    };


    // =========================
    // FILTER ENQUIRIES
    // =========================

    const filteredEnquiries = useMemo(() => {

        const searchText =
            search.trim().toLowerCase();


        return enquiries.filter(
            (enquiry) => {

                const matchesSearch =
                    searchText === "" ||
                    String(
                        enquiry.customerName || ""
                    )
                        .toLowerCase()
                        .includes(searchText) ||

                    String(
                        enquiry.companyName || ""
                    )
                        .toLowerCase()
                        .includes(searchText) ||

                    String(
                        enquiry.phone || ""
                    )
                        .toLowerCase()
                        .includes(searchText) ||

                    String(
                        enquiry.email || ""
                    )
                        .toLowerCase()
                        .includes(searchText) ||

                    String(
                        enquiry.productId || ""
                    )
                        .toLowerCase()
                        .includes(searchText) ||

                    String(
                        enquiry.message || ""
                    )
                        .toLowerCase()
                        .includes(searchText);


                const matchesStatus =
                    statusFilter === "ALL" ||
                    (
                        enquiry.status ||
                        "NEW"
                    ) === statusFilter;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );

    }, [
        enquiries,
        search,
        statusFilter,
    ]);


    // =========================
    // COUNTS
    // =========================

    const totalCount =
        enquiries.length;


    const newCount =
        enquiries.filter(
            (item) =>
                (item.status || "NEW") ===
                "NEW"
        ).length;


    const contactedCount =
        enquiries.filter(
            (item) =>
                item.status ===
                "CONTACTED"
        ).length;


    const completedCount =
        enquiries.filter(
            (item) =>
                item.status ===
                "COMPLETED"
        ).length;


    // =========================
    // WHATSAPP
    // =========================

    const openWhatsApp = (phone, customerName) => {

        if (!phone) {

            alert(
                "Customer phone number is not available."
            );

            return;
        }


        const cleanPhone =
            phone.replace(
                /\D/g,
                ""
            );


        const message =
            `Hello ${customerName || "there"}, this is Weighing Balance Bangalore regarding your enquiry.`;


        window.open(
            `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                message
            )}`,
            "_blank"
        );

    };


    // =========================
    // PHONE
    // =========================

    const callCustomer = (phone) => {

        if (!phone) {

            alert(
                "Customer phone number is not available."
            );

            return;
        }


        window.location.href =
            `tel:${phone}`;

    };


    // =========================
    // EMAIL
    // =========================

    const emailCustomer = (email) => {

        if (!email) {

            alert(
                "Customer email is not available."
            );

            return;
        }


        window.location.href =
            `mailto:${email}`;

    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="admin-page">

                <h1>
                    Customer Enquiries
                </h1>

                <p>
                    Loading enquiries...
                </p>

            </div>
        );

    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (
            <div className="admin-page">

                <h1>
                    Customer Enquiries
                </h1>

                <p
                    style={{
                        color: "#b00020",
                        fontWeight: "600",
                    }}
                >
                    {error}
                </p>

                <button
                    onClick={fetchEnquiries}
                    style={{
                        marginTop: "15px",
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    TRY AGAIN
                </button>

            </div>
        );

    }


    // =========================
    // PAGE
    // =========================

    return (

        <div className="admin-page">


            {/* =========================
                HEADER
            ========================== */}

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                    marginBottom:
                        "25px",
                    gap: "20px",
                    flexWrap:
                        "wrap",
                }}
            >

                <div>

                    <h1>
                        Customer Enquiries
                    </h1>

                    <p>
                        Manage enquiries received
                        from website customers.
                    </p>

                </div>


                <button
                    onClick={fetchEnquiries}
                    style={{
                        padding:
                            "10px 18px",
                        border: "none",
                        borderRadius:
                            "6px",
                        cursor:
                            "pointer",
                        fontWeight:
                            "600",
                    }}
                >
                    ↻ Refresh
                </button>

            </div>


            {/* =========================
                SUMMARY
            ========================== */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: "15px",
                    marginBottom: "25px",
                }}
            >

                <div
                    style={{
                        background:
                            "#ffffff",
                        padding:
                            "20px",
                        borderRadius:
                            "10px",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >

                    <span
                        style={{
                            color:
                                "#777",
                            fontSize:
                                "13px",
                        }}
                    >
                        Total
                    </span>

                    <h2
                        style={{
                            margin:
                                "6px 0 0",
                        }}
                    >
                        {totalCount}
                    </h2>

                </div>


                <div
                    style={{
                        background:
                            "#ffffff",
                        padding:
                            "20px",
                        borderRadius:
                            "10px",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >

                    <span
                        style={{
                            color:
                                "#777",
                            fontSize:
                                "13px",
                        }}
                    >
                        New
                    </span>

                    <h2
                        style={{
                            margin:
                                "6px 0 0",
                        }}
                    >
                        {newCount}
                    </h2>

                </div>


                <div
                    style={{
                        background:
                            "#ffffff",
                        padding:
                            "20px",
                        borderRadius:
                            "10px",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >

                    <span
                        style={{
                            color:
                                "#777",
                            fontSize:
                                "13px",
                        }}
                    >
                        Contacted
                    </span>

                    <h2
                        style={{
                            margin:
                                "6px 0 0",
                        }}
                    >
                        {contactedCount}
                    </h2>

                </div>


                <div
                    style={{
                        background:
                            "#ffffff",
                        padding:
                            "20px",
                        borderRadius:
                            "10px",
                        boxShadow:
                            "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                >

                    <span
                        style={{
                            color:
                                "#777",
                            fontSize:
                                "13px",
                        }}
                    >
                        Completed
                    </span>

                    <h2
                        style={{
                            margin:
                                "6px 0 0",
                        }}
                    >
                        {completedCount}
                    </h2>

                </div>

            </div>


            {/* =========================
                SEARCH + FILTER
            ========================== */}

            <div
                style={{
                    background:
                        "#ffffff",
                    padding:
                        "18px",
                    borderRadius:
                        "10px",
                    marginBottom:
                        "20px",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.05)",
                    display:
                        "flex",
                    gap:
                        "12px",
                    flexWrap:
                        "wrap",
                }}
            >

                <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    placeholder="Search customer, company, phone, email, product..."
                    style={{
                        flex:
                            "1 1 350px",
                        minWidth:
                            "220px",
                        padding:
                            "12px 14px",
                        border:
                            "1px solid #ddd",
                        borderRadius:
                            "6px",
                        outline:
                            "none",
                        fontSize:
                            "14px",
                    }}
                />


                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                    style={{
                        padding:
                            "12px 14px",
                        border:
                            "1px solid #ddd",
                        borderRadius:
                            "6px",
                        background:
                            "#ffffff",
                        minWidth:
                            "160px",
                        cursor:
                            "pointer",
                    }}
                >

                    <option value="ALL">
                        All Status
                    </option>

                    <option value="NEW">
                        New
                    </option>

                    <option value="CONTACTED">
                        Contacted
                    </option>

                    <option value="COMPLETED">
                        Completed
                    </option>

                    <option value="CLOSED">
                        Closed
                    </option>

                </select>


                {(search ||
                    statusFilter !== "ALL") && (

                    <button
                        type="button"
                        onClick={() => {

                            setSearch("");
                            setStatusFilter(
                                "ALL"
                            );

                        }}
                        style={{
                            padding:
                                "12px 16px",
                            border:
                                "1px solid #ddd",
                            borderRadius:
                                "6px",
                            background:
                                "#ffffff",
                            cursor:
                                "pointer",
                            fontWeight:
                                "600",
                        }}
                    >
                        Clear
                    </button>

                )}

            </div>


            {/* =========================
                RESULT COUNT
            ========================== */}

            {enquiries.length > 0 && (

                <p
                    style={{
                        margin:
                            "0 0 15px",
                        color:
                            "#666",
                        fontSize:
                            "13px",
                    }}
                >
                    Showing{" "}
                    <strong>
                        {filteredEnquiries.length}
                    </strong>{" "}
                    of{" "}
                    <strong>
                        {enquiries.length}
                    </strong>{" "}
                    enquiries
                </p>

            )}


            {/* =========================
                NO ENQUIRIES
            ========================== */}

            {enquiries.length === 0 ? (

                <div
                    style={{
                        background:
                            "#ffffff",
                        padding:
                            "50px 40px",
                        borderRadius:
                            "10px",
                        textAlign:
                            "center",
                        boxShadow:
                            "0 2px 10px rgba(0,0,0,0.05)",
                    }}
                >

                    <h2>
                        No enquiries yet
                    </h2>

                    <p>
                        Customer enquiries will
                        appear here.
                    </p>

                </div>

            ) : filteredEnquiries.length === 0 ? (

                <div
                    style={{
                        background:
                            "#ffffff",
                        padding:
                            "50px 40px",
                        borderRadius:
                            "10px",
                        textAlign:
                            "center",
                    }}
                >

                    <h2>
                        No matching enquiries
                    </h2>

                    <p>
                        Try changing your search
                        or status filter.
                    </p>

                </div>

            ) : (

                <div
                    style={{
                        display:
                            "flex",
                        flexDirection:
                            "column",
                        gap:
                            "20px",
                    }}
                >

                    {filteredEnquiries.map(
                        (enquiry) => (

                            <div
                                key={
                                    enquiry.id
                                }
                                style={{
                                    background:
                                        "#ffffff",
                                    borderRadius:
                                        "10px",
                                    padding:
                                        "25px",
                                    boxShadow:
                                        "0 2px 10px rgba(0,0,0,0.08)",
                                }}
                            >


                                {/* =========================
                                    HEADER
                                ========================== */}

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "flex-start",
                                        marginBottom:
                                            "20px",
                                        gap:
                                            "15px",
                                        flexWrap:
                                            "wrap",
                                    }}
                                >

                                    <div>

                                        <h2
                                            style={{
                                                margin:
                                                    "0 0 8px",
                                            }}
                                        >
                                            {
                                                enquiry.customerName ||
                                                "Unknown Customer"
                                            }
                                        </h2>

                                        <p
                                            style={{
                                                margin:
                                                    0,
                                                color:
                                                    "#666",
                                                fontSize:
                                                    "13px",
                                            }}
                                        >
                                            Enquiry #
                                            {
                                                enquiry.id
                                            }
                                        </p>

                                    </div>


                                    {/* STATUS */}

                                    <select
                                        value={
                                            enquiry.status ||
                                            "NEW"
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            updateStatus(
                                                enquiry.id,
                                                e.target.value
                                            )
                                        }
                                        style={{
                                            padding:
                                                "8px 12px",
                                            borderRadius:
                                                "6px",
                                            border:
                                                "1px solid #ccc",
                                            fontWeight:
                                                "600",
                                            cursor:
                                                "pointer",
                                        }}
                                    >

                                        <option value="NEW">
                                            NEW
                                        </option>

                                        <option value="CONTACTED">
                                            CONTACTED
                                        </option>

                                        <option value="COMPLETED">
                                            COMPLETED
                                        </option>

                                        <option value="CLOSED">
                                            CLOSED
                                        </option>

                                    </select>

                                </div>


                                {/* =========================
                                    CUSTOMER INFORMATION
                                ========================== */}

                                <div
                                    style={{
                                        display:
                                            "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit, minmax(220px, 1fr))",
                                        gap:
                                            "15px",
                                        marginBottom:
                                            "20px",
                                    }}
                                >


                                    {/* COMPANY */}

                                    <div>

                                        <strong>
                                            Company
                                        </strong>

                                        <p>
                                            {
                                                enquiry.companyName ||
                                                "Not provided"
                                            }
                                        </p>

                                    </div>


                                    {/* PHONE */}

                                    <div>

                                        <strong>
                                            Phone
                                        </strong>

                                        <p>
                                            {enquiry.phone ? (

                                                <a
                                                    href={`tel:${enquiry.phone}`}
                                                    style={{
                                                        color:
                                                            "#111827",
                                                        fontWeight:
                                                            "600",
                                                        textDecoration:
                                                            "none",
                                                    }}
                                                >
                                                    {
                                                        enquiry.phone
                                                    }
                                                </a>

                                            ) : (

                                                "Not provided"

                                            )}
                                        </p>

                                    </div>


                                    {/* EMAIL */}

                                    <div>

                                        <strong>
                                            Email
                                        </strong>

                                        <p>

                                            {enquiry.email ? (

                                                <a
                                                    href={`mailto:${enquiry.email}`}
                                                    style={{
                                                        color:
                                                            "#111827",
                                                        fontWeight:
                                                            "600",
                                                        textDecoration:
                                                            "none",
                                                    }}
                                                >
                                                    {
                                                        enquiry.email
                                                    }
                                                </a>

                                            ) : (

                                                "Not provided"

                                            )}

                                        </p>

                                    </div>


                                    {/* PRODUCT */}

                                    <div>

                                        <strong>
                                            Product ID
                                        </strong>

                                        <p>
                                            {
                                                enquiry.productId ||
                                                "General enquiry"
                                            }
                                        </p>

                                    </div>

                                </div>


                                {/* =========================
                                    ACTION BUTTONS
                                ========================== */}

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        gap:
                                            "10px",
                                        flexWrap:
                                            "wrap",
                                        marginBottom:
                                            "20px",
                                    }}
                                >

                                    <button
                                        type="button"
                                        onClick={() =>
                                            callCustomer(
                                                enquiry.phone
                                            )
                                        }
                                        disabled={
                                            !enquiry.phone
                                        }
                                        style={{
                                            padding:
                                                "9px 15px",
                                            border:
                                                "none",
                                            borderRadius:
                                                "6px",
                                            background:
                                                "#111827",
                                            color:
                                                "#ffffff",
                                            cursor:
                                                enquiry.phone
                                                    ? "pointer"
                                                    : "not-allowed",
                                            opacity:
                                                enquiry.phone
                                                    ? 1
                                                    : 0.5,
                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        📞 Call
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            openWhatsApp(
                                                enquiry.phone,
                                                enquiry.customerName
                                            )
                                        }
                                        disabled={
                                            !enquiry.phone
                                        }
                                        style={{
                                            padding:
                                                "9px 15px",
                                            border:
                                                "none",
                                            borderRadius:
                                                "6px",
                                            background:
                                                "#25D366",
                                            color:
                                                "#ffffff",
                                            cursor:
                                                enquiry.phone
                                                    ? "pointer"
                                                    : "not-allowed",
                                            opacity:
                                                enquiry.phone
                                                    ? 1
                                                    : 0.5,
                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        WhatsApp
                                    </button>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            emailCustomer(
                                                enquiry.email
                                            )
                                        }
                                        disabled={
                                            !enquiry.email
                                        }
                                        style={{
                                            padding:
                                                "9px 15px",
                                            border:
                                                "none",
                                            borderRadius:
                                                "6px",
                                            background:
                                                "#4b5563",
                                            color:
                                                "#ffffff",
                                            cursor:
                                                enquiry.email
                                                    ? "pointer"
                                                    : "not-allowed",
                                            opacity:
                                                enquiry.email
                                                    ? 1
                                                    : 0.5,
                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        ✉ Email
                                    </button>

                                </div>


                                {/* =========================
                                    MESSAGE
                                ========================== */}

                                <div
                                    style={{
                                        borderTop:
                                            "1px solid #eee",
                                        paddingTop:
                                            "18px",
                                    }}
                                >

                                    <strong>
                                        Message
                                    </strong>

                                    <p
                                        style={{
                                            whiteSpace:
                                                "pre-line",
                                            lineHeight:
                                                "1.6",
                                            marginTop:
                                                "8px",
                                            color:
                                                "#444",
                                        }}
                                    >
                                        {
                                            enquiry.message ||
                                            "No message provided"
                                        }
                                    </p>

                                </div>


                                {/* =========================
                                    DATE + DELETE
                                ========================== */}

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "center",
                                        marginTop:
                                            "20px",
                                        paddingTop:
                                            "15px",
                                        borderTop:
                                            "1px solid #eee",
                                        gap:
                                            "15px",
                                        flexWrap:
                                            "wrap",
                                    }}
                                >

                                    <small
                                        style={{
                                            color:
                                                "#777",
                                        }}
                                    >
                                        Received:{" "}

                                        {enquiry.createdAt
                                            ? new Date(
                                                enquiry.createdAt
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                            : "Unknown"}

                                    </small>


                                    <button
                                        onClick={() =>
                                            deleteEnquiry(
                                                enquiry.id
                                            )
                                        }
                                        style={{
                                            padding:
                                                "8px 15px",
                                            background:
                                                "#dc3545",
                                            color:
                                                "#ffffff",
                                            border:
                                                "none",
                                            borderRadius:
                                                "5px",
                                            cursor:
                                                "pointer",
                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        DELETE
                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default AdminEnquiries;