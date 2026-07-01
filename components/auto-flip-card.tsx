"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type AutoFlipCardProps = {
  children: ReactNode;
  className?: string;
};

export function AutoFlipCard({ children, className }: AutoFlipCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const hasPlayedRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const isPointerInsideRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const [isAutoFlipped, setIsAutoFlipped] = useState(false);
  const [isHoverLocked, setIsHoverLocked] = useState(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const checkAutoFlip = () => {
      const element = cardRef.current;

      if (!element || hasPlayedRef.current) {
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      const rect = element.getBoundingClientRect();
      const enteredViewport = rect.top < window.innerHeight * 0.72 && rect.bottom > window.innerHeight * 0.18;

      if (isScrollingDown && enteredViewport) {
        hasPlayedRef.current = true;
        setIsHoverLocked(true);
        setIsAutoFlipped(true);

        timeoutRef.current = window.setTimeout(() => {
          setIsAutoFlipped(false);

          if (!isPointerInsideRef.current) {
            setIsHoverLocked(false);
          }
        }, 1000);
      }

      lastScrollYRef.current = currentScrollY;
    };

    checkAutoFlip();
    window.addEventListener("scroll", checkAutoFlip, { passive: true });
    window.addEventListener("resize", checkAutoFlip);

    return () => {
      window.removeEventListener("scroll", checkAutoFlip);
      window.removeEventListener("resize", checkAutoFlip);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`flip-card ${isAutoFlipped ? "is-auto-flipped" : ""} ${!isHoverLocked ? "hover-enabled" : ""} ${className ?? ""}`}
      onPointerEnter={() => {
        isPointerInsideRef.current = true;
      }}
      onPointerLeave={() => {
        isPointerInsideRef.current = false;

        if (isHoverLocked) {
          setIsHoverLocked(false);
        }
      }}
      ref={cardRef}
    >
      {children}
    </div>
  );
}
