import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      { pathname: "**", search: "" },
      { pathname: "/shipyard_brokering_agency.png", search: "?v=7901a6a5" },
    ],
  },
  turbopack: {
    root: configDir,
  },
};

export default nextConfig;
