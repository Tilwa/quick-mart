import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // Adjust path based on your setup

// **************************************DELETE SIZE BY ID CODE STARTS HERE********************************************* //

export async function DELETE(request, { params }) {
  const sizeId = params?.sizeId;

  if (!sizeId || isNaN(parseInt(sizeId))) {
    return NextResponse.json({ message: "Invalid size ID" }, { status: 400 });
  }

  const id = parseInt(sizeId);

  try {
    // Step 1: Remove related entries in ProductSize
    await prisma.productSize.deleteMany({
      where: { sizeId: id },
    });

    // Step 2: Delete the size itself
    const deletedSize = await prisma.size.delete({
      where: { id },
    });

    return NextResponse.json(deletedSize, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting size:", error.message || error);
    return NextResponse.json(
      { message: "Failed to delete size" },
      { status: 500 }
    );
  }
}

// **************************************DELETE SIZE BY ID CODE ENDS HERE********************************************* //

// **************************************DELETE MULTIPLE SIZES CODE ENDS HERE********************************************* //

export async function POST(req) {
  try {
    const { ids } = await req.json(); // ids = [sizeId1, sizeId2, ...]

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { message: "No color IDs provided" },
        { status: 400 }
      );
    }

    // Step 1: Delete references from ProductSize
    await prisma.productSize.deleteMany({
      where: {
        sizeId: { in: ids },
      },
    });

    // Step 2: Delete sizes themselves
    await prisma.size.deleteMany({
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

// **************************************DELETE MULTIPLE SIZES CODE ENDS HERE********************************************* //

// **************************************GET SIZE BY ID CODE STARTS HERE********************************************* //
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const sizeId = url.pathname.split("/").pop();
    const id = parseInt(sizeId);

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid size ID" }, { status: 400 });
    }

    const size = await prisma.size.findUnique({
      where: { id },
    });

    if (!size) {
      return NextResponse.json({ message: "Size not found" }, { status: 404 });
    }

    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    console.error("Error fetching size:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
// **************************************GET SIZE BY ID CODE ENDS HERE********************************************* //

// **************************************EDIT SIZE BY ID CODE STARTS HERE********************************************* //
export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const sizeId = url.pathname.split("/").pop();
    const parsedSizeId = parseInt(sizeId);

    const body = await request.json();

    if (isNaN(parsedSizeId)) {
      return NextResponse.json({ message: "Invalid size ID" }, { status: 400 });
    }

    const existingSize = await prisma.size.findUnique({
      where: { id: parsedSizeId },
    });

    if (!existingSize) {
      return NextResponse.json({ message: "Size not found" }, { status: 404 });
    }

    // Update size fields
    await prisma.size.update({
      where: { id: parsedSizeId },
      data: {
        label: body.label,
      },
    });

    // Return updated size
    const updatedSize = await prisma.size.findUnique({
      where: { id: parsedSizeId },
    });
    if (!updatedSize) {
      return NextResponse.json({ message: "Size not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Size updated successfully", size: updatedSize },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update size:", error);
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}
// **************************************EDIT SIZE BY ID CODE ENDS HERE********************************************* //
