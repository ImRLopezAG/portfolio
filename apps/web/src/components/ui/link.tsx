import type {  VariantProps } from "class-variance-authority"
import type * as React from "react"
import { buttonVariants } from './button'
import { cn } from "@/lib/utils"
import NextLink from "next/link"

function Link({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof NextLink> &
  VariantProps<typeof buttonVariants> & {
    
  }) {

  return (
    <NextLink
      data-slot="link"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Link }

