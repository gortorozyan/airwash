"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedStatProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export function AnimatedStat({ value, suffix = "", className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const triggerElement = element?.closest("[data-animate-number-trigger='true']") as HTMLElement | null;

    if (!element || hasAnimated) {
      return;
    }

    const startAnimation = () => {
      setHasAnimated(true);

      const startTime = performance.now();
      const duration = value >= 1000 ? 1500 : 1100;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const nextValue = Math.min(Math.round(value * progress), value);

        setDisplayValue(nextValue);

        if (progress < 1) {
          frameRef.current = window.requestAnimationFrame(animate);
        } else {
          frameRef.current = null;
          setDisplayValue(value);
        }
      };

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const checkVisibility = () => {
      const rect = (triggerElement ?? element).getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

      if (!isVisible) {
        return;
      }

      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
      startAnimation();
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [hasAnimated, value]);

  return (
    <span className={`inline-block ${className ?? ""}`} ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}
