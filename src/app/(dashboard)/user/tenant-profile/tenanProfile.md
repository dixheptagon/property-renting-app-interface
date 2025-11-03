# Tenant Profile Verification Feature - Frontend Implementation

## Overview

This document outlines the complete frontend implementation of the Tenant Profile Verification feature for the Property Renting App. The feature allows tenants to submit verification documents and track their verification status.

## Architecture & Technology Stack

### Frontend Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **TanStack Query (React Query)** - Data fetching and caching
- **Formik + Yup** - Form handling and validation
- **Tailwind CSS + Shadcn/ui** - Styling and UI components
- **Axios** - HTTP client with interceptors

### Key Dependencies

- `@tanstack/react-query` - Data fetching
- `formik` - Form management
- `yup` - Schema validation
- `lucide-react` - Icons
- `sonner` - Toast notifications

## File Structure

```
src/app/(dashboard)/user/tenant-profile/
├── page.tsx                              # Main page component with sidebar
├── tenanProfile.md                       # This documentation
├── _hooks/
│   ├── use.tenant.profile.ts             # GET /api/tenant-profile hook
│   └── use.tenant.verification.ts        # POST /api/auth/tenant-profile/verification hook
├── _components/
│   ├── banned.account.alert.tsx          # Banned account message
│   ├── verified.profile.card.tsx         # Verified profile display
│   ├── pending.review.alert.tsx          # Pending verification status
│   ├── tenant.verification.form.tsx      # Verification form component
│   ├── loading.spinner.tsx               # Loading indicator
│   └── error.alert.tsx                   # Error display with retry
├── _types/
│   └── tenant.profile.type.ts            # TypeScript interfaces
└── _validations/
    └── tenant.verification.schema.ts     # Yup validation schemas
```

## Component Architecture

### Main Page (`page.tsx`)

- **Layout**: SidebarProvider with AppSidebar and SidebarInset
- **Data Fetching**: Uses `useTenantProfile` hook
- **Conditional Rendering**: 4 different states based on profile status
- **Error Handling**: Displays ErrorAlert with retry functionality

### State Management

- **TanStack Query**: Handles caching, loading, and error states
- **React Query Cache**: Automatic invalidation on successful mutations
- **Optimistic Updates**: Cache updates without manual state management

## API Integration

### GET /api/tenant-profile

**Purpose**: Fetch current user's tenant profile data
**Hook**: `useTenantProfile`
**Response**:

```typescript
{
  success: boolean;
  data: TenantProfile | null;
  message?: string;
}
```

### POST /api/auth/tenant-profile/verification

**Purpose**: Submit verification form with file upload
**Hook**: `useTenantVerification`
**Request**: FormData with fields:

- `contact` (string)
- `address` (string)
- `city` (string)
- `country` (string)
- `government_id_type` (string)
- `government_id_file` (File - PDF only)
  **Response**:

```typescript
{
  success: boolean;
  message: string;
}
```

## Conditional Rendering Logic

### 1. Banned Account (`profile.banned === true`)

- Displays: "Your account is banned. Please contact support for assistance."
- Form hidden, read-only state

### 2. Verified Account (`profile.verified === true`)

- Displays: Read-only profile data (contact, address, city, country, government_id_type)
- Shows: Link to view submitted government ID document
- Form hidden

### 3. Pending Review (`profile.verified === false && profile.government_id_path`)

- Displays: "Your application is pending review. We will notify you once the verification process is complete."
- Form hidden

### 4. Unverified (`profile.verified === false && !profile.government_id_path`)

- Displays: Full verification form
- Allows: Form submission with file upload

## Form Validation

### Client-side Validation (Yup Schema)

```typescript
TenantVerificationSchema = {
  contact: string().required().matches(phoneRegex).min(7).max(20),
  address: string().required().min(5).max(255),
  city: string().required().min(2).max(100),
  country: string().required().min(2).max(100),
  government_id_type: string()
    .required()
    .oneOf(["KTP", "Passport", "Driver's License"]),
  government_id_file: mixed().required().test(fileSize).test(fileType),
};
```

### File Upload Validation

