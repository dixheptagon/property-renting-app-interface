import {
  MIDTRANS_API_URL,
  MIDTRANS_CLIENT_KEY,
} from "@/app/(properties)/[property_id]/payment/_utils/env";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useSnap = () => {
  // Get Property_Id
  const params = useParams();
  const property_id = params.property_id;

  const [snap, setSnap] = useState<any>(null);

  useEffect(() => {
    const myMidtransClientKey = MIDTRANS_CLIENT_KEY;

    if (!myMidtransClientKey) {
      return;
    }

    const script = document.createElement("script");
    script.src = `${MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);

    script.onload = () => {
      setSnap(window.snap);
    };

    script.onerror = (error) => {
      toast.error("Failed to load Snap payment widget.");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (token: string, embedId: string, action?: string) => {
    if (!snap) {
      toast.error("Snap payment widget not loaded.");
      return;
    }

    try {
      snap.embed(token, {
        embedId,
        onSuccess: (result: any) => {
          toast.success("Payment successful!");
          // Redirect to success page
          //   window.location.href = `/${property_id}/confirmed`;
        },
        onPending: (result: any) => {
          toast.info("Payment is being processed...");
        },
        onError: (result: any) => {
          toast.error("Payment failed. Please try again later.");
        },
        onClose: () => {
          toast.error("Payment widget closed.");
        },
      });
    } catch (error) {
      toast.error("Failed to embed Snap payment widget.");
    }
  };

  return {
    snapEmbed,
  };
};
