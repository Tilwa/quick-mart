import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

// **************************************GET ALL COLORS STARTS HERE********************************************* //

export async function GET(req = request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;

    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "";

    const whereClause = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { hexCode: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    let orderByClause = null;
    if (sortBy === "name-asc") {
      orderByClause = { name: "asc" };
    } else if (sortBy === "name-desc") {
      orderByClause = { name: "desc" };
    }

    const queryOptions = {
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: whereClause,
    };

    if (orderByClause) {
      queryOptions.orderBy = orderByClause;
    }

    const [count, colors] = await Promise.all([
      prisma.color.count({ where: whereClause }),
      prisma.color.findMany(queryOptions),
    ]);

    return NextResponse.json({ colors, count });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch colors" },
      { status: 500 }
    );
  }
}

// **************************************GET ALL COLORS ENDS HERE********************************************* //

// **************************************ADD A COLOR STARTS HERE********************************************* //
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, hexCode } = body;

    const newColor = await prisma.color.create({
      data: { name, hexCode },
    });

    return NextResponse.json(newColor, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating color", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************ADD A COLOR ENDS HERE********************************************* //