- **Format**: PDF only
- **Size Limit**: 10MB maximum
- **Preview**: File name display with remove option

## User Experience Features

### Loading States

- **Initial Load**: Spinner while fetching profile data
- **Form Submission**: Button shows "Submitting..." with spinner
- **Error Recovery**: Retry button on failed requests

### Error Handling

- **Network Errors**: User-friendly messages with retry option
- **Validation Errors**: Real-time field-level validation feedback
- **Submission Errors**: Toast notifications for API failures

### Success Feedback

- **Toast Notifications**: Success messages via Sonner
- **Form Reset**: Automatic cleanup after successful submission
- **Cache Invalidation**: Automatic data refresh

## Security Considerations

### File Upload Security

- **Client-side validation**: File type and size checks
- **Server dependency**: Backend must validate files server-side
- **Content-Type**: Proper multipart/form-data headers

### Authentication

- **Bearer Token**: Automatic inclusion via axios interceptors
- **Token Refresh**: Automatic handling of expired tokens
- **Protected Routes**: Dashboard requires authentication

## Performance Optimizations

### Caching Strategy

- **Profile Data**: 5-minute stale time
- **Automatic Refetch**: On window focus and network reconnect
- **Cache Invalidation**: On successful verification submission

### Bundle Optimization

- **Code Splitting**: Components loaded on demand
- **Tree Shaking**: Unused code automatically removed
- **Lazy Loading**: No explicit lazy loading needed for this feature

## Testing & Quality Assurance

### Build Verification

- ✅ **TypeScript Compilation**: No type errors
- ✅ **ESLint**: Code quality checks pass
- ✅ **Build Process**: Successful production build

### Component Testing Considerations

- **Unit Tests**: Each component can be tested independently
- **Integration Tests**: Form submission and API integration
- **E2E Tests**: Complete user workflows

## Future Enhancements

### Potential Improvements

- **File Preview**: PDF preview before upload
- **Progress Indicators**: Upload progress for large files
- **Offline Support**: Service worker caching
- **Multi-language**: Internationalization support

### Scalability Considerations

- **Component Reusability**: Error and loading components used across app
- **Hook Patterns**: Consistent data fetching patterns
- **Type Safety**: Strong typing enables refactoring confidence

## Backend Requirements

The frontend implementation assumes the following backend endpoints and behaviors. Please ensure the backend implements these exactly as specified.

---

# Backend Implementation Requirements

## Required API Endpoints

### 1. GET /api/tenant-profile

**Authentication**: Required (Bearer token)
**Purpose**: Retrieve current user's tenant profile data

**Request**:

```
GET /api/tenant-profile
Authorization: Bearer <token>
```

**Response (Success)**:

```json
{
  "success": true,
  "data": {
    "id": 123,
    "user_id": 456,
    "balance": 0.0,
    "contact": "+6281234567890",
    "government_id_type": "KTP",
    "government_id_path": "https://example.com/uploads/tenant_123_gov_id.pdf",
    "address": "Jl. Sudirman No. 123",
    "city": "Jakarta",
    "country": "Indonesia",
    "verified": true,
    "verified_at": "2025-11-03T06:00:00.000Z",
    "banned": false,
    "created_at": "2025-10-01T00:00:00.000Z",
    "updated_at": "2025-11-03T06:00:00.000Z",
    "deleted_at": null
  }
}
```

**Response (No Profile)**:

```json
{
  "success": true,
  "data": null
}
```

**Response (Error)**:

```json
{
  "success": false,
  "message": "Failed to fetch profile"
}
```

### 2. POST /api/auth/tenant-profile/verification

**Authentication**: Required (Bearer token)
**Purpose**: Submit tenant verification form with file upload

**Request**:

```
POST /api/auth/tenant-profile/verification
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- contact: string (phone number)
- address: string
- city: string
- country: string
- government_id_type: string ("KTP" | "Passport" | "Driver's License")
- government_id_file: File (PDF only, max 10MB)
```

**Response (Success)**:

```json
{
  "success": true,
  "message": "Verification submitted successfully"
}
```

