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
        { success: false, message: "Image file is required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "weighing-balance/products",
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
    console.error("POST /api/upload/image error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Image upload failed" },
      { status: 500 }
    );
  }
}
