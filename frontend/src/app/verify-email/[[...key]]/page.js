'use client'
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getMe, verifyEmailRequest } from '@/features/auth/api/authApi';
import { useAuthStore } from '@/store/useAuthStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Page() {
    const {key} = useParams();
    const router = useRouter();
    const setUser = useAuthStore(state=> state.setUser)
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
      const performVerification = async (rawKey) => {
        // let cleanKey = rawKey.replace(/\/$/, "") ;
        const finalKey = rawKey + "/";

        try {
          await verifyEmailRequest(finalKey);
          const userData = await getMe();

          setUser(userData);
          toast.success("Email verification successful! Welcome.");
          router.push("/");
        } catch (error) {
          setStatus("error");
          console.error("Verification Error:", error.response?.data);
          toast.error("Invalid or expired verification link");
          router.push("/signup/");
        }
      };

      if(key) performVerification(key);
    }, [key, router, setUser]);

  return (
    <div>
      <h1>{status === "verifying"? "verifying your account": "Redirecting"}</h1>
      <LoadingSpinner />
    </div>
  )
}

export default Page
