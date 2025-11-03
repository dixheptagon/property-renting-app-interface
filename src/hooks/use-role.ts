import { useAuthStore } from "@/app/(auth)/_stores/auth.store";
import { UserRole } from "@/lib/constants/roles";

export const useRole = () => {
  const { role, isHydrated } = useAuthStore();

  const hasRole = (requiredRole: UserRole): boolean => {
    return role === requiredRole;
  };

  const hasAnyRole = (requiredRoles: UserRole[]): boolean => {
    return requiredRoles.includes(role as UserRole);
  };

  const isGuest = (): boolean => hasRole(UserRole.GUEST);
  const isTenant = (): boolean => hasRole(UserRole.TENANT);

  return {
    role: role as UserRole,
    isHydrated,
    hasRole,
    hasAnyRole,
    isGuest,
    isTenant,
  };
};
