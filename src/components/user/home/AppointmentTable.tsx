import React from "react";

const AppointmentTable = () => {
  return (
    <div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-5 font-bold">
        Lịch khám đã đăng kí
      </h2>

      <div className="relative overflow-x-auto px-10 rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                THỜI GIAN ĐẶT LỊCH
              </th>
              <th scope="col" className="px-6 py-3">
                THỜI GIAN KHÁM
              </th>
              <th scope="col" className="px-6 py-3">
                TRIỆU CHỨNG
              </th>
              <th scope="col" className="px-6 py-3">
                TRẠNG THÁI ĐẶT LỊCH
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">Ho</td>
              <td className="px-6 py-4">Thành công</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                2
              </th>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">Đau vai</td>
              <td className="px-6 py-4">Thât bại</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                3
              </th>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">Đau chân</td>
              <td className="px-6 py-4">Thất bại</td>
            </tr> */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">01/02/2025 09:00</td>
              <td className="px-6 py-4">Ho</td>
              <td className="px-6 py-4">Thành công</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
