"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSnappingRef = useRef(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll with enhanced smoothness
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1, // Lower value = smoother, more lag (0.1 is very smooth)
    });

    lenisRef.current = lenis;

    // Get all sections with data-scroll-section attribute
    const getSections = () => {
      return Array.from(
        document.querySelectorAll("[data-scroll-section]")
      ) as HTMLElement[];
    };

    // Find the closest section to snap to
    const findClosestSection = () => {
      const sections = getSections();
      if (sections.length === 0) return null;

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let closestSection = sections[0];
      let minDistance = Math.abs(sections[0].offsetTop - scrollPosition);

      sections.forEach((section) => {
        const distance = Math.abs(section.offsetTop - scrollPosition);
        if (distance < minDistance) {
          minDistance = distance;
          closestSection = section;
        }
      });

      return closestSection;
    };

    // Snap to section (smooth and elegant)
    const snapToSection = (section: HTMLElement) => {
      if (isSnappingRef.current) return;

      isSnappingRef.current = true;

      lenis.scrollTo(section, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => {
          // Custom smooth easing - ease-in-out-cubic
          return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        },
        onComplete: () => {
          isSnappingRef.current = false;
        },
      });
    };

    // Handle scroll event
    let lastScrollTime = Date.now();

    lenis.on("scroll", () => {
      // Update ScrollTrigger on each scroll event for proper GSAP integration
      ScrollTrigger.update();

      if (isSnappingRef.current) return;

      lastScrollTime = Date.now();

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set new timeout to snap after user stops scrolling (longer delay for smoother experience)
      scrollTimeoutRef.current = setTimeout(() => {
        const timeSinceScroll = Date.now() - lastScrollTime;

        // Only snap if user hasn't scrolled for 150ms
        if (timeSinceScroll >= 150) {
          const closestSection = findClosestSection();
          if (closestSection) {
            const sections = getSections();
            const index = sections.indexOf(closestSection);
            setCurrentSection(index);
            snapToSection(closestSection);
          }
        }
      }, 150);
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const sections = getSections();
      if (sections.length === 0) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const nextIndex = Math.min(currentSection + 1, sections.length - 1);
        setCurrentSection(nextIndex);
        snapToSection(sections[nextIndex]);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prevIndex = Math.max(currentSection - 1, 0);
        setCurrentSection(prevIndex);
        snapToSection(sections[prevIndex]);
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrentSection(0);
        snapToSection(sections[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        const lastIndex = sections.length - 1;
        setCurrentSection(lastIndex);
        snapToSection(sections[lastIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Refresh ScrollTrigger after a short delay to ensure all elements are loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Cleanup
    return () => {
      lenis.destroy();
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection]);

  return <>{children}</>;
}
