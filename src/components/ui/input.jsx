import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
<<<<<<< HEAD
    (<input
=======
    <input
>>>>>>> cd38399aed9ca18f8f3d888755c4dfbe656ebdcd
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
<<<<<<< HEAD
      {...props} />)
=======
      {...props} />
>>>>>>> cd38399aed9ca18f8f3d888755c4dfbe656ebdcd
  );
})
Input.displayName = "Input"

export { Input }
