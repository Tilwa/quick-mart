import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

// **************************************RECEIVED ORDER CODE STARTS********************************************* //

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      mobile,
      quantity,
      emirate,
      address,
      price,
      productId,
      productTitle,
      variant,
      status,
    } = body;

    const order = await prisma.order.create({
      data: {
        name,
        mobile,
        quantity: parseInt(quantity),
        emirate,
        address,
        price: parseFloat(price),
        productId,
        productTitle,
        variantColor: variant?.color || null,
        variantSize: variant?.size || null,
        variantImage: variant?.image || null,
        status: "pending",
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}

// **************************************RECEIVED ORDER CODE ENDS********************************************* //

// **************************************GET ALL ORDERS CODE STARTS********************************************* //

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
            { name: { contains: search, mode: "insensitive" } },
            { productTitle: { contains: search, mode: "insensitive" } },
            { status: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    let orderByClause = null;

    if (sortBy === "name-asc") {
      orderByClause = { name: "asc" };
    } else if (sortBy === "name-desc") {
      orderByClause = { name: "desc" };
    } else if (sortBy === "productTitle-asc") {
      orderByClause = { productTitle: "asc" };
    } else if (sortBy === "productTitle-desc") {
      orderByClause = { productTitle: "desc" };
    }

    const queryOptions = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereClause,
    };

    if (orderByClause) {
      queryOptions.orderBy = orderByClause;
    }

    const [count, orders] = await Promise.all([
      prisma.order.count({ where: whereClause }),
      prisma.order.findMany(queryOptions),
    ]);

    return NextResponse.json({ count, orders });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// **************************************GET ALL ORDERS CODE ENDS********************************************* //
