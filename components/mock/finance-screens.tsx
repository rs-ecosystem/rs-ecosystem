// Rs Finance screens for the phone mockups, rebuilt from the Penpot assets
// "Asset · Rs Finance · Beranda / Laporan" at 390×844. Decorative only.
import {
  ArrowDownLeftIcon,
  ArrowLeftRightIcon,
  ArrowUpRightIcon,
  BanknoteIcon,
  CarIcon,
  ChartPieIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  HouseIcon,
  LandmarkIcon,
  PlusIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  UtensilsIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { Card, Frame, IconButton, type Tab } from "./screen-kit"

const tabs: Tab[] = [
  ["Beranda", HouseIcon],
  ["Transaksi", ArrowLeftRightIcon],
  ["", PlusIcon],
  ["Laporan", ChartPieIcon],
  ["Akun", WalletIcon],
]

function Round({ icon: Icon, size = 36 }: { icon: LucideIcon; size?: number }) {
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full bg-muted" style={{ width: size, height: size }}>
      <Icon className="size-4" />
    </span>
  )
}

export function FinanceBeranda() {
  return (
    <Frame label="Layar Beranda di Rs Finance" tabs={tabs} tab="Beranda">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Kamis, 2 Oktober 2026</span>
          <span className="text-2xl leading-tight font-semibold">Beranda</span>
        </div>
        <IconButton icon={SettingsIcon} />
      </div>
      <Card className="flex flex-col gap-3.5 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total saldo</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">3 akun aktif</span>
        </div>
        <span className="text-[30px] leading-tight font-semibold">Rp12.450.000</span>
        <div className="h-px bg-border" />
        <div className="flex gap-4">
          {[
            [ArrowDownLeftIcon, "Pemasukan Okt", "+Rp8.500.000", true],
            [ArrowUpRightIcon, "Pengeluaran Okt", "Rp3.215.000", false],
          ].map(([Icon, label, value, positive]) => {
            const I = Icon as LucideIcon
            return (
              <div key={label as string} className="flex flex-1 flex-col gap-1">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <I className={cn("size-4", positive && "text-success")} />
                  {label as string}
                </span>
                <span className={cn("text-base font-semibold", positive && "text-success")}>{value as string}</span>
              </div>
            )
          })}
        </div>
      </Card>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Akun</span>
        <span className="text-[13px] font-medium">Lihat semua</span>
      </div>
      <div className="-mr-4 flex gap-3 overflow-hidden">
        {[
          [LandmarkIcon, "Rekening", "Bank · 7890", "Rp9.200.000"],
          [WalletIcon, "Dompet digital", "E-Wallet · 0812", "Rp1.250.000"],
          [CreditCardIcon, "Kartu e-money", "E-Money · 1234", "Rp2.000.000"],
        ].map(([Icon, name, sub, value]) => (
          <Card key={name as string} className="flex w-[150px] shrink-0 flex-col gap-2.5 p-3.5">
            <Round icon={Icon as LucideIcon} size={32} />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{name as string}</span>
              <span className="text-xs text-muted-foreground">{sub as string}</span>
            </div>
            <span className="text-sm font-semibold">{value as string}</span>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Transaksi terbaru</span>
        <span className="text-[13px] font-medium">Lihat semua</span>
      </div>
      <div className="flex flex-col gap-1">
        {[
          [UtensilsIcon, "Makan & Minum", "E-Wallet · Hari ini, 12:30", "−Rp45.000", false],
          [CarIcon, "Transportasi", "Rekening · Hari ini, 08:15", "−Rp25.000", false],
          [BanknoteIcon, "Gaji", "Rekening · 1 Okt", "+Rp8.500.000", true],
        ].map(([Icon, name, sub, value, positive]) => (
          <div key={name as string} className="flex items-center gap-3 py-2">
            <Round icon={Icon as LucideIcon} />
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium">{name as string}</span>
              <span className="text-xs text-muted-foreground">{sub as string}</span>
            </div>
            <span className={cn("text-sm font-semibold", positive ? "text-success" : undefined)}>{value as string}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

const bars = [100, 36, 12, 24, 8, 64, 18, 26, 10, 20, 46, 10, 16, 28, 8, 92, 18, 16, 26, 10, 34, 20, 14, 28, 10, 60, 18, 12, 26, 16]
const categories: [string, number, string][] = [
  ["Makan & Minum", 38, "bg-chart-1"],
  ["Tagihan", 22, "bg-chart-2"],
  ["Transportasi", 16, "bg-chart-3"],
  ["Belanja", 14, "bg-chart-4"],
  ["Lainnya", 10, "bg-chart-5"],
]

export function FinanceLaporan() {
  return (
    <Frame label="Layar Laporan di Rs Finance" tabs={tabs} tab="Laporan">
      <div className="-mb-1 flex items-center justify-between">
        <span className="text-2xl font-semibold">Laporan</span>
        <IconButton icon={SlidersHorizontalIcon} />
      </div>
      <div className="flex h-8 rounded-[10px] bg-muted p-[3px] text-sm font-medium">
        {["Minggu", "Bulan", "Tahun", "Custom"].map((t) => (
          <span key={t} className={cn("flex flex-1 items-center justify-center rounded-lg", t === "Bulan" ? "bg-background shadow-sm" : "text-foreground/60")}>
            {t}
          </span>
        ))}
      </div>
      <div className="-my-1 flex items-center justify-between">
        <IconButton icon={ChevronLeftIcon} />
        <span className="text-base font-semibold">September 2026</span>
        <IconButton icon={ChevronRightIcon} />
      </div>
      <Card className="flex gap-2 p-4">
        {[
          ["Pemasukan", "+Rp8,5 jt", "▲ 12% vs Agu", true],
          ["Pengeluaran", "Rp3,2 jt", "▼ 8% vs Agu", false],
          ["Selisih", "+Rp5,3 jt", "▲ 21% vs Agu", true],
        ].map(([label, value, delta, positive]) => (
          <div key={label as string} className="flex flex-1 flex-col gap-1">
            <span className="text-xs text-muted-foreground">{label as string}</span>
            <span className={cn("text-base font-semibold", positive && "text-success")}>{value as string}</span>
            <span className="text-[11px] text-muted-foreground">{delta as string}</span>
          </div>
        ))}
      </Card>
      <Card className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Per hari</span>
          <span className="flex gap-2.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="size-2 rounded-[2px] bg-success" />Masuk</span>
            <span className="flex items-center gap-1"><span className="size-2 rounded-[2px] bg-foreground" />Keluar</span>
          </span>
        </div>
        <div className="flex h-[110px] items-end justify-between">
          {bars.map((h, i) => (
            <span key={i} className={cn("w-[5px] rounded-[1px]", i === 0 || i === 14 ? "bg-success" : "bg-foreground")} style={{ height: Math.max(4, Math.round(h * 1.05)) }} />
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-muted-foreground">
          {["1", "8", "15", "22", "30"].map((d) => <span key={d}>{d}</span>)}
        </div>
      </Card>
      <Card className="flex flex-col gap-3 p-4">
        <span className="text-sm font-semibold">Pengeluaran per kategori</span>
        <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full">
          {categories.map(([name, pct, color]) => <span key={name} className={color} style={{ width: `${pct}%` }} />)}
        </div>
        {categories.map(([name, pct, color]) => (
          <div key={name} className="flex items-center gap-2 text-[13px]">
            <span className={cn("size-2.5 rounded-[3px]", color)} />
            <span className="flex-1">{name}</span>
            <span className="font-semibold">{pct}%</span>
          </div>
        ))}
      </Card>
    </Frame>
  )
}
