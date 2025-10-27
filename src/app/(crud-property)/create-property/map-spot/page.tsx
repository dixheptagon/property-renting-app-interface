"use client";
import CreatePropertyHeader from "../_components/create.property.header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

import { useRouter } from "next/navigation";
import { useScrolled } from "@/hooks/use.scrolled";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePropertyStore } from "../../_stores/property.store";
import PropertyProgressBar from "../_components/property.progress.bar";
import MapEmbedTips from "./_components/map.embed.tips";
import { useFormik } from "formik";
import { PropertyValidationSchema } from "../../_validations/property.validation.schema";

export default function Page() {
  const router = useRouter();
  const scrolled = useScrolled();
  const isMobile = useIsMobile();

  const { property, setPropertyData } = usePropertyStore();

  // Handle Iframe Input and Preview
  const [iframeInput, setIframeInput] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [inputError, setInputError] = useState("");

  const handleParse = () => {
    const match = iframeInput.match(/src="([^"]+)"/);
    if (match) {
      setMapUrl(match[1]);
      setPropertyData({ map_url: match[1] });
      setInputError("");
    } else {
      setMapUrl("");
      setInputError(
        "Invalid iframe input. Please enter a valid iframe embed code."
      );
    }
  };
  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-25 min-h-screen space-y-12 px-4 py-16">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold">
            Pin your property on the map!
          </h1>
          <p className="text-center text-xl text-gray-600">
            Drop a pin or enter your address so guests know exactly where your
            place is.
          </p>
        </div>

        <div className="mx-auto max-w-4xl font-semibold">
          <div className="relative space-y-2">
            <Label className="text-lg font-semibold">
              <MapPin className="h-5 w-5" />
              Map Spot
            </Label>
            <Input
              type="text"
              placeholder="Paste your iframe component here"
              className="py-6 pr-25"
              onChange={(e) => setIframeInput(e.target.value)}
            />

            <Button
              className="absolute top-11 right-2 border-2"
              variant={"outline"}
              onClick={handleParse}
            >
              Preview
            </Button>

            {inputError && (
              <div className="mt-1 text-sm text-red-500">{inputError}</div>
            )}

            {mapUrl && (
              <div className="mt-4 aspect-video rounded-xl outline-3">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl border"
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <MapEmbedTips />
        </div>
      </section>

      <section>
        <div
          className={`fixed bottom-0 w-full space-y-2 p-4 lg:fixed lg:bottom-0 ${
            scrolled || isMobile
              ? "border-t-2 bg-white/85 backdrop-blur-md"
              : ""
          }`}
        >
          <PropertyProgressBar />

          <div className="flex justify-between px-6">
            <Button
              className="p-6 shadow-lg"
              variant="outline"
              type="button"
              onClick={() => router.push("/create-property/location")}
            >
              Back
            </Button>

            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              type="submit"
              disabled={!mapUrl}
              onClick={() => {
                if (mapUrl) {
                  handleParse();
                  router.push("/create-property/amenities");
                }
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
