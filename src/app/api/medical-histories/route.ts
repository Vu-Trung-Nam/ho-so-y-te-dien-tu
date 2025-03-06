import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/medical-histories - Get all medical histories
export async function GET() {
  try {
    const medicalHistories = await prisma.medicalHistory.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(medicalHistories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch medical histories" },
      { status: 500 }
    );
  }
}

// POST /api/medical-histories - Create new medical history
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const medicalHistory = await prisma.medicalHistory.create({
      data: {
        visitDate: new Date(body.visitDate),
        symptoms: body.symptoms,
        diagnosis: body.diagnosis,
        treatment: body.treatment,
        note: body.note,
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
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(medicalHistory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create medical history" },
      { status: 500 }
    );
  }
}

// PUT /api/medical-histories/[id] - Update medical history
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Medical History ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const medicalHistory = await prisma.medicalHistory.update({
      where: { id },
      data: {
        visitDate: body.visitDate ? new Date(body.visitDate) : undefined,
        symptoms: body.symptoms,
        diagnosis: body.diagnosis,
        treatment: body.treatment,
        note: body.note,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(medicalHistory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update medical history" },
      { status: 500 }
    );
  }
}

// DELETE /api/medical-histories/[id] - Delete medical history
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Medical History ID is required" },
        { status: 400 }
      );
    }

    await prisma.medicalHistory.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Medical history deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete medical history" },
      { status: 500 }
    );
  }
}
