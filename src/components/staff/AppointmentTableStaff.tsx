"use client";
import { formatDateTime } from "@/lib/dateTime";
import useAuthStore from "@/store/store";
import { useGetAppointments } from "@/tanstackquery/appointments";
import React, { useState } from "react";
import Loading from "../Icons/Loading";
import { Appointment } from "@/types/type";
import ConfirmAppointmentModal from "./ConfirmAppointmentModal";

const AppointmentTableStaff = () => {
  const { profile } = useAuthStore();
  const { data: appointments, isPending } = useGetAppointments();
  const [modal, setModal] = useState({ ConfirmAppointmentModal: false });
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const _handleOpenModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: true }));
  };
  const _handleCloseModal = (modalName: keyof typeof modal) => {
    setModal((prev) => ({ ...prev, [modalName]: false }));
  };
  return (
    <div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl uppercase text-center p-5 font-bold">
        Danh sách lịch khám
      </h2>

      <div className="relative overflow-x-auto px-10 rounded-lg">
        {isPending && <Loading />}
        {!isPending && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  THỜI GIAN KHÁM
                </th>
                <th scope="col" className="px-6 py-3">
                  TRIỆU CHỨNG
                </th>
                <th scope="col" className="px-6 py-3">
                  Bác sĩ khám
                </th>
                <th scope="col" className="px-6 py-3">
                  TRẠNG THÁI ĐẶT LỊCH
                </th>
                <th scope="col" className="px-6 py-3">
                  Tùy chọn
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments &&
                appointments.map((appointment, idx) => {
                  return (
                    <tr
                      key={idx}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {idx + 1}
                      </th>

                      <td className="px-6 py-4">
                        {formatDateTime(appointment.appointmentDate)}
                      </td>
                      <td className="px-6 py-4">{appointment.symptoms}</td>
                      <td className="px-6 py-4">
                        {appointment?.doctor?.fullName ?? "Chưa chọn"}
                      </td>
                      <td className="px-6 py-4">{appointment.status}</td>
                      <td className="px-6 py-4">
                        <button
                          className="p-2 rounded-sm"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            _handleOpenModal("ConfirmAppointmentModal");
                          }}
                        >
                          Xác nhận, hủy lịch
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
      <ConfirmAppointmentModal
        isModalOpen={modal.ConfirmAppointmentModal}
        handleCloseModal={() => _handleCloseModal("ConfirmAppointmentModal")}
        selectedAppointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentTableStaff;
