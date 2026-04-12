"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AuthProvider from "./AuthProvider";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function ProvidersWrapper({ children }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: 3,
          refetchOnWindowFocus: false,
          staleTime: 5 * 60 * 1000,
        },
      },
    });
  });
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
