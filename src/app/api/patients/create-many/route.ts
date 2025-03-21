import { NextResponse } from "next/server";
import { Department, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const patient = await prisma.patient.createMany({
      data: body,
      skipDuplicates: true,
    });
    return NextResponse.json(patient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create doctors" },
      { status: 500 }
    );
  }
}
