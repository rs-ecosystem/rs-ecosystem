// Pure helpers for release data: no I/O, safe on both server and client.

export type Platform = "android" | "ios" | "macos" | "chrome"

export const platformLabel: Record<Platform, string> = {
  android: "Android",
  ios: "iPhone",
  macos: "Mac",
  chrome: "Chrome",
}

export type DownloadKind = { platform: Platform; label: string; hint: string; primary: boolean; order: number }

/**
 * Names the files the release scripts produce, e.g. `rs-finance-0.1.0-beta.1-arm64-v8a.apk`,
 * `RsPassword-0.1.0-beta.1-macOS.dmg`, `RsPassword-0.1.0-beta.1-chrome-extension.zip`.
 * Unknown files return `null` and are not offered.
 */
export function classifyAsset(name: string): DownloadKind | null {
  const n = name.toLowerCase()
  if (n.endsWith(".apk")) {
    if (n.includes("arm64-v8a")) return { platform: "android", label: "Android", hint: "Hampir semua HP (pilih ini kalau ragu)", primary: true, order: 0 }
    if (n.includes("armeabi-v7a")) return { platform: "android", label: "Android 32-bit", hint: "HP lama", primary: false, order: 1 }
    if (n.includes("x86_64")) return { platform: "android", label: "Android x86_64", hint: "Emulator & perangkat x86", primary: false, order: 2 }
    if (n.includes("x86")) return { platform: "android", label: "Android x86", hint: "Emulator lama", primary: false, order: 3 }
    return { platform: "android", label: "Android", hint: "APK", primary: true, order: 0 }
  }
  if (n.endsWith(".dmg")) return { platform: "macos", label: "Mac", hint: "macOS 15 ke atas, semua jenis Mac", primary: true, order: 10 }
  if (n.includes("chrome") && n.endsWith(".zip")) return { platform: "chrome", label: "Ekstensi Chrome", hint: "Butuh app Mac", primary: true, order: 20 }
  if (n.endsWith(".ipa")) return { platform: "ios", label: "iPhone", hint: "IPA", primary: true, order: 30 }
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

/** "0.1.0-beta.1" → "Beta 0.1"; "1.2.0" → "Versi 1.2". */
export function shortVersionLabel(version: string): string {
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
      return `Versi ${short}`
  }
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

/** "2026-10-04T…" → "4 Okt 2026" (UTC, so build and runtime agree). */
export function formatDate(iso: string): string {
  const d = new Date(iso)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

/** "2026-10-04T…" → "Okt 2026". */
export function formatMonth(iso: string): string {
  const d = new Date(iso)
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}
