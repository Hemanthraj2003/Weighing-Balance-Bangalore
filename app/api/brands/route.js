import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/brands
export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(brands);
  } catch (error) {
    console.error("GET /api/brands error:", error);
    return NextResponse.json({ message: "Failed to fetch brands" }, { status: 500 });
  }
}

// POST /api/brands
export async function POST(request) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const brand = await prisma.brand.create({
      data: {
        name: body.name || null,
        logoUrl: body.logoUrl || null,
        status: body.status !== undefined ? body.status : true,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error("POST /api/brands error:", error);
    return NextResponse.json({ message: "Failed to create brand" }, { status: 500 });
  }
}
