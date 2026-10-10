import { notFound } from "next/navigation"
import { lang } from "next/root-params"

import { isLocale, type Locale } from "./i18n"

/** The current locale from the `[lang]` root segment (Server Components only). */
export async function getLocale(): Promise<Locale> {
  const value = await lang()
  if (!isLocale(value)) notFound()
  return value
}
