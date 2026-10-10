import {
  AppleIcon,
  ArrowLeftRightIcon,
  BriefcaseIcon,
  CpuIcon,
  DatabaseIcon,
  DownloadIcon,
  FolderSyncIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  SendIcon,
  SmartphoneIcon,
} from "lucide-react"
import Image from "next/image"
import { Fragment } from "react"

import { ChromeIcon, GithubIcon, LinkedinIcon } from "@/components/brand/icons"
import { Container, SectionHeading } from "@/components/site/layout"
import { ScrollLink } from "@/components/site/scroll-link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { buttonClass } from "@/lib/button-class"
import { Separator } from "@/components/ui/separator"
import { getSite, links, profileGithub } from "@/content/site"
import { getUi } from "@/content/ui"
import { getProfile } from "@/lib/github/data"
import { fill, localeHref } from "@/lib/i18n"
import { getLocale } from "@/lib/locale"
import { cn } from "@/lib/utils"

export async function Stats() {
  const lang = await getLocale()
  const { stats } = getSite(lang)
  return (
    <section aria-label={getUi(lang).stats.label} className="border-b">
      <Container className="grid grid-cols-2 gap-x-4 gap-y-5 py-6 md:py-10 lg:flex lg:items-center">
        {stats.map((s, i) => (
          <Fragment key={s.label}>
            {i > 0 && <div className="hidden h-[72px] w-px shrink-0 bg-border lg:block" />}
            <div className={cn("flex flex-col gap-1 lg:flex-1 lg:gap-1.5", i > 0 && "lg:pl-8", i < stats.length - 1 && "lg:pr-8")}>
              <div className="flex flex-col lg:flex-row lg:items-end lg:gap-2.5">
                <span className="text-[28px] leading-tight font-semibold tracking-tight lg:text-4xl">{s.value}</span>
                <span className="text-[13px] font-semibold lg:pb-1.5 lg:text-sm">{s.label}</span>
              </div>
              <p className="text-xs text-muted-foreground lg:text-[13px]">{s.detail}</p>
            </div>
          </Fragment>
        ))}
      </Container>
    </section>
  )
}

