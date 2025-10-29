import { Minus, Plus } from "lucide-react";

export const CounterRow = ({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) => (
  <div className="flex items-center justify-between border-b border-gray-300 py-6">
    <span className="text-lg font-medium text-gray-700">{label}</span>
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-400 transition-colors hover:border-gray-600 disabled:cursor-not-allowed disabled:border-gray-300"
      >
        <Minus className="h-4 w-4 text-gray-600" />
      </button>
      <span className="w-8 text-center text-lg font-medium text-gray-800">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-400 transition-colors hover:border-gray-600 disabled:cursor-not-allowed disabled:border-gray-300"
        disabled={value >= max}
      >
        <Plus className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  </div>
);
