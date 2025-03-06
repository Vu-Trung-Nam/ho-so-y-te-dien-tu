import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/bills - Get all bills
export async function GET() {
  try {
    const bills = await prisma.bill.findMany({
      include: {
        patient: true,
        doctor: true,
        prescription: true,
      },
    });
    return NextResponse.json(bills);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bills" },
      { status: 500 }
    );
  }
}

// POST /api/bills - Create new bill
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const bill = await prisma.bill.create({
      data: {
        totalAmount: body.totalAmount,
        status: body.status,
        paidAt: body.paidAt ? new Date(body.paidAt) : null,
        patient: {
          connect: {
            id: body.patientId,
          },
        },
        doctor: {
          connect: {
            id: body.doctorId,
          },
        },
        ...(body.prescriptionId && {
          prescription: {
            connect: {
              id: body.prescriptionId,
            },
          },
        }),
      },
      include: {
        patient: true,
        doctor: true,
        prescription: true,
      },
    });
    return NextResponse.json(bill);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create bill" },
      { status: 500 }
    );
  }
}

// PUT /api/bills/[id] - Update bill
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Bill ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const bill = await prisma.bill.update({
      where: { id },
      data: {
        totalAmount: body.totalAmount,
        status: body.status,
        paidAt: body.paidAt ? new Date(body.paidAt) : undefined,
      },
      include: {
        patient: true,
        doctor: true,
        prescription: true,
      },
    });
    return NextResponse.json(bill);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update bill" },
      { status: 500 }
    );
  }
}

// DELETE /api/bills/[id] - Delete bill
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Bill ID is required" },
        { status: 400 }
      );
    }

    await prisma.bill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Bill deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete bill" },
      { status: 500 }
    );
  }
}
