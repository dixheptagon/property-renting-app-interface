export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    order: Order;
    transaction_token: TransactionToken;
  };
}

export interface Order {
  id: number;
  uid: string;
  user_id: number;
  room_id: number;
  property_id: number;
  check_in_date: string;
  check_out_date: string;
  fullname: string;
  email: string;
  phone_number: string;
  total_price: string;
  status: string;
  payment_method: string | null;
  payment_proof: string | null;
  transaction_id: string | null;
  payment_deadline: string;
  paid_at: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface TransactionToken {
  token: string;
  redirect_url: string;
}
