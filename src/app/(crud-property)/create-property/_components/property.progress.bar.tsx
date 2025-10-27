import { usePathname } from "next/navigation";
import { PROPERTY_CREATION_STEPS } from "../_constants/create.property.steps";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PropertyProgressBar() {
  const pathname = usePathname(); // Get the current pathname
  const totalSteps = PROPERTY_CREATION_STEPS.length - 1;

  // 1. Identify the current step
  const currentStepObject =
    PROPERTY_CREATION_STEPS.find(
      (step) => step.path !== "" && pathname.endsWith(step.path)
    ) || PROPERTY_CREATION_STEPS[0];

  // if not found, default to the first step
  const currentStep = currentStepObject ? currentStepObject.id : 1;

  // 2. Calculate the progress value
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-3 p-4">
      {/* Progress Status Text */}
      <div className="flex justify-between text-sm font-semibold text-gray-600">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{currentStepObject?.label || ""}</span>
      </div>

      {/* Visualaization of progress bar */}
      <Progress value={progressValue} />
    </div>
  );
}
