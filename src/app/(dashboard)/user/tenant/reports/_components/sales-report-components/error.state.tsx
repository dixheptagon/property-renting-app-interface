import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  error?: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-12 text-center shadow-md">
      <div className="mb-4 rounded-full bg-red-100 p-6">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-700">
        Failed to load sales report
      </h3>
      <p className="mb-4 text-gray-500">
        {error ||
          "Something went wrong while loading the reviews. Please try again."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  );
}
