import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        <input
          type={type}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition",
            error && "border-red-500 focus:ring-red-400",
            className
          )}
          {...props}
        />

        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
