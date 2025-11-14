// src/modules/auth/api.ts
import axiosInstance from "@/lib/axios";
import { LoginSchema, SignupSchema } from "./validations";
import { User } from "./type";


export const signupApi = async (data: SignupSchema) => {
  const res = await axiosInstance.post("/users/signup", data);
  return res.data;
};

export const loginApi = async (data: LoginSchema): Promise<User> => {

  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const profileApi = async (): Promise<User> => {
  const res = await axiosInstance.get("/auth/mee");
  return res.data;
};

export const logoutApi = async () => {
  const res = await axiosInstance.get("/auth/logout");
  return res.data;
};