interface BookingData {
  id: number;
  uid: string;
  status: string;
  check_in_date: string;
  check_out_date: string;
  total_price: string;
  fullname: string;
  email: string;
  phone_number: string;
  payment_method: string | null;
  payment_proof: string | null;
  cancellation_reason: string | null;
  transaction_id: string | null;
  payment_deadline: string;
  paid_at: string | null;
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

export type {
  BookingData,
  BookingResponse,
  OrderDetailsSummaryProps,
  OrderDetailsFormProps,
};
