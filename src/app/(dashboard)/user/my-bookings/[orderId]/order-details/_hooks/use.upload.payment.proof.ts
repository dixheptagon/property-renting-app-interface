import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useSearchParams } from "next/navigation";

interface UploadPaymentProofData {
  paymentProof: File;
  accountName: string;
  notes: string;
  orderId: string;
}

interface UploadPaymentProofResponse {
  success: boolean;
  message: string;
  data?: {
    paymentProofUrl: string;
    status: string;
  };
}

export const useUploadPaymentProof = () => {
  const queryClient = useQueryClient();

  return useMutation<UploadPaymentProofResponse, Error, UploadPaymentProofData>(
    {
      mutationFn: async (data: UploadPaymentProofData) => {
        const formData = new FormData();
        formData.append("payment_proof", data.paymentProof);
        formData.append("accountName", data.accountName);
        formData.append("notes", data.notes);
        formData.append("bookingId", data.orderId);

        const response = await axiosInstance.post<UploadPaymentProofResponse>(
          `/api/booking/${data.orderId}/upload-payment-proof`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return response.data;
      },
      onSuccess: (data, variables) => {
        // Invalidate and refetch booking data after successful upload
        console.log("useUploadPaymentProof - onSuccess:", data);

        queryClient.invalidateQueries({
          queryKey: ["booking", variables.orderId],
        });

        // Optionally invalidate any booking lists
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },

      onError: (error, variables, context) => {
        console.error("useUploadPaymentProof - onError:", error);
      },
    }
  );
};
