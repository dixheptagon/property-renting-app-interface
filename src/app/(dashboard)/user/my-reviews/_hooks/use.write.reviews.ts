"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import {
  WriteReviewRequest,
  WriteReviewResponse,
} from "../_types/write.property.response";

export const useWriteReview = ({
  onSuccess: SuccessResponse,
  onError: ErrorResponse,
}: {
  onSuccess?: (data: WriteReviewResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<
    WriteReviewResponse,
    Error,
    { bookingUid: string; reviewData: WriteReviewRequest }
  >({
    mutationFn: async ({ bookingUid, reviewData }) => {
      const response = await axiosInstance.post<WriteReviewResponse>(
        `/api/review/${bookingUid}/comment`,
        reviewData
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate awaiting reviews query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["awaiting-reviews"],
      });
      SuccessResponse && SuccessResponse(data);
    },
    onError: ErrorResponse,
  });
};
