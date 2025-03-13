// medicine query
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateMedicine } from "../app/api/medicine/route";
import axios from "axios";
import { Medicine } from "@/types/type";

export const useGetAllMedicine = () => {
  return useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      // axios
      const { data } = await axios.get<Medicine[]>("/api/medicine");
      return data;
    },
  });
};

export const useCreateMedicine = () => {
  return useMutation({
    mutationFn: async (medicine: Medicine) => {
      const response = await axios.post("/api/medicine", medicine);
      return response.data;
    },
  });
};
