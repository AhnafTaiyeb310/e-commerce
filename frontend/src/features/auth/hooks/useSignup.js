"use client";

import { signupRequest } from "@/features/auth/api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export const useSignup = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
    return useMutation({
    mutationKey: ["signup"],
    mutationFn: signupRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      toast.success(
        "Signup successful! Please check your email to verify your account.",
      );

      router.push("/signin/");
    },
    onError: (error) => {
      const errorData = error.response?.data;
      if (errorData) {
        const firstKey = Object.keys(errorData)[0];
        toast.error(
          `${firstKey}: ${errorData[firstKey][0] || errorData[firstKey]}`,
        );
      } else {
        toast.error("Signup failed. Server might be down.");
      }
    },
  });
};
