import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export function useReplyReview({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) {
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
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: () => {
      onError && onError();
    },
  });
}
