import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

// GET all sizes
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";

    const [sizes, count] = await Promise.all([
      prisma.size.findMany({
        where: {
          label: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
      prisma.size.count({
        where: {
          label: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    ]);

    return NextResponse.json({ count, sizes });
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
