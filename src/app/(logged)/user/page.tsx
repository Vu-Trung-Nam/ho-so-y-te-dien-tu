import AppointmentTable from "@/components/user/home/AppointmentTable";
import React from "react";

const page = () => {
  return (
    <div className="space-y-5 container">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        ĐẶT LỊCH HẸN
      </h1>
      <div className="grid grid-cols-3 gap-10 justify-center">
        <a className="btn" href="#">
          <span className="text-sm font-medium">
            Thêm, chỉnh sửa thông tin cá nhân
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
        <a className="btn" href="#">
          <span className="text-sm font-medium">
            Đăng kí lịch khám chữa bệnh
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
      </div>
      <AppointmentTable />
    </div>
  );
};

export default page;
