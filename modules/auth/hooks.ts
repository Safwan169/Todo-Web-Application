import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, signupApi, profileApi } from "./api";
import { useAuthContext } from "@/context/AuthContext";
import { LoginSchema, SignupSchema } from "./validations";

export const useLogin = () => {
  const { setUser } = useAuthContext();

  return useMutation({
    mutationFn: (data: LoginSchema) => loginApi(data),
    onSuccess: (user) => {
      setUser(user);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupSchema) => signupApi(data),
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileApi,
  });
};
