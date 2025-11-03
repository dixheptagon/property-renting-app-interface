export interface TenantProfile {
  id: number;
  user_id: number;
  balance: number;
  contact: string;
  government_id_type: string;
  government_id_path: string | null;
  address: string;
  city: string;
  country: string;
  verified: boolean;
  verified_at: string | null;
  banned: boolean;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface TenantProfileResponse {
  success: boolean;
  data: TenantProfile | null;
  message?: string;
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
