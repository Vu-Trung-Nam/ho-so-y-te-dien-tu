import { NextResponse } from "next/server";
import { Department, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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
