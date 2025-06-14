import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

// GET all sizes
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const sortBy = searchParams.get("sortBy") || "label";
    const pageSize = 10;

    const sizes = await prisma.size.findMany({
      where: {
        label: {
          contains: search,
          mode: "insensitive",
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        [sortBy]: "asc",
      },
    });

    return Response.json(sizes);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch sizes" }), {
      status: 500,
    });
  }
}

// POST a new size
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
