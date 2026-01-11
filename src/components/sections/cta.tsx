"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Particles } from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
      <Particles
        className="absolute inset-0"
        quantity={30}
        ease={80}
        color="#3b82f6"
        refresh={false}
      />

      <div className="container relative z-10">
        <BlurFade delay={0.1} inView>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-4 py-1.5 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Hemen başlayın, 30 gün para iade garantisi</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Web Sitenizi
              <span className="block text-primary">Bugün Yayına Alın</span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Dakikalar içinde profesyonel bir web sitesine sahip olun. Domain
              kaydı, hosting kurulumu ve SSL sertifikası ile tam donanımlı
              başlayın.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <ShimmerButton
                className="h-14 px-8 text-lg font-semibold"
                shimmerColor="#ffffff"
                background="hsl(221.2 83.2% 53.3%)"
              >
                <Link href="/hosting/linux" className="flex items-center gap-2">
                  Ücretsiz Başla
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </ShimmerButton>

              <Button variant="outline" size="lg" className="h-14 px-8" asChild>
                <Link href="/iletisim">Bize Ulaşın</Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Kredi kartı gerektirmez • Kurulum ücretsiz • İptal kolaylığı
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
