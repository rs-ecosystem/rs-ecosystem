import { ArrowRightIcon, BellIcon, CircleCheckIcon, CloudIcon } from "lucide-react"
import Link from "next/link"

import { AppIcon } from "@/components/brand/icons"
import { Phone } from "@/components/mock/phone"
import { Container, SectionHeading } from "@/components/site/layout"
import { Badge } from "@/components/ui/badge"
import { buttonClass } from "@/lib/button-class"
import { cardPreviewIndex, getLiveApps, getUpcomingApps, type LiveApp, type UpcomingApp } from "@/content/apps"
import { links } from "@/content/site"
import { getUi, type Ui } from "@/content/ui"
import { getAppStatus } from "@/lib/apps"
import { fill, localeHref, type Locale } from "@/lib/i18n"
import { getLocale } from "@/lib/locale"
import { platformLabel } from "@/lib/release"
import { cn } from "@/lib/utils"

import { DownloadMenu } from "./download-menu"
import { ExpandHint, PreviewTrigger } from "./preview-lightbox"

export async function AppsSection() {
  const lang = await getLocale()
  const ui = getUi(lang)
  const t = ui.apps
  return (
    <section id="aplikasi" className="border-b py-14 md:py-28">
      <Container className="flex flex-col gap-10 md:gap-14">
        <SectionHeading kicker={t.kicker} title={t.title}>
          {t.body}
        </SectionHeading>
        <div className="grid gap-6 lg:grid-cols-2">
          {getLiveApps(lang).map((app) => (
            <AppCard key={app.slug} app={app} lang={lang} ui={ui} />
          ))}
        </div>
        <ComingSoon apps={getUpcomingApps(lang)} t={t} />
        <RsCloud t={t} />
      </Container>
    </section>
  )
}

async function AppCard({ app, lang, ui }: { app: LiveApp; lang: Locale; ui: Ui }) {
  const t = ui.apps
  const status = await getAppStatus(app, lang)
  const changelog = localeHref(lang, `/changelog#${app.slug}`)
  return (
    <article className="flex flex-col overflow-hidden rounded-[18px] border bg-card shadow-xs md:rounded-[20px]">
      <PreviewTrigger
        slug={app.slug}
        index={cardPreviewIndex(app)}
        label={fill(t.seePreviewOf, { app: app.name })}
        className="relative block h-60 w-full overflow-hidden border-b focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset md:h-[340px]"
      >
        <span aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(135deg, var(--sidebar) 0%, var(--tint-${app.tint}) 100%)` }} />
        <Phone
          screen={app.screen}
          className="absolute top-10 left-7 transition-transform duration-500 ease-out group-hover:-translate-y-2 md:top-14 md:left-1/2 md:-translate-x-1/2"
        />
        <ExpandHint label={t.seePreview} />
      </PreviewTrigger>
      <div className="flex flex-1 flex-col gap-5 p-5 md:p-7">
        <div className="flex items-center gap-3 md:gap-3.5">
          <AppIcon size={48} word={app.iconWord} />
          <div className="flex flex-1 flex-col gap-0.5">
            <h3 className="text-[17px] font-semibold md:text-xl">{app.name}</h3>
            <p className="text-[13px] text-muted-foreground md:text-sm">{app.tagline}</p>
          </div>
          <Badge variant={status.released ? "default" : "outline"}>{status.label}</Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{app.description}</p>
        <ul className="grid gap-x-3 gap-y-2.5 sm:grid-cols-2 sm:gap-y-3">
          {app.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-[13px]">
              <CircleCheckIcon className="size-4 shrink-0 text-success" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {app.platforms.map((p) => (
              <Badge key={p} variant="secondary">
                {platformLabel[p]}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2 *:flex-1 sm:*:flex-none">
            <Link href={changelog} className={buttonClass({ variant: "outline" })}>
              {status.latest ? t.releaseNotes : t.learnMore}
            </Link>
            {status.downloads.length > 0 ? (
              <DownloadMenu
                lang={lang}
                strings={{ download: ui.download.download, downloadFile: ui.download.downloadFile, version: ui.download.version, otherFiles: ui.download.otherFiles }}
                version={status.latest!.version}
                options={status.downloads.map(({ href, label, hint, size, primary }) => ({ href, label, hint, size, primary }))}
              />
            ) : status.released ? (
              // Released, but the files aren't known right now (GitHub unreachable).
              <Link href={changelog} className={buttonClass()}>
                {t.seeDownloads}
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            ) : (
              <a href={links.waitlist(app.name)} className={buttonClass()}>
                {t.joinWaitlist}
                <ArrowRightIcon data-icon="inline-end" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

const dashed = "border-[1.5px] border-dashed border-dash bg-sidebar"

function ComingSoon({ apps: upcomingApps, t }: { apps: UpcomingApp[]; t: Ui["apps"] }) {
  return (
    <div id="segera-hadir" className="flex flex-col gap-4 pt-2 md:gap-6">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[17px] font-semibold md:text-xl">{t.comingSoon}</h3>
          <Badge variant="secondary">{fill(t.appCount, { n: upcomingApps.length })}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{t.comingSoonBody}</p>
      </div>

      {/* Phones: a compact list. */}
      <ul className={cn("divide-y overflow-hidden rounded-2xl sm:hidden", dashed)}>
        {upcomingApps.map((app) => (
          <li key={app.slug} className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border bg-background">
              <app.icon className="size-5" />
            </span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-semibold">{app.name}</span>
              <span className="text-xs text-muted-foreground">{app.chips.map((c) => c.label).join(", ")}</span>
            </span>
            <a href={links.waitlist(app.name)} aria-label={fill(t.notifyMeWhen, { app: app.name })} className={buttonClass({ variant: "ghost", size: "icon" })}>
              <BellIcon className="text-muted-foreground" />
            </a>
          </li>
        ))}
      </ul>

      {/* Tablet & desktop: cards. */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {upcomingApps.map((app) => (
          <article key={app.slug} className={cn("flex flex-col gap-4 rounded-2xl p-6", dashed)}>
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl border bg-background">
                <app.icon className="size-5" />
              </span>
              <Badge variant="outline">{t.comingSoon}</Badge>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[17px] font-semibold">{app.name}</h4>
              <p className="text-[13px] font-medium text-muted-foreground">{app.tagline}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{app.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {app.chips.map((c) => (
                <span key={c.label} className="flex h-6 items-center gap-1 rounded-full border bg-background pr-2 pl-1.5 text-xs font-medium">
                  <c.icon className="size-4 text-muted-foreground" />
                  {c.label}
                </span>
              ))}
            </div>
            <a href={links.waitlist(app.name)} className="mt-auto flex w-fit items-center gap-1.5 pt-1 text-[13px] font-medium hover:underline">
              <BellIcon className="size-4" />
              {t.notifyMe}
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

function RsCloud({ t }: { t: Ui["apps"] }) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:gap-5 md:px-7 md:py-6", "border-[1.5px] border-dashed border-dash bg-muted")}>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-background">
        <CloudIcon className="size-5" />
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold">Rs Cloud</h3>
          <Badge variant="outline">{t.cloudBadge}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{t.cloudBody}</p>
      </div>
      <a href={links.waitlist("Rs Cloud")} className={buttonClass({ variant: "outline" })}>
        {t.followProgress}
      </a>
    </div>
  )
}
