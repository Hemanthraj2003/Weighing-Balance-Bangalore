import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET /api/products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");

    // If pagination requested
    if (pageParam !== null || limitParam !== null) {
      const page = Math.max(1, parseInt(pageParam || "1", 10));
      const limit = Math.max(1, parseInt(limitParam || "10", 10));
      const skip = (page - 1) * limit;

      const where = { status: true };
      if (categoryParam && categoryParam !== "all") {
        where.category = { equals: categoryParam, mode: "insensitive" };
      }
      if (searchParam) {
        where.OR = [
          { name: { contains: searchParam, mode: "insensitive" } },
          { model: { contains: searchParam, mode: "insensitive" } },
          { category: { contains: searchParam, mode: "insensitive" } },
        ];
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: "asc" },
        }),
        prisma.product.count({ where }),
      ]);

      const totalPages = Math.ceil(total / limit);
      const hasMore = skip + products.length < total;

      return NextResponse.json(
        {
          products,
          total,
          page,
          limit,
          totalPages,
          hasMore,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // Default: return all products (for admin and backward compatibility)
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request) {
  const session = getAdminSession(request);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        model: body.model || null,
        name: body.name || null,
        category: body.category || null,
        description: body.description || null,
        brandImageUrl: body.brandImageUrl || null,
        imageUrl: body.imageUrl || null,
        pdfUrl: body.pdfUrl || null,
        features: body.features || null,
        status: body.status !== undefined ? body.status : true,
      },
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
