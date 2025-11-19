interface SalesReportParams {
  propertyUId?: string;
  startDate?: string;
  endDate?: string;
}

interface SalesReportPeriod {
  period: string;
  completed: number;
  cancelled: number;
}

interface SalesReportData {
  totalRevenue: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  periods: SalesReportPeriod[];
  startDate: string;
  endDate: string;
}

interface SalesReportResponse {
  success: boolean;
  message: string;
  data: SalesReportData;
}

export type {
  SalesReportParams,
  SalesReportPeriod,
  SalesReportData,
  SalesReportResponse,
};
