// The app catalog, copy in Indonesian and English (`tx(id, en)`). Live apps are
// linked to their GitHub repo: the site reads the latest release (version,
// notes, downloads) and milestones from there and only falls back to
// `fallback` when GitHub can't be reached. Components read it through
// `getLiveApps(lang)` / `getUpcomingApps(lang)`.
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
import { resolve, tx, type Locale, type Resolve, type Text } from "@/lib/i18n"
import type { Platform } from "@/lib/release"

type LiveAppData = {
  slug: string
  name: string
  tagline: Text
  description: Text
  features: Text[]
  platforms: Platform[]
  /** Wordmark under the Rs mark in the app icon, e.g. "finance". */
  iconWord?: string
  /** Phone mockup on the app card. */
  screen: "finance-laporan" | "password-kode-2fa"
  /** Index in `gallery.screens` of the screenshot the preview opens at when the card's phone is clicked. */
  previewFrom: number
  tint: "green" | "blue"
  repo: RepoRef
  /** Shown when GitHub has no release yet or can't be reached. */
  fallback: { label: Text; released: boolean }
  /** Store preview assets in public/store/<slug>/ (exported from Penpot "Store preview"). */
  gallery: {
    mac: { src: string; alt: Text }
    /** Store hero (1920×1080) and Play Store feature graphic (1024×500). */
    banners: { hero: { src: string; alt: Text }; feature: { src: string; alt: Text } }
    screens: { src: string; title: Text }[]
  }
}

type UpcomingAppData = {
  slug: string
  name: string
  tagline: Text
  description: Text
  icon: LucideIcon
  chips: { label: Text; icon: LucideIcon }[]
}

export type LiveApp = Resolve<LiveAppData>
export type UpcomingApp = Resolve<UpcomingAppData>

const store = (slug: string, files: [file: string, title: Text][]) =>
  files.map(([file, title]) => ({ src: `/store/${slug}/${file}.webp`, title }))

const liveApps: LiveAppData[] = [
  {
    slug: "rs-finance",
    name: "Rs Finance",
    tagline: tx("Pencatat keuangan pribadi", "Personal finance tracker"),
    description: tx(
      "Catat uang masuk dan keluar tanpa ribet. Saldo, tagihan, dan laporan dihitung otomatis, tetap benar meski transaksi lama diubah.",
      "Track money in and out without the hassle. Balances, bills and reports are worked out for you, and stay right even when you edit old transactions."
    ),
    features: [
      tx("Pengeluaran, pemasukan & transfer", "Expenses, income & transfers"),
      tx("Kartu kredit & paylater", "Credit cards & pay later"),
      tx("Utang, piutang & pinjaman", "Debts, loans & IOUs"),
      tx("Laporan & grafik bulanan", "Monthly reports & charts"),
      tx("Riwayat bebas diubah", "Freely editable history"),
      tx("Sembunyikan saldo & backup", "Hide balances & back up"),
    ],
    platforms: ["android", "ios", "macos"],
    iconWord: "finance",
    screen: "finance-laporan",
    previewFrom: 2,
    tint: "green",
    repo: { owner: "ihsanwahyudin", name: "rs-finance" },
    fallback: { label: tx("Beta", "Beta"), released: true },
    gallery: {
      mac: {
        src: "/store/rs-finance/mac.webp",
        alt: tx(
          "Rs Finance di Mac: Beranda dengan saldo, dompet, dan transaksi terbaru, di samping Laporan di iPhone",
          "Rs Finance on Mac: the home screen with balances, wallets and recent transactions, next to Reports on iPhone"
        ),
      },
      banners: {
        hero: { src: "/store/rs-finance/hero.webp", alt: tx("Rs Finance: semua uang Anda, tercatat rapi di satu app", "Rs Finance: all your money, neatly tracked in one app") },
        feature: { src: "/store/rs-finance/feature.webp", alt: tx("Rs Finance: pencatat keuangan pribadi yang offline", "Rs Finance: an offline personal finance tracker") },
      },
      screens: store("rs-finance", [
        ["1-beranda", tx("Beranda", "Home")],
        ["2-form-transaksi", tx("Catat transaksi", "Add a transaction")],
        ["3-laporan", tx("Laporan", "Reports")],
        ["4-kartu-kredit", tx("Kartu kredit", "Credit card")],
        ["5-utang-piutang", tx("Utang & piutang", "Debts & loans")],
        ["6-transaksi", tx("Transaksi", "Transactions")],
      ]),
    },
  },
  {
    slug: "rs-password",
    name: "Rs Password",
    tagline: tx("Password manager offline", "Offline password manager"),
    description: tx(
      "Satu brankas terenkripsi untuk login, kartu, kode 2FA, dan passkey. Isi otomatis di Android dan Chrome, sinkron lewat folder cloud milik Anda sendiri.",
      "One encrypted vault for logins, cards, 2FA codes and passkeys. Autofill on Android and Chrome, synced through a cloud folder you own."
    ),
    features: [
      tx("Login, kartu, catatan & identitas", "Logins, cards, notes & identities"),
      tx("Kode 2FA & passkey", "2FA codes & passkeys"),
      tx("Generator password & passphrase", "Password & passphrase generator"),
      tx("Cek password lemah & bocor", "Weak & leaked password checks"),
      tx("Isi otomatis & ekstensi Chrome", "Autofill & Chrome extension"),
      tx("Sinkron lewat folder Anda", "Sync through your own folder"),
    ],
    platforms: ["android", "macos", "chrome"],
    screen: "password-kode-2fa",
    previewFrom: 1,
    tint: "blue",
    repo: { owner: "ihsanwahyudin", name: "rs-password" },
    fallback: { label: tx("Segera rilis", "Coming soon"), released: false },
    gallery: {
      mac: {
        src: "/store/rs-password/mac.webp",
        alt: tx(
          "Rs Password di Mac: brankas di jendela app, menu bar, dan isi otomatis login lewat ekstensi Chrome",
          "Rs Password on Mac: the vault in the app window, the menu bar, and login autofill through the Chrome extension"
        ),
      },
      banners: {
        hero: { src: "/store/rs-password/hero.webp", alt: tx("Rs Password: semua password Anda, aman di perangkat Anda", "Rs Password: all your passwords, safe on your device") },
        feature: { src: "/store/rs-password/feature.webp", alt: tx("Rs Password: password manager offline yang terenkripsi", "Rs Password: an encrypted offline password manager") },
      },
      screens: store("rs-password", [
        ["1-brankas", tx("Brankas", "Vault")],
        ["2-kode-2fa", tx("Kode 2FA", "2FA codes")],
        ["3-isi-otomatis", tx("Isi otomatis", "Autofill")],
        ["4-passkey", tx("Passkey", "Passkeys")],
        ["5-password-bocor", tx("Password bocor", "Leaked passwords")],
        ["6-sinkronisasi", tx("Sinkronisasi", "Sync")],
      ]),
    },
  },
]

