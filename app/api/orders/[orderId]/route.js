import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

// **************************************GET ORDER BY ID CODE STARTS********************************************* //

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const orderId = url.pathname.split("/").pop();
    const id = parseInt(orderId);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid Order ID" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        // colors: {
        //   include: {
        //     color: true, // includes Color (name, hexCode)
        //   },
        // },
        // sizes: {
        //   include: {
        //     size: true, // includes Size (label)
        //   },
        // },
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************GET ORDER BY ID CODE ENDS********************************************* //

// **************************************EDIT ORDER BY ID CODE STARTS********************************************* //

export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const orderId = url.pathname.split("/").pop();
    const parsedOrderId = parseInt(orderId);

    const body = await request.json();

    if (isNaN(parsedOrderId)) {
      return NextResponse.json(
        { message: "Invalid Order ID" },
        { status: 400 }
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: parsedOrderId },
    });

    if (!existingOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Update order fields
    await prisma.order.update({
      where: { id: parsedOrderId },
      data: {
        name: body.name,
        mobile: body.mobile,
        quantity: body.quantity,
        emirate: body.emirate,
        address: body.address,
        price: parseFloat(body.price),
        productId: body.productId,
        productTitle: body.productTitle,
        variantColor: body.variantColor,
        variantSize: body.variantSize,
        variantImage: body.variantImage,
        status: body.status,
      },
    });

    // Return updated order
    const updatedOrder = await prisma.order.findUnique({
      where: { id: parsedOrderId },
    });

    return NextResponse.json(
      { message: "Order updated successfully", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}

// **************************************EDIT ORDER BY ID CODE ENDS********************************************* //

// **************************************DELETE ORDER BY ID CODE STARTS********************************************* //

export async function DELETE(request, context) {
  const { params } = await context;
  const orderId = params?.orderId;

  if (!orderId || isNaN(parseInt(orderId))) {
    return NextResponse.json({ message: "Invalid Order ID" }, { status: 400 });
  }

  const id = parseInt(orderId);

  try {
    const deletedOrder = await prisma.order.delete({ where: { id } });

    return NextResponse.json(deletedOrder, { status: 200 });
  } catch (error) {
    console.error("Error deleting order:", error?.message || error);
    return NextResponse.json(
      { message: "Failed to delete order" },
      { status: 500 }
    );
  }
}

// **************************************DELETE ORDER BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE ORDERS CODE STARTS********************************************* //

export async function POST(req) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: "No IDs provided" }, { status: 400 });
    }

    // Step 3: Delete the orders themselves
    await prisma.order.deleteMany({
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

// **************************************DELETE MULTIPLE ORDERS CODE ENDS********************************************* //
