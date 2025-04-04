import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium p-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary-hover hover:text-primary-hoverForeground transform hover:translate-y-[-1px] transition-transform",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover hover:text-destructive-hoverForeground transform hover:translate-y-[-1px] transition-transform",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transform hover:translate-y-[-1px] transition-transform",
        secondary:
          "transform hover:translate-y-[-1px] transition-transform bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary-hover hover:text-secondary-hoverForeground transform hover:translate-y-[-1px] transition-transform p-2 rounded",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
          // Updated variant to remove only transform and translation effects for the specific button
          noTransformTrigger: "focus:outline-none focus:ring-2 focus:ring-primary transform-none hover:translate-none",    
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
