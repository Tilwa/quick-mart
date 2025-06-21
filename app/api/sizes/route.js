import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

// **************************************GET ALL SIZES STARTS HERE********************************************* //

export async function GET(req = request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;

    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "";

    const whereClause = search
      ? {
          OR: [{ label: { contains: search, mode: "insensitive" } }],
        }
      : {};

    let orderByClause = null;
    if (sortBy === "label-asc") {
      orderByClause = { label: "asc" };
    } else if (sortBy === "label-desc") {
      orderByClause = { label: "desc" };
    }

    const queryOptions = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereClause,
    };

    if (orderByClause) {
      queryOptions.orderBy = orderByClause;
    }

    const [count, sizes] = await Promise.all([
      prisma.size.count({ where: whereClause }),
      prisma.size.findMany(queryOptions),
    ]);

    return NextResponse.json({ sizes, count });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch sizes" },
      { status: 500 }
    );
  }
}

// **************************************GET ALL SIZES ENDS HERE********************************************* //

// **************************************ADD A SIZES STARTS HERE********************************************* //
export async function POST(request) {
  try {
    const body = await request.json();
    const { label } = body;

    const newSize = await prisma.size.create({
      data: { label },
    });

    return NextResponse.json(newSize, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating size", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************ADD A SIZE ENDS HERE********************************************* //
