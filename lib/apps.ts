import "server-only"

import { findLiveApp, type LiveApp } from "@/content/apps"
import type { RoadmapItem } from "@/content/site"
import { getMilestones, getReleases, type Release } from "@/lib/github/data"
import { classifyAsset, formatMonth, shortVersionLabel, type DownloadKind } from "@/lib/release"

export type Download = DownloadKind & { href: string; name: string; size: number }

export type AppStatus = {
  /** Badge text, e.g. "Beta 0.1" or "Segera rilis". */
  label: string
  released: boolean
  latest: Release | null
  downloads: Download[]
  /** False when the data came from the content fallback. */
  live: boolean
}

export function downloadsFor(app: LiveApp, release: Release): Download[] {
  return release.assets
    .flatMap((a) => {
      const kind = classifyAsset(a.name)
      return kind ? [{ ...kind, href: `/unduh/${app.slug}/${a.id}`, name: a.name, size: a.size }] : []
    })
    .sort((a, b) => a.order - b.order)
}

export async function getAppStatus(app: LiveApp): Promise<AppStatus> {
  const releases = await getReleases(app.repo)
  const latest = releases?.[0] ?? null
  if (!latest) return { label: app.fallback.label, released: app.fallback.released, latest: null, downloads: [], live: releases !== null }
  return { label: shortVersionLabel(latest.version), released: true, latest, downloads: downloadsFor(app, latest), live: true }
}

export type RoadmapEntry = RoadmapItem & { progress?: { done: number; total: number; url: string } }

export async function resolveRoadmap(items: RoadmapItem[]): Promise<RoadmapEntry[]> {
  return Promise.all(
    items.map(async (item): Promise<RoadmapEntry> => {
      const app = item.source && findLiveApp(item.source.app)
      if (!item.source || !app) return item
      if (item.source.type === "latest-release") {
        const latest = (await getReleases(app.repo))?.[0]
        if (!latest?.publishedAt) return item
        return { ...item, when: formatMonth(latest.publishedAt), title: `${app.name} ${shortVersionLabel(latest.version).toLowerCase()}`, status: "done" }
      }
      const wanted = item.source.milestone.toLowerCase()
      const m = (await getMilestones(app.repo))?.find((x) => x.title.toLowerCase() === wanted)
      if (!m) return item
      const total = m.open + m.closed
      return {
        ...item,
        status: m.state === "closed" ? "done" : item.status,
        progress: total > 0 ? { done: m.closed, total, url: m.url } : undefined,
      }
    })
  )
}
