// Rs Password screens for the phone mockups, after the Penpot wireframes
// "Brankas" and "Kode 2FA", with generic sample data (no third-party brands).
import {
  CopyIcon,
  CreditCardIcon,
  DicesIcon,
  FileIcon,
  FolderIcon,
  IdCardIcon,
  LockIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
  VaultIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Frame, IconButton, type Tab } from "./screen-kit"

const tabs: Tab[] = [
  ["Brankas", VaultIcon],
  ["Kode 2FA", ShieldCheckIcon],
  ["", PlusIcon],
  ["Generator", DicesIcon],
  ["Pengaturan", SettingsIcon],
]

function Header({ kicker, title, actions }: { kicker: string; title: string; actions: LucideIcon[] }) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground">{kicker}</span>
        <span className="text-2xl leading-tight font-semibold">{title}</span>
      </div>
      <div className="flex gap-2 pb-0.5">
        {actions.map((Icon, i) => (
          <IconButton key={i} icon={Icon} />
        ))}
      </div>
    </div>
  )
}

function Search({ placeholder }: { placeholder: string }) {
  return (
    <div className="-mt-1 flex h-9 items-center gap-2 rounded-[10px] border px-3 text-sm text-muted-foreground">
      <SearchIcon className="size-4" />
      {placeholder}
    </div>
  )
}

function Tile({ letter, icon: Icon }: { letter?: string; icon?: LucideIcon }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-muted text-base font-semibold">
      {Icon ? <Icon className="size-5" /> : letter}
    </span>
  )
}

type Item = { title: string; sub: string; letter?: string; icon?: LucideIcon; badges?: string[] }

function Group({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-col rounded-xl border bg-card">
      {items.map((it, i) => (
        <div key={it.title} className="flex items-center gap-3 py-2.5 pr-3.5 pl-3.5">
          <Tile letter={it.letter} icon={it.icon} />
          <div className={cn("flex flex-1 flex-col gap-0.5", i > 0 && "-mt-2.5 border-t pt-2.5")}>
            <span className="text-sm font-medium">{it.title}</span>
            <span className="text-xs text-muted-foreground">{it.sub}</span>
          </div>
          {it.badges?.map((b) => (
            <span key={b} className="rounded-full border px-2 py-0.5 text-xs font-medium">
              {b}
            </span>
          ))}
          <CopyIcon className="size-4 text-muted-foreground" />
        </div>
      ))}
    </div>
  )
}

function Caption({ left, right }: { left: string; right?: string }) {
  return (
    <div className="-mb-3 flex justify-between px-0.5 text-xs font-medium text-muted-foreground">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  )
}

export function PasswordBrankas() {
  return (
    <Frame label="Layar Brankas di Rs Password" tabs={tabs} tab="Brankas">
      <Header kicker="128 item" title="Brankas" actions={[RefreshCwIcon, FolderIcon, LockIcon]} />
      <Search placeholder="Cari di brankas" />
      <div className="-mr-4 -mb-1 flex gap-2 overflow-hidden">
        {["Semua", "Login", "Kartu", "Catatan", "Identitas", "Passkey"].map((c, i) => (
          <span key={c} className={cn("flex h-8 shrink-0 items-center rounded-full px-3 text-[13px] font-medium", i === 0 ? "bg-primary text-primary-foreground" : "border")}>
            {c}
          </span>
        ))}
      </div>
      <Caption left="Favorit" />
      <Group
        items={[
          { title: "Email pribadi", sub: "andi.pratama@contoh.id", letter: "E" },
          { title: "Mobile banking", sub: "andipratama", letter: "M" },
        ]}
      />
      <Caption left="Semua item" right="A–Z" />
      <Group
        items={[
          { title: "Kartu debit", sub: "Kartu · •••• 4821", icon: CreditCardIcon },
          { title: "Akun kerja", sub: "andipratama", letter: "A", badges: ["2FA", "Passkey"] },
          { title: "KTP", sub: "Identitas · Andi Pratama", icon: IdCardIcon },
          { title: "Wi-Fi rumah", sub: "Catatan aman", icon: FileIcon },
        ]}
      />
    </Frame>
  )
}

const codes: { name: string; account: string; code: string; sec: number; next?: string }[] = [
  { name: "Akun kerja", account: "andipratama", code: "482 913", sec: 18 },
  { name: "Email pribadi", account: "andi.pratama", code: "071 655", sec: 18 },
  { name: "Toko online", account: "andi", code: "993 120", sec: 4, next: "556 038" },
  { name: "Investasi", account: "andi.p", code: "310 447", sec: 18 },
]

export function PasswordKode2fa() {
  return (
    <Frame label="Layar Kode 2FA di Rs Password" tabs={tabs} tab="Kode 2FA">
      <Header kicker="4 akun" title="Kode 2FA" actions={[PlusIcon]} />
      <Search placeholder="Cari akun" />
      <div className="flex flex-col rounded-xl border bg-card">
        {codes.map((c, i) => {
          const low = c.sec <= 5
          return (
            <div key={c.name} className="flex items-center gap-3 py-3 pr-3.5 pl-3.5">
              <Tile letter={c.name[0]} />
              <div className={cn("flex flex-1 flex-col gap-0.5", i > 0 && "-mt-3 border-t pt-3")}>
                <span className="flex gap-1.5 text-[13px]">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.account}</span>
                </span>
                <span className={cn("text-2xl leading-tight font-semibold tracking-[0.08em]", low && "text-destructive")}>{c.code}</span>
                {c.next && <span className="text-xs text-muted-foreground">Berikutnya {c.next}</span>}
              </div>
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-[2.5px] text-[11px] font-semibold",
                  low ? "border-destructive text-destructive" : "border-success"
                )}
              >
                {c.sec}
              </span>
              <CopyIcon className="size-4 text-muted-foreground" />
            </div>
          )
        })}
      </div>
      <p className="-mt-1 text-center text-xs text-muted-foreground">Ketuk kode untuk menyalin. Kode berganti setiap 30 detik.</p>
    </Frame>
  )
}
