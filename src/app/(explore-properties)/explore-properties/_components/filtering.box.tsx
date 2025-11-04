import { Label } from "@/components/ui/label";
import { SelectCategory } from "./filtering-box-component/select.category";
import { SelectAmenities } from "./filtering-box-component/select.amenities";
import { SelectRules } from "./filtering-box-component/select.rules";

interface FilteringBoxProps {
  category?: string;
  onCategoryChange?: (value: string) => void;
  amenities?: string[];
  onAmenitiesChange?: (value: string[]) => void;
  rules?: string[];
  onRulesChange?: (value: string[]) => void;
}

export default function FilteringBox({
  category,
  onCategoryChange,
  amenities,
  onAmenitiesChange,
  rules,
  onRulesChange,
}: FilteringBoxProps) {
  return (
    <section>
      <div className="space-y-4 rounded-lg bg-white p-4 shadow-md">
        {/* Select Category */}
        <div className="space-y-2">
          <Label className="text-md font-semibold"> Category</Label>
          <SelectCategory />
        </div>

        {/* Select Amenities */}
        <div className="space-y-2">
          <Label className="text-md font-semibold"> Amenities</Label>
          <SelectAmenities
            value={amenities}
            onValueChange={onAmenitiesChange}
          />
        </div>

        {/* Select Rules */}
        <div className="space-y-2">
          <Label className="text-md font-semibold"> Rules</Label>
          <SelectRules value={rules} onValueChange={onRulesChange} />
        </div>
      </div>
    </section>
  );
}
