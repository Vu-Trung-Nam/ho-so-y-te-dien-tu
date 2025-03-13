"use client";
import useAuthStore from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
const Header = () => {
  const { role, profile, userName, clearCookieStore } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();
  const notLoginMenu = () => {
    return (
      <>
        <div className="col-lg-7 col-md-9 col-12">
          {/* Main Menu */}
          <div className="main-menu">
            <nav className="navigation">
              <ul className="nav menu">
                <li className={pathname === "/" ? "active" : ""}>
                  <Link href="/">Home</Link>
                </li>
                <li className={pathname === "/list_doctor" ? "active" : ""}>
                  <Link href="/list_doctor">Doctos</Link>
                </li>
                <li className={pathname === "/services" ? "active" : ""}>
                  <Link href="/services">Services</Link>
                </li>
                <li className={pathname === "/contact" ? "active" : ""}>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* End Main Menu */}
        </div>
        <div className="col-lg-2 col-12">
          <div className="get-quote">
            <Link href="/user" className="btn">
              Book Appointment
            </Link>
          </div>
        </div>
      </>
    );
  };
  const patientMenu = () => {
    return (
      <div className="col-lg-7 col-md-9 col-12">
        {/* Main Menu */}
        <div className="main-menu">
          <nav className="navigation">
            <ul className="nav menu">
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">Trang chủ</Link>
              </li>
              <li className={pathname === "/user" ? "active" : ""}>
                <Link href="/user">Dịch vụ</Link>
              </li>
              <li className={pathname === "/list_doctor" ? "active" : ""}>
                <Link href="/list_doctor">Danh sách bác sĩ</Link>
              </li>
              <li className={pathname === "/contact" ? "active" : ""}>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* End Main Menu */}
      </div>
    );
  };
  const adminMenu = () => {
    return (
      <div className="col-lg-7 col-md-9 col-12">
        {/* Main Menu */}
        <div className="main-menu">
          <nav className="navigation">
            <ul className="nav menu">
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">QL Bác sĩ</Link>
              </li>
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">QL Nhân viên</Link>
              </li>
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">QL Bệnh nhân</Link>
              </li>
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">QL Hóa đơn</Link>
              </li>
              <li className={pathname === "/" ? "active" : ""}>
                <Link href="/">QL Doanh số</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* End Main Menu */}
      </div>
    );
  };
  const staffMenu = () => {
    return (
      <div className="col-lg-7 col-md-9 col-12">
        {/* Main Menu */}
        <div className="main-menu">
          <nav className="navigation">
            <ul className="nav menu">
              <li className={pathname === "/staff" ? "active" : ""}>
                <Link href="/staff">QL lịch khám</Link>
              </li>
              <li className={pathname === "/staff/invoice" ? "active" : ""}>
                <Link href="/staff/invoice">QL Hóa đơn</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* End Main Menu */}
      </div>
    );
  };
  const doctorMenu = () => {
    return (
      <div className="col-lg-7 col-md-9 col-12">
        {/* Main Menu */}
        <div className="main-menu">
          <nav className="navigation">
            <ul className="nav menu">
              <li className={pathname === "/doctor" ? "active" : ""}>
                <Link href="/doctor">QL lịch khám</Link>
              </li>
              <li
                className={
                  pathname === "/doctor/medical-record" ? "active" : ""
                }
              >
                <Link href="/doctor/medical-record">QL sổ khám bệnh</Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* End Main Menu */}
      </div>
    );
  };
  return (
    <header className="header">
      <div className="topbar">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5 col-12">
              {/* Contact */}
              <ul className="top-link">
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Doctors</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
                <li>
                  <a href="">FAQ</a>
                </li>
              </ul>
              {/* End Contact */}
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              {/* Top Contact */}
              <ul className="top-contact">
                <li>
                  <i className="fa fa-phone"></i>+880 1234 56789
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  <a href="mailto:support@yourmail.com">support@yourmail.com</a>
                </li>
                {role && userName && (
                  <li
                    className="p-2 bg-[#1A76D1] text-white rounded-md cursor-pointer"
                    onClick={() => {
                      clearCookieStore();
                      router.push("/");
                    }}
                  >
                    Đăng xuất
                  </li>
                )}
                {!role && !userName && (
                  <Link
                    className="p-2 bg-[#1A76D1] text-white rounded-md cursor-pointer"
                    href={"/login"}
                  >
                    Đăng nhập
                  </Link>
                )}
                {role && userName && (
                  <li>
                    <span className="font-bold">User: {userName}</span>
                  </li>
                )}
              </ul>
              {/* End Top Contact */}
            </div>
          </div>
        </div>
      </div>
      {/* End Topbar */}
      {/* Header Inner */}
      <div className="header-inner">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-12">
                {/* Start Logo */}
                <div className="logo">
                  <Link href="/">
                    <Image
                      className="w-20"
                      src="/img/new-logo.jpg"
                      alt="#"
                      width={1200}
                      height={800}
                    />
                  </Link>
                </div>
                {/* End Logo */}
                {/* Mobile Nav */}
                <div className="mobile-nav"></div>
                {/* End Mobile Nav */}
              </div>
              {!role && notLoginMenu()}
              {role == "PATIENT" && patientMenu()}
              {role == "ADMIN" && adminMenu()}
              {role == "STAFF" && staffMenu()}
              {role == "DOCTOR" && doctorMenu()}
            </div>
          </div>
        </div>
      </div>
      {/* End Header Inner */}
    </header>
  );
};

export default Header;
