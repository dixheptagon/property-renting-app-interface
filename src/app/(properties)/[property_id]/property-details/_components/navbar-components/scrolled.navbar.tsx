import { Section } from "../../_types/property.navbar";

export default function ScrolledNavbar({
  scrollToSection,
  activeSection,
  sections,
}: {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
  sections: Section[];
}) {
  return (
    <nav className="text-md flex w-full justify-center gap-12 bg-white/80 pt-4 font-semibold text-gray-700 shadow-lg backdrop-blur-md">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`relative pb-7 transition-all duration-300 hover:border-b-3 hover:border-blue-800/30 hover:text-blue-800 ${
            activeSection === section.id
              ? "border-b-3 border-blue-800 text-blue-800"
              : "border-b-3 border-transparent"
          }`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}
