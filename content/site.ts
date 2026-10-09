// Site copy (Indonesian). Edit here, commit, and Vercel redeploys.
import {
  CpuIcon,
  FileDownIcon,
  LayersIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UserXIcon,
  WifiOffIcon,
  type LucideIcon,
} from "lucide-react"

export const site = {
  name: "Rs Ecosystem",
  /** Copyright year (a constant: reading the clock would make every page dynamic). */
  since: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rs-ecosystem.ihsan.my.id",
  title: "Rs Ecosystem — Aplikasi pribadi yang datanya tetap milik Anda",
  description:
    "Kumpulan aplikasi offline-first untuk keuangan, password, dan kebutuhan pribadi lainnya. Satu Rust Core, UI native di Android, iPhone, dan Mac. Tanpa akun, tanpa server, tanpa iklan.",
}

export const links = {
  github: "https://github.com/ihsanwahyudin",
  linkedin: "https://www.linkedin.com/",
  email: "halo@rs-ecosystem.dev",
  /** Waitlist sign-up. A mailto works without a backend; swap in a Tally / Formspree URL later. */
  waitlist: (app: string) => `mailto:halo@rs-ecosystem.dev?subject=${encodeURIComponent(`Waitlist ${app}`)}`,
}

export const nav = [
  { href: "/#aplikasi", label: "Aplikasi" },
  { href: "/#preview", label: "Preview" },
  { href: "/#prinsip", label: "Prinsip" },
  { href: "/#teknologi", label: "Teknologi" },
  { href: "/#roadmap", label: "Roadmap" },
  { href: "/#tentang", label: "Tentang" },
]

export const hero = {
  headline: "Aplikasi pribadi yang datanya tetap milik Anda.",
  subline: site.description.replace("Kumpulan", "Rs Ecosystem adalah kumpulan"),
}

export const stats = [
  { value: "100%", label: "Offline-first", detail: "Data tidak pernah meninggalkan perangkat tanpa izin Anda." },
  { value: "0", label: "Server & akun", detail: "Tidak perlu daftar. Buka aplikasi, langsung pakai." },
  { value: "1", label: "Rust Core", detail: "Logika yang sama dan teruji di setiap platform." },
  { value: "3+", label: "Platform native", detail: "Android, iPhone, Mac, dan ekstensi Chrome." },
]

export const principles: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: WifiOffIcon, title: "Offline-first", body: "Semua fitur berjalan tanpa internet. Koneksi hanya dipakai saat Anda memintanya, misalnya untuk sinkronisasi." },
  { icon: LockKeyholeIcon, title: "Terenkripsi di perangkat", body: "Data dienkripsi sebelum disimpan (XChaCha20-Poly1305, Argon2id). Kunci tidak pernah keluar dari perangkat Anda." },
  { icon: UserXIcon, title: "Tanpa akun, tanpa iklan", body: "Tidak ada pendaftaran, pelacakan, atau iklan. Aplikasi tidak tahu siapa Anda, dan memang tidak perlu tahu." },
  { icon: SmartphoneIcon, title: "Native di setiap platform", body: "SwiftUI di iPhone & Mac, Jetpack Compose di Android. Bukan web view, jadi terasa cepat dan akrab." },
  { icon: CpuIcon, title: "Satu Rust Core", body: "Business logic ditulis sekali di Rust dan diuji otomatis, lalu dipakai bersama oleh semua platform." },
  { icon: FileDownIcon, title: "Data bisa dibawa", body: "Ekspor, backup, dan pindah perangkat kapan saja dengan file Anda sendiri. Tidak ada yang mengunci Anda." },
]

export const tech = {
  title: "Satu Rust Core, UI native.",
  body: "Logika aplikasi ditulis sekali di Rust dengan arsitektur Crux. Setiap platform hanya menggambar UI dan meneruskan aksi, jadi perilakunya sama persis di mana pun.",
  badges: ["Rust", "Crux", "SQLite", "SwiftUI", "Jetpack Compose", "BoltFFI", "XChaCha20-Poly1305", "Argon2id", "shadcn/ui"],
}

/**
 * Roadmap. `source` makes an item live:
 * - `latest-release`: the date, title and "Sudah rilis" come from the app's newest GitHub release.
 * - `milestone`: progress comes from the GitHub milestone with this title (closed vs total issues).
 * Without a source (or when GitHub is unreachable) the item shows as written.
 */
