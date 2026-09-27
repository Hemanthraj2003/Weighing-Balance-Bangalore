import { PrismaClient } from "@prisma/client";

// Ensure BigInt can be serialized to JSON safely
if (!BigInt.prototype.toJSON) {
  BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString(), 10);
    return int ?? this.toString();
  };
}

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
