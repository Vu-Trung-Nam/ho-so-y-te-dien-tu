import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Doctor } from "@/types/type";

// Get all doctors
export const useGetDoctors = (params?: {
  fullName?: string;
  specialization?: string;
  department?: string;
  phone?: string;
}) => {
  return useQuery({
    queryKey: ["doctors", params],
    queryFn: async () => {
      const { data } = await axios.get<Doctor[]>("/api/doctors", {
        params: {
          fullName: params?.fullName,
          specialization: params?.specialization,
          department: params?.department,
          phone: params?.phone,
        },
      });
      return data;
    },
  });
};

// Create new doctor
export interface DoctorParams {
  id?: number;
  accountId: number;
  specialization: string;
  department: string;
  position: string;
}

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doctor: DoctorParams) => {
      const { data } = await axios.post("/api/doctors", doctor);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

// Update doctor
export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      doctor,
    }: {
      id: number;
      doctor: Partial<Doctor>;
    }) => {
      const { data } = await axios.put(`/api/doctors?id=${id}`, doctor);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};

// Delete doctor
export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/doctors?id=${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};
