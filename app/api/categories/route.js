import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST /api/categories
export async function POST(request) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: body.name.trim(),
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
  }
}
