import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function GET(request) {
  const session = getAdminSession(request);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    username: session.username,
  });
}
