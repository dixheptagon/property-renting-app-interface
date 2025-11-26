export interface User {
  id: number;
  role: string | undefined;
  email: string;
}

export interface TenantVerificationProfile {
  id: number;
  user_id: number;
  contact: string;
  address: string;
  city: string;
  country: string;
  government_id_type: string;
  government_id_path: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface TenantVerificationData {
  tenantProfile: TenantVerificationProfile;
  user: User;
}

export interface TenantVerificationResponse {
  success: boolean;
  message: string;
  data: TenantVerificationData;
}
