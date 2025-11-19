"use client";

import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import LoadingOverlay from "../ui/loading.overlay";

export default function ProtectedPageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { access_token, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && !access_token) {
      toast.error("You are not logged in.");
      router.push("/check-email");
    }
  }, [access_token, router, isHydrated]);

  if (!isHydrated) {
    return <LoadingOverlay />;
  }

  return access_token ? children : null;
}
