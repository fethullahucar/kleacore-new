"use client";

import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function MovingBorder({
  children,
  duration = 2000,
  rx = "30%",
  ry = "30%",
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}) {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => {
    const rect = pathRef.current;
    if (!rect) return 0;
    const point = rect.getPointAtLength(val);
    return point?.x ?? 0;
  });

  const y = useTransform(progress, (val) => {
    const rect = pathRef.current;
    if (!rect) return 0;
    const point = rect.getPointAtLength(val);
    return point?.y ?? 0;
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <Component
      className={cn(
        "relative text-xl h-16 w-40 p-[1px] overflow-hidden bg-transparent",
        containerClassName
      )}
      {...otherProps}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <svg
          className="absolute h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <rect
            ref={pathRef as React.RefObject<SVGRectElement>}
            x="0"
            y="0"
            width="100"
            height="100"
            rx={rx}
            ry={ry}
            fill="none"
          />
        </svg>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform,
          }}
          className={cn(
            "h-20 w-20 rounded-full bg-[radial-gradient(var(--primary)_40%,transparent_60%)]",
            borderClassName
          )}
        />
      </div>
      <div
        className={cn(
          "relative h-full w-full rounded-[inherit] bg-background flex items-center justify-center",
          className
        )}
      >
        {children}
      </div>
    </Component>
  );
}
