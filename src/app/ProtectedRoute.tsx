import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { PageLoader } from "@/shared/components";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader fullScreen title="Loading your account..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Accounts provisioned by an admin with a temporary password must set
  // their own password before they can reach any other dashboard route.
  if (user?.mustChangePassword && location.pathname !== "/force-password-change") {
    return <Navigate to="/force-password-change" replace />;
  }

  return <>{children}</>;
};
