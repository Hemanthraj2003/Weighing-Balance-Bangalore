import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import products from "../../frontend/src/Data/products.mjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Admin
  console.log("1. Seeding default admin user...");
  const adminUsername = "wbbadmin";
  const rawPassword = "wbb@Admin2026";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUsername },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
        enabled: true,
      },
    });
    console.log(`✓ Admin user '${adminUsername}' created successfully.`);
  } else {
    console.log(`ℹ Admin user '${adminUsername}' already exists.`);
  }

  // 2. Extract and Seed Unique Categories
  console.log("2. Seeding product categories...");
  const categoryNames = Array.from(
    new Set(
      products
        .map((p) => p.category?.trim())
        .filter(Boolean)
    )
  );

  for (const catName of categoryNames) {
    const existingCat = await prisma.category.findFirst({
      where: { name: catName },
    });
    if (!existingCat) {
      await prisma.category.create({
        data: { name: catName },
      });
      console.log(`  + Category added: ${catName}`);
    }
  }
  console.log(`✓ Categories seeded (${categoryNames.length} unique categories).`);

  // 3. Seed Products
  console.log("3. Seeding products...");
  const existingProductCount = await prisma.product.count();

  if (existingProductCount > 0) {
    console.log(`ℹ Products table already has ${existingProductCount} records. Skipping product seed to avoid duplicates.`);
  } else {
    let count = 0;
    for (const p of products) {
      const featuresStr = Array.isArray(p.features)
        ? p.features.join(" | ")
        : p.features || "";

      await prisma.product.create({
        data: {
          model: p.model || "",
          name: p.name || "",
          category: p.category || "",
          description: p.description || "",
          imageUrl: p.image || null,
          pdfUrl: p.pdf || null,
          features: featuresStr,
          status: true,
        },
      });
      count++;
    }
    console.log(`✓ Successfully seeded ${count} products into Supabase.`);
  }

  console.log("\n🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
