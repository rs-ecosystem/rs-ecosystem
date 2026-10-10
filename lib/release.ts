// Pure helpers for release data: no I/O, safe on both server and client.
import { intlLocale, type Locale } from "./i18n"

export type Platform = "android" | "ios" | "macos" | "chrome"

export const platformLabel: Record<Platform, string> = {
  android: "Android",
  ios: "iPhone",
  macos: "Mac",
  chrome: "Chrome",
}

/** Kinds of release files; their labels and hints are in content/ui.ts (`download.kinds`). */
export type DownloadKindId = "android-arm64" | "android-armv7" | "android-x86_64" | "android-x86" | "android" | "macos" | "chrome" | "ios"

export type DownloadKind = { kind: DownloadKindId; platform: Platform; primary: boolean; order: number }

/**
 * Names the files the release scripts produce, e.g. `rs-finance-0.1.0-beta.1-arm64-v8a.apk`,
 * `RsPassword-0.1.0-beta.1-macOS.dmg`, `RsPassword-0.1.0-beta.1-chrome-extension.zip`.
 * Unknown files return `null` and are not offered.
 */
export function classifyAsset(name: string): DownloadKind | null {
  const n = name.toLowerCase()
  if (n.endsWith(".apk")) {
    if (n.includes("arm64-v8a")) return { kind: "android-arm64", platform: "android", primary: true, order: 0 }
    if (n.includes("armeabi-v7a")) return { kind: "android-armv7", platform: "android", primary: false, order: 1 }
    if (n.includes("x86_64")) return { kind: "android-x86_64", platform: "android", primary: false, order: 2 }
    if (n.includes("x86")) return { kind: "android-x86", platform: "android", primary: false, order: 3 }
    return { kind: "android", platform: "android", primary: true, order: 0 }
  }
  if (n.endsWith(".dmg")) return { kind: "macos", platform: "macos", primary: true, order: 10 }
  if (n.includes("chrome") && n.endsWith(".zip")) return { kind: "chrome", platform: "chrome", primary: true, order: 20 }
  if (n.endsWith(".ipa")) return { kind: "ios", platform: "ios", primary: true, order: 30 }
  return null
}

export type Stage = "alpha" | "beta" | "rc" | "stable"

export function versionStage(version: string): Stage {
  const v = version.toLowerCase()
  if (v.includes("alpha")) return "alpha"
  if (v.includes("beta")) return "beta"
  if (v.includes("rc")) return "rc"
  return "stable"
}

/** "0.1.0-beta.1" → "Beta 0.1"; "1.2.0" → "Versi 1.2" (`stableWord` is "Versi" / "Version"). */
export function shortVersionLabel(version: string, stableWord: string): string {
  const [core] = version.split("-")
  const [major, minor] = core.split(".")
  const short = `${major}.${minor ?? 0}`
  switch (versionStage(version)) {
    case "alpha":
      return `Alpha ${short}`
    case "beta":
      return `Beta ${short}`
    case "rc":
      return `RC ${short}`
    default:
      return `${stableWord} ${short}`
  }
}

export function formatBytes(bytes: number, lang: Locale): string {
  if (bytes >= 1024 * 1024) return `${new Intl.NumberFormat(intlLocale[lang], { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(bytes / 1024 / 1024)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

/** "2026-10-04T…" → "4 Okt 2026" / "Oct 4, 2026" (UTC, so build and runtime agree). */
export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[lang], { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso))
}

/** "2026-10-04T…" → "Okt 2026" / "Oct 2026". */
export function formatMonth(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[lang], { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso))
}
