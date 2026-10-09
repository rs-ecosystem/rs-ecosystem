import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

import { FinanceBeranda, FinanceLaporan } from "./finance-screens"
import { PasswordBrankas, PasswordKode2fa } from "./password-screens"

export type ScreenName = "finance-beranda" | "finance-laporan" | "password-brankas" | "password-kode-2fa"

/**
 * Phone mockup drawn at its design size (414×868 bezel, 390×844 screen) and
 * scaled with `scale` (a number, or a CSS value such as a variable set per breakpoint).
 */
export function Phone({
  screen,
  scale = 1,
  className,
  style,
}: {
  screen: ScreenName
  scale?: number | string
  className?: string
  style?: CSSProperties
}) {
  const s = typeof scale === "number" ? String(scale) : scale
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ "--s": s, width: "calc(414px * var(--s))", height: "calc(868px * var(--s))", ...style } as CSSProperties}
    >
      <div
        className="absolute top-0 left-0 h-[868px] w-[414px] origin-top-left rounded-[58px] border-2 border-[#3A3A3C] bg-[#0B0B0C] shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
        style={{ transform: "scale(var(--s))" }}
      >
        <div className="theme-light absolute top-[10px] left-[10px] h-[844px] w-[390px] overflow-hidden rounded-[46px] bg-background">
          <Screen name={screen} />
        </div>
        <div className="absolute top-[21px] left-[145px] h-[34px] w-[120px] rounded-full bg-black" />
      </div>
    </div>
  )
}

function Screen({ name }: { name: ScreenName }): ReactNode {
  switch (name) {
    case "finance-beranda":
      return <FinanceBeranda />
    case "finance-laporan":
      return <FinanceLaporan />
    case "password-brankas":
      return <PasswordBrankas />
    case "password-kode-2fa":
      return <PasswordKode2fa />
  }
}
