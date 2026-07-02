"use client";

import { useEffect, useRef, useState } from "react";

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 19V5M12 5l-5 5M12 5l5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

export function PageTools() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    scrollToTop();

    const rafId = window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const triggerSection = document.getElementById("why-airwash");

      if (!triggerSection) {
        setShowScrollTop(window.scrollY > 500);
        return;
      }

      const triggerPoint = triggerSection.offsetTop + 140;
      setShowScrollTop(window.scrollY >= triggerPoint);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  const scrollToTopWithElevatorEffect = () => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    const startY = window.scrollY;
    const startTime = performance.now();
    const duration = 950;

    const easeInOutCubic = (progress: number) => {
      if (progress < 0.5) {
        return 4 * progress * progress * progress;
      }

      return 1 - Math.pow(-2 * progress + 2, 3) / 2;
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo({
        top: Math.max(startY * (1 - easedProgress), 0),
        left: 0,
        behavior: "auto"
      });

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      animationFrameRef.current = null;
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);
  };

  return (
    <button
      aria-label="Scroll to top"
      className={`airwash-scroll-top fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#101A24] bg-[#101A24] text-white shadow-[0_14px_28px_rgba(16,26,36,0.2)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#162736] active:scale-[0.98] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 sm:shadow-[0_18px_36px_rgba(16,26,36,0.22)] ${
        showScrollTop ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      onClick={scrollToTopWithElevatorEffect}
      type="button"
    >
      <ArrowUpIcon className="h-5 w-5 text-white sm:h-8 sm:w-8" />
    </button>
  );
}
