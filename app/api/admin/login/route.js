import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    if (!admin || admin.enabled === false) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Check BCrypt hash or direct plain match for initial dev setup
    let isValid = false;
    if (admin.password.startsWith("$2a$") || admin.password.startsWith("$2b$")) {
      isValid = await bcrypt.compare(password, admin.password);
    } else {
      isValid = password === admin.password;
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      id: admin.id.toString(),
      username: admin.username,
      role: "ROLE_ADMIN",
    });

    const isHttps =
      request.headers.get("x-forwarded-proto") === "https" ||
      request.url.startsWith("https://");

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      username: admin.username,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isHttps,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/login error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to process login" },
      { status: 500 }
    );
  }
}
