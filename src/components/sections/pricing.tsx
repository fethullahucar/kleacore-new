"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BlurFade } from "@/components/magicui/blur-fade";

const plans = [
  {
    name: "Başlangıç",
    description: "Kişisel siteler için ideal",
    price: "49",
    period: "/ay",
    features: [
      "5 GB SSD Disk",
      "50 GB Aylık Trafik",
      "1 Web Sitesi",
      "5 E-posta Hesabı",
      "Ücretsiz SSL",
      "cPanel Kontrol Paneli",
    ],
    cta: "Hemen Başla",
    popular: false,
  },
  {
    name: "Profesyonel",
    description: "Büyüyen işletmeler için",
    price: "99",
    period: "/ay",
    features: [
      "25 GB SSD Disk",
      "250 GB Aylık Trafik",
      "10 Web Sitesi",
      "25 E-posta Hesabı",
      "Ücretsiz SSL",
      "cPanel Kontrol Paneli",
      "Günlük Yedekleme",
      "Öncelikli Destek",
    ],
    cta: "En Popüler",
    popular: true,
  },
  {
    name: "Kurumsal",
    description: "Yüksek trafikli siteler için",
    price: "199",
    period: "/ay",
    features: [
      "100 GB SSD Disk",
      "Sınırsız Trafik",
      "Sınırsız Web Sitesi",
      "Sınırsız E-posta",
      "Ücretsiz SSL",
      "cPanel Kontrol Paneli",
      "Günlük Yedekleme",
      "7/24 Öncelikli Destek",
      "Ücretsiz Domain",
    ],
    cta: "İletişime Geç",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Hosting Paketleri
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              İhtiyacınıza uygun paketi seçin, hemen başlayın. Tüm paketlerde 30
              gün para iade garantisi.
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <BlurFade key={plan.name} delay={0.1 + idx * 0.1} inView>
              <Card
                className={cn(
                  "relative flex flex-col h-full",
                  plan.popular && "border-primary shadow-lg scale-105"
                )}
              >
                {plan.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                        En Popüler
                      </span>
                    </div>
                    <BorderBeam
                      size={200}
                      duration={12}
                      colorFrom="#3b82f6"
                      colorTo="#8b5cf6"
                    />
                  </>
                )}
                <CardHeader className="text-center pb-2">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-center mb-6">
                    <span className="text-5xl font-bold">₺{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
