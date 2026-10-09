// Shared pieces for the phone mockup screens (390×844, light theme). Decorative only.
import { PlusIcon, WifiIcon, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export type Tab = [label: string, icon: LucideIcon]

export function Frame({ label, tabs, tab, children }: { label: string; tabs: Tab[]; tab: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className="flex h-[844px] w-[390px] flex-col bg-background text-left text-foreground select-none">
      <div className="flex h-[54px] shrink-0 items-center justify-between pr-7 pl-8">
        <span className="text-base font-semibold">9:41</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold">
          <WifiIcon className="size-4" />
          100%
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden px-4 pt-2">{children}</div>
      <TabBar tabs={tabs} active={tab} />
    </div>
  )
}

/** Tab bar; an entry with an empty label is the round "+" button. */
function TabBar({ tabs, active }: { tabs: Tab[]; active: string }) {
  return (
    <div className="flex h-[84px] shrink-0 items-start justify-between border-t bg-background px-5 pt-2">
      {tabs.map(([label, Icon]) =>
        label ? (
          <span key={label} className={cn("flex w-16 flex-col items-center gap-1 pt-1 text-[11px] whitespace-nowrap", label === active ? "font-semibold" : "font-medium text-muted-foreground")}>
            <Icon className="size-6" strokeWidth={1.75} />
            {label}
          </span>
        ) : (
          <span key="add" className="flex size-[52px] items-center justify-center rounded-full bg-primary text-primary-foreground">
            <PlusIcon className="size-6" />
          </span>
        )
      )}
    </div>
  )
}

export function IconButton({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-8 items-center justify-center rounded-lg border bg-background">
      <Icon className="size-4" />
    </span>
  )
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-[14px] border bg-card", className)}>{children}</div>
}
