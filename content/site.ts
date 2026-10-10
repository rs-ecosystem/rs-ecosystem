// Site copy in Indonesian and English (`tx(id, en)`). Edit here, commit, and Vercel redeploys.
// Components read it through `getSite(lang)`, which picks one language.
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

import { localeHref, resolve, tx, type Locale, type Text } from "@/lib/i18n"

export const site = {
  name: "Rs Ecosystem",
  /** Copyright year (a constant: reading the clock would make every page dynamic). */
  since: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rs-ecosystem.ihsan.my.id",
}

const email = "m.ihsanwahyudin@gmail.com"

export const links = {
  github: "https://github.com/ihsanwahyudin",
  linkedin: "https://www.linkedin.com/in/muhammad-ihsan-wahyudin-1a4a19209/",
  email,
  /** Waitlist sign-up. A mailto works without a backend; swap in a Tally / Formspree URL later. */
  waitlist: (app: string) => `mailto:${email}?subject=${encodeURIComponent(`Waitlist ${app}`)}`,
}

const description = tx(
  "Kumpulan aplikasi offline-first untuk keuangan, password, dan kebutuhan pribadi lainnya. Satu Rust Core, UI native di Android, iPhone, dan Mac. Tanpa akun, tanpa server, tanpa iklan.",
  "A family of offline-first apps for money, passwords and the rest of your personal life. One Rust Core, native UI on Android, iPhone and Mac. No accounts, no servers, no ads."
)

/**
 * Roadmap. `source` makes an item live:
 * - `latest-release`: the date, title and "released" status come from the app's newest GitHub release.
 * - `milestone`: progress comes from the GitHub milestone with this title (closed vs total issues).
 * Without a source (or when GitHub is unreachable) the item shows as written.
 */
type RoadmapItemData = {
  when: Text
  title: Text
  body: Text
  status: "done" | "active" | "next" | "planned"
  source?: { type: "latest-release"; app: string } | { type: "milestone"; app: string; milestone: string }
}

