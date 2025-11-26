"use client";

import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { UserRole } from "@/lib/constants/roles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import LoadingOverlay from "../ui/loading.overlay";

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function RouteGuard({
  children,
  allowedRoles,
  fallback,
  redirectTo = "/",
}: RouteGuardProps) {
  const router = useRouter();
  const { role, isHydrated, access_token } = useAuthStore();

  useEffect(() => {
    if (isHydrated) {
      // Check if user is authenticated
      if (!access_token) {
        toast.error("You need to be logged in to access this page.");
        router.push("/check-email");
        return;
      }

      // Check if user has required role
      if (!allowedRoles.includes(role as UserRole)) {
        toast.error("You do not have permission to access this page.");
        router.push(redirectTo);
        return;
      }
    }
  }, [role, isHydrated, access_token, allowedRoles, router, redirectTo]);

  // Show loading while hydrating
  if (!isHydrated) {
    return <LoadingOverlay />;
  }

  // Show fallback or redirect if no access
  if (!access_token || !allowedRoles.includes(role as UserRole)) {
    return fallback || null;
  }

  return <>{children}</>;
}
