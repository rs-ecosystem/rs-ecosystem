"use client"

import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon, XIcon } from "lucide-react"
import Image from "next/image"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react"

import { AppIcon } from "@/components/brand/icons"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { LiveApp } from "@/content/apps"
import type { Ui } from "@/content/ui"
import { fill } from "@/lib/i18n"
import { cn } from "@/lib/utils"

export type PreviewApp = { slug: string; name: string; iconWord?: string; gallery: LiveApp["gallery"] }
type Shot = { src: string; title: string; width: number; height: number }
export type PreviewStrings = Ui["preview"]

// Lightbox order: Mac banner (0), phone screenshots (1–6), store hero (7), feature graphic (8).
export function shotsOf(app: PreviewApp, t: PreviewStrings): Shot[] {
  const { mac, screens, banners } = app.gallery
  return [
    { src: mac.src, title: fill(t.forMac, { app: app.name }), width: 2880, height: 1800 },
    ...screens.map((s) => ({ ...s, width: 1080, height: 2400 })),
    { src: banners.hero.src, title: t.banner, width: 1920, height: 1080 },
    { src: banners.feature.src, title: t.featureGraphic, width: 1024, height: 500 },
  ]
}

const PreviewContext = createContext<{ open: (slug: string, index: number) => void; t: PreviewStrings } | null>(null)

function usePreviewContext() {
  const ctx = useContext(PreviewContext)
  if (!ctx) throw new Error("PreviewTrigger / Gallery need a PreviewProvider")
  return ctx
}

/** Opens an app's store preview in the shared lightbox at `index` (see `shotsOf`). */
export const useOpenPreview = () => usePreviewContext().open

/** The lightbox strings in the page's language. */
export const usePreviewStrings = () => usePreviewContext().t

type State = { app: PreviewApp; index: number; dir: 1 | -1 }

/** One lightbox for the whole page, so both the app cards and the Preview section can open it. */
export function PreviewProvider({ apps, strings, children }: { apps: PreviewApp[]; strings: PreviewStrings; children: ReactNode }) {
  const [state, setState] = useState<State | null>(null)

  const openPreview = useCallback(
    (slug: string, index: number) => {
      const app = apps.find((a) => a.slug === slug)
      if (app) setState({ app, index: Math.min(Math.max(index, 0), shotsOf(app, strings).length - 1), dir: 1 })
    },
    [apps, strings]
  )
  const value = useMemo(() => ({ open: openPreview, t: strings }), [openPreview, strings])

  return (
    <PreviewContext.Provider value={value}>
      {children}
      <Dialog open={state !== null} onOpenChange={(o) => !o && setState(null)}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/85 supports-backdrop-filter:backdrop-blur-md"
          className="top-0 left-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none bg-transparent p-0 text-white ring-0 sm:max-w-none"
        >
          {state && <Carousel state={state} setState={setState} t={strings} />}
        </DialogContent>
      </Dialog>
    </PreviewContext.Provider>
  )
}

function Carousel({ state, setState, t }: { state: State; setState: (fn: (s: State | null) => State | null) => void; t: PreviewStrings }) {
  const { app, index, dir } = state
  const shots = shotsOf(app, t)
  const current = shots[index]
  const go = useCallback(
    (to: number) => setState((s) => (s ? { ...s, index: (to + shots.length) % shots.length, dir: to >= s.index ? 1 : -1 } : s)),
    [setState, shots.length]
  )
  const step = (delta: 1 | -1) => setState((s) => (s ? { ...s, index: (s.index + delta + shots.length) % shots.length, dir: delta } : s))

  // Keep the active thumbnail in view.
  const strip = useRef<HTMLDivElement>(null)
  useEffect(() => {
    strip.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [index])

  // Swipe on touch screens.
  const startX = useRef<number | null>(null)

  return (
    <div
      className="flex h-full flex-col outline-none"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1)
        if (e.key === "ArrowLeft") step(-1)
      }}
    >
      <header className="flex h-16 shrink-0 items-center gap-3 px-4 md:px-6">
        <AppIcon size={32} word={app.iconWord} className="ring-1 ring-white/15" />
        <div className="flex min-w-0 flex-1 flex-col">
          <DialogTitle className="truncate text-sm font-semibold text-white">{app.name}</DialogTitle>
          <DialogDescription className="truncate text-xs text-white/60">
            {current.title} · {fill(t.position, { i: index + 1, n: shots.length })}
          </DialogDescription>
        </div>
        <DialogClose
          aria-label={t.close}
          className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/40 focus-visible:outline-none"
        >
          <XIcon className="size-4" />
        </DialogClose>
      </header>

      <div
        className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-4 md:px-20"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return
          const dx = e.clientX - startX.current
          startX.current = null
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
        }}
      >
        <div
          key={current.src}
          className={cn(
            "relative animate-in overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 shadow-black/40 ring-white/10 duration-300 fade-in-0 zoom-in-98",
            dir === 1 ? "slide-in-from-right-8" : "slide-in-from-left-8"
          )}
          // As large as fits: limited by the stage width and by the height left for the header and thumbnails.
          style={{ aspectRatio: `${current.width} / ${current.height}`, width: `min(100%, calc((100dvh - 13.5rem) * ${current.width / current.height}))` } as CSSProperties}
        >
          <Image src={current.src} alt={current.title} fill sizes="(min-width: 768px) 80vw, 100vw" className="object-cover" draggable={false} loading="eager" />
        </div>
        {/* Warm the cache for the neighbours so stepping feels instant. */}
        <div className="hidden">
          {[shots[(index + 1) % shots.length], shots[(index - 1 + shots.length) % shots.length]].map((s) => (
            <Image key={s.src} src={s.src} alt="" width={s.width} height={s.height} sizes="80vw" loading="eager" />
          ))}
        </div>

        <NavButton side="left" label={t.previous} onClick={() => step(-1)} />
        <NavButton side="right" label={t.next} onClick={() => step(1)} />
      </div>

      <div ref={strip} className="flex h-[6.5rem] shrink-0 items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center md:gap-2.5">
        {shots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            data-index={i}
            aria-label={fill(t.show, { title: s.title })}
            aria-current={i === index}
            onClick={() => go(i)}
            className={cn(
              "relative h-14 shrink-0 overflow-hidden rounded-lg ring-1 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none md:h-16",
              i === index ? "opacity-100 ring-2 ring-white" : "opacity-45 ring-white/15 hover:opacity-80"
            )}
            style={{ aspectRatio: `${s.width} / ${s.height}` }}
          >
            <Image src={s.src} alt="" fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

function NavButton({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeftIcon : ChevronRightIcon
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/40 focus-visible:outline-none sm:flex",
        side === "left" ? "left-3 md:left-6" : "right-3 md:right-6"
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}

/** A button around any content (e.g. a server-rendered phone mockup) that opens the preview. */
export function PreviewTrigger({
  slug,
  index,
  label,
  className,
  children,
}: {
  slug: string
  index: number
  label: string
  className?: string
  children: ReactNode
}) {
  const openPreview = useOpenPreview()
  return (
    <button type="button" aria-label={label} onClick={() => openPreview(slug, index)} className={cn("group cursor-zoom-in outline-none", className)}>
      {children}
    </button>
  )
}

export function ExpandHint({ label }: { label: string }) {
  return (
    <span className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full border bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-xs backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
      <ExpandIcon className="size-3.5" />
      {label}
    </span>
  )
}