export type RoadmapItem = {
  when: string
  title: string
  body: string
  status: "done" | "active" | "next" | "planned"
  source?: { type: "latest-release"; app: string } | { type: "milestone"; app: string; milestone: string }
}

export const roadmap: RoadmapItem[] = [
  {
    when: "Okt 2026",
    title: "Rs Finance beta",
    body: "Beta pertama di Android, iPhone, dan Mac: transaksi, dompet, kartu kredit, utang, dan laporan.",
    status: "done",
    source: { type: "latest-release", app: "rs-finance" },
  },
  {
    when: "Q4 2026",
    title: "Rs Password 1.0",
    body: "Brankas terenkripsi, kode 2FA, passkey, isi otomatis Android, dan ekstensi Chrome.",
    status: "active",
    source: { type: "milestone", app: "rs-password", milestone: "1.0" },
  },
  {
    when: "2027",
    title: "Sinkron & Rs Cloud",
    body: "Sinkron lewat folder Drive/iCloud milik Anda, lalu Rs Cloud zero-knowledge untuk semua aplikasi.",
    status: "next",
  },
  {
    when: "Nanti",
    title: "Rs Organizer & lainnya",
    body: "Rs Organizer, Rs Storage, Rs Media, dan Rs LifeOS menyusul satu per satu.",
    status: "planned",
  },
]

export const profile = {
  name: "Nama Pembuat",
  initials: "MF",
  role: "Software engineer · Rust & mobile",
  bio: "Saya membangun aplikasi yang ingin saya pakai sendiri: cepat, offline, dan menghormati privasi. Rs Ecosystem adalah tempat semua aplikasi itu tinggal.",
  location: "Indonesia",
  availability: "Terbuka untuk kolaborasi & proyek lepas",
  intro:
    "Dari desain sampai rilis di toko aplikasi, setiap bagian Rs Ecosystem dikerjakan sendiri. Ini portofolio sekaligus bukti bahwa aplikasi pribadi bisa dibuat dengan standar tinggi.",
  skills: [
    { icon: CpuIcon, title: "Arsitektur lintas platform", body: "Rust Core + Crux, FFI ke Swift & Kotlin, SQLite terenkripsi.", tags: ["Rust", "Crux", "SQLite"] },
    { icon: SmartphoneIcon, title: "Aplikasi native", body: "SwiftUI untuk iOS & macOS, Jetpack Compose untuk Android.", tags: ["SwiftUI", "Compose"] },
    { icon: LayersIcon, title: "Design system & UI/UX", body: "shadcn/ui diadaptasi ke native, dirancang lebih dulu di Penpot.", tags: ["shadcn/ui", "Penpot"] },
    { icon: ShieldCheckIcon, title: "Keamanan & privasi", body: "Enkripsi end-to-end, passkey, dan sinkronisasi zero-knowledge.", tags: ["Argon2id", "Passkey"] },
  ] as { icon: LucideIcon; title: string; body: string; tags: string[] }[],
}

export const faq = [
  {
    q: "Apakah aplikasi Rs gratis?",
    a: "Ya. Semua fitur inti gratis dan tanpa iklan. Jika nanti ada layanan berbayar seperti Rs Cloud, itu opsional dan data Anda tetap bisa dipakai tanpa langganan.",
  },
  {
    q: "Di mana data saya disimpan?",
    a: "Di perangkat Anda sendiri, dalam database SQLite yang terenkripsi. Tidak ada server Rs yang menyimpan data Anda.",
  },
  {
    q: "Bagaimana jika saya ganti ponsel?",
    a: "Ekspor data ke file backup lalu buka di perangkat baru, atau pakai sinkronisasi lewat folder Google Drive / iCloud milik Anda.",
  },
  {
    q: "Apakah aplikasi bisa dipakai tanpa internet?",
    a: "Bisa. Semua fitur berjalan offline. Internet hanya dipakai untuk hal yang Anda minta, seperti sinkronisasi atau cek password bocor.",
  },
  {
    q: "Kapan Rs Organizer, Storage, Media, dan LifeOS rilis?",
    a: "Satu per satu setelah Rs Password 1.0. Klik “Kabari saya” di kartunya untuk mendapat kabar saat beta dibuka.",
  },
]

export const cta = {
  title: "Mulai simpan dengan tenang.",
  body: "Unduh beta hari ini, dan jadi yang pertama mencoba aplikasi Rs berikutnya.",
}
