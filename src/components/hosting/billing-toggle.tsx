"use client";

import { cn } from "@/lib/utils";

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
  className?: string;
}

export function BillingToggle({ isYearly, onToggle, className }: BillingToggleProps) {
  return (
    <div className={cn("flex justify-center", className)}>
      <div className="inline-flex items-center rounded-full border p-1 bg-muted/50">
        <button
          onClick={() => onToggle(false)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all",
            !isYearly
              ? "bg-background shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Aylık
        </button>
        <button
          onClick={() => onToggle(true)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all relative",
            isYearly
              ? "bg-background shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Yıllık
          <span className="absolute -top-3 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
            %20 İndirim
          </span>
        </button>
      </div>
    </div>
  );
}
