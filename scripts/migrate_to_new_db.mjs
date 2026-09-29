import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ====================================================================================
// PLACEHOLDER: REPLACE "new string" WITH YOUR NEW DATABASE CONNECTION URL
// Example:
// const NEW_STRING = "postgresql://postgres.xxx:password@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
// ====================================================================================
const NEW_STRING = "new string";
// ====================================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to escape values for SQL
function escapeSql(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "TRUE" : "FALSE";
  if (typeof val === "number" || typeof val === "bigint") return val.toString();
  const str = String(val).replace(/'/g, "''");
  return `'${str}'`;
}

async function runMigration() {
  console.log("=================================================================");
  console.log("🚀 Weighing Balance Bangalore - Database Migration Tool");
  console.log("=================================================================\n");

  // Determine connection string: either passed via CLI argument or replaced in NEW_STRING
  const targetUrl = process.argv[2] || (NEW_STRING !== "new string" ? NEW_STRING.trim() : null);

  if (!targetUrl || targetUrl === "new string" || targetUrl === "") {
    console.log("⚠️  TARGET DATABASE CONNECTION STRING NOT SET!\n");
    console.log("How to set your target database connection string:");
    console.log("-----------------------------------------------------------------");
    console.log("Option 1: Edit 'scripts/migrate_to_new_db.mjs'");
    console.log("  Find line 10:");
    console.log('    const NEW_STRING = "new string";');
    console.log("  Replace 'new string' with your new PostgreSQL / Supabase URL:");
    console.log('    const NEW_STRING = "postgresql://postgres:password@host:port/postgres";');
    console.log("  Then run 'run_migration.bat' again.\n");
    console.log("Option 2: Run via command line with the connection string as argument:");
    console.log('  run_migration.bat "postgresql://postgres:password@host:port/postgres"\n');
    console.log("-----------------------------------------------------------------");
    process.exit(1);
  }

  const maskedUrl = targetUrl.replace(/:[^:@]+@/, ":****@");
  console.log(`📡 Connecting to target database: ${maskedUrl}`);

  // Create Prisma client pointing dynamically to the target database
  const targetPrisma = new PrismaClient({
    datasources: {
      db: {
        url: targetUrl,
      },
    },
  });

  try {
    // 1. Test Connection
    console.log("⏳ Testing database connection...");
    await targetPrisma.$executeRawUnsafe("SELECT 1;");
    console.log("✓ Connection successful!\n");

    // 2. Create Tables and Columns (DDL)
    console.log("🏗️  Step 1: Creating tables and columns if they do not exist...");

    const ddlStatements = [
      {
        name: "categories",
        sql: `CREATE TABLE IF NOT EXISTS "categories" (
          "id" BIGSERIAL PRIMARY KEY,
          "name" TEXT NOT NULL
        );`
      },
      {
        name: "brands",
        sql: `CREATE TABLE IF NOT EXISTS "brands" (
          "id" BIGSERIAL PRIMARY KEY,
          "name" TEXT,
          "logo_url" TEXT,
          "status" BOOLEAN DEFAULT TRUE
        );`
      },
      {
        name: "products",
        sql: `CREATE TABLE IF NOT EXISTS "products" (
          "id" BIGSERIAL PRIMARY KEY,
          "model" TEXT,
          "name" TEXT,
          "category" TEXT,
          "description" TEXT,
          "brand_image_url" TEXT,
          "image_url" TEXT,
          "pdf_url" TEXT,
          "features" TEXT,
          "status" BOOLEAN DEFAULT TRUE,
          "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );`
      },
      {
        name: "enquiries",
        sql: `CREATE TABLE IF NOT EXISTS "enquiries" (
          "id" BIGSERIAL PRIMARY KEY,
          "customer_name" TEXT,
          "company_name" TEXT,
          "phone" TEXT,
          "email" TEXT,
          "product_id" BIGINT,
          "message" TEXT,
          "status" TEXT DEFAULT 'NEW',
          "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
        );`
      },
      {
        name: "admins",
        sql: `CREATE TABLE IF NOT EXISTS "admins" (
          "id" BIGSERIAL PRIMARY KEY,
          "username" TEXT NOT NULL UNIQUE,
          "password" TEXT NOT NULL,
          "enabled" BOOLEAN DEFAULT TRUE
        );`
      }
    ];

    for (const ddl of ddlStatements) {
      await targetPrisma.$executeRawUnsafe(ddl.sql);
      console.log(`  ✓ Table '${ddl.name}' verified/created.`);
    }

    // 3. Load Data from Dump
    console.log("\n📦 Step 2: Loading data from dump...");
    const dumpPath = path.join(__dirname, "current_db_dump.json");
    if (!fs.existsSync(dumpPath)) {
      throw new Error(`Dump file not found at ${dumpPath}.`);
    }
    const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));
    console.log(`✓ Loaded dump with ${Object.keys(dump.tables).length} tables.\n`);

    // 4. Migrate Data Table by Table
    console.log("🚚 Step 3: Migrating rows into target database...");

    // 4.1 Admins
    if (dump.tables.admins && dump.tables.admins.length > 0) {
      console.log(`  -> Migrating ${dump.tables.admins.length} admins...`);
      for (const row of dump.tables.admins) {
        await targetPrisma.$executeRawUnsafe(`
          INSERT INTO "admins" ("id", "username", "password", "enabled")
          VALUES (${escapeSql(row.id)}, ${escapeSql(row.username)}, ${escapeSql(row.password)}, ${escapeSql(row.enabled)})
          ON CONFLICT ("id") DO UPDATE SET
            "username" = EXCLUDED."username",
            "password" = EXCLUDED."password",
            "enabled" = EXCLUDED."enabled";
        `);
      }
      console.log(`  ✓ Admins migrated.`);
    }

    // 4.2 Brands
    if (dump.tables.brands && dump.tables.brands.length > 0) {
      console.log(`  -> Migrating ${dump.tables.brands.length} brands...`);
      for (const row of dump.tables.brands) {
        await targetPrisma.$executeRawUnsafe(`
          INSERT INTO "brands" ("id", "name", "logo_url", "status")
          VALUES (${escapeSql(row.id)}, ${escapeSql(row.name)}, ${escapeSql(row.logo_url)}, ${escapeSql(row.status)})
          ON CONFLICT ("id") DO UPDATE SET
            "name" = EXCLUDED."name",
            "logo_url" = EXCLUDED."logo_url",
            "status" = EXCLUDED."status";
        `);
      }
      console.log(`  ✓ Brands migrated.`);
    }

    // 4.3 Categories
    if (dump.tables.categories && dump.tables.categories.length > 0) {
      console.log(`  -> Migrating ${dump.tables.categories.length} categories...`);
      for (const row of dump.tables.categories) {
        await targetPrisma.$executeRawUnsafe(`
          INSERT INTO "categories" ("id", "name")
          VALUES (${escapeSql(row.id)}, ${escapeSql(row.name)})
          ON CONFLICT ("id") DO UPDATE SET
            "name" = EXCLUDED."name";
        `);
      }
      console.log(`  ✓ Categories migrated.`);
    }

    // 4.4 Enquiries
    if (dump.tables.enquiries && dump.tables.enquiries.length > 0) {
      console.log(`  -> Migrating ${dump.tables.enquiries.length} enquiries...`);
      for (const row of dump.tables.enquiries) {
        await targetPrisma.$executeRawUnsafe(`
          INSERT INTO "enquiries" ("id", "customer_name", "company_name", "phone", "email", "product_id", "message", "status", "created_at")
          VALUES (${escapeSql(row.id)}, ${escapeSql(row.customer_name)}, ${escapeSql(row.company_name)}, ${escapeSql(row.phone)}, ${escapeSql(row.email)}, ${escapeSql(row.product_id)}, ${escapeSql(row.message)}, ${escapeSql(row.status)}, ${escapeSql(row.created_at)})
          ON CONFLICT ("id") DO NOTHING;
        `);
      }
      console.log(`  ✓ Enquiries migrated.`);
    }

    // 4.5 Products
    if (dump.tables.products && dump.tables.products.length > 0) {
      console.log(`  -> Migrating ${dump.tables.products.length} products...`);
      for (const row of dump.tables.products) {
        await targetPrisma.$executeRawUnsafe(`
          INSERT INTO "products" ("id", "model", "name", "category", "description", "brand_image_url", "image_url", "pdf_url", "features", "status", "created_at", "updated_at")
          VALUES (${escapeSql(row.id)}, ${escapeSql(row.model)}, ${escapeSql(row.name)}, ${escapeSql(row.category)}, ${escapeSql(row.description)}, ${escapeSql(row.brand_image_url)}, ${escapeSql(row.image_url)}, ${escapeSql(row.pdf_url)}, ${escapeSql(row.features)}, ${escapeSql(row.status)}, ${escapeSql(row.created_at)}, ${escapeSql(row.updated_at)})
          ON CONFLICT ("id") DO UPDATE SET
            "model" = EXCLUDED."model",
            "name" = EXCLUDED."name",
            "category" = EXCLUDED."category",
            "description" = EXCLUDED."description",
            "brand_image_url" = EXCLUDED."brand_image_url",
            "image_url" = EXCLUDED."image_url",
            "pdf_url" = EXCLUDED."pdf_url",
            "features" = EXCLUDED."features",
            "status" = EXCLUDED."status",
            "updated_at" = EXCLUDED."updated_at";
        `);
      }
      console.log(`  ✓ Products migrated.`);
    }

    // 5. Reset Auto-Increment Sequences
    console.log("\n🔢 Step 4: Resetting auto-increment sequences to highest IDs...");
    const seqTables = ["categories", "brands", "products", "enquiries", "admins"];
    for (const table of seqTables) {
      try {
        await targetPrisma.$executeRawUnsafe(`
          SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX("id") FROM "${table}"), 1));
        `);
        console.log(`  ✓ Sequence for '${table}' reset.`);
      } catch (seqErr) {
        console.log(`  Notice on sequence for '${table}': ${seqErr.message}`);
      }
    }

    // 6. Verification
    console.log("\n🔍 Step 5: Verifying row counts in target database...");
    const counts = {};
    for (const table of seqTables) {
      const res = await targetPrisma.$queryRawUnsafe(`SELECT COUNT(*)::text as count FROM "${table}";`);
      counts[table] = res[0]?.count || "0";
    }

    console.log("\n=================================================================");
    console.log("🎉 DATABASE MIGRATION COMPLETED SUCCESSFULLY!");
    console.log("=================================================================");
    console.log("Summary of records in new database:");
    console.log(`  • admins:     ${counts.admins} records`);
    console.log(`  • brands:     ${counts.brands} records`);
    console.log(`  • categories: ${counts.categories} records`);
    console.log(`  • products:   ${counts.products} records`);
    console.log(`  • enquiries:  ${counts.enquiries} records`);
    console.log("-----------------------------------------------------------------");
    console.log("👉 NEXT STEP:");
    console.log("When you are ready, update your .env file with your new connection details:");
    console.log(`DATABASE_URL="${targetUrl}"`);
    console.log("=================================================================\n");

  } catch (err) {
    console.error("\n❌ MIGRATION ERROR:", err.message);
    if (err.stack) console.error(err.stack);
    process.exit(1);
  } finally {
    await targetPrisma.$disconnect();
  }
}

runMigration();
