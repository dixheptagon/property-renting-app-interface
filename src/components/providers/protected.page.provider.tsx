"use client";

import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ProtectedPageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { access_token } = useAuthStore();

  useEffect(() => {
    if (!access_token) {
      toast.error("You are not logged in.");
      router.push("/auth/check-email");
    }
  }, [access_token, router]);

  return access_token ? children : null;
}
