"use client";

import { api } from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useLogout = ()=> {
    const logout = useAuthStore(state=> state.logout);
    const queryClient  = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: async ()=> {
            return await api.post('/api/auth/logout/')
        },
        onSuccess: ()=> {
            logout();
            queryClient.clear();
            router.replace('/signin/')
        },
        onError: (err)=> {
            console.log("server logout failed forcing local logout ", err);
            logout();
            queryClient.clear();
            router.replace("/signin/");            
        }
    })
}