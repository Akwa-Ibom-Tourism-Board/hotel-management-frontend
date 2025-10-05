import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border border-[#e9e1d7]
          focus-visible:border-[#e77818]
          focus-visible:ring-1 focus-visible:ring-[#e77818] focus-visible:outline-none
          px-3 py-2
          text-base sm:text-lg md:text-xl
          file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
          placeholder:text-gray-300 text-[#2a2523]
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
