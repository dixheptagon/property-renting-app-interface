import { CircleAlert } from "lucide-react";

export default function RoomAvailabilityLegend() {
  const statuses = [
    {
      label: "Unavailable",
      color: "bg-red-400",
      dotColor: "bg-red-200 border-red-400 border-2",
    },
    {
      label: "Peak Season",
      color: "bg-yellow-300",
      dotColor: "bg-yellow-200 border-yellow-500 border-2",
    },
    {
      label: "Available",
      color: "bg-gray-300",
      dotColor: "border-gray-400 border-2",
    },
  ];

  return (
    <div className="w-full rounded-t-lg bg-white p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <CircleAlert className="h-4 w-4 stroke-3 text-blue-600" />
        <h3 className="text-sm font-semibold text-gray-900">
          Price & Availability Legend
        </h3>
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 gap-3">
        {statuses.map((status, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${status.dotColor}`} />
            <span className="text-xs font-medium text-gray-700">
              {status.label}
            </span>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mt-4 text-xs text-gray-500">
        <p>* Minimum stay is 1 night.</p>
        <p>* Peak Season dates may have higher rates.</p>
        <p>* Unavailable dates cannot be selected for booking.</p>
      </div>
    </div>
  );
}
