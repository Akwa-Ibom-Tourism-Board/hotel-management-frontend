// components/ui/select.tsx

import React from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`peer block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
