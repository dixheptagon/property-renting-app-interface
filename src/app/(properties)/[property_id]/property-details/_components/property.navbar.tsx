"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import ScrolledNavbar from "./navbar-components/scrolled.navbar";
import InitialNavbar from "./navbar-components/initial.navbar";
import { useScrolled } from "@/hooks/use.scrolled";
import { Section } from "../_types/property.navbar";

export default function Navbar() {
  const scrolled = useScrolled();
  const [activeSection, setActiveSection] = useState<string>("photos");
  const headerRef = useRef<HTMLElement>(null);

  const sections: Section[] = useMemo(
    () => [
      { id: "photos", label: "Photos" },
      { id: "amenities", label: "Amenities & Rules" },
      { id: "room-type", label: "Choose your room" },
      { id: "location", label: "Location" },
      { id: "reviews-ratings", label: "Reviews & Ratings" },
    ],
    []
  );

  // Scroll to specific section with navbar offset
  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === "photos") {
      // Special case: scroll to top for photos
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      const extraMargin = 20;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisibleSection = "";
        let maxIntersectionRatio = 0;

        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > maxIntersectionRatio
          ) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        if (mostVisibleSection) {
          setActiveSection(mostVisibleSection);
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: "-80px 0px -20% 0px", // Account for navbar height and trigger earlier
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for smoother detection
      }
    );

    // Observe all section elements
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    elements.forEach((element) => observer.observe(element!));

    // Cleanup observer on unmount
    return () => {
      elements.forEach((element) => observer.unobserve(element!));
      observer.disconnect();
    };
  }, [sections]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 z-50 w-full">
      {/* Initial Navbar with fade transition */}
      <div
        className={`transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
      >
        <InitialNavbar />
      </div>

      {/* Scrolled Navbar with fade transition */}
      <div
        className={`transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      >
        <ScrolledNavbar
          scrollToSection={scrollToSection}
          activeSection={activeSection}
          sections={sections}
        />
      </div>
    </header>
  );
}
