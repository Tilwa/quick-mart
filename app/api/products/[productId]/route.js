import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

// **************************************EDIT PRODUCT CODE STARTS********************************************* //

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const productId = parseInt(params.productId);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title: body.title,
        description: body.description,
        brand: body.brand,
        category: body.category,
        offerPrice: parseFloat(body.offerPrice),
        originalPrice: parseFloat(body.originalPrice),
        inStock: parseInt(body.inStock),
        image1: body.image1,
        image2: body.image2,
        image3: body.image3,
        image4: body.image4,
        image5: body.image5,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************EDIT PRODUCT CODE ENDS********************************************* //

// **************************************DELETE PRODUCT BY ID CODE STARTS********************************************* //

export async function DELETE(request, { params }) {
  const { productId } = params;

  if (!params?.productId || isNaN(parseInt(params.productId, 10))) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  const id = parseInt(productId, 10);
  if (isNaN(id)) {
    // Avoid logging this unless you need it
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    // Optional: Only log detailed errors in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error deleting product:", error);
    }

    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// **************************************DELETE PRODUCT BY ID CODE ENDS********************************************* //

// **************************************GET PRODUCT BY ID CODE STARTS********************************************* //

export async function GET(request, context) {
  const id = parseInt(context.params.productId); // ✅ Correct & safe

  if (isNaN(id)) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************GET PRODUCT BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE PRODUCTS CODE STARTS********************************************* //

export async function POST(req) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No IDs provided" }, { status: 400 });
    }

    await prisma.product.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

// **************************************DELETE MULTIPLE PRODUCTS CODE ENDS********************************************* //
