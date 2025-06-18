// **************************************DELETE COLOR BY ID CODE STARTS HERE********************************************* //

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const deleted = await prisma.color.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting color:", error);
    return new Response(JSON.stringify({ error: "Failed to delete color" }), {
      status: 500,
    });
  }
}

// **************************************DELETE COLOR BY ID CODE ENDS HERE********************************************* //

// **************************************DELETE MULTIPLE COLORS CODE ENDS HERE********************************************* //
export async function POST(request) {
  try {
    const { ids } = await request.json(); // expects: { ids: ['id1', 'id2'] }

    const deleted = await prisma.color.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ deletedCount: deleted.count });
  } catch (error) {
    console.error("Error deleting multiple colors:", error);
    return new Response(JSON.stringify({ error: "Failed to delete colors" }), {
      status: 500,
    });
  }
}

// **************************************DELETE MULTIPLE COLORS CODE ENDS HERE********************************************* //

// **************************************GET COLOR BY ID CODE STARTS HERE********************************************* //
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const color = await prisma.color.findUnique({
      where: { id },
    });

    if (!color) {
      return new Response(JSON.stringify({ error: "Color not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(color);
  } catch (error) {
    console.error("Error fetching color by ID:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch color" }), {
      status: 500,
    });
  }
}
// **************************************GET COLOR BY ID CODE ENDS HERE********************************************* //

// **************************************EDIT COLOR BY ID CODE STARTS HERE********************************************* //
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, hex } = await request.json();

    const updated = await prisma.color.update({
      where: { id },
      data: { name, hex },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating color:", error);
    return new Response(JSON.stringify({ error: "Failed to update color" }), {
      status: 500,
    });
  }
}
// **************************************EDIT COLOR BY ID CODE ENDS HERE********************************************* //
