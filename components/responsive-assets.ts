export type PublicPath = `/${string}`;

export type ResponsiveSource = {
  src: PublicPath;
  width: number;
};

export type ResponsiveImageSet = {
  fallback: PublicPath;
  avif: readonly ResponsiveSource[];
  webp: readonly ResponsiveSource[];
};

function optimizedSource(name: string, width: number, format: "avif" | "webp"): PublicPath {
  return `/images/optimized/${name}-${width}.${format}`;
}

function imageSet(name: string, fallback: PublicPath, widths: number[]): ResponsiveImageSet {
  return {
    fallback,
    avif: widths.map((width) => ({ src: optimizedSource(name, width, "avif"), width })),
    webp: widths.map((width) => ({ src: optimizedSource(name, width, "webp"), width }))
  };
}

export const responsiveImages = {
  hero: imageSet("hero-background", "/images/hero-background.png", [640, 960, 1280, 1537]),
  drone: imageSet("drow", "/images/drow.jpg", [480, 768, 1080, 1440]),
  packages: imageSet("packages-drone-cleaning", "/images/packages-drone-cleaning.webp", [480, 768, 1280, 1900]),
  contact: imageSet("contact-buildings", "/images/contact-buildings.jpg", [480, 768, 1024]),
  headerLogo: imageSet("arpi-dron-logo", "/images/arpi-dron-logo-16.png", [320, 640, 960]),
  footerLogo: imageSet("airwash-logo-white-transparent", "/images/airwash_logo_white_transparent.png", [256, 512, 768])
} as const;
