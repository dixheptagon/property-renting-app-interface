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

export type {
  BookingData,
  BookingResponse,
  OrderDetailsSummaryProps,
  OrderDetailsFormProps,
};
