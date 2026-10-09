import { connection } from "next/server"

import { findLiveApp } from "@/content/apps"
import { signedAssetUrl } from "@/lib/github/client"
import { getReleases } from "@/lib/github/data"

// The app repos are private, so release files can't be linked directly. This
// route checks that the asset belongs to one of our published releases, asks
// GitHub for a short-lived signed URL with the server-side token, and
// redirects there. The download goes straight from GitHub to the visitor.
export async function GET(_request: Request, ctx: RouteContext<"/unduh/[app]/[asset]">) {
  await connection()
  const { app: slug, asset } = await ctx.params
  const app = findLiveApp(slug)
  const assetId = Number(asset)
  if (!app || !Number.isSafeInteger(assetId)) return text("File tidak ditemukan.", 404)

  const releases = await getReleases(app.repo)
  if (!releases) return text("Unduhan sedang tidak tersedia. Coba lagi beberapa menit lagi.", 503)
  if (!releases.some((r) => r.assets.some((a) => a.id === assetId))) return text("File tidak ditemukan.", 404)

  try {
    const url = await signedAssetUrl(app.repo, assetId)
    return new Response(null, { status: 302, headers: { Location: url, "Cache-Control": "no-store" } })
  } catch (error) {
    console.error(`[unduh] ${slug}/${assetId}:`, (error as Error).message)
    return text("Unduhan sedang tidak tersedia. Coba lagi beberapa menit lagi.", 502)
  }
}

function text(body: string, status: number) {
  return new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } })
}
