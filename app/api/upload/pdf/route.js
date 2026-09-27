import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getAdminSession } from "@/lib/auth";

export async function POST(request) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "PDF file is required" },
        { status: 400 }
      );
    }

    const originalFilename = file.name || "product.pdf";
    let safeFilename = originalFilename.replace(/[^a-zA-Z0-9._-]/g, "_");
    if (!safeFilename.toLowerCase().endsWith(".pdf")) {
      safeFilename += ".pdf";
    }

    const publicId = safeFilename.substring(0, safeFilename.length - 4);
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload PDF as IMAGE resource type (per CloudinaryService.java)
    // to allow Cloudinary to deliver the PDF correctly to the browser.
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "weighing-balance/products/pdfs",
          public_id: publicId,
          use_filename: false,
          unique_filename: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error("POST /api/upload/pdf error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "PDF upload failed" },
      { status: 500 }
    );
  }
}
