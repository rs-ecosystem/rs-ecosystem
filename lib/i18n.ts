// Locales and bilingual copy. Safe on both server and client; the server-side
// locale lookup lives in lib/locale.ts.

export const locales = ["id", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "id"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/**
 * Site paths per locale: Indonesian lives at the root ("/", "/changelog"),
 * English under "/en" ("/en", "/en/changelog", "/en#aplikasi").
 */
export function localeHref(lang: Locale, path: string): string {
  if (lang === defaultLocale || /^(https?:|mailto:)/.test(path)) return path
  if (path === "/") return "/en"
  if (path.startsWith("/#")) return `/en${path.slice(1)}`
  return `/en${path}`
}

/** The same page in the other locale ("/en/changelog" ↔ "/changelog"). */
export function switchLocalePath(pathname: string, to: Locale): string {
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/"
  return localeHref(to, bare)
}

export const htmlLang: Record<Locale, string> = { id: "id", en: "en" }
export const intlLocale: Record<Locale, string> = { id: "id-ID", en: "en-US" }
export const ogLocale: Record<Locale, string> = { id: "id_ID", en: "en_US" }

/** A piece of copy in both languages. */
export type Text = { id: string; en: string }

/** Bilingual copy: Indonesian first, then English. */
export const tx = (id: string, en: string): Text => ({ id, en })

/** `T` with every `Text` replaced by a plain string (components, icons and functions kept as they are). */
export type Resolve<T> = T extends Text
  ? string
  : T extends (...args: never[]) => unknown
    ? T
    : T extends { $$typeof: symbol }
      ? T
      : T extends readonly (infer U)[]
        ? Resolve<U>[]
        : T extends object
          ? { [K in keyof T]: Resolve<T[K]> }
          : T

function isText(value: unknown): value is Text {
  if (typeof value !== "object" || value === null) return false
  const keys = Object.keys(value)
  return keys.length === 2 && typeof (value as Text).id === "string" && typeof (value as Text).en === "string"
}

/** Picks one language out of a structure that mixes data and `Text` copy. */
export function resolve<T>(value: T, lang: Locale): Resolve<T> {
  if (isText(value)) return value[lang] as Resolve<T>
  if (Array.isArray(value)) return value.map((v) => resolve(v, lang)) as Resolve<T>
  if (typeof value === "object" && value !== null && !("$$typeof" in value) && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolve(v, lang)])) as Resolve<T>
  }
  return value as Resolve<T>
}

/** "{n} dari {total}" style templates. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) => (key in values ? String(values[key]) : m))
}
