import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // `use cache` + cacheLife for the GitHub data (lib/github/data.ts).
  cacheComponents: true,
  // A package-lock.json in the parent folder would otherwise be taken as the workspace root.
  turbopack: { root: import.meta.dirname },
}

export default nextConfig
