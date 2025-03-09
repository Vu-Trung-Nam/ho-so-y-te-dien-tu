import React from "react";

const page = () => {
  return (
    <div className="space-y-5 container min-h-screen">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        TRANG QUẢN LÝ (ADMIN)
      </h1>
      <div className="grid grid-cols-3 gap-10 justify-center">
        <a className="btn text-white" href="#">
          <span className="text-sm font-medium">
            Quản lý thông tin bệnh nhân
          </span>

          {/* <svg
        className="size-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg> */}
        </a>
        <a className="btn text-white" href="#">
          <span className="text-sm font-medium">Quản lý nhân viên</span>

          {/* <svg
        className="size-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg> */}
        </a>
        <a className="btn text-white" href="#">
          <span className="text-sm font-medium">Quản lý bác sĩ</span>

          {/* <svg
        className="size-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg> */}
        </a>
        <a className="btn text-white" href="#">
          <span className="text-sm font-medium">Xem doanh số</span>

          {/* <svg
        className="size-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg> */}
        </a>
        <a className="btn text-white" href="#">
          <span className="text-sm font-medium">Quản lý hóa đơn</span>

          {/* <svg
        className="size-5 rtl:rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg> */}
        </a>
      </div>
    </div>
  );
};

export default page;
