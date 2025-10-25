"use client";
import { use, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ChooseCategory,
  Guidelines,
  InputTitleDescription,
  Overview,
} from "./content-utility-component/lazy.load.component";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePropertyStore } from "../../_stores/property.store";

export default function CreatePropertyContent() {
  const TOTAL_STEPS = 4;
  const { currentStep, prevStep, nextStep } = usePropertyStore();
  // const [currentStep, setCurrentStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const progressValue = (currentStep / TOTAL_STEPS) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <Overview />;
      case 1:
        return <Guidelines />;
      case 2:
        return <ChooseCategory />;
      case 3:
        return <InputTitleDescription />;
      default:
        return null;
    }
  };

  const renderStepButton = () => {
    switch (currentStep) {
      case 0:
        return { previous: "Back", next: "Get Started" };
      case TOTAL_STEPS - 1:
        return { previous: "Back", next: "Add Room Type" };
      default:
        return { previous: "Back", next: "Continue" };
    }
  };

  const { previous, next } = renderStepButton();

  return (
    <section className="mx-auto w-full">
      <div>{renderStepContent()}</div>

      <div
        className={`fixed bottom-0 w-full space-y-2 p-4 lg:fixed lg:bottom-0 ${scrolled || isMobile ? "border-t-2 bg-white/85 backdrop-blur-md" : ""}`}
      >
        <div>
          <Progress value={progressValue} className="w-full" />
        </div>

        <div className="flex justify-between px-6">
          {/* Navigation Button */}
          <Button
            className="p-6 shadow-lg"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0} // Disable di langkah pertama
          >
            {previous}
          </Button>

          {currentStep === TOTAL_STEPS - 1 ? (
            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              onClick={() => alert("Data Disimpan!")}
            >
              {next}
            </Button>
          ) : (
            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              onClick={nextStep}
            >
              {next}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
