import { useMutation, useQuery } from "@tanstack/react-query";
import { loginApi, signupApi } from "./api";
import { LoginSchema, SignupSchema } from "./validations";

export const useLogin = () => {
 

  return useMutation({
    mutationFn: (data: LoginSchema) => loginApi(data),
   
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupSchema) => signupApi(data),
  });
};


