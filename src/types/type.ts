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

export interface Appointment {
  id?: number;
  patientId: number;
  doctorId?: number;
  appointmentDate: Date;
  status: "NOTCOMFIRM" | "CONFIRMED" | "CANCELED";
  patient: Patient;
  doctor?: Doctor;
  medicalRecord?: MedicalRecord;
  symptoms: string;
}

export interface Prescription {
  id?: number;
  patientId: number;
  doctorId: number;
  diagnosis: string;
  note?: string;
  createdAt: Date;
  status: "CANCELLED" | "UNPAID" | "PAID";
  patient: Patient;
  doctor: Doctor;
  prescriptionMedicines?: PrescriptionMedicine[];
  Bill?: Bill[];
  MedicalRecord?: MedicalRecord[];
}

export interface PrescriptionMedicine {
  prescriptionId: number;
  medicineId: number;
  quantity: number;
  dosage: string;
  frequency: string;
  duration: number;
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
}

export interface MedicalRecord {
  id?: number;
}
