"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
  };
}

const DEFAULT_COLOR = "#FFC700";

const generateSparkle = (color: string): Sparkle => {
  return {
    id: String(Math.random()),
    createdAt: Date.now(),
    color,
    size: Math.random() * 10 + 10,
    style: {
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
    },
  };
};

export function SparklesCore({
  id,
  className,
  background,
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  particleColor = "#FFF",
  particleSpeed = 1,
}: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  particleSpeed?: number;
}) {
  const [particles, setParticles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: particleDensity }, () =>
      generateSparkle(particleColor)
    );
    setParticles(newParticles);
  }, [particleDensity, particleColor]);

  return (
    <div
      id={id}
      className={cn("h-full w-full relative overflow-hidden", className)}
      style={{ background }}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute animate-sparkle rounded-full"
          style={{
            ...particle.style,
            width: `${minSize + Math.random() * (maxSize - minSize)}px`,
            height: `${minSize + Math.random() * (maxSize - minSize)}px`,
            backgroundColor: particle.color,
            animationDuration: `${2 / particleSpeed + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Sparkles({
  children,
  className,
  color = DEFAULT_COLOR,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sparkle = generateSparkle(color);
      setSparkles((s) => [...s.filter((sp) => now - sp.createdAt < 750), sparkle]);
    }, 250);

    return () => clearInterval(interval);
  }, [color]);

  return (
    <span className={cn("relative inline-block", className)}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute animate-ping pointer-events-none"
          style={{
            ...sparkle.style,
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
              fill={sparkle.color}
            />
          </svg>
        </span>
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
