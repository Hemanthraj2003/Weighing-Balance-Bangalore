import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// PUT /api/enquiries/[id]/status
export async function PUT(request, { params }) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const enquiryId = BigInt(id);

    let statusText = "NEW";
    const body = await request.json();
    if (typeof body === "string") {
      statusText = body;
    } else if (body && body.status) {
      statusText = body.status;
    }

    const updatedEnquiry = await prisma.enquiry.update({
      where: { id: enquiryId },
      data: {
        status: statusText.replace(/['"]+/g, "").trim(),
      },
    });

    return NextResponse.json(updatedEnquiry);
  } catch (error) {
    console.error("PUT /api/enquiries/[id]/status error:", error);
    return NextResponse.json({ message: "Failed to update enquiry status" }, { status: 500 });
  }
}
