'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { verifyEmailRequest, getMe } from "@/features/auth/api/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const { key } = useParams();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const performVerification = async (rawKey) => {
      try {
        // 1. Clean the key: decode colons and remove trailing slashes
        const cleanKey = decodeURIComponent(rawKey).replace(/\/$/, "");
        console.log("DEBUG: Sending clean key to backend:", cleanKey);

        // 2. Hit our custom REST API endpoint
        await verifyEmailRequest(cleanKey);

        // 3. Verification successful! Now get the user profile
        const userData = await getMe();
        setUser(userData);

        toast.success("Email verified successfully! Welcome.");
        setStatus("success");

        // 4. Redirect to home
        router.push("/");
      } catch (error) {
        console.error("Verification Error Response:", error.response?.data);
        setStatus("error");
        toast.error("Invalid or expired verification link.");
        // router.push("/signin/");
      }
    };

    if (key) {
      performVerification(key);
    }
  }, [key, router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Verifying your account...</h1>
            <LoadingSpinner />
          </>
        )}
        {status === "success" && (
          <h1 className="text-2xl font-bold text-green-600">Verification Successful! Redirecting...</h1>
        )}
        {status === "error" && (
          <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
        )}
      </div>
    </div>
  );
}
