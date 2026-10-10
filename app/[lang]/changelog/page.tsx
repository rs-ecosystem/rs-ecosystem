import { DownloadIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { AppIcon } from "@/components/brand/icons"
import { Markdown } from "@/components/markdown"
import { Container, SectionHeading } from "@/components/site/layout"
import { Badge } from "@/components/ui/badge"
import { getLiveApps, type LiveApp } from "@/content/apps"
import { links } from "@/content/site"
import { getUi, type Ui } from "@/content/ui"
import { downloadsFor } from "@/lib/apps"
import { buttonClass } from "@/lib/button-class"
import { getReleases } from "@/lib/github/data"
import { fill, localeHref, type Locale } from "@/lib/i18n"
import { getLocale } from "@/lib/locale"
import { formatBytes, formatDate, versionStage } from "@/lib/release"

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale()
  const t = getUi(lang).changelog
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: localeHref(lang, "/changelog"), languages: { id: "/changelog", en: "/en/changelog", "x-default": "/changelog" } },
  }
}

const stageLabel = { alpha: "Alpha", beta: "Beta", rc: "RC" } as const

export default async function ChangelogPage() {
  const lang = await getLocale()
  const ui = getUi(lang)
  const t = ui.changelog
  const apps = getLiveApps(lang)
  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading kicker={t.kicker} title={t.title}>
          {t.body} {t.notesLanguage}
        </SectionHeading>
        <nav aria-label={t.apps} className="flex gap-2">
          {apps.map((app) => (
            <Link key={app.slug} href={`#${app.slug}`} className={buttonClass({ variant: "outline" })}>
              {app.name}
            </Link>
          ))}
        </nav>
        {apps.map((app) => (
          <AppReleases key={app.slug} app={app} lang={lang} t={t} />
        ))}
      </Container>
    </section>
  )
}

async function AppReleases({ app, lang, t }: { app: LiveApp; lang: Locale; t: Ui["changelog"] }) {
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
      {releases === null && <Empty text={t.unavailable} />}
      {releases?.length === 0 && (
        <Empty text={fill(t.noRelease, { app: app.name })}>
          <a href={links.waitlist(app.name)} className={buttonClass({ variant: "outline" })}>
            {t.notifyOnRelease}
          </a>
        </Empty>
      )}
      <ol className="flex flex-col gap-6">
        {releases?.map((r, i) => {
          const downloads = downloadsFor(app.slug, r, lang)
          const stage = versionStage(r.version)
          return (
            <li key={r.tag} className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
              <div className="flex flex-row items-center gap-2 md:flex-col md:items-start md:gap-1.5">
                <span className="font-semibold">{r.version}</span>
                {r.publishedAt && <span className="text-sm text-muted-foreground">{formatDate(r.publishedAt, lang)}</span>}
                <div className="flex gap-1.5">
                  {i === 0 && <Badge>{t.latest}</Badge>}
                  {stage !== "stable" && <Badge variant="outline">{stageLabel[stage]}</Badge>}
                </div>
              </div>
              <article className="flex flex-col gap-5 rounded-2xl border bg-card p-5 md:p-6">
                {r.notes.trim() ? <Markdown>{r.notes}</Markdown> : <p className="text-sm text-muted-foreground">{t.noNotes}</p>}
                {downloads.length > 0 && (
                  <div className="flex flex-wrap gap-2 border-t pt-4">
                    {downloads.map((d) => (
                      <a key={d.href} href={d.href} className={buttonClass({ variant: d.primary ? "outline" : "ghost", size: "sm" })}>
                        <DownloadIcon data-icon="inline-start" />
                        {d.label}
                        <span className="text-muted-foreground">{formatBytes(d.size, lang)}</span>
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
