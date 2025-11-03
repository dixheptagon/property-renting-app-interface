# Role-Based Access Control (RBAC) Documentation

## Overview

This document describes the Role-Based Access Control (RBAC) system implemented in the Property Renting App. The system provides secure, type-safe role management with both frontend and backend verification layers.

## Architecture

### Core Components

#### 1. Role Constants (`src/lib/constants/roles.ts`)

```typescript
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
```

#### 2. Type Definitions (`src/lib/types/auth.ts`)

```typescript
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
```

#### 3. Role Provider (`src/components/providers/role.provider.tsx`)

Context provider that manages role state and permissions throughout the app.

#### 4. Route Guard (`src/components/guards/route.guard.tsx`)

Component that protects routes based on user roles.

#### 5. useRole Hook (`src/hooks/use-role.ts`)

Convenient hook for role checking in components.

## Role Definitions

### Guest Role

- **Access Level**: Basic user access
- **Menu Access**: General, Account
- **Permissions**: View properties, manage account, place bookings

### Tenant Role

- **Access Level**: Property owner/manager access
- **Menu Access**: General, Property, Account
- **Permissions**: All guest permissions + create/manage properties, view analytics

## Usage Examples

### 1. Using the useRole Hook

```typescript
import { useRole } from '@/hooks/use-role';
import { UserRole } from '@/lib/constants/roles';

function MyComponent() {
  const { role, isGuest, isTenant, hasRole, hasAnyRole } = useRole();

  // Check specific roles
  if (isGuest()) {
    return <GuestDashboard />;
  }

  if (isTenant()) {
    return <TenantDashboard />;
  }

  // Check multiple roles
  if (hasAnyRole([UserRole.TENANT, UserRole.ADMIN])) {
    return <AdminPanel />;
  }

  // Check single role
  if (hasRole(UserRole.TENANT)) {
    return <TenantOnlyContent />;
  }

  return <DefaultContent />;
}
```

### 2. Using RoleProvider Context

```typescript
import { useRoleContext } from '@/components/providers/role.provider';

function NavigationMenu() {
  const { canAccessMenu, role } = useRoleContext();

  return (
    <nav>
      {canAccessMenu('general') && <GeneralMenu />}
      {canAccessMenu('property') && <PropertyMenu />}
      {canAccessMenu('account') && <AccountMenu />}
    </nav>
  );
}
```

### 3. Protecting Routes with RouteGuard

```typescript
import RouteGuard from '@/components/guards/route.guard';
import { UserRole } from '@/lib/constants/roles';

function CreatePropertyPage() {
  return (
    <RouteGuard
      allowedRoles={[UserRole.TENANT]}
      redirectTo="/dashboard"
      fallback={<AccessDenied />}
    >
      <CreatePropertyForm />
    </RouteGuard>
  );
}
```

### 4. Conditional Rendering in Components

```typescript
import { useRoleContext } from '@/components/providers/role.provider';

function AppSidebar() {
  const { canAccessMenu } = useRoleContext();

  return (
    <Sidebar>
      {canAccessMenu('general') && <GeneralSection />}
      {canAccessMenu('property') && <PropertySection />}
      {canAccessMenu('account') && <AccountSection />}
    </Sidebar>
  );
}
```

## Backend Integration

### Middleware Usage

```typescript
// middleware/verifyRole.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom.error";
import { HttpRes } from "../constant/http.response";

enum UserRole {
  guest = "guest",
  tenant = "tenant",
}

interface User {
  uid: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const verifyRole = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError(
          HttpRes.status.UNAUTHORIZED,
          HttpRes.message.UNAUTHORIZED,
          "Authentication required"
        );
      }

      if (!allowedRoles.includes(req.user.role as UserRole)) {
        throw new CustomError(
          HttpRes.status.FORBIDDEN,
          HttpRes.message.FORBIDDEN,
          `Access denied. Required roles: ${allowedRoles.join(", ")}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Convenience middleware
export const verifyTenant = verifyRole([UserRole.tenant]);
export const verifyGuest = verifyRole([UserRole.guest]);
export const verifyTenantOrGuest = verifyRole([
  UserRole.tenant,
  UserRole.guest,
]);
```

### Route Protection Example

```typescript
// routes/property.ts
import express from "express";
import { verifyTenant } from "../middleware/verifyRole";
import { createProperty, updateProperty } from "../controllers/property";

const router = express.Router();

