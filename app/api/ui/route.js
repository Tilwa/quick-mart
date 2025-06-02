// **************************************GET ALL-PRODUCTS PAGE PRODUCTS CODE STARTS********************************************* //
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Update path to your prisma import

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;

    const search = searchParams.get("search") || "";

    const whereClause = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { brand: { contains: search, mode: "insensitive" } },
            { category: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [count, products] = await Promise.all([
      prisma.product.count({ where: whereClause }),
      prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: whereClause,
        orderBy: { createdAt: "desc" }, // Or whatever default
      }),
    ]);

    return NextResponse.json({ products, count });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
// **************************************GET ALL-PRODUCTS PAGE PRODUCTS CODE ENDS********************************************* //
