
import { Patient } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPatients = (params?: {}) => {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: async () => {
      const { data } = await axios.get<Patient[]>("/api/patients", {
        params: {},
      });
      return data;
    },
    refetchInterval: 10000, // Refetch data every 10 seconds (10000ms)
  });
};
