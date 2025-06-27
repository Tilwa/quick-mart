import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma"; // adjust path if needed

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      mobile,
      quantity,
      emirate,
      address,
      price,
      productId,
      productTitle,
      variant,
    } = body;

    const order = await prisma.order.create({
      data: {
        name,
        mobile,
        quantity: parseInt(quantity),
        emirate,
        address,
        price: parseFloat(price),
        productId,
        productTitle,
        variantColor: variant?.color || null,
        variantSize: variant?.size || null,
        variantImage: variant?.image || null,
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Order API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}
