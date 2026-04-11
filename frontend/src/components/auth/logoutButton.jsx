import { useLogout } from "@/features/auth/hooks/useLogout";

function logoutButton() {
  const logoutMutation = useLogout();

  return (
    <button
      onClick={logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? "Signing out" : "Signout"}
    </button>
  );
}

export default logoutButton;
