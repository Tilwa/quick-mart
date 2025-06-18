import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

// **************************************GET ALL COLORS STARTS HERE********************************************* //

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = searchParams.get("page");
    const sortBy = searchParams.get("sortBy") || "name";
    const pageSize = 10;

    // Common where clause
    const whereClause = {
      name: {
        contains: search,
        mode: "insensitive",
      },
    };

    // If pagination is requested
    if (page) {
      const pageNum = parseInt(page);

      const [colors, count] = await Promise.all([
        prisma.color.findMany({
          where: whereClause,
          skip: (pageNum - 1) * pageSize,
          take: pageSize,
          orderBy: {
            [sortBy]: "asc",
          },
        }),
        prisma.color.count({ where: whereClause }),
      ]);

      return NextResponse.json({ count, colors });
    }

    // If no pagination, return all colors
    const [colors, count] = await Promise.all([
      prisma.color.findMany({
        where: whereClause,
      }),
      prisma.color.count({ where: whereClause }),
    ]);

    return NextResponse.json({ count, colors });
  } catch (error) {
    console.error("Error fetching colors:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch colors" }), {
      status: 500,
    });
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
