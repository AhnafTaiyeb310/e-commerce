import { useAuth } from "@/features/auth/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

function AuthProvider({ children }) {
  useAuth();
  return children;
}

export default AuthProvider;
