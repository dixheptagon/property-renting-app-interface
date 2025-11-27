import { Check } from "lucide-react";
import { formatIDR } from "../utils";
import { formatPrice } from "../../../_utils/format.price";

/**
 * Button component for selecting a room, displaying price and selection state.
 */
interface SelectRoomButtonProps {
  isSelected: boolean;
  price: number;
  onSelect: () => void;
}

export const SelectRoomButton: React.FC<SelectRoomButtonProps> = ({
  isSelected,
  price,
  onSelect,
}) => (
  <button
    onClick={onSelect}
    disabled={isSelected}
    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-200 ${
      isSelected
        ? "cursor-default bg-green-500 text-white"
        : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
  >
    <div className="flex flex-col">
      <div className="flex items-center justify-center gap-2 text-xs">
        {isSelected && <Check className="h-3 w-3 stroke-3" />}
        {isSelected ? "Selected" : "Select"}
      </div>
      <div className="text-lg">
        {formatPrice(price)} <sub className="text-xs">/night</sub>
      </div>
    </div>
  </button>
);
