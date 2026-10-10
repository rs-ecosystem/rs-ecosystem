"use client"

import { ChevronDownIcon, DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { buttonClass } from "@/lib/button-class"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { fill, type Locale } from "@/lib/i18n"
import { formatBytes } from "@/lib/release"

export type DownloadOption = { href: string; label: string; hint: string; size: number; primary: boolean }
export type DownloadStrings = { download: string; downloadFile: string; version: string; otherFiles: string }

/** "Download" button: one file goes straight to it, several open a menu (recommended files first). */
export function DownloadMenu({
  lang,
  strings: t,
  version,
  options,
  variant = "default",
  size = "default",
  className,
}: {
  lang: Locale
  strings: DownloadStrings
  version: string
  options: DownloadOption[]
  variant?: "default" | "secondary"
  size?: "default" | "lg"
  className?: string
}) {
  if (options.length === 1) {
    return (
      <a href={options[0].href} className={buttonClass({ variant, size, className })}>
        <DownloadIcon data-icon="inline-start" />
        {fill(t.downloadFile, { label: options[0].label })}
      </a>
    )
  }
  const main = options.filter((o) => o.primary)
  const more = options.filter((o) => !o.primary)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant={variant} size={size} className={className} />}>
        <DownloadIcon data-icon="inline-start" />
        {t.download}
        <ChevronDownIcon data-icon="inline-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{fill(t.version, { version })}</DropdownMenuLabel>
          {main.map((o) => (
            <Item key={o.href} option={o} lang={lang} />
          ))}
        </DropdownMenuGroup>
        {more.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t.otherFiles}</DropdownMenuLabel>
              {more.map((o) => (
                <Item key={o.href} option={o} lang={lang} />
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Item({ option, lang }: { option: DownloadOption; lang: Locale }) {
  return (
    <DropdownMenuItem render={<a href={option.href} />} className="flex-col items-start gap-0.5">
      <span className="flex w-full justify-between gap-2 font-medium">
        {option.label}
        <span className="font-normal text-muted-foreground">{formatBytes(option.size, lang)}</span>
      </span>
      <span className="text-xs text-muted-foreground">{option.hint}</span>
    </DropdownMenuItem>
  )
}
