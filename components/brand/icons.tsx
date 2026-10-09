import type { SVGProps } from "react"

import { cn } from "@/lib/utils"

import { RsMark } from "./rs-mark"

// Brand icons that lucide-react 1.x no longer ships, drawn in Lucide's stroke style (ISC).
function Stroke({ className, children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    >
      {children}
    </svg>
  )
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Stroke {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </Stroke>
  )
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Stroke {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </Stroke>
  )
}

export function ChromeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="15.99" />
    </Stroke>
  )
}

/** App icon tile: the Rs mark on #262626 (as in the app icons), with an optional wordmark. */
export function AppIcon({ size = 40, word, className }: { size?: number; word?: string; className?: string }) {
  return (
    <span
      className={cn("inline-flex shrink-0 flex-col items-center justify-center bg-[#262626] text-[#F5F5F5] dark:ring-1 dark:ring-white/10", className)}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.23), gap: Math.round(size * 0.04) }}
    >
      <RsMark style={{ width: Math.round(size * (word ? 0.5 : 0.62)) }} />
      {word && (
        <span className="leading-none font-semibold" style={{ fontSize: Math.max(7, Math.round(size * 0.16)) }}>
          {word}
        </span>
      )}
    </span>
  )
}
