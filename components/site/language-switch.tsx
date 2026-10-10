"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { locales, switchLocalePath, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

/** ID / EN toggle: the same page in the other language, keeping the section in view (#hash). */
export function LanguageSwitch({ lang, label, className }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div role="group" aria-label={label} className={cn("flex h-8 items-center rounded-lg bg-muted p-[3px] text-xs font-semibold", className)}>
      {locales.map((l) => {
        const active = l === lang
        return (
          <Link
            key={l}
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            lang={l}
            aria-current={active ? "true" : undefined}
            scroll={false}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
              e.preventDefault()
              if (active) return
              // Carry the current section over; HashScroller scrolls to it on the new page.
              router.push(switchLocalePath(pathname, l) + window.location.hash, { scroll: false })
            }}
            className={cn(
              "flex h-full min-w-8 items-center justify-center rounded-md px-2 uppercase transition-colors",
              active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {l}
          </Link>
        )
      })}
    </div>
  )
}
