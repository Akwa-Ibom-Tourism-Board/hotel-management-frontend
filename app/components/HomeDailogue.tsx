// components/ui/dialog.tsx

import React from "react";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog = ({ open, onClose, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="fixed bg-[#ffffff] left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 border p-6 shadow-xl sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mt-6">
        {children}
        </div>
        <button
          onClick={onClose}
          className="absolute hover:cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4 text-black" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

const DialogHeader = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
);

const DialogFooter = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
);

const DialogTitle = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);

const DialogDescription = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props} />
);

export {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
