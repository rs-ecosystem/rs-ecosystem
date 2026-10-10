import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // `use cache` + cacheLife for the GitHub data (lib/github/data.ts).
  cacheComponents: true,
  // A package-lock.json in the parent folder would otherwise be taken as the workspace root.
  turbopack: { root: import.meta.dirname },
  // GitHub profile photo in the "Tentang pembuat" section.
  images: { remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com", pathname: "/u/**" }] },
  // Locales live in app/[lang]. Indonesian (default) is served without a prefix,
  // English under /en. Add new pages to both lists.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/id" },
        { source: "/changelog", destination: "/id/changelog" },
      ],
    }
  },
  async redirects() {
    return [
      { source: "/id", destination: "/", permanent: true },
      { source: "/id/:path*", destination: "/:path*", permanent: true },
    ]
  },
}

export default nextConfig
