import React from "react";

interface ReservationStepData {
  id: number;
  label: string;
}

interface ReservationStepProps {
  currentStep: number;
}
export const ReservationStep: React.FC<ReservationStepProps> = ({
  currentStep,
}) => {
  // Define the steps data
  const steps: ReservationStepData[] = [
    { id: 1, label: "Booking" },
    { id: 2, label: "Pay" },
    { id: 3, label: "View order" },
  ];

  // Find the current active step
  const activeStep = steps.find((step) => step.id === currentStep);

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden items-center gap-4 p-4 text-sm font-medium text-gray-500 md:flex">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center justify-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm text-white ${
                    isActive ? "bg-blue-600" : "bg-gray-500"
                  }`}
                >
                  {step.id}
                </span>
                <span className={isActive ? "text-blue-600" : ""}>
                  {step.label}
                </span>
                {!isLast && (
                  <hr
                    className={`w-8 rounded-2xl border-2 ${
                      isActive ? "border-blue-600" : "border-gray-500"
                    }`}
                  />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Version - Shows only active step */}
      <div className="flex items-center justify-center gap-3 p-4 text-sm font-medium text-gray-500 md:hidden">
        {activeStep && (
          <>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
              {activeStep.id}
            </span>
            <span className="text-blue-600">{activeStep.label}</span>
          </>
        )}
      </div>
    </>
  );
};
