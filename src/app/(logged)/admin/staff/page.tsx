"use client";
import Loading from "@/components/Icons/Loading";
import CreateStaffModal from "@/components/staff/CreateStaffModal";
import { useModal } from "@/hooks/useModal";
import { formatDateTime, formatDob } from "@/lib/dateTime";
import { useGetPatients } from "@/tanstackquery/patients";
import { useGetStaffs } from "@/tanstackquery/staff";
import { Staff } from "@/types/type";
import React, { useState } from "react";

const Page = () => {
  const { data, isPending } = useGetStaffs();
  // useModal
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const { modal, openModal, closeModal } = useModal({
    CreateStaffModal: false,
  });
  return (
    <div className="space-y-5 min-h-screen container">
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-4 font-bold">
        QUẢN LÝ NHÂN VIÊN
      </h1>
      <div>
        <button
          className="btn"
          onClick={() => {
            setSelectedStaff(null);
            openModal("CreateStaffModal");
          }}
        >
          Thêm nhân viên
        </button>
      </div>
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
                    HỌ TÊN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NGÀY SINH
                  </th>

                  <th scope="col" className="px-6 py-3">
                    GIỚI TÍNH
                  </th>
                  <th scope="col" className="px-6 py-3">
                    VỊ TRÍ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PHÒNG BAN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TÙY CHỌN
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((staff, index: any) => {
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
                        <td className="px-6 py-3">{staff.fullName}</td>
                        <td className="px-6 py-3">
                          {formatDob(staff?.dob || new Date())}
                        </td>
                        <td className="px-6 py-3">{staff.gender}</td>
                        <td className="px-6 py-3">{staff.position}</td>
                        <td className="px-6 py-3">{staff.department}</td>
                        <td className="px-6 py-3">
                          <button
                            className="btn"
                            onClick={() => {
                              setSelectedStaff(staff as Staff);
                              openModal("CreateStaffModal");
                            }}
                          >
                            Sửa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CreateStaffModal
        isModalOpen={modal.CreateStaffModal}
        handleCloseModal={() => closeModal("CreateStaffModal")}
        selectedStaff={selectedStaff}
      />
    </div>
  );
};

export default Page;
