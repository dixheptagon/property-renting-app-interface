import {
  AlertCircle,
  Camera,
  CheckCircle,
  FileText,
  Scale,
  ShieldCheck,
} from "lucide-react";
import React from "react";

export default function Guidelines() {
  const guidelines = [
    {
      icon: FileText,
      title: "Provide Accurate Information",
      description:
        "Ensure all details about your property are truthful and up-to-date before proceeding to the next step.",
    },
    {
      icon: CheckCircle,
      title: "Complete All Required Fields",
      description:
        "Carefully fill out every required detail to ensure your listing is complete and verified.",
    },
    {
      icon: Camera,
      title: "Authentic Photos & Descriptions",
      description:
        "Upload real photos and write descriptions that accurately represent your actual property.",
    },
    {
      icon: AlertCircle,
      title: "Comply with Our Terms",
      description:
        "Properties with false information or inappropriate content may be removed without prior notice.",
    },
    {
      icon: Scale,
      title: "Follow Local Laws",
      description:
        "All listings must comply with local regulations and community guidelines.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-16 pb-26 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-4 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Hero Text */}
          <div>
            <div className="flex items-center gap-8 space-y-6">
              <div>
                <div className="rounded-full bg-amber-100 p-4">
                  <ShieldCheck className="h-24 w-24 text-amber-600" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl leading-tight font-bold text-gray-900 lg:text-3xl">
                  Property Creation
                  <span className="ml-2 text-amber-600">Guidelines</span>
                </h1>
                <p className="text-xl text-gray-600">
                  Please read these important rules before creating your
                  property listing
                </p>
              </div>
            </div>
            <p className="text-md text-gray-600">
              By clicking <b>"Continue"</b>, you agree that all the information
              provided is true and accurate, and that you have read and
              understood our property posting guidelines.
            </p>
          </div>

          {/* Right Side - Steps */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {guidelines.map((guideline, index) => (
              <div
                key={guideline.title}
                className={`group relative overflow-hidden rounded-2xl bg-white p-4 shadow-lg ${index === guidelines.length - 1 ? "p-6 lg:col-span-2" : ""}`}
              >
                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-xl shadow-md`}
                  >
                    <guideline.icon className="h-8 w-8 text-amber-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {guideline.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {guideline.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
