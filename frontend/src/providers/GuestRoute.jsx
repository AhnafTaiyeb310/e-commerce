import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      redirectTo = searchParams.get("redirect") || "/";
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, searchParams]);

  if (isLoading) return <LoadingSpinner />;
  return <div></div>;
}

 if (isAuthenticated) return null;

 return <>{children}</>;

export default GuestRoute;
