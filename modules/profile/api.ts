import axiosInstance from "@/lib/axios";
import { User } from "../auth/type";

export const profileApi = async (): Promise<User> => {
  const res = await axiosInstance.get("/users/me/");
  return res.data;
};

