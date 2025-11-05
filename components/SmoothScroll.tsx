"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSnappingRef = useRef(false);
  const currentSectionRef = useRef(0);
  const directionRef = useRef<"down" | "up" | null>(null);
  const rafRef = useRef<number>();

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
    // Helper: keep refs and state in sync
    const updateCurrentSection = (index: number) => {
      currentSectionRef.current = index;
    };

    // Get all sections with data-scroll-section attribute
    const getSections = () => {
      return Array.from(
        document.querySelectorAll("[data-scroll-section]")
      ) as HTMLElement[];
    };

    const findClosestSectionByViewport = () => {
      const sections = getSections();
      if (sections.length === 0) return null;

      let closestSection = sections[0];
      let bestScore = -Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(window.innerHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityRatio =
          rect.height === 0
            ? 0
            : visibleHeight / Math.min(rect.height, window.innerHeight);

        const sectionMiddle = rect.top + rect.height / 2;
        const distanceFromMiddle = Math.abs(
          sectionMiddle - window.innerHeight / 2
        );
        const maxDistance = window.innerHeight / 2 + rect.height / 2;
        const proximityScore =
          1 - Math.min(distanceFromMiddle / maxDistance, 1);

        const score = visibilityRatio * 2 + proximityScore;
        if (score > bestScore) {
          bestScore = score;
          closestSection = section;
        }
      });

      return closestSection;
    };

    // Find the closest section to snap to based on viewport visibility
    const resolveSectionToSnap = () => {
      const sections = getSections();
      if (sections.length === 0) return null;

      // Always try to move forward/backward based on user intent when possible
      if (directionRef.current === "down") {
        const nextIndex = Math.min(
          currentSectionRef.current + 1,
          sections.length - 1
        );
        directionRef.current = null;
        return sections[nextIndex];
      }

      if (directionRef.current === "up") {
        const prevIndex = Math.max(currentSectionRef.current - 1, 0);
        directionRef.current = null;
        return sections[prevIndex];
      }

      directionRef.current = null;
      return findClosestSectionByViewport();
    };

    // Snap to section (smooth and elegant)
    const snapToSection = (section: HTMLElement, index: number) => {
      if (isSnappingRef.current) return;

      isSnappingRef.current = true;

      updateCurrentSection(index);

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

    const handleScroll = (event: { direction: number }) => {
      // Update ScrollTrigger on each scroll event for proper GSAP integration
      ScrollTrigger.update();

      if (isSnappingRef.current) return;

      if (event.direction > 0) {
        directionRef.current = "down";
      } else if (event.direction < 0) {
        directionRef.current = "up";
      }

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
          const closestSection = resolveSectionToSnap();
          if (closestSection) {
            const sections = getSections();
            const index = sections.indexOf(closestSection);
            if (index !== -1) {
              snapToSection(closestSection, index);
            }
          }
        }
      }, 150);
    };

    lenis.on("scroll", handleScroll);

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    const sections = getSections();
    if (sections.length > 0) {
      updateCurrentSection(0);
    }

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const sections = getSections();
      if (sections.length === 0) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const nextIndex = Math.min(
          currentSectionRef.current + 1,
          sections.length - 1
        );
        if (nextIndex !== currentSectionRef.current) {
          snapToSection(sections[nextIndex], nextIndex);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prevIndex = Math.max(currentSectionRef.current - 1, 0);
        if (prevIndex !== currentSectionRef.current) {
          snapToSection(sections[prevIndex], prevIndex);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        snapToSection(sections[0], 0);
      } else if (e.key === "End") {
        e.preventDefault();
        const lastIndex = sections.length - 1;
        snapToSection(sections[lastIndex], lastIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Refresh ScrollTrigger after a short delay to ensure all elements are loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Cleanup
    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      window.removeEventListener("keydown", handleKeyDown);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <>{children}</>;
}