// Tenant-only routes
router.post("/create", verifyTenant, createProperty);
router.put("/:id", verifyTenant, updateProperty);

export default router;
```

## Security Considerations

### 1. Frontend Security

- Role information is stored in localStorage via Zustand persist
- UI elements are conditionally rendered based on roles
- Route guards prevent unauthorized navigation
- **Important**: Frontend checks are for UX only - always verify on backend

### 2. Backend Security

- JWT tokens contain role information
- Middleware validates roles on each protected request
- Database-level permissions can be implemented for additional security
- Role changes require token refresh

### 3. Best Practices

- Always verify roles on both frontend and backend
- Use enums for role definitions to prevent typos
- Implement proper error handling for unauthorized access
- Log security events for monitoring
- Regularly audit role assignments and permissions

## Extending the System

### Adding New Roles

1. Add to the enum in `src/lib/constants/roles.ts`:

```typescript
export enum UserRole {
  GUEST = "guest",
  TENANT = "tenant",
  ADMIN = "admin", // New role
}
```

2. Update role labels and menu access:

```typescript
export const ROLE_LABELS = {
  [UserRole.GUEST]: "Guest",
  [UserRole.TENANT]: "Tenant",
  [UserRole.ADMIN]: "Administrator",
} as const;

export const MENU_ACCESS = {
  [UserRole.GUEST]: ["general", "account"],
  [UserRole.TENANT]: ["general", "property", "account"],
  [UserRole.ADMIN]: ["general", "property", "account", "admin"], // New menu
} as const;
```

3. Update backend enum and middleware accordingly.

### Adding New Permissions

For more granular permissions beyond roles, consider implementing a permission-based system:

```typescript
export enum Permission {
  CREATE_PROPERTY = "create_property",
  DELETE_PROPERTY = "delete_property",
  VIEW_ANALYTICS = "view_analytics",
}

export const ROLE_PERMISSIONS = {
  [UserRole.GUEST]: [],
  [UserRole.TENANT]: [Permission.CREATE_PROPERTY, Permission.VIEW_ANALYTICS],
  [UserRole.ADMIN]: [
    Permission.CREATE_PROPERTY,
    Permission.DELETE_PROPERTY,
    Permission.VIEW_ANALYTICS,
  ],
} as const;
```

## Testing

### Unit Tests Example

```typescript
// __tests__/useRole.test.ts
import { renderHook } from "@testing-library/react";
import { useRole } from "@/hooks/use-role";

describe("useRole hook", () => {
  it("should return correct role methods", () => {
    const { result } = renderHook(() => useRole());

    expect(result.current.isGuest).toBeDefined();
    expect(result.current.isTenant).toBeDefined();
    expect(result.current.hasRole).toBeDefined();
  });
});
```

### Integration Tests Example

```typescript
// __tests__/RouteGuard.test.tsx
import { render } from '@testing-library/react';
import RouteGuard from '@/components/guards/route.guard';
import { UserRole } from '@/lib/constants/roles';

describe('RouteGuard', () => {
  it('should render children for allowed roles', () => {
    // Mock auth store with tenant role
    const { getByText } = render(
      <RouteGuard allowedRoles={[UserRole.TENANT]}>
        <div>Protected Content</div>
      </RouteGuard>
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Common Issues

1. **Role not persisting after refresh**
   - Check that `role` is included in the `partialize` array in auth store
   - Verify Zustand persist configuration

2. **Conditional rendering not working**
   - Ensure component is wrapped with `RoleProvider`
   - Check that `useRoleContext` is used within provider scope

3. **Route guard not redirecting**
   - Verify user is authenticated and has correct role
   - Check that `isHydrated` is true before checking roles

4. **Backend role verification failing**
   - Ensure JWT contains role information
   - Check that middleware is applied to routes
   - Verify role enum matches between frontend and backend

## Migration Guide

If migrating from a non-RBAC system:

1. Add role field to user model and database
2. Update authentication flow to include role in JWT
3. Implement role checks in existing components
4. Add route guards to protected pages
5. Update backend routes with role middleware
6. Test thoroughly with different user roles

## Conclusion

This RBAC system provides a solid foundation for role-based access control with:

- Type safety through TypeScript enums
- Consistent API across frontend and backend
- Easy extensibility for new roles and permissions
- Security through dual verification (frontend + backend)
- Clean, maintainable code structure

For questions or issues, refer to the component documentation or create an issue in the project repository.
