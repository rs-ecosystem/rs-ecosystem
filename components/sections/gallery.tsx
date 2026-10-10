"use client"

import Image from "next/image"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { fill } from "@/lib/i18n"

import { ExpandHint, type PreviewApp, PreviewTrigger, usePreviewStrings } from "./preview-lightbox"

/** Store preview per app: the Mac banner, six phone screenshots and the store banners; each opens the lightbox. */
export function Gallery({ apps, heading }: { apps: PreviewApp[]; heading: React.ReactNode }) {
  const t = usePreviewStrings()
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
          <PreviewTrigger
            slug={app.slug}
            index={0}
            label={fill(t.enlargeItem, { title: fill(t.forMac, { app: app.name }) })}
            className="relative overflow-hidden rounded-2xl border bg-sidebar shadow-xs focus-visible:ring-3 focus-visible:ring-ring/50 md:rounded-[20px]"
          >
            <Image
              src={app.gallery.mac.src}
              alt={app.gallery.mac.alt}
              width={2880}
              height={1800}
              sizes="(min-width: 1248px) 1200px, 100vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <ExpandHint label={t.enlarge} />
          </PreviewTrigger>

          <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
            {app.gallery.screens.map((shot, i) => (
              <li key={shot.src} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
                <PreviewTrigger slug={app.slug} index={i + 1} label={fill(t.enlargeItem, { title: shot.title })} className="block w-full">
                  <span className="relative block overflow-hidden rounded-xl border bg-sidebar shadow-xs transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-focus-visible:ring-3 group-focus-visible:ring-ring/50">
                    <Image
                      src={shot.src}
                      alt={`${app.name}: ${shot.title}`}
                      width={1080}
                      height={2400}
                      sizes="(min-width: 768px) 200px, 45vw"
                      className="h-auto w-full"
                    />
                  </span>
                </PreviewTrigger>
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
              <PreviewTrigger
                key={banner.src}
                slug={app.slug}
                index={index}
                label={fill(t.enlargeItem, { title: banner.alt })}
                className="relative overflow-hidden rounded-2xl border bg-sidebar shadow-xs focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  width={w}
                  height={h}
                  sizes="(min-width: 768px) 640px, 100vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <ExpandHint label={t.enlarge} />
              </PreviewTrigger>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
