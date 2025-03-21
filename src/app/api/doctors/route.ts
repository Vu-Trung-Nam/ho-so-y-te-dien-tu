import { NextResponse } from "next/server";
import { Department, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fullName = searchParams.get("fullName");
    const specialization = searchParams.get("specialization");
    const department = searchParams.get("department");
    const phone = searchParams.get("phone");
    const doctors = await prisma.doctor.findMany({
      where: {
        department: (department as Department) || undefined,
      },
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
    console.log("error:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

// POST /api/doctors - Create many doctor
export interface ICreateDoctor {
  userId: string;
  fullName: string;
  specialization: string;
  phone: string;
  avatar: string;
  department: Department;
}
export async function POST(request: Request) {
  try {
    const body: ICreateDoctor = await request.json();
    const {
      userId,
      fullName,
      specialization,
      phone,
      avatar, // Expect base64 string
      department,
    } = body;
    // Convert base64 to Buffer

    // Create new doctor in database
    const newDoctor = await prisma.doctor.create({
      data: {
        userId,
        fullName,
        specialization,
        phone,
        avatar,
        department,
      },
    });

    return NextResponse.json(newDoctor);
  } catch (error) {
    console.log("errorrrrr--------------:", String(error));
    return NextResponse.json(
      { error: "Failed to create doctors" },
      { status: 500 }
    );
  }
}
