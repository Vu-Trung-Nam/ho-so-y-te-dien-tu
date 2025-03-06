// components/Navbar.tsx
"use client";
import {
  clearCookie,
  getProfile,
  getRole,
  getUsername,
  setUsername,
} from "@/lib/cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const role = getRole();
  const user = getUsername();
  const profile = getProfile();
  const router = useRouter();

  const home = {
    ADMIN: "/admin",
    DOCTOR: "/doctor",
    STAFF: "/staff",
    PATIENT: "/user",
  };
  const hrefHome = home[role as keyof typeof home] ?? "/";
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md px-16">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🏥 Phòng Khám XYZ
        </Link>
        <div className="space-x-9">
          <Link href={hrefHome} className="hover:underline">
            Trang chủ
          </Link>
          <Link href="/" className="hover:underline">
            Dịch vụ
          </Link>
            {/* <Link href="/" className="hover:underline">
              Đăng ký khám
            </Link> */}
          <Link href="/" className="hover:underline">
            Liên hệ
          </Link>
        </div>
        {!role && !user && !profile && (
          <Link
            href="/login"
            className="bg-white text-blue-600 p-1 px-2 rounded-lg"
          >
            Đăng nhập
          </Link>
        )}
        {role && user && profile && (
          <button
            onClick={() => {
              clearCookie();
              router.push("/login");
            }}
            className="bg-white text-blue-600 p-1 px-2 rounded-lg"
          >
            Đăng xuất
          </button>
        )}
      </div>
    </nav>
  );
}
