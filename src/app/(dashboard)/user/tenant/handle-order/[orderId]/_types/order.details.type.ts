interface BookingData {
  id: string;
  uid: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
  total_price: number;
  fullname: string;
  email: string;
  phone_number: string;
  payment_method: string | null;
  payment_proof: string | null;
  cancellation_reason: string | null;
  transaction_id: string | null;
  paid_at: Date | undefined;
  room: {
    id: string;
    name: string;
    property: {
      id: string;
      tenant_email: string;
      title: string;
      address: string;
      city: string;
      main_image: string | null;
    };
  };
}

interface BookingResponse {
  success: boolean;
  message: string;
  data: BookingData;
}

interface OrderDetailsSummaryProps {
  bookingData?: BookingData;
}

interface OrderDetailsFormProps {
  bookingData?: BookingData;
}

interface RejectOrderResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    order_uid: string;
    status: string;
    payment_deadline: string;
  } | null;
}

interface CancelOrderResponse {
  success: boolean;
  message: string;
  data: {
    booking_id: number;
    order_uid: string;
    status: string;
    payment_deadline: string;
  } | null;
}

interface RejectOrderParams {
  orderId: string;
  rejectionReason: string;
}

interface CancelOrderParams {
  orderId: string;
  cancellationReason: string;
}

interface RejectCancelReasonFormData {
  reason: string;
}

export type {
  BookingData,
  BookingResponse,
  OrderDetailsSummaryProps,
  OrderDetailsFormProps,
  CancelOrderParams,
  CancelOrderResponse,
  RejectOrderParams,
  RejectOrderResponse,
  RejectCancelReasonFormData,
};
