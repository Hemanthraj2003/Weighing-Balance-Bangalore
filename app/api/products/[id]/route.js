import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/products/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const productId = BigInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const productId = BigInt(id);
    const body = await request.json();

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        model: body.model,
        name: body.name,
        category: body.category,
        description: body.description,
        brandImageUrl: body.brandImageUrl,
        imageUrl: body.imageUrl,
        pdfUrl: body.pdfUrl,
        features: body.features,
        status: body.status,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/products/[id]
export async function DELETE(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const productId = BigInt(id);

    await prisma.product.delete({
      where: { id: productId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
