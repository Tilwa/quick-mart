import { prisma } from "@/app/_lib/prisma"; // adjust as per your folder
import { NextResponse } from "next/server";

// **************************************ADD PRODUCT CODE STARTS********************************************* //

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      brand,
      category,
      offerPrice,
      originalPrice,
      inStock,
      image1,
      image2,
      image3,
      image4,
      image5,
      colorIds = [], // array of existing color IDs
      sizeIds = [], // array of existing size IDs
    } = body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        brand,
        category,
        offerPrice: parseFloat(offerPrice),
        originalPrice: parseFloat(originalPrice),
        inStock: parseInt(inStock),
        image1,
        image2,
        image3,
        image4,
        image5,
        colors: {
          create: colorIds.map((colorId) => ({
            color: {
              connect: { id: colorId },
            },
          })),
        },
        sizes: {
          create: sizeIds.map((sizeId) => ({
            size: {
              connect: { id: sizeId },
            },
          })),
        },
      },
      include: {
        colors: true,
        sizes: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error?.message || error);
    return NextResponse.json(
      {
        message: "Failed to add product",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// **************************************ADD PRODUCT CODE ENDS********************************************* //

// **************************************GET ALL PRODUCTS CODE STARTS********************************************* //

export async function GET(req = request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);

    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "";

    const whereClause = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { brand: { contains: search, mode: "insensitive" } },
            { category: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    let orderByClause = null;

    if (sortBy === "price-asc") {
      orderByClause = { originalPrice: "asc" };
    } else if (sortBy === "price-desc") {
      orderByClause = { originalPrice: "desc" };
    } else if (sortBy === "title-asc") {
      orderByClause = { title: "asc" };
    } else if (sortBy === "title-desc") {
      orderByClause = { title: "desc" };
    }

    const queryOptions = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereClause,
    };

    if (orderByClause) {
      queryOptions.orderBy = orderByClause;
    }

    const [count, products] = await Promise.all([
      prisma.product.count({ where: whereClause }),
      prisma.product.findMany(queryOptions),
    ]);

    return NextResponse.json({ count, products });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// **************************************GET ALL PRODUCTS CODE ENDS********************************************* //
