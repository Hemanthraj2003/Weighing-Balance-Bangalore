import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // 2. Load Products Seed JSON
  const seedFile = path.join(__dirname, "products_seed.json");
  if (!fs.existsSync(seedFile)) {
    console.log("⚠️ No products_seed.json found. Skipping products seed.");
    return;
  }

  const products = JSON.parse(fs.readFileSync(seedFile, "utf8"));
  console.log(`Loaded ${products.length} products from seed file.`);

  // 3. Extract and Seed Unique Categories
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

  // 4. Seed Brand
  const brandCount = await prisma.brand.count();
  if (brandCount === 0) {
    await prisma.brand.create({
      data: {
        id: 1n,
        name: "WENSAR",
        logoUrl: "https://res.cloudinary.com/hehl57yx/image/upload/v1790498287/weighing-balance/media/cqockatjkpzj8a1xqriq.png",
        status: true,
      },
    });
    console.log("✓ Brand WENSAR seeded.");
  }

  // 5. Seed Products
  console.log("3. Seeding products...");
  const existingProductCount = await prisma.product.count();

  if (existingProductCount > 0) {
    console.log(`ℹ Products table already has ${existingProductCount} records. Skipping product seed to avoid duplicates.`);
  } else {
    let count = 0;
    for (const p of products) {
      await prisma.product.create({
        data: {
          id: BigInt(p.id),
          model: p.model || "",
          name: p.name || "",
          category: p.category || "",
          description: p.description || "",
          imageUrl: p.imageUrl || null,
          pdfUrl: p.pdfUrl || null,
          brandImageUrl: p.brandImageUrl || null,
          features: p.features || null,
          status: p.status !== false,
          createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
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
