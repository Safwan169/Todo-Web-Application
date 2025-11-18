import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi, updateProfileApi } from "./api";
import { User } from "../auth/type";
import { showToast } from "@/lib/toast";
import { useAuthContext } from "@/context/Context";

export const useProfile = () => {
  return useQuery<User | null>({
    queryKey: ["profile"],
    queryFn: profileApi,
     initialData: null,
  });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient(); 
    const { setUser } = useAuthContext();

  return useMutation<User | null, unknown, FormData>({
    mutationFn:(data)=> updateProfileApi(data),
    onSuccess:(data)=>{
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
      showToast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Failed to update profile. Please try again.";
      showToast.error(errorMessage);
    },
  });
};
