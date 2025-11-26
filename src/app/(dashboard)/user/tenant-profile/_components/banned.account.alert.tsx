import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function BannedAccountAlert() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          Your account is banned. Please contact support for assistance.
        </AlertDescription>
      </Alert>
    </div>
  );
}
