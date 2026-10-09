"use client"

import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { buttonClass } from "@/lib/button-class"

import { hashTarget, scrollToSection } from "./scroll-link"

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
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
      <SheetTrigger render={<Button variant="outline" size="icon" aria-label="Buka menu" />}>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {[...items, { href: "/changelog", label: "Catatan perubahan" }].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // From another page HashScroller does the scrolling (see ScrollLink).
              scroll={!(pathname !== "/" && hashTarget(item.href))}
              onClick={(e) => {
                const id = hashTarget(item.href)
                if (id && pathname === "/") {
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
      </SheetContent>
    </Sheet>
  )
}
