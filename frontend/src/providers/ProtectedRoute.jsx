import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/signin?redirect=${pathname}`);
    }
  }, [router, pathname, isLoading, isAuthenticated]);

  if (isLoading) return (
    <LoadingSpinner />
  )

  if(!isAuthenticated) return null

  return <>{children}</>;
}

export default ProtectedRoute;
