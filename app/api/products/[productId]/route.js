import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

// **************************************GET PRODUCT BY ID CODE STARTS********************************************* //

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const productId = url.pathname.split("/").pop();
    const id = parseInt(productId);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        colors: {
          include: {
            color: true, // includes Color (name, hexCode)
          },
        },
        sizes: {
          include: {
            size: true, // includes Size (label)
          },
        },
      },
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

// **************************************EDIT PRODUCT BY ID CODE STARTS********************************************* //

export async function PATCH(request) {
  // const { params } = await context;

  try {
    // const parsedProductId = parseInt(params.productId);
    // const body = await request.json();
    const url = new URL(request.url);
    const productId = url.pathname.split("/").pop();
    const parsedProductId = parseInt(productId);

    const body = await request.json();

    if (isNaN(parsedProductId)) {
      return NextResponse.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: parsedProductId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Update product fields
    await prisma.product.update({
      where: { id: parsedProductId },
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

    // Update colors
    if (Array.isArray(body.colors)) {
      await prisma.productColor.deleteMany({
        where: { productId: parsedProductId },
      });

      await prisma.productColor.createMany({
        data: body.colors.map((c) => ({
          productId: parsedProductId,
          colorId: c.colorId,
        })),
      });
    }

    // Update sizes
    if (Array.isArray(body.sizes)) {
      await prisma.productSize.deleteMany({
        where: { productId: parsedProductId },
      });

      await prisma.productSize.createMany({
        data: body.sizes.map((s) => ({
          productId: parsedProductId,
          sizeId: s.sizeId,
        })),
      });
    }

    // Return updated product
    const updatedProduct = await prisma.product.findUnique({
      where: { id: parsedProductId },
      include: {
        colors: { include: { color: true } },
        sizes: { include: { size: true } },
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************EDIT PRODUCT BY ID CODE ENDS********************************************* //

// **************************************DELETE PRODUCT BY ID CODE STARTS********************************************* //

export async function DELETE(request, context) {
  const { params } = await context;
  const productId = params?.productId;

  if (!productId || isNaN(parseInt(productId))) {
    return NextResponse.json(
      { message: "Invalid product ID" },
      { status: 400 }
    );
  }

  const id = parseInt(productId);

  try {
    await prisma.productColor.deleteMany({ where: { productId: id } });
    await prisma.productSize.deleteMany({ where: { productId: id } });
    const deletedProduct = await prisma.product.delete({ where: { id } });

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error?.message || error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}

// **************************************DELETE PRODUCT BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE PRODUCTS CODE STARTS********************************************* //

export async function POST(req) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No IDs provided" }, { status: 400 });
    }

    // Step 1: Delete related product colors
    await prisma.productColor.deleteMany({
      where: {
        productId: { in: ids },
      },
    });

    // Step 2: Delete related product sizes
    await prisma.productSize.deleteMany({
      where: {
        productId: { in: ids },
      },
    });

    // Step 3: Delete the products themselves
    await prisma.product.deleteMany({
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

// **************************************DELETE MULTIPLE PRODUCTS CODE ENDS********************************************* //
