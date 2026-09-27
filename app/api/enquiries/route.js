import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/enquiries (Admin only)
export async function GET(request) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("GET /api/enquiries error:", error);
    return NextResponse.json({ message: "Failed to fetch enquiries" }, { status: 500 });
  }
}

// POST /api/enquiries (Public)
export async function POST(request) {
  try {
    const body = await request.json();

    const enquiry = await prisma.enquiry.create({
      data: {
        customerName: body.customerName || null,
        companyName: body.companyName || null,
        phone: body.phone || null,
        email: body.email || null,
        productId: body.productId ? BigInt(body.productId) : null,
        message: body.message || null,
        status: body.status || "NEW",
      },
    });

    return NextResponse.json(enquiry, { status: 200 });
  } catch (error) {
    console.error("POST /api/enquiries error:", error);
    return NextResponse.json({ message: "Failed to submit enquiry" }, { status: 500 });
  }
}
