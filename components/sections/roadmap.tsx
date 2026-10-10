import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Container, SectionHeading } from "@/components/site/layout"
import { Badge } from "@/components/ui/badge"
import { buttonClass } from "@/lib/button-class"
import { Progress } from "@/components/ui/progress"
import { getSite, type RoadmapItem } from "@/content/site"
import { getUi, type Ui } from "@/content/ui"
import { resolveRoadmap, type RoadmapEntry } from "@/lib/apps"
import { fill, localeHref } from "@/lib/i18n"
import { getLocale } from "@/lib/locale"
import { cn } from "@/lib/utils"

const badgeVariant = { done: "default", active: "secondary", next: "outline", planned: "outline" } as const

function Dot({ status }: { status: RoadmapItem["status"] }) {
  return (
    <span
      className={cn(
        "size-3 shrink-0 rounded-full",
        status === "done" && "bg-success",
        status === "active" && "bg-chart-1",
        (status === "next" || status === "planned") && "border-2 border-ring bg-background"
      )}
    />
  )
}

function Body({ item, t }: { item: RoadmapEntry; t: Ui["roadmap"] }) {
  return (
    <>
      <div className="flex items-center gap-2 md:justify-between">
        <span className="text-xs font-semibold text-muted-foreground md:text-[13px]">{item.when}</span>
        <Badge variant={badgeVariant[item.status]}>{t.status[item.status]}</Badge>
      </div>
      <h3 className="text-[15px] font-semibold md:text-[17px]">{item.title}</h3>
      <p className="text-[13px] leading-relaxed text-muted-foreground md:text-sm">{item.body}</p>
      {item.progress && (
        <div className="flex flex-col gap-1.5 pt-1">
          <Progress value={Math.round((item.progress.done / item.progress.total) * 100)} aria-label={fill(t.progressOf, { title: item.title })} />
          <span className="text-xs text-muted-foreground">{fill(t.progress, { done: item.progress.done, total: item.progress.total })}</span>
        </div>
      )}
    </>
  )
}

export async function Roadmap() {
  const lang = await getLocale()
  const t = getUi(lang).roadmap
  const items = await resolveRoadmap(getSite(lang).roadmap, lang)
  return (
    <section id="roadmap" className="border-b bg-sidebar py-14 md:py-28">
      <Container className="flex flex-col gap-6 md:gap-14">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading kicker={t.kicker} title={t.title}>
            <span className="max-md:hidden">{t.body}</span>
          </SectionHeading>
          <Link href={localeHref(lang, "/changelog")} className={cn(buttonClass({ variant: "outline" }), "w-fit max-md:hidden")}>
            {t.changelog}
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </div>

        {/* Phones: vertical timeline. */}
        <ol className="flex flex-col md:hidden">
          {items.map((item, i) => (
            <li key={item.title} className="flex gap-3.5">
              <div className="flex w-3 flex-col items-center">
                <Dot status={item.status} />
                {i < items.length - 1 && <span className={cn("w-0.5 flex-1", item.status === "done" ? "bg-success" : "bg-border")} />}
              </div>
              <div className="-mt-1 flex flex-1 flex-col gap-1 pb-6">
                <Body item={item} t={t} />
              </div>
            </li>
          ))}
        </ol>

        {/* Tablet & desktop: four columns with a rail on top. */}
        <ol className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Dot status={item.status} />
                <span className={cn("h-0.5 flex-1 rounded-full", item.status === "done" ? "bg-success" : "bg-border")} />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 rounded-2xl border bg-card p-6">
                <Body item={item} t={t} />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
