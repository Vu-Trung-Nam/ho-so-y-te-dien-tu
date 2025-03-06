import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/doctors - Get all doctors
export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        user: true,
        appointments: true,
        prescriptions: true,
        bills: true,
        medicalHistories: true,
        medicalRecords: true,
      },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

// POST /api/doctors - Create new doctor
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const doctor = await prisma.doctor.create({
      data: {
        fullName: body.fullName,
        specialization: body.specialization,
        phone: body.phone,
        department: body.department,
        user: {
          connect: {
            id: body.userId,
          },
        },
      },
      include: {
        user: true,
        appointments: true,
        prescriptions: true,
        bills: true,
        medicalHistories: true,
        medicalRecords: true,
      },
    });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}

// PUT /api/doctors/[id] - Update doctor
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Doctor ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        fullName: body.fullName,
        specialization: body.specialization,
        phone: body.phone,
        department: body.department,
      },
      include: {
        user: true,
        appointments: true,
        prescriptions: true,
        bills: true,
        medicalHistories: true,
        medicalRecords: true,
      },
    });
    return NextResponse.json(doctor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}

// DELETE /api/doctors/[id] - Delete doctor
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Doctor ID is required" },
        { status: 400 }
      );
    }

    await prisma.doctor.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}
