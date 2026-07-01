"use client";

import Link from "next/link";
import { responsiveImages } from "@/components/responsive-assets";
import { ResponsiveImage } from "@/components/responsive-image";

const sectionLinks = [
  { href: "#top", label: "Գլխավոր" },
  { href: "#why-airwash", label: "Մեր Մասին" },
  { href: "#services", label: "Ծառայություններ" },
  { href: "#packages", label: "Փաթեթներ" },
  { href: "#contact", label: "Կապ մեզ հետ" }
] as const;

const socialLinks = [
  { href: "https://t.me/airwasharmenia", label: "Telegram", icon: "telegram" },
  { href: "https://instagram.com/airwash.armenia", label: "Instagram", icon: "instagram" },
  { href: "https://facebook.com/airwash.armenia", label: "Facebook", icon: "facebook" },
  { href: "https://linkedin.com/company/airwash-armenia", label: "LinkedIn", icon: "linkedin" },
  { href: "https://wa.me/37491245680", label: "WhatsApp", icon: "whatsapp" },
  { href: "https://tiktok.com/@airwash.armenia", label: "TikTok", icon: "tiktok" }
] as const;

const contactItems = [
  {
    href: "tel:+37491245680",
    label: "+374 91 245 680",
    icon: "phone"
  },
  {
    href: "mailto:airwash.armenia@gmail.com",
    label: "airwash.armenia@gmail.com",
    icon: "mail"
  },
  {
    href: "#contact",
    label: "Yerevan, Armenia",
    icon: "location"
  }
] as const;

const footerFont = {
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Inter, system-ui, sans-serif"
} as const;

type SocialIconName = (typeof socialLinks)[number]["icon"];
type ContactIconName = (typeof contactItems)[number]["icon"];

function SocialIcon({ icon }: { icon: SocialIconName }) {
  if (icon === "telegram") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M21.6 4.2 18.2 20c-.25 1.12-.92 1.38-1.86.86l-5.13-3.78-2.47 2.38c-.27.27-.5.5-1.03.5l.37-5.23 9.52-8.6c.41-.37-.09-.58-.64-.21L5.2 13.32.13 11.73c-1.1-.34-1.12-1.1.23-1.63L20.18 2.46c.92-.34 1.72.2 1.42 1.74Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <rect height="16" rx="4" stroke="currentColor" strokeWidth="2" width="16" x="4" y="4" />
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" fill="currentColor" r="1.2" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M14.2 8.1V6.8c0-.62.43-1 1.08-1h1.8V2.7c-.3-.04-1.35-.13-2.57-.13-2.55 0-4.3 1.55-4.3 4.42V8.1H7.32v3.48h2.89v8.85h3.55v-8.85h2.78l.44-3.48H14.2Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M6.94 8.98H3.56v10.78h3.38V8.98ZM5.25 4.24a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92Zm14.5 9.34c0-3.1-1.65-4.55-3.86-4.55-1.78 0-2.58.98-3.02 1.67V8.98H9.63v10.78h3.38v-5.33c0-1.4.27-2.75 2-2.75 1.7 0 1.72 1.6 1.72 2.84v5.24h3.38v-6.18h-.36Z" />
      </svg>
    );
  }

  if (icon === "whatsapp") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
        <path d="M19.05 4.92A9.9 9.9 0 0 0 3.48 16.86L2.2 21.55l4.8-1.26A9.9 9.9 0 0 0 19.05 4.92Zm-7.05 14a7.08 7.08 0 0 1-3.6-.99l-.26-.16-2.84.75.76-2.77-.18-.28a7.1 7.1 0 1 1 6.12 3.45Zm3.9-5.32c-.21-.1-1.25-.62-1.44-.69-.19-.07-.33-.1-.47.1-.14.21-.54.69-.67.83-.12.14-.25.16-.46.06-.21-.1-.9-.33-1.71-1.05-.63-.56-1.06-1.26-1.19-1.47-.12-.21-.01-.33.1-.43.1-.1.21-.25.32-.37.11-.12.14-.21.21-.35.07-.14.04-.26-.02-.37-.05-.1-.47-1.13-.64-1.55-.17-.4-.34-.35-.47-.36h-.4c-.14 0-.37.05-.56.26-.19.21-.73.71-.73 1.74s.75 2.03.86 2.17c.1.14 1.48 2.26 3.6 3.17.5.22.9.35 1.2.45.5.16.96.14 1.32.08.4-.06 1.25-.51 1.43-1 .18-.48.18-.9.12-1-.05-.1-.19-.16-.4-.26Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
      <path d="M16.78 3.1c.44 2.65 1.91 4.33 4.52 4.5v3.02a7.72 7.72 0 0 1-4.45-1.3v5.66c0 2.86-1.74 5.78-5.84 5.78-3.14 0-5.47-2.03-5.47-5.02 0-3.42 2.78-5.38 6.09-5.16v3.12c-1.53-.24-2.95.47-2.95 1.9 0 1.12.86 1.86 2.08 1.86 1.46 0 2.33-.86 2.33-2.72V3.1h3.69Z" />
    </svg>
  );
}

