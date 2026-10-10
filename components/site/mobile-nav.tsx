"use client"

import { MenuIcon, XIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { buttonClass } from "@/lib/button-class"
import type { Locale } from "@/lib/i18n"

import { LanguageSwitch } from "./language-switch"
import { hashTarget, isSamePageHash, scrollToSection } from "./scroll-link"

export function MobileNav({
  lang,
  items,
  strings,
}: {
  lang: Locale
  items: { href: string; label: string }[]
  strings: { menu: string; openMenu: string; close: string; language: string }
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  // The sheet locks page scroll and restores the old position when it closes,
  // which would cancel a scroll started on click. So scroll once it has closed.
  const pending = useRef<string | null>(null)

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (isOpen || !pending.current) return
        const id = pending.current
        pending.current = null
        scrollToSection(id)
      }}
    >
      <SheetTrigger render={<Button variant="outline" size="icon" aria-label={strings.openMenu} />}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-72" showCloseButton={false}>
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle>{strings.menu}</SheetTitle>
          <SheetClose render={<Button variant="ghost" size="icon-sm" aria-label={strings.close} />}>
            <XIcon />
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // A section on another page: HashScroller does the scrolling (see ScrollLink).
              scroll={!(hashTarget(item.href) && !isSamePageHash(item.href, pathname))}
              onClick={(e) => {
                if (isSamePageHash(item.href, pathname)) {
                  const { id } = hashTarget(item.href)!
                  e.preventDefault()
                  if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`)
                  pending.current = id
                }
                setOpen(false)
              }}
              className={buttonClass({ variant: "ghost", size: "lg", className: "justify-start text-base" })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex items-center justify-between border-t px-4 py-4">
          <span className="text-sm text-muted-foreground">{strings.language}</span>
          <LanguageSwitch lang={lang} label={strings.language} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
