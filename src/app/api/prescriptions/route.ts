import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/prescriptions - Get all prescriptions
export async function GET() {
  try {
    const prescriptions = await prisma.prescription.findMany({
      include: {
        patient: true,
        doctor: true,
        medicines: true,
      },
    });
    return NextResponse.json(prescriptions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch prescriptions" },
      { status: 500 }
    );
  }
}

// POST /api/prescriptions - Create new prescription with medicines
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { medicines, ...prescriptionData } = body;

    const prescription = await prisma.prescription.create({
      data: {
        diagnosis: prescriptionData.diagnosis,
        note: prescriptionData.note,
        status: prescriptionData.status,
        patient: {
          connect: {
            id: prescriptionData.patientId,
          },
        },
        doctor: {
          connect: {
            id: prescriptionData.doctorId,
          },
        },
        medicines: {
          create: medicines.map((medicine: any) => ({
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration: medicine.duration,
            note: medicine.note,
          })),
        },
      },
      include: {
        patient: true,
        doctor: true,
        medicines: true,
      },
    });
    return NextResponse.json(prescription);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create prescription" },
      { status: 500 }
    );
  }
}

// PUT /api/prescriptions/[id] - Update prescription
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Prescription ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { medicines, ...prescriptionData } = body;

    const prescription = await prisma.prescription.update({
      where: { id },
      data: {
        diagnosis: prescriptionData.diagnosis,
        note: prescriptionData.note,
        status: prescriptionData.status,
        medicines: {
          deleteMany: {},
          create: medicines.map((medicine: any) => ({
            name: medicine.name,
            dosage: medicine.dosage,
            frequency: medicine.frequency,
            duration: medicine.duration,
            note: medicine.note,
          })),
        },
      },
      include: {
        patient: true,
        doctor: true,
        medicines: true,
      },
    });
    return NextResponse.json(prescription);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update prescription" },
      { status: 500 }
    );
  }
}

// DELETE /api/prescriptions/[id] - Delete prescription
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Prescription ID is required" },
        { status: 400 }
      );
    }

    await prisma.prescription.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Prescription deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete prescription" },
      { status: 500 }
    );
  }
}
