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

// **************************************DELETE PRODUCT CODE STARTS********************************************* //

export async function DELETE(request, { params }) {
  const id = parseInt(params.productId);

  if (isNaN(id)) {
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
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************DELETE PRODUCT CODE ENDS********************************************* //

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
