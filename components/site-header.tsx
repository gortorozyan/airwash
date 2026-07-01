"use client";

import Link from "next/link";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { responsiveImages } from "@/components/responsive-assets";
import { ResponsiveImage } from "@/components/responsive-image";
import { ArrowUpRightIcon } from "@/components/ui-icons";

type NavItem = {
  href: string;
  label: string;
  sectionKey?: "home" | "why-airwash" | "services" | "packages" | "contact";
};

const navItems: NavItem[] = [
  { href: "#top", label: "\u0533\u056c\u056d\u0561\u057e\u0578\u0580", sectionKey: "home" },
  { href: "#why-airwash", label: "\u0544\u0565\u0580 \u0544\u0561\u057d\u056b\u0576", sectionKey: "why-airwash" },
  { href: "#services", label: "\u053e\u0561\u057c\u0561\u0575\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580", sectionKey: "services" },
  { href: "#packages", label: "\u0553\u0561\u0569\u0565\u0569\u0576\u0565\u0580", sectionKey: "packages" },
  { href: "#contact", label: "\u053f\u0561\u057a \u0574\u0565\u0566 \u0570\u0565\u057f", sectionKey: "contact" }
];

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative block h-5 w-5"
    >
      <span
        className={`absolute left-0 top-[3px] h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ${
          isOpen ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[10px] h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-[17px] h-[2px] w-5 rounded-full bg-current transition-transform duration-300 ${
          isOpen ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const navAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header")?.clientHeight ?? 96;
      const checkpoint = window.scrollY + headerHeight + 28;
      const sectionKeys = ["home", "why-airwash", "services", "packages", "contact"] as const;
      const sectionPositions = sectionKeys
        .map((sectionKey) => {
          const sectionId = sectionKey === "home" ? "top" : sectionKey;
          const section =
            document.querySelector(`[data-nav-section="${sectionKey}"]`) ??
            document.getElementById(sectionId);

          if (!section) {
            return null;
          }

          return {
            key: sectionKey,
            top: section.getBoundingClientRect().top + window.scrollY
          };
        })
        .filter((section): section is { key: (typeof sectionKeys)[number]; top: number } => section !== null)
        .sort((firstSection, secondSection) => firstSection.top - secondSection.top);

      let currentSection: (typeof sectionKeys)[number] = "home";

      sectionPositions.forEach((section) => {
        if (checkpoint >= section.top) {
          currentSection = section.key;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("airwash-mobile-menu-open");
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.classList.remove("airwash-mobile-menu-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (navAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(navAnimationFrameRef.current);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href === "#top" ? "top" : href.replace("#", "");
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    if (navAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(navAnimationFrameRef.current);
    }

    const headerHeight = document.querySelector("header")?.clientHeight ?? 0;
    const targetY = sectionId === "top"
      ? 0
      : Math.max(section.getBoundingClientRect().top + window.scrollY - headerHeight + 1, 0);
    const startY = window.scrollY;
    const distance = targetY - startY;
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
        top: Math.max(startY + (distance * easedProgress), 0),
        left: 0,
        behavior: "auto"
      });

      if (progress < 1) {
        navAnimationFrameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      navAnimationFrameRef.current = null;
      window.history.replaceState(null, "", href);
    };

    navAnimationFrameRef.current = window.requestAnimationFrame(animate);
  };

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string, closeMenu = false) => {
    event.preventDefault();

    if (closeMenu) {
      setIsOpen(false);
      window.requestAnimationFrame(() => scrollToSection(href));
      return;
    }

    scrollToSection(href);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 w-full bg-[#101A24] px-5 py-4 text-white shadow-[0_6px_20px_rgba(6,14,24,0.18)] transition-[background-color,box-shadow] duration-300 sm:px-8 sm:py-4 lg:px-10 xl:px-12"
    >
      <div className="flex items-center justify-between gap-3 xl:grid xl:grid-cols-[minmax(190px,1fr)_auto_minmax(190px,1fr)] xl:items-center xl:gap-6">
        <div className="flex justify-start">
          <Link
            aria-label="AirWash home"
            className="shrink-0 transition-opacity duration-300 hover:opacity-90"
            href="#top"
            onClick={(event) => handleAnchorClick(event, "#top")}
          >
            <ResponsiveImage
              alt="AirWash drone cleaning"
              className="block h-[36px] w-auto sm:h-[40px] xl:h-[44px]"
              fetchPriority="high"
              height={147}
              imageSet={responsiveImages.headerLogo}
              loading="eager"
              pictureClassName="block"
              sizes="(max-width: 1279px) 140px, 190px"
              width={960}
            />
          </Link>
        </div>

        <nav
          aria-label="Primary"
          className="hidden items-center justify-center gap-5 xl:flex 2xl:gap-7"
          onMouseLeave={() => setHoveredHref(null)}
        >
          {navItems.map((item) => {
            const isActive = item.sectionKey === activeSection;
            const isHovered = hoveredHref === item.href;
            const showUnderline = hoveredHref ? isHovered : isActive;

            return (
              <Link
                key={item.href}
                className={`relative whitespace-nowrap text-[12px] font-medium tracking-[0.01em] transition-colors duration-300 hover:text-white 2xl:text-[13px] ${
                  isActive ? "text-white" : "text-white/84"
                }`}
                href={item.href}
                onMouseEnter={() => setHoveredHref(item.href)}
                onClick={(event) => handleAnchorClick(event, item.href)}
                style={{ color: "#FFFFFF" }}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-2.5 left-0 h-[2px] w-full rounded-full bg-white transition-transform duration-300"
                  style={{
                    transform: showUnderline ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left center"
                  }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden justify-end xl:flex">
          <Link
            className="airwash-header-cta group inline-flex h-[40px] items-center gap-2 whitespace-nowrap rounded-[5px] border border-white/24 bg-transparent px-4 text-[12px] font-medium text-white shadow-[0_10px_28px_rgba(6,14,24,0.12)] backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#101A24]"
            href="#contact"
            onClick={(event) => handleAnchorClick(event, "#contact")}
          >
            {"\u054d\u057f\u0561\u0576\u0561\u056c \u0563\u0576\u0561\u0570\u0561\u057f\u0578\u0582\u0574"}
            <ArrowUpRightIcon className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-[#101A24]" />
          </Link>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-[5px] bg-transparent text-white transition-opacity duration-300 hover:opacity-80 xl:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <MenuIcon isOpen={isOpen} />
        </button>
      </div>

      <div className="xl:hidden">
        <button
          aria-label="Close navigation"
          className={`fixed inset-0 z-[70] bg-black/72 backdrop-blur-[3px] transition-opacity duration-300 ${
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          type="button"
        />
        <div
          className={`fixed bottom-0 right-0 top-0 z-[80] flex w-[78vw] max-w-[330px] flex-col border-l border-white/12 bg-[#101A24] text-white shadow-[-28px_0_70px_rgba(0,0,0,0.38)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          id="mobile-navigation"
        >
          <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
            <Link
              aria-label="AirWash home"
              className="inline-flex shrink-0 transition-opacity duration-300 hover:opacity-90"
              href="#top"
              onClick={(event) => handleAnchorClick(event, "#top", true)}
            >
              <ResponsiveImage
                alt="AirWash drone cleaning"
                className="block h-[34px] w-auto"
                height={147}
                imageSet={responsiveImages.headerLogo}
                pictureClassName="block"
                sizes="140px"
                width={960}
              />
            </Link>
            <button
              aria-label="Close navigation"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center text-white transition-opacity duration-300 hover:opacity-75"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <MenuIcon isOpen />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-5 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`rounded-[5px] px-0 py-4 text-[16px] font-semibold transition-colors duration-300 ${
                  item.sectionKey === activeSection
                    ? "text-white"
                    : "text-white/74 hover:text-white"
                }`}
                href={item.href}
                onClick={(event) => handleAnchorClick(event, item.href, true)}
                style={{ color: "#FFFFFF" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 px-5 py-5">
            <Link
              className="airwash-header-cta group inline-flex h-12 w-full items-center justify-center gap-3 rounded-[5px] border border-white/24 bg-transparent px-4 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#101A24]"
              href="#contact"
              onClick={(event) => handleAnchorClick(event, "#contact", true)}
            >
              {"\u054d\u057f\u0561\u0576\u0561\u056c \u0563\u0576\u0561\u0570\u0561\u057f\u0578\u0582\u0574"}
              <ArrowUpRightIcon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[#101A24]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
