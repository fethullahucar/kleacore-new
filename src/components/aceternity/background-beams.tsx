"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {[...Array(50)].map((_, i) => (
          <line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1="0"
            x2={`${Math.random() * 100}%`}
            y2="100%"
            stroke="url(#grad1)"
            strokeWidth="0.5"
            className="animate-pulse"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundBeamsWithCollision({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-beam"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
