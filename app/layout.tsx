import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
