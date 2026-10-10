import type { MetadataRoute } from "next"

import { site } from "@/content/site"

const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
  url: `${site.url}${path}`,
  changeFrequency: "weekly",
  priority,
  alternates: { languages: { id: `${site.url}${path}`, en: `${site.url}/en${path === "/" ? "" : path}` } },
})

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1),
    { ...page("/", 0.9), url: `${site.url}/en` },
    page("/changelog", 0.7),
    { ...page("/changelog", 0.6), url: `${site.url}/en/changelog` },
  ]
}
