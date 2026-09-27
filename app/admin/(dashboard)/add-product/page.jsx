"use client";

import AdminProducts from "../products/page";

function AddProduct() {
    return (
        <AdminProducts addOnly={true} />
    );
}

export default AddProduct;