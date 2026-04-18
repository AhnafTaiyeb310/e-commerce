'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { verifyEmailRequest, getMe } from "@/features/auth/api/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const { key } = useParams();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    const performVerification = async (rawKey) => {
      try {
        const cleanKey = decodeURIComponent(rawKey).replace(/\/$/, "");
        await verifyEmailRequest(cleanKey);
        
        const userData = await getMe();
        setUser(userData);

        toast.success("Email verified successfully! Welcome.");
        setStatus("success");

        // Automatically redirect after a 3-second delay
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        console.error("Verification Error:", error.response?.data);
        setStatus("error");
        toast.error("Invalid or expired verification link.");
      }
    };

    if (key) {
      performVerification(key);
    }
  }, [key, router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center transition-all duration-300">
        {status === "loading" && (
          <div className="space-y-6">
            <div className="relative flex justify-center">
              <div className="size-20 border-[4px] border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg className="size-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><path d="m22 7-7.1 5.4a2.4 2.4 0 0 1-2.8 0L5 7"/></svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Verifying Your Email</h1>
              <p className="mt-2 text-sm text-gray-500">Please wait while we verify your account credentials.</p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="size-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="size-10 text-green-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Verified!</h1>
              <p className="mt-2 text-sm text-gray-500">Your account has been successfully verified. You are being redirected to the homepage.</p>
            </div>
            <div className="pt-4">
              <Link
                href="/"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                Go to Homepage Now
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="size-20 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="size-10 text-red-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Verification Failed</h1>
              <p className="mt-2 text-sm text-gray-500">The verification link is invalid, expired, or has already been used.</p>
            </div>
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/signin"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                Try Signing In
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
