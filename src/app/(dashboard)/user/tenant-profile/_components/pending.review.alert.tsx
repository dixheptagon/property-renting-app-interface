import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function PendingReviewAlert() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          Your application is pending review. We will notify you once the
          verification process is complete.
        </AlertDescription>
      </Alert>
    </div>
  );
}
