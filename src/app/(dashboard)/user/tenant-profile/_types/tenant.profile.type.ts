export interface User {
  id: number;
  role: string;
}

export interface TenantProfile {
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

export interface TenantProfileData {
  tenantProfile: TenantProfile;
  user: User;
}

export interface TenantProfileResponse {
  success: boolean;
  message: string;
  data: TenantProfileData;
}

export interface TenantVerificationRequest {
  contact: string;
  address: string;
  city: string;
  country: string;
  government_id_type: string;
  government_id_file: File;
}

export interface TenantVerificationResponse {
  success: boolean;
  message: string;
}
