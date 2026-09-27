import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/categories/[id]
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const categoryId = BigInt(id);

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("GET /api/categories/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch category" }, { status: 500 });
  }
}

// PUT /api/categories/[id]
export async function PUT(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const categoryId = BigInt(id);
    const body = await request.json();

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: body.name.trim(),
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("PUT /api/categories/[id] error:", error);
    return NextResponse.json({ message: "Failed to update category" }, { status: 500 });
  }
}

// DELETE /api/categories/[id]
export async function DELETE(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const categoryId = BigInt(id);

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/categories/[id] error:", error);
    return NextResponse.json({ message: "Failed to delete category" }, { status: 500 });
  }
}
