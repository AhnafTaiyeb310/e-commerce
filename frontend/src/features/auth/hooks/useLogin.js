"use client";

import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "@/features/auth/api/authApi"
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get('redirect') || '/';

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success("Welcome back!.")
      router.push(redirectTo);
    },
    onError: (error) => {
      const errorData = error.response?.data;

      if(errorData?.non_field_errors){
        toast(errorData.non_field_errors[0]);
      } 
      else if (errorData)
      {
        const firstErrorKey = Object.keys(errorData)[0];
        const errorMessage = errorData[firstErrorKey];
        toast.error(`${firstErrorKey}: ${errorMessage}` )
      }
      else 
      {
        toast.error("Something went wrong, Please try again")
      }
      console.log("Login error details: ",error);
    },
  });
};
