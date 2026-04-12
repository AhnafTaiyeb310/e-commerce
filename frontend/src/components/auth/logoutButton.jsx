'use client'
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect, useState } from "react";

function LogoutButton() {
  const { mutate: logout, isPending } = useLogout();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Fix Hydration: Only render after mounting on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthenticated) return null;

  return (
    <button
      onClick={() => logout()}
      disabled={isPending}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}

export default LogoutButton;
