"use client";

import { Marquee } from "@/components/magicui/marquee";
import { BlurFade } from "@/components/magicui/blur-fade";

// Placeholder client logos - gerçek projede SVG logolar kullanılacak
const clients = [
  { name: "TechCorp", className: "text-2xl font-bold text-muted-foreground/50" },
  { name: "StartupX", className: "text-2xl font-bold text-muted-foreground/50" },
  { name: "DigiMedia", className: "text-2xl font-bold text-muted-foreground/50" },
  { name: "CloudNet", className: "text-2xl font-bold text-muted-foreground/50" },
  { name: "WebPro", className: "text-2xl font-bold text-muted-foreground/50" },
  { name: "DataFlow", className: "text-2xl font-bold text-muted-foreground/50" },
  { name: "AppMaster", className: "text-2xl font-bold text-muted-foreground/50" },
  { name: "CyberSec", className: "text-2xl font-bold text-muted-foreground/50" },
];

function ClientLogo({ name, className }: { name: string; className?: string }) {
  return (
    <div className="flex items-center justify-center w-40 h-20 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
      <span className={className}>{name}</span>
    </div>
  );
}

export function Clients() {
  return (
    <section className="py-16 border-y bg-muted/20">
      <div className="container">
        <BlurFade delay={0.1} inView>
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            10.000+ İŞLETME BİZE GÜVENİYOR
          </p>
        </BlurFade>
      </div>

      <BlurFade delay={0.2} inView>
        <div className="relative">
          {/* Gradient overlays */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

          <Marquee pauseOnHover className="[--duration:40s]">
            {clients.map((client) => (
              <ClientLogo key={client.name} {...client} />
            ))}
          </Marquee>
        </div>
      </BlurFade>
    </section>
  );
}
