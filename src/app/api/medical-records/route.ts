import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/medical-records - Get all medical records
export async function GET() {
  try {
    const medicalRecords = await prisma.medicalRecord.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(medicalRecords);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch medical records" },
      { status: 500 }
    );
  }
}

// POST /api/medical-records - Create new medical record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        recordDate: new Date(body.recordDate),
        diagnosis: body.diagnosis,
        treatment: body.treatment,
        note: body.note,
        attachments: body.attachments || [],
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
    return NextResponse.json(medicalRecord);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create medical record" },
      { status: 500 }
    );
  }
}

// PUT /api/medical-records/[id] - Update medical record
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Medical Record ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const medicalRecord = await prisma.medicalRecord.update({
      where: { id },
      data: {
        recordDate: body.recordDate ? new Date(body.recordDate) : undefined,
        diagnosis: body.diagnosis,
        treatment: body.treatment,
        note: body.note,
        attachments: body.attachments,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(medicalRecord);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update medical record" },
      { status: 500 }
    );
  }
}

// DELETE /api/medical-records/[id] - Delete medical record
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Medical Record ID is required" },
        { status: 400 }
      );
    }

    await prisma.medicalRecord.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Medical record deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete medical record" },
      { status: 500 }
    );
  }
}
