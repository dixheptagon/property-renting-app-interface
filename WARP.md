# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Staysia** - A property renting application built with Next.js 15, featuring multi-role authentication, property management, booking systems, and payment integration with Midtrans.

## Development Commands

### Core Commands
```powershell
# Development
npm run dev              # Start Next.js dev server on http://localhost:3000

# Build & Production
npm run build           # Build production bundle
npm start              # Start production server

# Code Quality
npm run lint           # Run ESLint checks
```

### Git Workflow
- Use conventional commits (enforced by commitlint + husky)
- Format: `<type>(<scope>): <description>`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Example: `feat(auth): implement login endpoint`

### Branch Strategy
- `main` - Production-ready code only
- `develop/*` - Integration branch for features
- `feat/*` - New features (branch from develop)
- `bugfix/*` - Non-critical bug fixes (branch from develop)
- `hotfix/*` - Critical production fixes (branch from main)

Always create PRs to `develop` and use "Squash and Merge" when merging.

## Architecture

### Route Organization (Next.js App Router)

The app uses **route groups** (folders in parentheses) to organize features without affecting URL structure:

- **(auth)** - Authentication flow (login, register, verify-email, check-email)
- **(landing-page)** - Public homepage, contact, privacy, terms
- **(explore-properties)** - Property search and filtering
- **(properties)** - Individual property details, booking, payment
- **(dashboard)** - Protected user dashboard with nested routes
  - `/user/*` - General user features (bookings, reviews)
  - `/user/tenant/*` - Tenant-specific features (property management, orders, reports)
- **(crud-property)** - Property creation wizard with multi-step form

### File Organization Pattern

Each route group follows a consistent structure:
```
(feature-name)/
├── page.tsx              # Route component
├── layout.tsx            # Shared layout
├── _components/          # Feature-specific components (prefixed with _)
├── _hooks/              # Custom hooks
├── _stores/             # Zustand stores
├── _validations/        # Yup validation schemas
├── _utils/              # Utility functions
└── _types/              # TypeScript types
```

**Note**: The underscore prefix (`_`) prevents Next.js from treating these folders as routes.

### Global Directories

- `src/components/` - Shared components
  - `ui/` - shadcn/ui components
  - `providers/` - React context providers
  - `guards/` - Route protection components
- `src/hooks/` - Global custom hooks
- `src/lib/` - Core utilities, constants, types
  - `axios.ts` - Configured axios instance with auth interceptors
  - `firebase.ts` - Firebase/Google Auth setup
  - `constants/roles.ts` - User role definitions
  - `utils.ts` - Shared utility functions
- `src/styles/` - Global CSS (Tailwind v4)

### State Management

**Zustand** with persistence for state management:

1. **Auth Store** (`src/app/(auth)/_stores/auth.store.ts`)
   - Manages user authentication state, tokens, roles
   - Persists to localStorage with hydration handling
   - Used by authentication guards and interceptors

2. **Property Store** (`src/app/(crud-property)/_stores/property.store.ts`)
   - Manages multi-step property creation form
   - Draft state persisted to localStorage
   - Tracks property details, rooms, images, peak rates, unavailabilities

3. **Booking/Payment Stores** (`src/app/(properties)/_stores/`)
   - Temporary state for booking and payment flows

### Authentication & Authorization

**Authentication Flow**:
1. Email check → Register → Email verification (Firebase) → Login
2. Tokens stored in Zustand auth store (persisted)
3. Axios interceptor auto-refreshes expired tokens
4. Google OAuth via Firebase

**Authorization Pattern**:
- `ProtectedPageProvider` - Requires authentication
- `RouteGuard` - Requires authentication + specific role
- `RoleProvider` - Global context for role-based UI rendering

**User Roles** (defined in `src/lib/constants/roles.ts`):
- `guest` - Basic access (general + account menus)
- `tenant` - Full access (general + property + account menus)

### API Integration

