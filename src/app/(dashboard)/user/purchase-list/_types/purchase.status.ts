// Types
export type PurchaseStatus =
  | "pending_payment"
  | "processing"
  | "confirmed"
  | "cancelled"
  | "completed";

export type SortOrder = "asc" | "desc";

export interface StatusOption {
  value: PurchaseStatus;
  label: string;
  color: string;
}

export interface Purchase {
  id: string;
  property: string;
  checkIn: string;
  checkOut: string;
  price: string;
  status: PurchaseStatus;
}
