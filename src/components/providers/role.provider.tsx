"use client";

import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { UserRole, MENU_ACCESS } from "@/lib/constants/roles";
import { createContext, useContext, useMemo } from "react";
import LoadingOverlay from "../ui/loading.overlay";

interface RoleContextType {
  role: UserRole | "";
  hasAccess: (section: string) => boolean;
  canAccessMenu: (menuType: "general" | "property" | "account") => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoleContext must be used within a RoleProvider");
  }
  return context;
};

interface RoleProviderProps {
  children: React.ReactNode;
}

export default function RoleProvider({ children }: RoleProviderProps) {
  const { role, isHydrated } = useAuthStore();

  const contextValue = useMemo((): RoleContextType => {
    const currentRole = role as UserRole;
    const allowedMenus = MENU_ACCESS[currentRole] || [];

    return {
      role: currentRole,
      hasAccess: (section: string) => allowedMenus.includes(section as any),
      canAccessMenu: (menuType: string) =>
        allowedMenus.includes(menuType as any),
    };
  }, [role]);

  // Don't render children until hydrated to prevent flash of incorrect content
  if (!isHydrated) {
    return <LoadingOverlay />;
  }

  return (
    <RoleContext.Provider value={contextValue}>{children}</RoleContext.Provider>
  );
}
