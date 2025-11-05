"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  const [currentSection, setCurrentSection] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    const updateSections = () => {
      const sections = document.querySelectorAll("[data-scroll-section]");
      setTotalSections(sections.length);
    };

    updateSections();

    const handleScroll = () => {
      const sections = Array.from(
        document.querySelectorAll("[data-scroll-section]")
      ) as HTMLElement[];

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let closestIndex = 0;
      let minDistance = Math.abs(sections[0]?.offsetTop - scrollPosition);

      sections.forEach((section, index) => {
        const distance = Math.abs(section.offsetTop - scrollPosition);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setCurrentSection(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateSections);

    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSections);
    };
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll("[data-scroll-section]");
    const section = sections[index] as HTMLElement;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (totalSections === 0) return null;

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => scrollToSection(index)}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          className="relative group"
          aria-label={`Go to section ${index + 1}`}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-electric-blue electric-glow scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />

          {/* Tooltip */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="glass px-3 py-1 rounded-lg whitespace-nowrap">
              <span className="text-sm text-white">
                Section {index + 1}
              </span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
