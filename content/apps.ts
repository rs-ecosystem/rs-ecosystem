// The app catalog. Live apps are linked to their GitHub repo: the site reads
// the latest release (version, notes, downloads) and milestones from there and
// only falls back to `fallback` when GitHub can't be reached.
import {
  ActivityIcon,
  AlarmClockIcon,
  BedIcon,
  ClapperboardIcon,
  CloudUploadIcon,
  FilmIcon,
  FolderIcon,
  FootprintsIcon,
  HardDriveIcon,
  ImagesIcon,
  KanbanIcon,
  ListMusicIcon,
  ListTodoIcon,
  MusicIcon,
  NotebookPenIcon,
  NotebookTextIcon,
  UtensilsIcon,
  type LucideIcon,
} from "lucide-react"

import type { RepoRef } from "@/lib/github/client"
import type { Platform } from "@/lib/release"

export type LiveApp = {
  slug: string
  name: string
  tagline: string
  description: string
  features: string[]
  platforms: Platform[]
  /** Wordmark under the Rs mark in the app icon, e.g. "finance". */
  iconWord?: string
  /** Phone mockup on the app card. */
  screen: "finance-laporan" | "password-kode-2fa"
  tint: "green" | "blue"
  repo: RepoRef
  /** Shown when GitHub has no release yet or can't be reached. */
  fallback: { label: string; released: boolean }
  /** Store preview assets in public/store/<slug>/ (exported from Penpot "Store preview"). */
  gallery: {
    mac: { src: string; alt: string }
    /** Store hero (1920×1080) and Play Store feature graphic (1024×500). */
    banners: { hero: { src: string; alt: string }; feature: { src: string; alt: string } }
    screens: { src: string; title: string }[]
  }
}

const store = (slug: string, files: [file: string, title: string][]) =>
  files.map(([file, title]) => ({ src: `/store/${slug}/${file}.webp`, title }))

export type UpcomingApp = {
  slug: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  chips: { label: string; icon: LucideIcon }[]
}

export const liveApps: LiveApp[] = [
  {
    slug: "rs-finance",
    name: "Rs Finance",
    tagline: "Pencatat keuangan pribadi",
    description:
      "Catat uang masuk dan keluar tanpa ribet. Saldo, tagihan, dan laporan dihitung otomatis, tetap benar meski transaksi lama diubah.",
    features: [
      "Pengeluaran, pemasukan & transfer",
      "Kartu kredit & paylater",
      "Utang, piutang & pinjaman",
      "Laporan & grafik bulanan",
      "Riwayat bebas diubah",
      "Sembunyikan saldo & backup",
    ],
    platforms: ["android", "ios", "macos"],
    iconWord: "finance",
    screen: "finance-laporan",
    tint: "green",
    repo: { owner: "ihsanwahyudin", name: "rs-finance" },
    fallback: { label: "Beta", released: true },
    gallery: {
      mac: { src: "/store/rs-finance/mac.webp", alt: "Rs Finance di Mac: Beranda dengan saldo, dompet, dan transaksi terbaru, di samping Laporan di iPhone" },
      banners: {
        hero: { src: "/store/rs-finance/hero.webp", alt: "Rs Finance: semua uang Anda, tercatat rapi di satu app" },
        feature: { src: "/store/rs-finance/feature.webp", alt: "Rs Finance: pencatat keuangan pribadi yang offline" },
      },
      screens: store("rs-finance", [
        ["1-beranda", "Beranda"],
        ["2-form-transaksi", "Catat transaksi"],
        ["3-laporan", "Laporan"],
        ["4-kartu-kredit", "Kartu kredit"],
        ["5-utang-piutang", "Utang & piutang"],
        ["6-transaksi", "Transaksi"],
      ]),
    },
  },
  {
    slug: "rs-password",
    name: "Rs Password",
    tagline: "Pengelola password offline",
    description:
      "Satu brankas terenkripsi untuk login, kartu, kode 2FA, dan passkey. Isi otomatis di Android dan Chrome, sinkron lewat folder cloud milik Anda sendiri.",
    features: [
      "Login, kartu, catatan & identitas",
      "Kode 2FA & passkey",
      "Generator password & passphrase",
      "Cek password lemah & bocor",
      "Isi otomatis & ekstensi Chrome",
      "Sinkron lewat folder Anda",
    ],
    platforms: ["android", "macos", "chrome"],
    screen: "password-kode-2fa",
    tint: "blue",
    repo: { owner: "ihsanwahyudin", name: "rs-password" },
    fallback: { label: "Segera rilis", released: false },
    gallery: {
      mac: { src: "/store/rs-password/mac.webp", alt: "Rs Password di Mac: brankas di jendela app, menu bar, dan isi otomatis login GitHub lewat ekstensi Chrome" },
      banners: {
        hero: { src: "/store/rs-password/hero.webp", alt: "Rs Password: semua password Anda, aman di perangkat Anda" },
        feature: { src: "/store/rs-password/feature.webp", alt: "Rs Password: password manager offline yang terenkripsi" },
      },
      screens: store("rs-password", [
        ["1-brankas", "Brankas"],
        ["2-kode-2fa", "Kode 2FA"],
        ["3-isi-otomatis", "Isi otomatis"],
        ["4-passkey", "Passkey"],
        ["5-password-bocor", "Password bocor"],
        ["6-sinkronisasi", "Sinkronisasi"],
      ]),
    },
  },
]

export const upcomingApps: UpcomingApp[] = [
  {
    slug: "rs-organizer",
    name: "Rs Organizer",
    tagline: "Catatan, tugas & pengingat",
    description: "Catatan, daftar tugas, pengingat, dan papan kanban dalam satu tempat yang tetap rapi.",
    icon: NotebookPenIcon,
    chips: [
      { label: "Notes", icon: NotebookTextIcon },
      { label: "Task", icon: ListTodoIcon },
      { label: "Reminder", icon: AlarmClockIcon },
      { label: "Board", icon: KanbanIcon },
    ],
  },
  {
    slug: "rs-storage",
    name: "Rs Storage",
    tagline: "Drive foto & file",
    description: "Simpan foto dan file pribadi terenkripsi, dengan galeri, folder, dan backup otomatis dari ponsel.",
    icon: HardDriveIcon,
    chips: [
      { label: "Foto", icon: ImagesIcon },
      { label: "File", icon: FolderIcon },
      { label: "Backup", icon: CloudUploadIcon },
    ],
  },
  {
    slug: "rs-media",
    name: "Rs Media",
    tagline: "Musik & film",
    description: "Putar koleksi musik dan film milik Anda sendiri, dengan playlist, lanjut tonton, dan mode offline.",
    icon: ClapperboardIcon,
    chips: [
      { label: "Musik", icon: MusicIcon },
      { label: "Film", icon: FilmIcon },
      { label: "Playlist", icon: ListMusicIcon },
    ],
  },
  {
    slug: "rs-lifeos",
    name: "Rs LifeOS",
    tagline: "Kesehatan & aktivitas harian",
    description:
      "Lacak tidur, kalori & makanan, lari dan olahraga ala Strava, serta aktivitas harian dalam satu dasbor.",
    icon: ActivityIcon,
    chips: [
      { label: "Tidur", icon: BedIcon },
      { label: "Kalori", icon: UtensilsIcon },
      { label: "Lari", icon: FootprintsIcon },
      { label: "Aktivitas", icon: ActivityIcon },
    ],
  },
]

export function findLiveApp(slug: string): LiveApp | undefined {
  return liveApps.find((a) => a.slug === slug)
}
