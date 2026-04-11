import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/auth/api/authApi";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, isAuthenticated, setUser, logout } = useAuthStore();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, 
  });

  useEffect(() => {
    if (!isLoading) {
      setUser(data || null);
    }
  }, [data, isLoading, setUser]);

  return {
    user,
    isAuthenticated,
    logout,
    isLoading,
    isError,
  };
};