**Axios Configuration** (`src/lib/axios.ts`):
- Base URL: `process.env.NEXT_PUBLIC_API_URL`
- Auto-attaches Bearer token from auth store
- Automatic token refresh on 401 errors
- Excludes specific endpoints from retry logic

**Key API Patterns**:
- Use `@tanstack/react-query` for data fetching (configured in `QueryClientProviders`)
- Custom hooks in feature `_hooks/` folders handle API calls
- Form submissions typically use Formik + Yup validation

### Form Validation

Uses **Yup** for schema validation with **Formik** for form state:
```typescript
// Example pattern
import * as Yup from "yup";

export const MyFormSchema = Yup.object().shape({
  field: Yup.string().required("Error message"),
});
```

Validation schemas live in feature `_validations/` folders.

### Styling

- **Tailwind CSS v4** (new CSS-based config via `@import "tailwindcss"`)
- **shadcn/ui** components in `src/components/ui/`
- Path alias: `@/*` → `./src/*`
- Custom CSS variables for theming (OKLCH color space)
- Dark mode support via `.dark` class

### Environment Variables

Required variables (see `src/app/(properties)/[property_id]/payment/_utils/env.ts`):
```
NEXT_PUBLIC_API_URL              # Backend API base URL
NEXT_PUBLIC_BASE_URL             # Frontend base URL
NEXT_PUBLIC_FIREBASE_API_KEY     # Firebase config
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY  # Payment gateway
NEXT_PUBLIC_MIDTRANS_API_URL
```

## Coding Standards

### File Naming
- Use **camelCase** for files: `page.tsx`, `productCard.tsx`
- Be descriptive: avoid generic names like `utils.ts` or `decode.ts`
- Test files: add `.test.ts` or `.spec.ts` suffix

### Component Patterns
- Server Components by default (Next.js 15)
- Add `"use client"` directive only when needed (state, hooks, browser APIs)
- Prefer composition over prop drilling
- Use feature-scoped components in `_components/` folders

### State Management
- Use Zustand for cross-component state
- Use React Query for server state
- LocalStorage persistence for draft states and auth

### TypeScript
- Strict mode enabled
- Define types in feature `_types/` folders or global `src/lib/types/`
- Use interfaces for object shapes, types for unions/intersections

## Project-Specific Considerations

### Property Creation Flow
Multi-step wizard stored in `usePropertyStore` with localStorage persistence:
1. Category selection
2. Title & description
3. Location (with Google Maps integration)
4. Amenities & rules
5. Images
6. Room types (multiple rooms with images, pricing, capacity)
7. Peak season rates
8. Unavailabilities
9. Summary & publish

### Payment Integration
Midtrans payment gateway integration in `(properties)/[property_id]/payment/`:
- Snap.js SDK loaded dynamically
- Payment proof upload support
- Order cancellation flow

### Image Handling
- Next.js Image component with remote patterns configured
- Supported domains: Unsplash, Cloudinary
- Images managed in Zustand stores with tempIds

### Role-Based Access
Use `RoleProvider` context to conditionally render UI:
```typescript
const { role, hasAccess } = useRoleContext();
if (hasAccess("property")) {
  // Show tenant-only features
}
```

## Common Patterns

### Creating a New Feature Route
1. Create route group folder: `(feature-name)/page.tsx`
2. Add `_components/`, `_hooks/`, `_stores/` as needed
3. If authenticated, wrap in `ProtectedPageProvider` or `RouteGuard`
4. Add validation schemas in `_validations/`

### Adding API Integration
1. Create custom hook in feature `_hooks/` using React Query
2. Import `axiosInstance` from `@/lib/axios`
3. Handle loading/error states in component

### Testing Changes
- Verify with `npm run lint` before committing
- Test in both guest and tenant roles
- Check authentication guards work correctly
- Verify mobile responsiveness

## Debugging Tips

- Auth issues: Check Zustand DevTools or localStorage `auth-storage`
- API errors: Check axios interceptor logs and token refresh flow
- Hydration errors: Ensure client-only state uses `isHydrated` checks
- Route guards: Verify role definitions in `src/lib/constants/roles.ts`
