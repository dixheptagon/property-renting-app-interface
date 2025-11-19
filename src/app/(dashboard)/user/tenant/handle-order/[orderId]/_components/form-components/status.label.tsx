interface StatusLabelProps {
  status: string;
}

export default function StatusLabel({ status }: StatusLabelProps) {
  const variants: Record<string, { bg: string; text: string; label: string }> =
    {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Confirmed",
      },
      pending_payment: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Pending Payment",
      },
      processing: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        label: "Processing",
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        label: "Cancelled",
      },
      completed: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Completed",
      },
    };

  const variant = variants[status] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Unknown",
  };

  return (
    <div className={`rounded-full px-4 py-2 ${variant.bg}`}>
      <span className={`text-sm font-semibold ${variant.text}`}>
        {variant.label}
      </span>
    </div>
  );
}
