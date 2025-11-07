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
    console.log("useSnap - useEffect triggered");
    const myMidtransClientKey = MIDTRANS_CLIENT_KEY;
    console.log("useSnap - MIDTRANS_CLIENT_KEY:", myMidtransClientKey);
    console.log("useSnap - MIDTRANS_API_URL:", MIDTRANS_API_URL);

    if (!myMidtransClientKey) {
      console.error("useSnap - MIDTRANS_CLIENT_KEY is not set");
      return;
    }

    const script = document.createElement("script");
    script.src = `${MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    console.log("useSnap - Script src:", script.src);
    console.log("useSnap - Script data-client-key:", myMidtransClientKey);

    script.onload = () => {
      console.log("useSnap - Script loaded successfully");
      console.log("useSnap - window.snap:", window.snap);
      setSnap(window.snap);
    };

    script.onerror = (error) => {
      console.error("useSnap - Script failed to load:", error);
    };

    document.body.appendChild(script);
    console.log("useSnap - Script appended to body");

    return () => {
      console.log("useSnap - Cleanup: removing script");
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (token: string, embedId: string, action?: string) => {
    console.log("snapEmbed - Called with token:", token, "embedId:", embedId);
    console.log("snapEmbed - snap object:", snap);

    if (!snap) {
      console.error("snapEmbed - Snap is not available");
      return;
    }

    try {
      console.log("snapEmbed - Calling snap.embed");
      snap.embed(token, {
        embedId,
        onSuccess: (result: any) => {
          console.log("Payment success:", result);
          toast.success("Payment successful!");
          // Redirect to success page
          //   window.location.href = `/${property_id}/confirmed`;
        },
        onPending: (result: any) => {
          console.log("Payment pending:", result);
          toast.info("Payment is being processed...");
        },
        onError: (result: any) => {
          console.log("Payment error:", result);
          toast.error("Payment failed. Please try again later.");
        },
        onClose: () => {
          console.log("Payment widget closed");
          toast.error("Payment widget closed.");
        },
      });
      console.log("snapEmbed - snap.embed called successfully");
    } catch (error) {
      console.error("snapEmbed - Error calling snap.embed:", error);
    }
  };

  return {
    snapEmbed,
  };
};
