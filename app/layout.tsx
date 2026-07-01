import type { Metadata } from "next";
import { assetPath } from "@/components/asset-path";
import { responsiveImages } from "@/components/responsive-assets";
import { sourceSet } from "@/components/responsive-image";
import "./globals.css";

export const metadata: Metadata = {
  title: "AirWash | Drone Cleaning",
  description: "Professional aerial cleaning solutions for glass, facades, and high-access structures."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy">
      <head>
        <link
          as="image"
          fetchPriority="high"
          href={assetPath("/images/optimized/hero-background-960.avif")}
          imageSizes="100vw"
          imageSrcSet={sourceSet(responsiveImages.hero.avif)}
          rel="preload"
          type="image/avif"
        />
        <link
          as="image"
          fetchPriority="high"
          href={assetPath("/images/optimized/arpi-dron-logo-640.avif")}
          imageSizes="(max-width: 1279px) 140px, 190px"
          imageSrcSet={sourceSet(responsiveImages.headerLogo.avif)}
          rel="preload"
          type="image/avif"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
