import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function parseUnitValue(val) {
  const match = val.match(/^([\d.]+)\s*([a-zA-Z]+)/);
  if (!match) return { num: 999999, unit: val };
  let num = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  let multiplier = 1;
  if (unit === "mg" || unit === "microg" || unit === "ug") multiplier = 0.001;
  else if (unit === "g") multiplier = 1;
  else if (unit === "kg") multiplier = 1000;
  else if (unit === "ton" || unit === "t") multiplier = 1000000;
  else if (unit === "ct") multiplier = 0.2;
  return { num: num * multiplier, unit };
}

// GET /api/products/filters
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { status: true },
      select: { features: true },
    });

    const readabilitySet = new Set();
    const capacitySet = new Set();

    products.forEach((p) => {
      if (!p.features) return;
      const parts = p.features.split("|").map((s) => s.trim());
      parts.forEach((part) => {
        const lower = part.toLowerCase();
        if (lower.startsWith("readability:")) {
          const val = part.split(":").slice(1).join(":").trim();
          if (val && val.toLowerCase() !== "not specified") readabilitySet.add(val);
        }
        if (lower.startsWith("capacity:")) {
          const val = part.split(":").slice(1).join(":").trim();
          if (val && val.toLowerCase() !== "not specified") capacitySet.add(val);
        }
      });
    });

    const readability = Array.from(readabilitySet).sort((a, b) => {
      return parseUnitValue(a).num - parseUnitValue(b).num;
    });

    const capacity = Array.from(capacitySet).sort((a, b) => {
      return parseUnitValue(a).num - parseUnitValue(b).num;
    });

    return NextResponse.json(
      { readability, capacity },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/products/filters error:", error);
    return NextResponse.json(
      { message: "Failed to fetch filters" },
      { status: 500 }
    );
  }
}
