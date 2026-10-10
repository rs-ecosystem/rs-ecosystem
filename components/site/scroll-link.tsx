"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, type ComponentProps, type MouseEvent } from "react"

/**
 * "/#aplikasi" → { path: "/", id: "aplikasi" }, "/en#aplikasi" → { path: "/en", … },
 * "#aplikasi" → { path: null (this page), … }; hrefs without a hash → null.
 */
export function hashTarget(href: string): { path: string | null; id: string } | null {
  const i = href.indexOf("#")
  if (i < 0 || i === href.length - 1 || /^(https?:|mailto:)/.test(href)) return null
  return { path: href.slice(0, i) || null, id: decodeURIComponent(href.slice(i + 1)) }
}

/** True when `href` points at a section of the page that is open now. */
export function isSamePageHash(href: string, pathname: string): boolean {
  const t = hashTarget(href)
  return t !== null && (t.path === null || t.path === pathname)
}

/**
 * The visible element with this id. Cache Components keeps recently visited
 * pages in the DOM, hidden (e.g. the other language after switching), so an id
 * can exist twice; `getElementById` could return the hidden copy.
 */
export function findSection(id: string): HTMLElement | null {
  const all = document.querySelectorAll<HTMLElement>(`[id="${CSS.escape(id)}"]`)
  return [...all].find((el) => el.getClientRects().length > 0) ?? null
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
  const el = findSection(id)
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
 * Link that scrolls reliably to a section of the page that is open now
 * ("/#section", "/en#section"), also when the same link is clicked twice (no
 * hash change, so no native scroll). A link to the open page itself ("/" on
 * the home page) scrolls back to the top. Other hrefs behave like a normal Link.
 */
export function ScrollLink({ href, onClick, scroll, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname()
  // A section on another page: Next.js would scroll to the top after
  // navigating and undo HashScroller's work, so leave the scrolling to HashScroller.
  const crossPageHash = hashTarget(href) !== null && !isSamePageHash(href, pathname)
  return (
    <Link
      href={href}
      scroll={crossPageHash ? false : scroll}
      {...props}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || !isPlainLeftClick(e)) return
        if (href === pathname) {
          // e.g. the logo on the home page: back to the top.
          e.preventDefault()
          if (window.location.hash) window.history.pushState(null, "", pathname)
          window.scrollTo({ top: 0, behavior: "smooth" })
          return
        }
        if (!isSamePageHash(href, pathname)) return
        const { id } = hashTarget(href)!
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
      const el = findSection(id)
      if (el) {
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
