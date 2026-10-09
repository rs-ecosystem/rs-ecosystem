"use client"

import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { LiveApp } from "@/content/apps"
import { cn } from "@/lib/utils"

type Shot = { src: string; title: string; width: number; height: number }
export type GalleryApp = { slug: string; name: string; gallery: LiveApp["gallery"] }

// Lightbox order: Mac banner (0), phone screenshots (1–6), store hero (7), feature graphic (8).
function shotsOf(app: GalleryApp): Shot[] {
  const { mac, screens, banners } = app.gallery
  return [
    { src: mac.src, title: `${app.name} untuk Mac`, width: 2880, height: 1800 },
    ...screens.map((s) => ({ ...s, width: 1080, height: 2400 })),
    { src: banners.hero.src, title: `${app.name} · banner`, width: 1920, height: 1080 },
    { src: banners.feature.src, title: `${app.name} · feature graphic`, width: 1024, height: 500 },
  ]
}

/** Store preview per app: the Mac banner, six phone screenshots, the store banners, and a lightbox. */
export function Gallery({ apps, heading }: { apps: GalleryApp[]; heading: React.ReactNode }) {
  const [open, setOpen] = useState<{ app: GalleryApp; index: number } | null>(null)
  const shots = open ? shotsOf(open.app) : []
  const current = open ? shots[open.index] : null

  const step = useCallback(
    (delta: number) => setOpen((o) => (o ? { ...o, index: (o.index + delta + shotsOf(o.app).length) % shotsOf(o.app).length } : o)),
    []
  )

  return (
    <Tabs defaultValue={apps[0].slug} className="gap-8 md:gap-10">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        {heading}
        <TabsList className="w-full shrink-0 md:w-auto">
          {apps.map((app) => (
            <TabsTrigger key={app.slug} value={app.slug} className="px-4">
              {app.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {apps.map((app) => (
        <TabsContent key={app.slug} value={app.slug} className="flex flex-col gap-6 md:gap-8">
          <button
            type="button"
            onClick={() => setOpen({ app, index: 0 })}
            className="group relative overflow-hidden rounded-2xl border bg-sidebar shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:rounded-[20px]"
          >
            <Image
              src={app.gallery.mac.src}
              alt={app.gallery.mac.alt}
              width={2880}
              height={1800}
              sizes="(min-width: 1248px) 1200px, 100vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <ExpandHint />
          </button>

          <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
            {app.gallery.screens.map((shot, i) => (
              <li key={shot.src} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
                <button
                  type="button"
                  onClick={() => setOpen({ app, index: i + 1 })}
                  aria-label={`Perbesar: ${shot.title}`}
                  className="group block w-full outline-none"
                >
                  <span className="relative block overflow-hidden rounded-xl border bg-sidebar shadow-xs transition-shadow group-hover:shadow-md group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
                    <Image
                      src={shot.src}
                      alt={`${app.name}: ${shot.title}`}
                      width={1080}
                      height={2400}
                      sizes="(min-width: 768px) 200px, 45vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Column widths in the ratio 16/9 : 1024/500, so both banners end up the same height. */}
          <div className="grid gap-4 md:grid-cols-[0.868fr_1fr] md:gap-6">
            {(
              [
                [app.gallery.banners.hero, 1920, 1080, 7],
                [app.gallery.banners.feature, 1024, 500, 8],
              ] as const
            ).map(([banner, w, h, index]) => (
              <button
                key={banner.src}
                type="button"
                onClick={() => setOpen({ app, index })}
                className="group relative overflow-hidden rounded-2xl border bg-sidebar shadow-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  width={w}
                  height={h}
                  sizes="(min-width: 768px) 640px, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <ExpandHint />
              </button>
            ))}
          </div>
        </TabsContent>
      ))}

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          overlayClassName="bg-black/80 supports-backdrop-filter:backdrop-blur-sm"
          className={cn(
            "gap-3 bg-transparent p-0 ring-0 sm:max-w-none",
            current && current.width > current.height ? "w-[min(94vw,1280px)] max-w-[94vw]" : "w-auto max-w-[94vw]"
          )}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1)
            if (e.key === "ArrowLeft") step(-1)
          }}
        >
          {open && current && (
            <>
              <DialogTitle className="sr-only">{current.title}</DialogTitle>
              <DialogDescription className="sr-only">
                Gambar {open.index + 1} dari {shots.length}. Gunakan tombol panah untuk berpindah.
              </DialogDescription>
              <Image
                key={current.src}
                src={current.src}
                alt={current.title}
                width={current.width}
                height={current.height}
                sizes={current.width > current.height ? "94vw" : "50vh"}
                className={cn("mx-auto rounded-2xl", current.width > current.height ? "h-auto max-h-[82vh] w-full object-contain" : "h-[min(82vh,900px)] w-auto")}
              />
              <div className="flex items-center justify-center gap-3">
                <Button variant="secondary" size="icon" aria-label="Sebelumnya" onClick={() => step(-1)}>
                  <ChevronLeftIcon />
                </Button>
                <span className="min-w-36 rounded-full bg-background/90 px-3 py-1 text-center text-[13px] font-medium text-foreground">
                  {current.title} · {open.index + 1}/{shots.length}
                </span>
                <Button variant="secondary" size="icon" aria-label="Berikutnya" onClick={() => step(1)}>
                  <ChevronRightIcon />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}

function ExpandHint() {
  return (
    <span className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full border bg-background/90 px-2.5 py-1 text-xs font-medium opacity-0 shadow-xs backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-md:opacity-100">
      <ExpandIcon className="size-3.5" />
      Perbesar
    </span>
  )
}
