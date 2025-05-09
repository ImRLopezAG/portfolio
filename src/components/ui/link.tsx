import type {  VariantProps } from "class-variance-authority"
import type * as React from "react"
import { buttonVariants } from './button'
import { cn } from "@/lib/utils"


function Link({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    
  }) {

  return (
    <a
      data-slot="link"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Link }

