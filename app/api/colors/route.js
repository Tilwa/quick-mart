import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

// **************************************GET ALL COLORS STARTS HERE********************************************* //
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const colors = await prisma.color.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    return Response.json(colors);
  } catch (error) {
    console.error("Error fetching colors:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch colors" }), {
      status: 500,
    });
  }
}
// **************************************GET ALL COLORS ENDS HERE********************************************* //

// GET all colors

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);

//     const search = searchParams.get("search") || "";
//     const page = parseInt(searchParams.get("page") || "1");
//     const sortBy = searchParams.get("sortBy") || "name";
//     const pageSize = 10;

//     const colors = await prisma.color.findMany({
//       where: {
//         name: {
//           contains: search,
//           mode: "insensitive",
//         },
//       },
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//       orderBy: {
//         [sortBy]: "asc",
//       },
//     });

//     return Response.json(colors);
//   } catch (error) {
//     console.error("Error fetching colors:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch colors" }), {
//       status: 500,
//     });
//   }
// }

// POST a new color
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
