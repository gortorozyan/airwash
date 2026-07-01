import { assetPath } from "@/components/asset-path";
import type { PublicPath, ResponsiveImageSet, ResponsiveSource } from "@/components/responsive-assets";

export function sourceSet(sources: readonly ResponsiveSource[]) {
  return sources.map(({ src, width }) => `${assetPath(src)} ${width}w`).join(", ");
}

type ResponsiveImageProps = {
  alt: string;
  className?: string;
  decoding?: "async" | "auto" | "sync";
  fetchPriority?: "high" | "low" | "auto";
  height?: number;
  imageSet: ResponsiveImageSet;
  loading?: "eager" | "lazy";
  pictureClassName?: string;
  sizes: string;
  width?: number;
};

export function ResponsiveImage({
  alt,
  className,
  decoding = "async",
  fetchPriority,
  height,
  imageSet,
  loading = "lazy",
  pictureClassName,
  sizes,
  width
}: ResponsiveImageProps) {
  return (
    <picture className={pictureClassName}>
      <source sizes={sizes} srcSet={sourceSet(imageSet.avif)} type="image/avif" />
      <source sizes={sizes} srcSet={sourceSet(imageSet.webp)} type="image/webp" />
      <img
        alt={alt}
        className={className}
        decoding={decoding}
        fetchPriority={fetchPriority}
        height={height}
        loading={loading}
        src={assetPath(imageSet.fallback as PublicPath)}
        width={width}
      />
    </picture>
  );
}
