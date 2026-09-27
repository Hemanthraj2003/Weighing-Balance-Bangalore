import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/enquiries/[id]
export async function GET(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const enquiryId = BigInt(id);

    const enquiry = await prisma.enquiry.findUnique({
      where: { id: enquiryId },
    });

    if (!enquiry) {
      return NextResponse.json({ message: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json(enquiry);
  } catch (error) {
    console.error("GET /api/enquiries/[id] error:", error);
    return NextResponse.json({ message: "Failed to fetch enquiry" }, { status: 500 });
  }
}

// DELETE /api/enquiries/[id]
export async function DELETE(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const enquiryId = BigInt(id);

    await prisma.enquiry.delete({
      where: { id: enquiryId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/enquiries/[id] error:", error);
    return NextResponse.json({ message: "Failed to delete enquiry" }, { status: 500 });
  }
}
