"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SSLFeatures } from "@/components/ssl/ssl-features";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Shield,
  Check,
  ArrowRight,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const wildcardPlans = [
  {
    name: "Wildcard DV",
    description: "Tüm alt domainler için",
    price: 299,
    period: "yıl",
    validationTime: "15 dakika",
    features: [
      "*.domain.com koruma",
      "Sınırsız alt domain",
      "Domain doğrulaması",
      "256-bit şifreleme",
      "99.9% tarayıcı uyumu",
      "$10.000 garanti",
      "Ücretsiz tekrar oluşturma",
    ],
  },
  {
    name: "Wildcard OV",
    description: "İşletmeler için önerilen",
    price: 599,
    period: "yıl",
    validationTime: "1-3 gün",
    popular: true,
    features: [
      "*.domain.com koruma",
      "Sınırsız alt domain",
      "Şirket doğrulaması",
      "256-bit şifreleme",
      "99.9% tarayıcı uyumu",
      "$250.000 garanti",
      "Ücretsiz tekrar oluşturma",
      "Dinamik site mührü",
      "Şirket bilgisi gösterimi",
    ],
  },
  {
    name: "Wildcard OV Pro",
    description: "Kurumsal projeler için",
    price: 999,
    period: "yıl",
    validationTime: "1-3 gün",
    features: [
      "*.domain.com koruma",
      "Sınırsız alt domain",
      "Gelişmiş şirket doğrulaması",
      "256-bit şifreleme",
      "99.9% tarayıcı uyumu",
      "$500.000 garanti",
      "Ücretsiz tekrar oluşturma",
      "Dinamik site mührü",
      "Öncelikli destek",
      "Çoklu sunucu lisansı",
    ],
  },
];

const useCases = [
  {
    title: "E-Ticaret Siteleri",
    description: "shop.domain.com, odeme.domain.com, sepet.domain.com gibi tüm alt domainlerinizi tek sertifika ile koruyun.",
  },
  {
    title: "Kurumsal Portallar",
    description: "mail.domain.com, intranet.domain.com, crm.domain.com gibi kurumsal uygulamalarınızı güvence altına alın.",
  },
  {
    title: "SaaS Uygulamaları",
    description: "Müşterilerinize özel alt domainler (musteri1.domain.com) oluşturun, hepsi tek SSL ile korunsun.",
  },
  {
    title: "Çoklu Lokasyon",
    description: "istanbul.domain.com, ankara.domain.com gibi lokasyon bazlı alt domainlerinizi koruyun.",
  },
];

export default function WildcardSSLPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border-primary/30 border px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <Layers className="h-4 w-4" />
                  *.domain.com Koruma
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Wildcard SSL Sertifikaları
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tek bir sertifika ile ana domain ve tüm alt domainlerinizi koruyun.
                  Sınırsız alt domain desteği ile maliyet tasarrufu sağlayın.
                </p>
              </div>
            </BlurFade>

            {/* Plans */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                {wildcardPlans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`relative flex flex-col ${
                      plan.popular ? "border-primary shadow-lg" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                          En Popüler
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <Layers className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">₺{plan.price}</span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Doğrulama: {plan.validationTime}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full mt-6"
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Satın Al
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Wildcard SSL Kullanım Alanları
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Tek sertifika ile tüm alt domainlerinizi koruyun
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
                {useCases.map((useCase) => (
                  <Card key={useCase.title} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {useCase.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Features */}
        <SSLFeatures />

        {/* CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Tüm Alt Domainlerinizi Koruyun
                </h2>
                <p className="text-muted-foreground mb-8">
                  Wildcard SSL ile sınırsız alt domain güvenliği.
                  Tek sertifika, tek yönetim, maksimum tasarruf.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Wildcard SSL Al
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Fiyat Teklifi Al
                  </Button>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
