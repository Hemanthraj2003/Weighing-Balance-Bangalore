import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        model: body.model || null,
        name: body.name || null,
        category: body.category || null,
        description: body.description || null,
        brandImageUrl: body.brandImageUrl || null,
        imageUrl: body.imageUrl || null,
        pdfUrl: body.pdfUrl || null,
        features: body.features || null,
        status: body.status !== undefined ? body.status : true,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
