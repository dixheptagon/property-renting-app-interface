import { cn } from "@/lib/utils";

type OrdersCardProps = {
  label: string;
  value: string | number;
  className?: string;
  icon?: React.ReactNode;
};

export default function statsCard({
  label,
  value,
  className,
  icon,
}: OrdersCardProps) {
  return (
    <div
      className={cn("group relative overflow-hidden rounded-xl p-5", className)}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/40 to-transparent opacity-0" />

      <div className="relative flex flex-col gap-4">
        {/* Header with icon */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="mb-1 text-sm leading-tight font-medium text-gray-700">
              {label}
            </p>
          </div>

          {icon && (
            <div className="rounded-lg bg-white/50 p-2 shadow-sm transition-all duration-300">
              {icon}
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-end gap-1">
          {/* <Plus className="stroke-4" /> */}
          <p className="text-4xl leading-none font-bold text-gray-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