const upcomingApps: UpcomingAppData[] = [
  {
    slug: "rs-organizer",
    name: "Rs Organizer",
    tagline: tx("Catatan, tugas & pengingat", "Notes, tasks & reminders"),
    description: tx(
      "Catatan, daftar tugas, pengingat, dan papan kanban dalam satu tempat yang tetap rapi.",
      "Notes, to-do lists, reminders and kanban boards in one tidy place."
    ),
    icon: NotebookPenIcon,
    chips: [
      { label: tx("Notes", "Notes"), icon: NotebookTextIcon },
      { label: tx("Task", "Tasks"), icon: ListTodoIcon },
      { label: tx("Reminder", "Reminders"), icon: AlarmClockIcon },
      { label: tx("Board", "Boards"), icon: KanbanIcon },
    ],
  },
  {
    slug: "rs-storage",
    name: "Rs Storage",
    tagline: tx("Penyimpanan foto & file", "Photo & file storage"),
    description: tx(
      "Simpan foto dan file pribadi terenkripsi, dengan galeri, folder, dan backup otomatis dari ponsel.",
      "Keep your photos and files encrypted, with a gallery, folders and automatic backup from your phone."
    ),
    icon: HardDriveIcon,
    chips: [
      { label: tx("Foto", "Photos"), icon: ImagesIcon },
      { label: tx("File", "Files"), icon: FolderIcon },
      { label: tx("Backup", "Backup"), icon: CloudUploadIcon },
    ],
  },
  {
    slug: "rs-media",
    name: "Rs Media",
    tagline: tx("Musik & film", "Music & movies"),
    description: tx(
      "Putar koleksi musik dan film milik Anda sendiri, dengan playlist, lanjut tonton, dan mode offline.",
      "Play your own music and movie collection, with playlists, resume watching and offline mode."
    ),
    icon: ClapperboardIcon,
    chips: [
      { label: tx("Musik", "Music"), icon: MusicIcon },
      { label: tx("Film", "Movies"), icon: FilmIcon },
      { label: tx("Playlist", "Playlists"), icon: ListMusicIcon },
    ],
  },
  {
    slug: "rs-lifeos",
    name: "Rs LifeOS",
    tagline: tx("Kesehatan & aktivitas harian", "Health & daily activity"),
    description: tx(
      "Lacak tidur, kalori & makanan, lari dan olahraga, serta aktivitas harian dalam satu dasbor.",
      "Track sleep, calories & food, runs and workouts, and your daily activity in one dashboard."
    ),
    icon: ActivityIcon,
    chips: [
      { label: tx("Tidur", "Sleep"), icon: BedIcon },
      { label: tx("Kalori", "Calories"), icon: UtensilsIcon },
      { label: tx("Lari", "Running"), icon: FootprintsIcon },
      { label: tx("Aktivitas", "Activity"), icon: ActivityIcon },
    ],
  },
]

export const getLiveApps = (lang: Locale): LiveApp[] => resolve(liveApps, lang)
export const getUpcomingApps = (lang: Locale): UpcomingApp[] => resolve(upcomingApps, lang)

/** The data part of a live app (repo, platforms…), without copy: for the download route and GitHub lookups. */
export function findLiveApp(slug: string): Pick<LiveAppData, "slug" | "name" | "repo"> | undefined {
  return liveApps.find((a) => a.slug === slug)
}

/** Lightbox index for `previewFrom` (0 is the Mac banner, so screenshots start at 1). */
export const cardPreviewIndex = (app: LiveApp): number => 1 + app.previewFrom

/** The serializable part of an app the preview lightbox needs. */
export const previewApps = (lang: Locale) => getLiveApps(lang).map(({ slug, name, iconWord, gallery }) => ({ slug, name, iconWord, gallery }))
