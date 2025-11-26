import { UserRole } from "../constants/roles";

export interface User {
  uid: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  role: UserRole;
  image?: string | null;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}
