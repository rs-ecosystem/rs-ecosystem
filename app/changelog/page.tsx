import { DownloadIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { AppIcon } from "@/components/brand/icons"
import { Markdown } from "@/components/markdown"
import { Container, SectionHeading } from "@/components/site/layout"
import { Badge } from "@/components/ui/badge"
import { buttonClass } from "@/lib/button-class"
import { liveApps, type LiveApp } from "@/content/apps"
import { links } from "@/content/site"
import { downloadsFor } from "@/lib/apps"
import { getReleases } from "@/lib/github/data"
import { formatBytes, formatDate, shortVersionLabel, versionStage } from "@/lib/release"

export const metadata: Metadata = {
  title: "Catatan perubahan",
  description: "Semua rilis Rs Finance dan Rs Password, langsung dari GitHub.",
}

export default function ChangelogPage() {
  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading kicker="Catatan perubahan" title="Setiap rilis, apa adanya.">
          Diambil langsung dari GitHub Releases setiap aplikasi, jadi halaman ini selalu sama dengan rilis terbaru.
        </SectionHeading>
        <nav aria-label="Aplikasi" className="flex gap-2">
          {liveApps.map((app) => (
            <Link key={app.slug} href={`#${app.slug}`} className={buttonClass({ variant: "outline" })}>
              {app.name}
            </Link>
          ))}
        </nav>
        {liveApps.map((app) => (
          <AppReleases key={app.slug} app={app} />
        ))}
      </Container>
    </section>
  )
}

async function AppReleases({ app }: { app: LiveApp }) {
  const releases = await getReleases(app.repo)
  return (
    <div id={app.slug} className="flex flex-col gap-6">
      <div className="flex items-center gap-3.5 border-b pb-5">
        <AppIcon size={44} word={app.iconWord} />
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xl font-semibold">{app.name}</h2>
          <p className="text-sm text-muted-foreground">{app.tagline}</p>
        </div>
      </div>
      {releases === null && <Empty text="Catatan rilis sedang tidak bisa dimuat. Coba lagi beberapa menit lagi." />}
      {releases?.length === 0 && (
        <Empty text={`${app.name} belum punya rilis publik.`}>
          <a href={links.waitlist(app.name)} className={buttonClass({ variant: "outline" })}>
            Kabari saya saat rilis
          </a>
        </Empty>
      )}
      <ol className="flex flex-col gap-6">
        {releases?.map((r, i) => {
          const downloads = downloadsFor(app, r)
          return (
            <li key={r.tag} className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
              <div className="flex flex-row items-center gap-2 md:flex-col md:items-start md:gap-1.5">
                <span className="font-semibold">{r.version}</span>
                {r.publishedAt && <span className="text-sm text-muted-foreground">{formatDate(r.publishedAt)}</span>}
                <div className="flex gap-1.5">
                  {i === 0 && <Badge>Terbaru</Badge>}
                  {versionStage(r.version) !== "stable" && <Badge variant="outline">{shortVersionLabel(r.version).split(" ")[0]}</Badge>}
                </div>
              </div>
              <article className="flex flex-col gap-5 rounded-2xl border bg-card p-5 md:p-6">
                {r.notes.trim() ? <Markdown>{r.notes}</Markdown> : <p className="text-sm text-muted-foreground">Tidak ada catatan untuk rilis ini.</p>}
                {downloads.length > 0 && (
                  <div className="flex flex-wrap gap-2 border-t pt-4">
                    {downloads.map((d) => (
                      <a key={d.href} href={d.href} className={buttonClass({ variant: d.primary ? "outline" : "ghost", size: "sm" })}>
                        <DownloadIcon data-icon="inline-start" />
                        {d.label}
                        <span className="text-muted-foreground">{formatBytes(d.size)}</span>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Empty({ text, children }: { text: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-dash bg-sidebar p-6 text-sm text-muted-foreground">
      {text}
      {children}
    </div>
  )
}
