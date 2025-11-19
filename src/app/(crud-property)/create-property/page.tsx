"use client";
import { BadgePercent, Building2, Camera } from "lucide-react";
import CreatePropertyHeader from "./_components/create.property.header";
import PropertyProgressBar from "./_components/property.progress.bar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";

export default function Page() {
  const steps = [
    {
      title: "Share your property details",
      description:
        "Tell us about your space, location, and guest capacity to get started.",
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Create an amazing listing",
      description:
        "Upload stunning photos and craft a compelling description that attracts guests.",
      icon: Camera,
      color: "bg-purple-500",
    },
    {
      title: "Set your price and go live",
      description:
        "Choose your rate, review your listing details, and publish to start earning.",
      icon: BadgePercent,
      color: "bg-green-500",
    },
  ];

  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  return (
    <main>
      <CreatePropertyHeader />

      <section>
        <div className="min-h-screen bg-gray-50 px-4 pt-16 pb-50 lg:pt-30 lg:pb-0">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left Side - Hero Text */}
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
                  Become a Host on Staysia
                </div>
                <h1 className="text-5xl leading-tight font-bold text-gray-900 lg:text-6xl">
                  Let’s make your place{" "}
                  <p className="text-blue-600">ready for guests</p>
                </h1>
                <p className="text-xl text-gray-600">
                  Join thousands of hosts earning on Staysia. It&apos;s quick,
                  easy, and we&apos;ll guide you every step of the way.
                </p>
              </div>

              {/* Right Side - Steps */}
              <div className="space-y-6">
                {steps.map((step) => (
                  <div
                    key={step.title}
                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg"
                  >
                    <div className="relative flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl ${step.color} text-3xl shadow-md`}
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="leading-relaxed text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full">
        <div
          className={`fixed bottom-0 w-full space-y-2 p-4 lg:fixed lg:bottom-0 ${scrolled || isMobile ? "border-t-2 bg-white/85 backdrop-blur-md" : ""}`}
        >
          <PropertyProgressBar />

          <div className="flex justify-end px-6">
            {/* Navigation Button */}

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              onClick={() => {
                router.push("/create-property/guidelines");
              }}
            >
              Get Started!
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
