export interface Account {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: "PATIENT" | "DOCTOR" | "STAFF" | "ADMIN";
  createdAt: Date;
  patient?: Patient;
  doctor?: Doctor;
  staff?: Staff;
}

export interface Staff {
  id?: number;
  accountId?: number;
  dob?: Date;
  gender?: string;
  fullName?: string;
  position?: string;
  phone?: string;
  department?: string;
  account?: Account;
}

export interface Patient {
  id?: number;
  accountId?: number;
  fullName?: string;
  dob?: Date;
  gender?: string;
  phone?: string;
  address?: string;
  account?: Account;
  appointments?: Appointment[];
  prescriptions?: Prescription[];
  bills?: Bill[];
  medicalRecords?: MedicalRecord[];
}

export interface Doctor {
  id?: number;
  accountId?: number;
  userId: string;
  fullName?: string;
  specialization?: string;
  phone?: string;
  department?: string;
  account?: Account;
  appointments?: Appointment[];
  prescriptions?: Prescription[];
  bills?: Bill[];
  medicalRecords?: MedicalRecord[];
}

export type AppointmentStatus = "NOTCOMFIRM" | "CONFIRMED" | "CANCELED";

export interface Appointment {
  id?: number;
  patientId: number;
  doctorId?: number;
  appointmentDate: Date;
  status: AppointmentStatus;
  patient: Patient;
  doctor?: Doctor;
  medicalRecord?: MedicalRecord;
  symptoms: string;
}

export interface Prescription {
  id: number;
  patientId: number;
  doctorId: number;
  diagnosis: string;
  note?: string;
  createdAt: Date;
  billId?: number;
  totalCost?: number;
  patient: Patient;
  doctor: Doctor;
  prescriptionMedicines: PrescriptionMedicine[];
  bill?: Bill;
}

export interface PrescriptionMedicine {
  id?: number;
  prescriptionId: number;
  medicineId: number;
  quantity: number;
  note?: string;
  prescription: Prescription;
  medicine: Medicine;
}

export interface Medicine {
  id?: number;
  name: string;
  unit: string;
  price: number;
  stock: number;
  note?: string;
  prescriptionMedicines?: PrescriptionMedicine[];
}

export interface Bill {
  id?: number;
  status: "PENDING" | "PAID" | "CANCELLED";
  totalCost: number;
  createdAt: Date;
  paidAt: Date;
  patientId: number;
  patient: Patient;
  testResults?: TestResult[];
  prescriptions?: Prescription[];
}

interface TestResult {
  id?: number;
  patientId: number;
  doctorId: number;
  billId: number;
  testDate: Date;
  testName: string;
  testType: string;
  result: string;
  interpretation: string;
  note: string;
  totalCost: number;
}
export interface MedicalRecord {
  id?: number;
  createdAt: Date;
  diagnosis: string; // chẩn đoán
  symptoms: string; // triệu chứng
  note: string;
  patientId: number;
  doctorId: number;
  patient: Patient;
  doctor: Doctor;
  bill: Bill;
  appointment: Appointment;
  appointmentId: number;
}
