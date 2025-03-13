import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fullName = searchParams.get("fullName");
    const specialization = searchParams.get("specialization");
    const department = searchParams.get("department");
    const phone = searchParams.get("phone");

    const where: any = {};
    if (fullName) where.fullName = { contains: fullName };
    if (specialization) where.specialization = { contains: specialization };
    if (department) where.department = { contains: department };
    if (phone) where.phone = { contains: phone };

    const doctors = await prisma.doctor.findMany({
      where,
      include: {
        account: true,
        appointments: true,
        prescriptions: true,
        bills: true,
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

// POST /api/doctors - Create many doctor
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const doctors = await prisma.doctor.createMany({
      data: body,
      skipDuplicates: true,
    });
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create doctors" },
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
      where: { id: parseInt(id) },
      data: {
        fullName: body.fullName,
        specialization: body.specialization,
        phone: body.phone,
        department: body.department,
      },
      include: {
        account: true,
        appointments: true,
        prescriptions: true,
        bills: true,
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
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}
