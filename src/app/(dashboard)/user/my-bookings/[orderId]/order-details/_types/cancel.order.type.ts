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

interface CancelOrderParams {
  orderId: string;
  cancellationReason: string;
}

interface RejectCancelReasonFormData {
  reason: string;
}
