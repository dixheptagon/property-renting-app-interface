export enum UserRole {
  GUEST = "guest",
  TENANT = "tenant",
}

export const ROLE_LABELS = {
  [UserRole.GUEST]: "Guest",
  [UserRole.TENANT]: "Tenant",
} as const;

export const MENU_ACCESS = {
  [UserRole.GUEST]: ["general", "account"],
  [UserRole.TENANT]: ["general", "property", "account"],
} as const;
