import { Footer } from "@/components/layout/Footer";
import HeaderAdmin from "@/components/layout/HeaderAdmin";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <HeaderAdmin />
      {children}
      <Footer />
    </div>
  );
}
