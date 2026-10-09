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
import { formatBytes } from "@/lib/release"

export type DownloadOption = { href: string; label: string; hint: string; size: number; primary: boolean }

/** "Unduh" button: one file goes straight to it, several open a menu (recommended files first). */
export function DownloadMenu({
  version,
  options,
  variant = "default",
  size = "default",
  className,
}: {
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
        Unduh {options[0].label}
      </a>
    )
  }
  const main = options.filter((o) => o.primary)
  const more = options.filter((o) => !o.primary)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant={variant} size={size} className={className} />}>
        <DownloadIcon data-icon="inline-start" />
        Unduh
        <ChevronDownIcon data-icon="inline-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Versi {version}</DropdownMenuLabel>
          {main.map((o) => (
            <Item key={o.href} option={o} />
          ))}
        </DropdownMenuGroup>
        {more.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>File lain</DropdownMenuLabel>
              {more.map((o) => (
                <Item key={o.href} option={o} />
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Item({ option }: { option: DownloadOption }) {
  return (
    <DropdownMenuItem render={<a href={option.href} />} className="flex-col items-start gap-0.5">
      <span className="flex w-full justify-between gap-2 font-medium">
        {option.label}
        <span className="font-normal text-muted-foreground">{formatBytes(option.size)}</span>
      </span>
      <span className="text-xs text-muted-foreground">{option.hint}</span>
    </DropdownMenuItem>
  )
}
