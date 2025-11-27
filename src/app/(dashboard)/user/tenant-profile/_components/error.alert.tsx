import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorAlertProps {
  onRetry?: () => void;
}

export default function ErrorAlert({ onRetry }: ErrorAlertProps) {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <div className="space-y-3">
            <p>Failed to load profile data. Please try again.</p>
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