const content = {
  title: tx("Rs Ecosystem — Aplikasi pribadi yang datanya tetap milik Anda", "Rs Ecosystem — Personal apps that keep your data yours"),
  description,

  nav: [
    { path: "/#aplikasi", label: tx("Aplikasi", "Apps") },
    { path: "/#preview", label: tx("Preview", "Preview") },
    { path: "/#prinsip", label: tx("Prinsip", "Principles") },
    { path: "/#teknologi", label: tx("Teknologi", "Technology") },
    { path: "/#roadmap", label: tx("Roadmap", "Roadmap") },
    { path: "/#tentang", label: tx("Tentang", "About") },
  ],

  hero: {
    headline: tx("Aplikasi pribadi yang datanya tetap milik Anda.", "Personal apps that keep your data yours."),
    subline: tx(
      "Rs Ecosystem adalah kumpulan aplikasi offline-first untuk keuangan, password, dan kebutuhan pribadi lainnya. Satu Rust Core, UI native di Android, iPhone, dan Mac. Tanpa akun, tanpa server, tanpa iklan.",
      "Rs Ecosystem is a family of offline-first apps for money, passwords and the rest of your personal life. One Rust Core, native UI on Android, iPhone and Mac. No accounts, no servers, no ads."
    ),
  },

  stats: [
    { value: "100%", label: tx("Offline-first", "Offline-first"), detail: tx("Data tidak pernah meninggalkan perangkat tanpa izin Anda.", "Your data never leaves your device unless you say so.") },
    { value: "0", label: tx("Server & akun", "Servers & accounts"), detail: tx("Tidak perlu daftar. Buka aplikasi, langsung pakai.", "No sign-up. Open the app and start.") },
    { value: "1", label: tx("Rust Core", "Rust Core"), detail: tx("Logika yang sama dan teruji di setiap platform.", "The same tested logic on every platform.") },
    { value: "3+", label: tx("Platform native", "Native platforms"), detail: tx("Android, iPhone, Mac, dan ekstensi Chrome.", "Android, iPhone, Mac and a Chrome extension.") },
  ],

  principles: [
    {
      icon: WifiOffIcon,
      title: tx("Offline-first", "Offline-first"),
      body: tx(
        "Semua fitur berjalan tanpa internet. Koneksi hanya dipakai saat Anda memintanya, misalnya untuk sinkronisasi.",
        "Every feature works without the internet. The network is only used when you ask for it, for example to sync."
      ),
    },
    {
      icon: LockKeyholeIcon,
      title: tx("Terenkripsi di perangkat", "Encrypted on your device"),
      body: tx(
        "Data dienkripsi sebelum disimpan (XChaCha20-Poly1305, Argon2id). Kunci tidak pernah keluar dari perangkat Anda.",
        "Data is encrypted before it is stored (XChaCha20-Poly1305, Argon2id). The keys never leave your device."
      ),
    },
    {
      icon: UserXIcon,
      title: tx("Tanpa akun, tanpa iklan", "No accounts, no ads"),
      body: tx(
        "Tidak ada pendaftaran, pelacakan, atau iklan. Aplikasi tidak tahu siapa Anda, dan memang tidak perlu tahu.",
        "No sign-up, no tracking, no ads. The apps don't know who you are, and they don't need to."
      ),
    },
    {
      icon: SmartphoneIcon,
      title: tx("Native di setiap platform", "Native on every platform"),
      body: tx(
        "SwiftUI di iPhone & Mac, Jetpack Compose di Android. Bukan web view, jadi terasa cepat dan akrab.",
        "SwiftUI on iPhone & Mac, Jetpack Compose on Android. No web views, so it feels fast and familiar."
      ),
    },
    {
      icon: CpuIcon,
      title: tx("Satu Rust Core", "One Rust Core"),
      body: tx(
        "Business logic ditulis sekali di Rust dan diuji otomatis, lalu dipakai bersama oleh semua platform.",
        "Business logic is written once in Rust, tested automatically, and shared by every platform."
      ),
    },
    {
      icon: FileDownIcon,
      title: tx("Data bisa dibawa", "Take your data anywhere"),
      body: tx(
        "Ekspor, backup, dan pindah perangkat kapan saja dengan file Anda sendiri. Tidak ada yang mengunci Anda.",
        "Export, back up and move devices any time with your own files. Nothing locks you in."
      ),
    },
  ] as { icon: LucideIcon; title: Text; body: Text }[],

  tech: {
    title: tx("Satu Rust Core, UI native.", "One Rust Core, native UI."),
    body: tx(
      "Logika aplikasi ditulis sekali di Rust dengan arsitektur Crux. Setiap platform hanya menggambar UI dan meneruskan aksi, jadi perilakunya sama persis di mana pun.",
      "The app logic is written once in Rust with the Crux architecture. Each platform only draws the UI and passes actions along, so the apps behave exactly the same everywhere."
    ),
    badges: ["Rust", "Crux", "SQLite", "SwiftUI", "Jetpack Compose", "BoltFFI", "XChaCha20-Poly1305", "Argon2id", "shadcn/ui"],
  },

  roadmap: [
    {
      when: tx("Okt 2026", "Oct 2026"),
      title: tx("Rs Finance beta", "Rs Finance beta"),
      body: tx(
        "Beta pertama di Android, iPhone, dan Mac: transaksi, dompet, kartu kredit, utang, dan laporan.",
        "The first beta on Android, iPhone and Mac: transactions, wallets, credit cards, debts and reports."
      ),
      status: "done",
      source: { type: "latest-release", app: "rs-finance" },
    },
    {
      when: tx("Q4 2026", "Q4 2026"),
      title: tx("Rs Password 1.0", "Rs Password 1.0"),
      body: tx(
        "Brankas terenkripsi, kode 2FA, passkey, isi otomatis Android, dan ekstensi Chrome.",
        "An encrypted vault, 2FA codes, passkeys, Android autofill and a Chrome extension."
      ),
      status: "active",
      source: { type: "milestone", app: "rs-password", milestone: "1.0" },
    },
    {
      when: tx("2027", "2027"),
      title: tx("Sinkron & Rs Cloud", "Sync & Rs Cloud"),
      body: tx(
        "Sinkron lewat folder cloud milik Anda, lalu Rs Cloud zero-knowledge untuk semua aplikasi.",
        "Sync through a cloud folder you own, then zero-knowledge Rs Cloud for every app."
      ),
      status: "next",
    },
    {
      when: tx("Nanti", "Later"),
      title: tx("Rs Organizer & lainnya", "Rs Organizer & more"),
      body: tx(
        "Rs Organizer, Rs Storage, Rs Media, dan Rs LifeOS menyusul satu per satu.",
        "Rs Organizer, Rs Storage, Rs Media and Rs LifeOS follow one by one."
      ),
      status: "planned",
    },
  ] as RoadmapItemData[],

  /**
   * The maker. Name, role (GitHub bio), location and photo come from the GitHub
   * profile `profileGithub` (lib/github/data.ts `getProfile`, cached hourly); the
   * values here are the fallback when GitHub can't be reached.
   */
  profile: {
    name: "M Ihsan Wahyudin",
    role: "Fullstack Web Developer",
    bio: tx(
      "Saya membangun aplikasi yang ingin saya pakai sendiri: cepat, offline, dan menghormati privasi. Rs Ecosystem adalah tempat semua aplikasi itu tinggal.",
      "I build the apps I want to use myself: fast, offline and respectful of privacy. Rs Ecosystem is where they all live."
    ),
    location: "Indonesia",
    availability: tx("Terbuka untuk kolaborasi & proyek lepas", "Open to collaboration & freelance work"),
    intro: tx(
      "Dari desain sampai rilis di toko aplikasi, setiap bagian Rs Ecosystem dikerjakan sendiri. Ini portofolio sekaligus bukti bahwa aplikasi pribadi bisa dibuat dengan standar tinggi.",
      "From design to store release, every part of Rs Ecosystem is built by one person. It is a portfolio, and proof that personal apps can be made to a high standard."
    ),
    skills: [
      { icon: CpuIcon, title: tx("Arsitektur lintas platform", "Cross-platform architecture"), body: tx("Rust Core + Crux, FFI ke Swift & Kotlin, SQLite terenkripsi.", "Rust Core + Crux, FFI to Swift & Kotlin, encrypted SQLite."), tags: ["Rust", "Crux", "SQLite"] },
      { icon: SmartphoneIcon, title: tx("Aplikasi native", "Native apps"), body: tx("SwiftUI untuk iOS & macOS, Jetpack Compose untuk Android.", "SwiftUI for iOS & macOS, Jetpack Compose for Android."), tags: ["SwiftUI", "Compose"] },
      { icon: LayersIcon, title: tx("Design system & UI/UX", "Design system & UI/UX"), body: tx("shadcn/ui diadaptasi ke native, dirancang lebih dulu di Penpot.", "shadcn/ui adapted to native, designed first in Penpot."), tags: ["shadcn/ui", "Penpot"] },
      { icon: ShieldCheckIcon, title: tx("Keamanan & privasi", "Security & privacy"), body: tx("Enkripsi end-to-end, passkey, dan sinkronisasi zero-knowledge.", "End-to-end encryption, passkeys and zero-knowledge sync."), tags: ["Argon2id", "Passkey"] },
    ] as { icon: LucideIcon; title: Text; body: Text; tags: string[] }[],
  },

  faq: [
    {
      q: tx("Apakah aplikasi Rs gratis?", "Are the Rs apps free?"),
      a: tx(
        "Ya. Semua fitur inti gratis dan tanpa iklan. Jika nanti ada layanan berbayar seperti Rs Cloud, itu opsional dan data Anda tetap bisa dipakai tanpa langganan.",
        "Yes. Every core feature is free and ad-free. If a paid service such as Rs Cloud arrives later, it will be optional, and your data stays usable without a subscription."
      ),
    },
    {
      q: tx("Di mana data saya disimpan?", "Where is my data stored?"),
      a: tx(
        "Di perangkat Anda sendiri, dalam database SQLite yang terenkripsi. Tidak ada server Rs yang menyimpan data Anda.",
        "On your own device, in an encrypted SQLite database. No Rs server stores your data."
      ),
    },
    {
      q: tx("Bagaimana jika saya ganti ponsel?", "What if I get a new phone?"),
      a: tx(
        "Ekspor data ke file backup lalu buka di perangkat baru, atau pakai sinkronisasi lewat folder cloud milik Anda.",
        "Export your data to a backup file and open it on the new device, or sync through a cloud folder you own."
      ),
    },
    {
      q: tx("Apakah aplikasi bisa dipakai tanpa internet?", "Do the apps work without the internet?"),
      a: tx(
        "Bisa. Semua fitur berjalan offline. Internet hanya dipakai untuk hal yang Anda minta, seperti sinkronisasi atau cek password bocor.",
        "Yes. Every feature works offline. The internet is only used for things you ask for, such as syncing or checking for leaked passwords."
      ),
    },
    {
      q: tx("Kapan Rs Organizer, Storage, Media, dan LifeOS rilis?", "When do Rs Organizer, Storage, Media and LifeOS come out?"),
      a: tx(
        "Satu per satu setelah Rs Password 1.0. Klik “Kabari saya” di kartunya untuk mendapat kabar saat beta dibuka.",
        "One by one after Rs Password 1.0. Click “Notify me” on an app's card to hear when its beta opens."
      ),
    },
  ],

  cta: {
    title: tx("Mulai simpan dengan tenang.", "Keep your life in order, calmly."),
    body: tx(
      "Unduh beta hari ini, dan jadi yang pertama mencoba aplikasi Rs berikutnya.",
      "Download the beta today, and be the first to try the next Rs apps."
    ),
  },
}

/** GitHub login whose profile fills the "About" card. */
export const profileGithub = "ihsanwahyudin"

export type RoadmapItem = ReturnType<typeof getSite>["roadmap"][number]

/** All site copy in one language, with nav paths for that locale. */
export function getSite(lang: Locale) {
  const c = resolve(content, lang)
  return { ...c, nav: c.nav.map((n) => ({ href: localeHref(lang, n.path), label: n.label })) }
}
