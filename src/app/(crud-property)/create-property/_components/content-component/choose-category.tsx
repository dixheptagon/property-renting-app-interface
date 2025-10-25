import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { Bed, Building, Building2, House } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const categories = [
  { icon: Building, label: "Apartment", value: "apartment" },
  { icon: Building2, label: "Hotel", value: "hotel" },
  { icon: House, label: "Guesthouse", value: "guesthouse" },
  { icon: Bed, label: "Bed", value: "bed" },
];

export default function ChooseCategory() {
  const { setPropertyData, setSubmitHandler, nextStep, currentStep, property } =
    usePropertyStore();
  const [selected, setSelected] = useState(property.category || "");

  useEffect(() => {
    // Register submit handler for this step
    setSubmitHandler(currentStep, async () => {
      if (!selected) {
        toast.error("Please choose a category before continuing!");
        return;
      }

      setPropertyData({ category: selected });
      nextStep();
    });
  }, [selected, currentStep, setSubmitHandler, setPropertyData, nextStep]);

  return (
    <section className="my-auto min-h-screen space-y-12 px-4 py-16">
      <h1 className="text-center text-3xl font-bold">
        Which of these best describes your place?
      </h1>

      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6">
        {categories.map(({ icon: Icon, label, value }) => (
          <div
            key={value}
            className={`cursor-pointer rounded-lg border-2 p-6 shadow-lg transition-colors duration-300 hover:bg-gray-100 ${
              selected === value ? "border-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => setSelected(value)}
          >
            <Icon className="h-12 w-12" />
            <h3 className="text-2xl font-semibold">{label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
