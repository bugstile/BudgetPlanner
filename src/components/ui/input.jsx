import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input px-3 py-1 text-lighterBackground text-base shadow-sm transition-colors file:border-0 file:text-sm file:font-medium file:text placeholder:text-lighterBackground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}  // Pass the ref to the actual input element
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
