import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/staff - Get all staff members
export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      include: {
        account: true,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch staff" },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create new staff member
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const staff = await prisma.staff.create({
      data: {
        fullName: body.fullName,
        position: body.position,
        phone: body.phone,
        department: body.department,
        account: {
          connect: {
            id: body.accountId,
          },
        },
      },
      include: {
        account: true,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create staff member" },
      { status: 500 }
    );
  }
}

// PUT /api/staff/[id] - Update staff member
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Staff ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const staff = await prisma.staff.update({
      where: { id },
      data: {
        fullName: body.fullName,
        position: body.position,
        phone: body.phone,
        department: body.department,
      },
      include: {
        account: true,
      },
    });
    return NextResponse.json(staff);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update staff member" },
      { status: 500 }
    );
  }
}

// DELETE /api/staff/[id] - Delete staff member
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Staff ID is required" },
        { status: 400 }
      );
    }

    await prisma.staff.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete staff member" },
      { status: 500 }
    );
  }
}
