import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

interface LoginCredentials {
  username: string;
  password: string;
}

export interface ICreateAccount {
  username: string;
  password: string;
  role: "PATIENT" | "DOCTOR" | "STAFF";
  email?: string;
}

// Login mutation hook
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      try {
        const { data } = await axios.post("/api/login", credentials);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
        throw error;
      }
    },
  });
};

// Register mutation hook
export const useRegister = () => {
  return useMutation({
    mutationFn: async (registerData: ICreateAccount) => {
      try {
        const { data } = await axios.post("/api/accounts", registerData);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || "Registration failed"
          );
        }
        throw error;
      }
    },
  });
};
