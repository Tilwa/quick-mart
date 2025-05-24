import { prisma } from "@/app/_lib/prisma"; // adjust as per your folder
import { NextResponse } from "next/server";

// **************************************ADD PRODUCT CODE STARTS********************************************* //
export async function POST(request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Failed to add product", error: error.message },
      { status: 500 }
    );
  }
}
// **************************************ADD PRODUCT CODE ENDS********************************************* //

// **************************************GET ALL PRODUCTS CODE STARTS********************************************* //
import { NextRequest } from "next/server";

export async function GET(req = NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;

    const [products, count] = await Promise.all([
      prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({ products, count });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// **************************************GET ALL PRODUCTS CODE ENDS********************************************* //

// **************************************EDIT PRODUCT CODE STARTS********************************************* //
export async function PUT(req) {
  const data = await req.json();
  const updatedProduct = await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      label: data.label,
    },
  });
  return NextResponse.json(updatedProduct);
}
// **************************************EDIT PRODUCT CODE ENDS********************************************* //

// **************************************DELETE PRODUCT CODE STARTS********************************************* //
export async function DELETE(req) {
  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
// **************************************DELETE PRODUCT CODE ENDS********************************************* //
