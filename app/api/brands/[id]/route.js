import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/brands/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const brandId = BigInt(id);

    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    });

    if (!brand) {
      return NextResponse.json({ message: "Brand not found" }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error("GET /api/brands/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch brand" }, { status: 500 });
  }
}

// PUT /api/brands/[id]
export async function PUT(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const brandId = BigInt(id);
    const body = await request.json();

    const updatedBrand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        name: body.name,
        logoUrl: body.logoUrl,
        status: body.status,
      },
    });

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error("PUT /api/brands/[id] error:", error);
    return NextResponse.json({ message: "Failed to update brand" }, { status: 500 });
  }
}

// DELETE /api/brands/[id]
export async function DELETE(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const brandId = BigInt(id);

    await prisma.brand.delete({
      where: { id: brandId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/brands/[id] error:", error);
    return NextResponse.json({ message: "Failed to delete brand" }, { status: 500 });
  }
}
