import { Patient, Staff } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetStaffs = (params?: {}) => {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: async () => {
      const { data } = await axios.get<Staff[]>("/api/staff", {
        params: {},
      });
      return data;
    },
    refetchInterval: 10000, // Refetch data every 10 seconds (10000ms)
  });
};
