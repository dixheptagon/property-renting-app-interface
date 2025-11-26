import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export function useReplyReview({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingUid,
      replyComment,
    }: {
      bookingUid: string;
      replyComment: string;
    }) => {
      const response = await axiosInstance.post(
        `/api/review/${bookingUid}/reply`,
        {
          booking_uid: bookingUid,
          reply_comment: replyComment,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate awaiting reviews query to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["awaiting-reviews"],
      });

      queryClient.invalidateQueries({
        queryKey: ["completed-reviews"],
      });

      queryClient.invalidateQueries({
        queryKey: ["review-ratings-data"],
      });

      onSuccess && onSuccess();
    },
    onError: (error) => {
      onError && onError();
    },
  });
}