export async function Principles() {
  const lang = await getLocale()
  const { principles } = getSite(lang)
  const t = getUi(lang).principles
  return (
    <section id="prinsip" className="border-b bg-sidebar py-14 md:py-28">
      <Container className="flex flex-col gap-6 md:gap-14">
        <SectionHeading kicker={t.kicker} title={t.title}>
          {t.body}
        </SectionHeading>
        <div className="grid overflow-hidden rounded-2xl border bg-card max-md:divide-y md:grid-cols-2 md:gap-6 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent lg:grid-cols-3">
          {principles.map((p) => (
            <article key={p.title} className="flex items-center gap-3.5 px-4 py-3.5 md:flex-col md:items-start md:gap-4 md:rounded-2xl md:border md:bg-card md:p-7">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-muted md:size-11 md:rounded-xl">
                <p.icon className="size-5" />
              </span>
              <div className="flex flex-col gap-0.5 md:gap-2">
                <h3 className="text-sm font-semibold md:text-[17px]">{p.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}

export async function Tech() {
  const lang = await getLocale()
  const { tech } = getSite(lang)
  const t = getUi(lang).tech
  return (
    <section id="teknologi" className="border-b py-14 md:py-28">
      <Container className="grid items-center gap-8 lg:grid-cols-[460px_1fr] lg:gap-16">
        <div className="flex flex-col gap-7">
          <SectionHeading kicker={t.kicker} title={tech.title} size="md">
            {tech.body}
          </SectionHeading>
          <div className="flex flex-wrap gap-2 max-lg:order-last">
            {tech.badges.map((b) => (
              <Badge key={b} variant="outline">
                {b}
              </Badge>
            ))}
          </div>
        </div>
        <figure aria-label={t.diagram} className="flex flex-col items-center rounded-2xl border bg-sidebar p-4 md:rounded-[20px] md:p-8">
          <div className="grid w-full grid-cols-3 gap-2 md:gap-3">
            {[
              [AppleIcon, t.iphoneMac, "SwiftUI"],
              [SmartphoneIcon, "Android", "Jetpack Compose"],
              [ChromeIcon, "Chrome", t.chromeExt],
            ].map(([Icon, name, sub]) => {
              const I = Icon as typeof AppleIcon
              return (
                <div key={name as string} className="flex flex-col items-center gap-1.5 rounded-xl border bg-card px-2 py-3 md:items-start md:gap-2.5 md:rounded-[14px] md:p-4">
                  <I className="size-5" />
                  <div className="flex flex-col items-center gap-0.5 md:items-start">
                    <span className="text-xs font-semibold md:text-sm">{name as string}</span>
                    <span className="hidden text-xs text-muted-foreground md:block">{sub as string}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col items-center py-1">
            <span className="h-5 w-px bg-ring" />
            <span className="hidden items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground md:flex">
              <ArrowLeftRightIcon className="size-4" />
              Event · ViewModel
            </span>
            <span className="hidden h-5 w-px bg-ring md:block" />
          </div>
          <div className="flex w-full items-center gap-3 rounded-xl bg-primary p-4 text-primary-foreground md:gap-4 md:rounded-[14px] md:px-6 md:py-5">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-foreground/10 max-md:size-auto max-md:bg-transparent">
              <CpuIcon className="size-5" />
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold md:text-base">{t.core}</span>
              <span className="text-xs text-primary-foreground/60 md:text-[13px]">{t.coreBody}</span>
            </div>
          </div>
          <span className="my-1 h-5 w-px bg-ring md:h-7" />
          <div className="grid w-full grid-cols-3 gap-2 md:gap-3">
            {[
              [DatabaseIcon, t.sqlite, t.sqliteShort, t.sqliteBody],
              [LockIcon, t.encryption, t.encryptionShort, t.encryptionBody],
              [FolderSyncIcon, t.sync, t.syncShort, t.syncBody],
            ].map(([Icon, name, short, sub]) => {
              const I = Icon as typeof DatabaseIcon
              return (
                <div key={name as string} className="flex items-center justify-center gap-1.5 rounded-[10px] border bg-card p-2.5 md:justify-start md:gap-2.5 md:rounded-xl md:p-3.5">
                  <I className="size-4 shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold md:text-[13px]">
                      <span className="md:hidden">{short as string}</span>
                      <span className="max-md:hidden">{name as string}</span>
                    </span>
                    <span className="hidden text-[11px] text-muted-foreground md:block">{sub as string}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </figure>
      </Container>
    </section>
  )
}

/** "M Ihsan Wahyudin" → "MW". */
function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean)
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase()
}

export async function About() {
  const lang = await getLocale()
  const { profile } = getSite(lang)
  const t = getUi(lang).about
  // Name, role, location and photo follow the GitHub profile; content/site.ts is the fallback.
  const gh = await getProfile(profileGithub)
  const name = gh?.name ?? profile.name
  const role = gh?.bio ?? profile.role
  const location = gh?.location ?? profile.location
  const githubUrl = gh?.url ?? `https://github.com/${profileGithub}`
  return (
    <section id="tentang" className="border-b py-14 md:py-28">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-16">
        <SectionHeading kicker={t.kicker} title={t.title} size="md" className="lg:hidden" />
        <div className="flex flex-col gap-5 rounded-[18px] border bg-card p-5 shadow-xs md:gap-6 md:rounded-[20px] md:p-8 lg:w-[440px] lg:shrink-0">
          <div className="flex items-center gap-4">
            <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-lg font-semibold md:size-[72px] md:text-2xl">
              {gh ? <Image src={gh.avatarUrl} alt={fill(t.photo, { name })} fill sizes="72px" className="object-cover" /> : initials(name)}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[17px] font-semibold md:text-xl">{name}</span>
              <span className="text-[13px] text-muted-foreground md:text-sm">{role}</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">{profile.bio}</p>
          <ul className="flex flex-col gap-2.5 text-sm">
            {[
              [MapPinIcon, location],
              [BriefcaseIcon, profile.availability],
              [MailIcon, links.email],
            ].map(([Icon, text]) => {
              const I = Icon as typeof MapPinIcon
              return (
                <li key={text as string} className="flex items-center gap-2.5">
                  <I className="size-4 text-muted-foreground" />
                  {text as string}
                </li>
              )
            })}
          </ul>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <a href={githubUrl} target="_blank" rel="noreferrer" className={buttonClass({ variant: "outline" })}>
              <GithubIcon data-icon="inline-start" />
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className={buttonClass({ variant: "outline" })}>
              <LinkedinIcon data-icon="inline-start" />
              LinkedIn
            </a>
            <a href={`mailto:${links.email}`} className={buttonClass()}>
              <SendIcon data-icon="inline-start" />
              {t.contact}
            </a>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-7">
          <SectionHeading kicker={t.kicker} title={t.title} size="md" className="max-lg:hidden">
            {profile.intro}
          </SectionHeading>
          <ul className="divide-y rounded-2xl border bg-card">
            {profile.skills.map((s) => (
              <li key={s.title} className="flex items-center gap-4 px-4 py-4 md:px-5 md:py-[18px]">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-muted">
                  <s.icon className="size-5" />
                </span>
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-semibold md:text-[15px]">{s.title}</span>
                  <span className="text-xs text-muted-foreground md:text-[13px]">{s.body}</span>
                </div>
                <div className="hidden gap-1.5 md:flex">
                  {s.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

export async function Faq() {
  const lang = await getLocale()
  const { faq } = getSite(lang)
  const t = getUi(lang).faq
  return (
    <section id="faq" className="border-b bg-sidebar py-14 md:py-28">
      <Container className="grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionHeading kicker={t.kicker} title={t.title} size="md">
            <span className="max-md:hidden">{t.body}</span>
          </SectionHeading>
          <a href={`mailto:${links.email}`} className={cn(buttonClass({ variant: "outline" }), "w-fit max-md:hidden")}>
            <MailIcon data-icon="inline-start" />
            {t.ask}
          </a>
        </div>
        <Accordion defaultValue={[0]} className="rounded-2xl border bg-card px-4 py-1 md:px-6 md:py-2">
          {faq.map((item, i) => (
            <AccordionItem key={item.q} value={i}>
              <AccordionTrigger className="py-3.5 text-sm">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}

export async function Cta() {
  const lang = await getLocale()
  const { cta } = getSite(lang)
  const t = getUi(lang).cta
  return (
    <section className="border-b py-10 md:py-24">
      <Container>
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-[20px] bg-primary p-7 text-primary-foreground md:flex-row md:items-center md:justify-between md:rounded-3xl md:px-16 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-72 -right-40 size-[700px] rounded-full"
            style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--primary-foreground) 12%, transparent), transparent)" }}
          />
          <div className="relative flex max-w-[560px] flex-col gap-3.5">
            <h2 className="text-[28px] leading-tight font-semibold tracking-[-0.02em] md:text-[40px]">{cta.title}</h2>
            <p className="text-[15px] leading-relaxed text-primary-foreground/60 md:text-[17px]">{cta.body}</p>
          </div>
          <div className="relative flex flex-col gap-3 sm:flex-row">
            <ScrollLink href={localeHref(lang, "/#aplikasi")} className={buttonClass({ variant: "secondary", size: "lg" })}>
              <DownloadIcon data-icon="inline-start" />
              {t.download}
            </ScrollLink>
            <a
              href={links.waitlist("Rs Ecosystem")}
              className={cn(buttonClass({ variant: "ghost", size: "lg" }), "border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground")}
            >
              {t.waitlist}
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
