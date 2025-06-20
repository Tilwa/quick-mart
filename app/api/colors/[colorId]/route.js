import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // Adjust path based on your setup

// **************************************DELETE COLOR BY ID CODE STARTS HERE********************************************* //

export async function DELETE(request, { params }) {
  const colorId = params?.colorId;

  if (!colorId || isNaN(parseInt(colorId))) {
    return NextResponse.json({ message: "Invalid color ID" }, { status: 400 });
  }

  const id = parseInt(colorId);

  try {
    // Step 1: Remove related entries in ProductColor
    await prisma.productColor.deleteMany({
      where: { colorId: id },
    });

    // Step 2: Delete the color itself
    const deletedColor = await prisma.color.delete({
      where: { id },
    });

    return NextResponse.json(deletedColor, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting color:", error.message || error);
    return NextResponse.json(
      { message: "Failed to delete color" },
      { status: 500 }
    );
  }
}

// **************************************DELETE COLOR BY ID CODE ENDS HERE********************************************* //

// **************************************DELETE MULTIPLE COLORS CODE ENDS HERE********************************************* //

export async function POST(req) {
  try {
    const { ids } = await req.json(); // ids = [colorId1, colorId2, ...]

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "No color IDs provided" },
        { status: 400 }
      );
    }

    // Step 1: Delete references from ProductColor
    await prisma.productColor.deleteMany({
      where: {
        colorId: { in: ids },
      },
    });

    // Step 2: Delete colors themselves
    await prisma.color.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// **************************************DELETE MULTIPLE COLORS CODE ENDS HERE********************************************* //

// **************************************GET COLOR BY ID CODE STARTS HERE********************************************* //
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const colorId = url.pathname.split("/").pop();
    const id = parseInt(colorId);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid color ID" },
        { status: 400 }
      );
    }

    const color = await prisma.color.findUnique({
      where: { id },
    });

    if (!color) {
      return NextResponse.json({ message: "Color not found" }, { status: 404 });
    }

    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    console.error("Error fetching color:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
// **************************************GET COLOR BY ID CODE ENDS HERE********************************************* //

// **************************************EDIT COLOR BY ID CODE STARTS HERE********************************************* //
export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const colorId = url.pathname.split("/").pop();
    const parsedColorId = parseInt(colorId);

    const body = await request.json();

    if (isNaN(parsedColorId)) {
      return NextResponse.json(
        { message: "Invalid color ID" },
        { status: 400 }
      );
    }

    const existingColor = await prisma.color.findUnique({
      where: { id: parsedColorId },
    });

    if (!existingColor) {
      return NextResponse.json({ message: "Color not found" }, { status: 404 });
    }

    // Update color fields
    await prisma.color.update({
      where: { id: parsedColorId },
      data: {
        name: body.name,
        hexCode: body.hexCode,
      },
    });

    // Return updated color
    const updatedColor = await prisma.color.findUnique({
      where: { id: parsedColorId },
    });
    if (!updatedColor) {
      return NextResponse.json({ message: "Color not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Color updated successfully", color: updatedColor },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update color:", error);
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}
// **************************************EDIT COLOR BY ID CODE ENDS HERE********************************************* //
