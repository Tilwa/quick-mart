import { prisma } from "@/app/_lib/prisma"; // adjust as per your folder
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "50");
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "";

    const brand = searchParams.getAll("brand");
    const color = searchParams.getAll("color");
    const size = searchParams.getAll("size");
    const availability = searchParams.get("availability");
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "0");

    const where = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { brand: { contains: search, mode: "insensitive" } },
          { category: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(brand.length > 0 && { brand: { in: brand } }),
      ...(availability === "InStock" && { inStock: { gt: 0 } }),
      ...(availability === "OutOfStock" && { inStock: 0 }),
      ...(minPrice > 0 && { offerPrice: { gte: minPrice } }),
      ...(maxPrice > 0 && { offerPrice: { lte: maxPrice } }),
    };

    const include = {
      colors: { include: { color: true } },
      sizes: { include: { size: true } },
    };

    let orderBy = {};
    if (sortBy === "price-asc") orderBy = { offerPrice: "asc" };
    else if (sortBy === "price-desc") orderBy = { offerPrice: "desc" };
    else if (sortBy === "title-asc") orderBy = { title: "asc" };
    else if (sortBy === "title-desc") orderBy = { title: "desc" };

    let products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
      include,
      ...(sortBy && { orderBy }),
    });

    // post-filter for color and size (many-to-many)
    if (color.length > 0) {
      products = products.filter((p) =>
        p.colors.some((c) => color.includes(c.color.name))
      );
    }

    if (size.length > 0) {
      products = products.filter((p) =>
        p.sizes.some((s) => size.includes(s.size.label))
      );
    }

    return NextResponse.json({ count: products.length, products });
  } catch (error) {
    console.error("Error fetching filtered products", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
