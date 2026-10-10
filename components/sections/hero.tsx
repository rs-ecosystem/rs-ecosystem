import { AppleIcon, ArrowRightIcon, SmartphoneIcon } from "lucide-react"
import type { CSSProperties } from "react"

import { ChromeIcon } from "@/components/brand/icons"
import { Phone } from "@/components/mock/phone"
import { Container } from "@/components/site/layout"
import { ScrollLink } from "@/components/site/scroll-link"
import { buttonClass } from "@/lib/button-class"
import { getLiveApps } from "@/content/apps"
import { getSite } from "@/content/site"
import { getUi } from "@/content/ui"
import { getAppStatus } from "@/lib/apps"
import { fill, localeHref } from "@/lib/i18n"
import { getLocale } from "@/lib/locale"

export async function Hero() {
  const lang = await getLocale()
  const { hero } = getSite(lang)
  const t = getUi(lang).hero
  const liveApps = getLiveApps(lang)
  // The pill announces the newest released app version, straight from GitHub.
  const statuses = await Promise.all(liveApps.map(async (app) => ({ app, status: await getAppStatus(app, lang) })))
  const announced = statuses
    .filter((s) => s.status.latest?.publishedAt)
    .sort((a, b) => b.status.latest!.publishedAt!.localeCompare(a.status.latest!.publishedAt!))[0]
  const pill = announced
    ? fill(t.available, { app: announced.app.name, version: announced.status.label.toLowerCase() })
    : fill(t.available, { app: liveApps[0].name, version: liveApps[0].fallback.label.toLowerCase() })

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{ background: "linear-gradient(135deg, var(--hero-from) 0%, var(--hero-via) 60%, var(--hero-to) 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-64 left-1/2 size-[1200px] rounded-full"
        style={{ background: "radial-gradient(closest-side, var(--hero-glow), transparent)" }}
      />
      <Container className="relative lg:h-[760px]">
        <div className="flex max-w-[600px] flex-col gap-5 pt-8 md:gap-7 md:pt-16 lg:max-w-[520px] lg:pt-24 xl:max-w-[600px]">
          <ScrollLink
            href={localeHref(lang, "/#aplikasi")}
            className="flex w-fit items-center gap-2 rounded-full border bg-background py-1.5 pr-3.5 pl-3 text-xs font-medium shadow-xs transition-colors hover:bg-muted md:text-[13px]"
          >
            <span className="size-2 rounded-full bg-success" />
            {pill}
            <ArrowRightIcon className="size-4 text-muted-foreground" />
          </ScrollLink>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-6xl md:text-wrap md:leading-[1.08]">{hero.headline}</h1>
          <p className="max-w-[560px] text-base leading-relaxed text-muted-foreground md:text-lg">{hero.subline}</p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <ScrollLink href={localeHref(lang, "/#aplikasi")} className={buttonClass({ size: "lg" })}>
              {t.explore}
              <ArrowRightIcon data-icon="inline-end" />
            </ScrollLink>
            <ScrollLink href={localeHref(lang, "/#tentang")} className={buttonClass({ size: "lg", variant: "outline" })}>
              {t.portfolio}
            </ScrollLink>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 sm:justify-start">
            <span className="hidden text-[13px] text-muted-foreground sm:inline">{t.availableOn}</span>
            {[
              [SmartphoneIcon, "Android"],
              [AppleIcon, t.iphoneMac],
              [ChromeIcon, "Chrome"],
            ].map(([Icon, label]) => {
              const I = Icon as typeof SmartphoneIcon
              return (
                <span key={label as string} className="flex items-center gap-1.5 text-xs font-medium md:text-[13px]">
                  <I className="size-4" />
                  {label as string}
                </span>
              )
            })}
          </div>
        </div>

        {/* Desktop: two phones on the right, cut off by the section's bottom edge. */}
        <div
          aria-hidden
          className="absolute top-[72px] right-0 hidden h-[1000px] [--hs:0.78] lg:block xl:-right-5 xl:[--hs:1]"
          style={{ width: "calc(640px * var(--hs))" } as CSSProperties}
        >
          <Phone screen="finance-beranda" scale="var(--hs)" className="absolute left-0" style={{ top: "calc(96px * var(--hs))" }} />
          <Phone screen="password-brankas" scale="var(--hs)" className="absolute top-0" style={{ left: "calc(226px * var(--hs))" }} />
        </div>

        {/* Mobile & tablet: the same pair, cropped on both sides. */}
        <div aria-hidden className="relative -mx-4 mt-8 h-[420px] overflow-hidden md:-mx-8 lg:hidden">
          <div className="absolute top-0 left-1/2 h-full w-[390px] -translate-x-1/2">
            <Phone screen="finance-beranda" className="absolute top-[92px] -left-2.5" />
            <Phone screen="password-brankas" className="absolute top-6 left-[186px]" />
          </div>
        </div>
      </Container>
    </section>
  )
}
