import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderResponse } from "../[property_id]/booking/_types/order.response";

interface PaymentState {
  orderResponse: OrderResponse | null;
  setOrderResponse: (orderResponse: OrderResponse) => void;
  clearPayment: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      orderResponse: null,
      setOrderResponse: (orderResponse) => set({ orderResponse }),
      clearPayment: () => set({ orderResponse: null }),
    }),
    {
      name: "payment-storage",
      partialize: (state) => ({
        orderResponse: state.orderResponse,
      }),
    }
  )
);
