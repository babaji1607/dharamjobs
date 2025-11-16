import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 active:scale-95 overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:opacity-0 before:transition-opacity before:duration-200 before:content-[''] hover:before:opacity-20",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 text-white shadow-[0_15px_35px_-20px_rgba(234,88,12,0.9)] hover:-translate-y-0.5 hover:shadow-[0_25px_45px_-25px_rgba(190,60,0,0.9)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/80 focus-visible:ring-destructive/40",
        outline:
          "border border-orange-200/80 bg-white/80 text-orange-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:bg-orange-50/80 hover:text-orange-900",
        secondary:
          "bg-orange-100 text-orange-800 hover:bg-orange-200",
        ghost:
          "text-orange-700 hover:bg-orange-50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-5",
        sm: "h-9 px-4 py-2 rounded-full gap-1.5 has-[>svg]:px-3",
        lg: "h-12 px-8 py-3.5 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
