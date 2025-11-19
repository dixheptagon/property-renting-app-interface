export interface PropertyReportParams {
  property_uid: string;
  room_type_uid?: string;
  selected_date: string;
}

export interface PropertyReportData {
  booked_units: number;
  available_units: number;
  total_units: number;
  occupancy_rate: number;
  selected_date: string;
}

export interface PropertyReportResponse {
  success: boolean;
  message: string;
  data: PropertyReportData;
}
