"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const sectionLinks = [
  { href: "#top", label: "Գլխավոր" },
  { href: "#why-airwash", label: "Ինչու AirWash?" },
  { href: "#services", label: "Ծառայություններ" },
  { href: "#technology", label: "Տեխնոլոգիա" },
  { href: "#projects", label: "Նախագծեր" },
  { href: "#contact", label: "Կապ մեզ հետ" }
] as const;

const socialLinks = [
  { href: "https://t.me/airwasharmenia", label: "Telegram", icon: "mdi:telegram" },
  { href: "https://instagram.com/airwash.armenia", label: "Instagram", icon: "mdi:instagram" },
  { href: "https://facebook.com/airwash.armenia", label: "Facebook", icon: "mdi:facebook" },
  { href: "https://linkedin.com/company/airwash-armenia", label: "LinkedIn", icon: "mdi:linkedin" },
  { href: "https://wa.me/37491245680", label: "WhatsApp", icon: "mdi:whatsapp" },
  { href: "https://tiktok.com/@airwash.armenia", label: "TikTok", icon: "mdi:tiktok" }
] as const;

const contactItems = [
  {
    href: "tel:+37491245680",
    label: "+374 91 245 680",
    icon: "solar:phone-calling-linear"
  },
  {
    href: "mailto:airwash.armenia@gmail.com",
    label: "airwash.armenia@gmail.com",
    icon: "solar:letter-linear"
  }
] as const;

const footerFont = {
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Inter, system-ui, sans-serif"
} as const;

const primaryLinks = sectionLinks.slice(0, 3);
const secondaryLinks = sectionLinks.slice(3);

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#101A24] text-white" style={footerFont}>
      <div className="relative mx-auto max-w-[1240px] px-5 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-14 lg:px-10 xl:px-12">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.62fr_0.62fr_0.95fr] lg:gap-8">
          <div className="max-w-[430px] sm:col-span-2 lg:col-span-1">
            <div className="flex w-fit max-w-full flex-col items-center">
              <Link
                aria-label="AirWash home"
                className="inline-flex w-full justify-center transition-opacity duration-300 hover:opacity-90"
                href="#top"
              >
                <Image
                  alt="AirWash drone cleaning"
                  className="h-auto w-[142px] sm:w-[172px] lg:w-[192px]"
                  height={1384}
                  src="/images/airwash_logo_white_transparent.png"
                  unoptimized
                  width={1919}
                />
              </Link>

              <p className="mt-6 text-center text-[14px] font-semibold tracking-[-0.02em] text-white sm:mt-7 sm:whitespace-nowrap sm:text-[17px] lg:text-[18px]">
                AIRWASH DRONE CLEANING SERVICES
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  aria-label={item.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white shadow-[0_14px_30px_rgba(6,14,24,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f1f5f8]"
                  href={item.href}
                  rel="noreferrer"
                  style={{ color: "#101A24" }}
                  target="_blank"
                >
                  <Icon icon={item.icon} style={{ color: item.label === "TikTok" ? "#2563EB" : "#101A24" }} width="21" />
                </a>
              ))}
            </div>

            <p className="mt-10 text-[14px] text-white/72">© 2026. Բոլոր իրավունքները պաշտպանված են։</p>
          </div>

          <div>
            <p className="text-[15px] font-semibold text-white">
              Quick Links
            </p>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col gap-3">
              {primaryLinks.map((item) => (
                <Link
                  key={item.href}
                  className="w-fit text-[16px] text-white/76 transition-colors duration-300 hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[15px] font-semibold text-white">
              Բաժիններ
            </p>
            <nav aria-label="Footer secondary navigation" className="mt-5 flex flex-col gap-3">
              {secondaryLinks.map((item) => (
                <Link
                  key={item.href}
                  className="w-fit text-[16px] text-white/76 transition-colors duration-300 hover:text-white"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[15px] font-semibold text-white">
              Connect With Us
            </p>
            <div className="mt-5 space-y-4">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  className="group flex items-start gap-3 text-[15px] text-white/78 transition-colors duration-300 hover:text-white"
                  href={item.href}
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-transparent text-white">
                    <Icon icon={item.icon} style={{ color: "#FFFFFF" }} width="18" />
                  </span>
                  <span className="leading-7">{item.label}</span>
                </a>
              ))}

              <div className="flex items-start gap-3 text-[15px] text-white/78">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent bg-transparent text-white">
                  <Icon icon="solar:map-point-linear" style={{ color: "#FFFFFF" }} width="18" />
                </span>
                <span className="leading-7">
                  Yerevan, Armenia
                  <br />
                  Drone facade cleaning inquiries
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
