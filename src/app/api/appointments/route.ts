import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/appointments - Get all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// POST /api/appointments - Create new appointment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: new Date(body.appointmentDate),
        status: body.status,
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
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}

// PUT /api/appointments/[id] - Update appointment
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        appointmentDate: body.appointmentDate
          ? new Date(body.appointmentDate)
          : undefined,
        status: body.status,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(appointment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// DELETE /api/appointments/[id] - Delete appointment
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