function ContactIcon({ icon }: { icon: ContactIconName }) {
  if (icon === "phone") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M6.6 4.8 8.9 4c.5-.17 1.04.06 1.27.54l1.08 2.28c.2.42.09.92-.26 1.23L9.8 9.12a10.4 10.4 0 0 0 5.08 5.08l1.07-1.19c.31-.35.81-.46 1.23-.26l2.28 1.08c.48.23.71.77.54 1.27l-.8 2.3c-.17.5-.64.84-1.17.82C10.9 17.95 6.05 13.1 5.78 5.97c-.02-.53.32-1 .82-1.17Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (icon === "mail") {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m5.2 7 5.4 4.42a2.2 2.2 0 0 0 2.8 0L18.8 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
      <path d="M19 10.4c0 5.1-7 10-7 10s-7-4.9-7-10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <circle cx="12" cy="10.4" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#101A24] text-white" style={footerFont}>
      <div className="relative mx-auto max-w-[1080px] px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <Link
            aria-label="AirWash home"
            className="inline-flex justify-center transition-opacity duration-300 hover:opacity-90"
            href="#top"
          >
            <ResponsiveImage
              alt="AirWash drone cleaning"
              className="h-auto w-[98px] sm:w-[112px]"
              height={543}
              imageSet={responsiveImages.footerLogo}
              pictureClassName="block"
              sizes="(max-width: 639px) 98px, 112px"
              width={768}
            />
          </Link>

          <p className="mt-2 text-[11px] font-semibold tracking-[0.08em] text-white/72 sm:text-[12px]">
            AIRWASH DRONE CLEANING SERVICES
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                aria-label={item.label}
                className={`airwash-social-icon airwash-social-icon-${item.icon} inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white text-[#2563EB] shadow-[0_8px_18px_rgba(6,14,24,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f1f5f8]`}
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <SocialIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-white/10 pt-4 md:grid-cols-2 md:gap-8">
          <div className="text-center md:text-left">
            <p className="text-[13px] font-semibold text-white">
              Բաժիններ
            </p>
            <nav aria-label="Footer navigation" className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-start">
              {sectionLinks.map((item) => (
                <Link
                  key={item.href}
                  className="text-[13px] leading-5 text-white/70 transition-colors duration-300 hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-left">
            <p className="text-[13px] font-semibold text-white">
              Կապ մեզ հետ
            </p>
            <div className="mt-2 flex flex-col items-center gap-1.5 md:items-start">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  className="group inline-flex items-center gap-2 text-[13px] leading-5 text-white/70 transition-colors duration-300 hover:text-white"
                  href={item.href}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/12 text-white">
                    <ContactIcon icon={item.icon} />
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 border-t border-white/10 pt-3 text-center text-[11px] text-white/52">
          © 2026. Բոլոր իրավունքները պաշտպանված են։
        </p>
      </div>
    </footer>
  );
}
