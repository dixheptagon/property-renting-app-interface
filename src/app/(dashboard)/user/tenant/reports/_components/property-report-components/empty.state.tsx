import { MousePointerClick } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border bg-white p-12 text-center shadow-md">
      <div className="mb-4 rounded-full bg-gray-100 p-6">
        <MousePointerClick className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-700">
        No property reports found
      </h3>
      <p className="mb-4 text-gray-500">
        Please select date and room type to see the associated property reports
      </p>
    </div>
  );
}
