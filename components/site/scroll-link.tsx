"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, type ComponentProps, type MouseEvent } from "react"

/** "/#aplikasi" or "#aplikasi" → "aplikasi"; anything else → null. */
export function hashTarget(href: string): string | null {
  const m = /^\/?#(.+)$/.exec(href)
  return m ? decodeURIComponent(m[1]) : null
}

function navOffset() {
  return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
}

/**
 * Scrolls to a section (the html `scroll-padding-top` keeps it clear of the
 * sticky navbar). After a smooth scroll it checks the landing spot once and
 * corrects it, in case something above changed height on the way.
 */
let cancelSettle: (() => void) | null = null

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth"): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  cancelSettle?.()
  cancelSettle = null
  el.scrollIntoView({ behavior, block: "start" })
  if (behavior !== "smooth") return true

  // Correct only once the scroll has really stopped: a fixed timeout can fire
  // mid-way through a long smooth scroll, and the rest of it then overshoots.
  const settle = () => {
    cancelSettle?.()
    cancelSettle = null
    if (Math.abs(el.getBoundingClientRect().top - navOffset()) > 4) el.scrollIntoView({ behavior: "instant", block: "start" })
  }
  const w: Window = window // not narrowed by the `in` check below
  if ("onscrollend" in w) {
    w.addEventListener("scrollend", settle, { once: true })
    cancelSettle = () => w.removeEventListener("scrollend", settle)
  } else {
    let timer = 0
    const onScroll = () => {
      clearTimeout(timer)
      timer = window.setTimeout(settle, 150)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    cancelSettle = () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", onScroll)
    }
  }
  return true
}

function isPlainLeftClick(e: MouseEvent) {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
}

/**
 * Link that scrolls reliably to "/#section" targets on the home page, also
 * when the same link is clicked twice (no hash change, so no native scroll).
 * "/" scrolls back to the top. Other hrefs, or any link on another page,
 * behave like a normal Link.
 */
export function ScrollLink({ href, onClick, scroll, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname()
  // From another page, Next.js would scroll to the top after navigating and
  // undo HashScroller's work, so leave the scrolling to HashScroller.
  const crossPageHash = pathname !== "/" && hashTarget(href) !== null
  return (
    <Link
      href={href}
      scroll={crossPageHash ? false : scroll}
      {...props}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || pathname !== "/" || !isPlainLeftClick(e)) return
        if (href === "/") {
          // Logo on the home page: back to the top.
          e.preventDefault()
          if (window.location.hash) window.history.pushState(null, "", "/")
          window.scrollTo({ top: 0, behavior: "smooth" })
          return
        }
        const id = hashTarget(href)
        if (!id) return
        e.preventDefault()
        if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`)
        scrollToSection(id)
      }}
    />
  )
}

/**
 * Arriving at "/#section" from another page: wait until the section is in the
 * DOM and visible (it may stream in, and a previously visited page is kept
 * hidden until it is revealed), then scroll to it.
 */
export function HashScroller() {
  const pathname = usePathname()
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    // Polls with setTimeout rather than requestAnimationFrame, which never
    // fires while the tab is in the background.
    let timer = 0
    let tries = 0
    const tick = () => {
      const el = document.getElementById(id)
      if (el && el.getClientRects().length > 0) {
        el.scrollIntoView({ behavior: "instant", block: "start" })
        return
      }
      if (++tries < 60) timer = window.setTimeout(tick, 50)
    }
    timer = window.setTimeout(tick, 0)
    return () => clearTimeout(timer)
  }, [pathname])
  return null
}
