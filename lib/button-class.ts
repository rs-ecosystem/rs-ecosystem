import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Button classes for links (`<a>`, `<Link>`). Unlike `buttonVariants`, this
 * merges conflicting utilities (e.g. outline's `border-border` over the base
 * `border-transparent`), the same way the `Button` component does.
 */
export function buttonClass(...args: Parameters<typeof buttonVariants>) {
  return cn(buttonVariants(...args))
}
