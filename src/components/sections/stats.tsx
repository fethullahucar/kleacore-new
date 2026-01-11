"use client";

import { Users, Globe, Server, Headphones } from "lucide-react";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { BlurFade } from "@/components/magicui/blur-fade";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Aktif Müşteri",
    description: "Bize güvenen işletme ve bireysel kullanıcı",
  },
  {
    icon: Globe,
    value: 120000,
    suffix: "+",
    label: "Kayıtlı Domain",
    description: "500+ farklı uzantıda domain kaydı",
  },
  {
    icon: Server,
    value: 99.9,
    suffix: "%",
    label: "Uptime Garantisi",
    description: "Kesintisiz hizmet taahhüdümüz",
    decimalPlaces: 1,
  },
  {
    icon: Headphones,
    value: 24,
    suffix: "/7",
    label: "Teknik Destek",
    description: "Her an yanınızdayız",
  },
];

export function Stats() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Rakamlarla Biz
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Yılların deneyimi ve binlerce mutlu müşteri ile sektörün lider
              isimlerinden biriyiz.
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <BlurFade key={stat.label} delay={0.1 + idx * 0.1} inView>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex flex-col items-center text-center p-8 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
                  <div className="mb-4 p-3 rounded-xl bg-primary/10">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <NumberTicker
                      value={stat.value}
                      className="text-4xl font-bold"
                      decimalPlaces={stat.decimalPlaces || 0}
                    />
                    <span className="text-2xl font-bold text-primary">
                      {stat.suffix}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{stat.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
