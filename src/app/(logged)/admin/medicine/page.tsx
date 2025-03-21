"use client";
import Loading from "@/components/Icons/Loading";
import { formatDateTime, formatDob } from "@/lib/dateTime";
import { useGetAllMedicine } from "@/tanstackquery/medicine";

import { useGetStaffs } from "@/tanstackquery/staff";
import React from "react";

const Page = () => {
  const { data, isPending } = useGetAllMedicine();
  return (
    <div className="space-y-5 min-h-screen">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        QUẢN LÝ THUỐC
      </h1>

      <div className="px-10 rounded-lg">
        <div className="overflow-x-auto mt-2">
          {isPending && <Loading />}
          {!isPending && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TÊN THUỐC
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MÔ TẢ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GIÁ
                  </th>

                  <th scope="col" className="px-6 py-3">
                    SỐ LƯỢNG
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((medicine, index: any) => {
                    return (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-3">{medicine.name}</td>
                        <td className="px-6 py-3">{medicine.note}</td>
                        <td className="px-6 py-3">{medicine.price}</td>
                        <td className="px-6 py-3">{medicine.stock}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
