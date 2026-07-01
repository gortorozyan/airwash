import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import type { NextConfig } from "next";

export default function nextConfig(phase: string): NextConfig {
  const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;
  const basePath = isDevelopment ? "" : "/airwash";

  return {
    basePath,
    distDir: isDevelopment ? ".next-dev" : undefined,
    output: isDevelopment ? undefined : "export",
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath
    },
    images: {
      unoptimized: true
    }
  };
}