**Response (Validation Error)**:

```json
{
  "success": false,
  "message": "Invalid file format. Only PDF files are allowed."
}
```

**Response (Server Error)**:

```json
{
  "success": false,
  "message": "Failed to process verification request"
}
```

## Database Schema Requirements

### TenantProfile Model

The backend must implement the Prisma model exactly as specified:

```prisma
model TenantProfile {
  id                   Int       @id @default(autoincrement())
  user_id              Int       @unique
  balance              Decimal   @default(0) @db.Decimal(12, 2)
  contact              String    @db.VarChar(20)
  government_id_type   String
  government_id_path   String    // Stores file URL/path
  address              String
  city                 String
  country              String
  verified             Boolean   @default(false)
  verified_at          DateTime?
  banned               Boolean   @default(false)
  created_at           DateTime  @default(now())
  updated_at           DateTime? @updatedAt
  deleted_at           DateTime?

  // Relations
  user User @relation(fields: [user_id], references: [id])
}
```

## File Upload Requirements

### Storage Configuration

- **File Format**: Accept only PDF files
- **Size Limit**: Maximum 10MB per file
- **Storage**: Cloud storage (AWS S3, Google Cloud Storage, etc.) or local filesystem
- **Naming**: Unique file names to prevent conflicts
- **Security**: Proper file validation server-side

### File Processing Steps

1. **Validate file type** (server-side check)
2. **Validate file size** (server-side check)
3. **Generate unique filename**
4. **Upload file to storage**
5. **Update database** with file path
6. **Return success/error response**

## Business Logic Requirements

### Verification Workflow

1. **Initial State**: User has no TenantProfile or unverified profile
2. **Form Submission**: User submits form with file
3. **Processing**: Backend validates and stores data
4. **Status Update**: Set verified = false, store file path
5. **Admin Review**: Manual verification process (separate from this implementation)
6. **Completion**: Admin sets verified = true, verified_at timestamp

### Error Handling

- **Authentication errors**: Return 401 with proper message
- **Validation errors**: Return 400 with specific error messages
- **File upload errors**: Handle storage failures gracefully
- **Database errors**: Proper error logging and user-friendly messages

## Security Requirements

### Authentication & Authorization

- **JWT Validation**: Verify Bearer tokens properly
- **User Context**: Ensure users can only access their own profiles
- **File Access**: Secure file URLs or proper access controls

### Input Validation

- **Sanitization**: Clean all text inputs
- **File Validation**: Server-side file type and size checks
- **SQL Injection**: Use parameterized queries
- **XSS Prevention**: Proper output encoding

### File Security

- **Content-Type Validation**: Check actual file content, not just extension
- **Virus Scanning**: Consider implementing file scanning
- **Access Control**: Restrict file access to authenticated users
- **Storage Security**: Secure storage credentials and permissions

## Testing Requirements

### API Testing

- **Success scenarios**: All valid inputs work correctly
- **Error scenarios**: Proper error responses for invalid inputs
- **Authentication**: Proper token validation
- **File uploads**: Various file types and sizes

### Integration Testing

- **Database operations**: Proper data persistence
- **File storage**: Successful upload and retrieval
- **Cache invalidation**: Frontend cache updates correctly

## Deployment Considerations

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# File Storage
AWS_S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key

# JWT
JWT_SECRET=your-jwt-secret

# File Upload Limits
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=application/pdf
```

### Performance Considerations

- **File Upload Optimization**: Consider chunked uploads for large files
- **Database Indexing**: Index user_id for fast profile lookups
- **Caching**: Implement Redis for session/file metadata caching
- **CDN**: Use CDN for file serving if using cloud storage

## Monitoring & Logging

### Error Logging

- **API Errors**: Log all failed requests with context
- **File Upload Failures**: Track upload success/failure rates
- **Validation Errors**: Monitor common validation failures

### Performance Monitoring

- **Response Times**: Track API response times
- **File Upload Times**: Monitor upload performance
- **Database Queries**: Log slow queries

This implementation provides a complete, production-ready tenant verification system. The frontend is fully functional and ready for backend integration.
