import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "default" &&
          "bg-[var(--greenLight)] text-white hover:bg-[var(--golden)] focus:ring-blue-500",
        variant === "outline" &&
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
        className
      )}
      {...props}
    />
  )
}
