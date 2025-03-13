//  api create medicine
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export interface ICreateMedicine {
  name: string;
  unit: "PILL" | "BOTTLE" | "CAPSULE" | "INJECTION";
  price: number;
  stock: number;
  note: string;
}
// create many medicine, skip data if medicine already exists
export async function POST(request: Request) {
  const body: ICreateMedicine[] = await request.json();
  try {
    // skip if medicine already exists
    const medicine = await prisma.medicine.createMany({
      data: body.map((medicine) => ({
        name: medicine.name,
        unit: medicine.unit,
        price: medicine.price,
        stock: medicine.stock,
        note: medicine.note,
      })),
      skipDuplicates: true,
    });
    return NextResponse.json(medicine);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create medicine" },
      { status: 500 }
    );
  }
}

// api get all medicine
export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany();
    return NextResponse.json(medicines);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get medicines" },
      { status: 500 }
    );
  }
}
