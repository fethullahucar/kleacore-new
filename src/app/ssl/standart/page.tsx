"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Shield,
  Lock,
  Check,
  ArrowRight,
  Zap,
  Clock,
  Globe,
  Headphones,
  Server,
  RefreshCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sslPlans = [
  {
    name: "DV SSL",
    description: "Kişisel web siteleri için",
    price: 99,
    period: "yıl",
    validationTime: "5 dakika",
    features: [
      "Domain doğrulaması",
      "256-bit şifreleme",
      "Tek domain koruma",
      "99.9% tarayıcı uyumu",
      "Statik site mührü",
      "$10.000 garanti",
      "Ücretsiz tekrar oluşturma",
    ],
  },
  {
    name: "OV SSL",
    description: "Küçük işletmeler için",
    price: 299,
    period: "yıl",
    validationTime: "1-3 gün",
    popular: true,
    features: [
      "Şirket doğrulaması",
      "256-bit şifreleme",
      "Tek domain koruma",
      "99.9% tarayıcı uyumu",
      "Dinamik site mührü",
      "$250.000 garanti",
      "Ücretsiz tekrar oluşturma",
      "Şirket bilgisi gösterimi",
    ],
  },
  {
    name: "OV SSL Pro",
    description: "Orta ölçekli işletmeler için",
    price: 499,
    period: "yıl",
    validationTime: "1-3 gün",
    features: [
      "Gelişmiş şirket doğrulaması",
      "256-bit şifreleme",
      "Tek domain koruma",
      "99.9% tarayıcı uyumu",
      "Dinamik site mührü",
      "$500.000 garanti",
      "Ücretsiz tekrar oluşturma",
      "Öncelikli destek",
      "Şirket bilgisi gösterimi",
    ],
  },
];

const features = [
  {
    icon: Zap,
    title: "Hızlı Aktivasyon",
    description: "DV sertifikalar dakikalar içinde aktif edilir. OV sertifikalar 1-3 iş günü içinde hazır.",
  },
  {
    icon: Shield,
    title: "Güçlü Şifreleme",
    description: "256-bit SSL şifreleme ile verileriniz güvenle aktarılır. SHA-256 algoritması kullanılır.",
  },
  {
    icon: Globe,
    title: "Tam Uyumluluk",
    description: "Tüm modern tarayıcılar ve mobil cihazlarla %99.9 uyumluluk sağlar.",
  },
  {
    icon: RefreshCcw,
    title: "Ücretsiz Yenileme",
    description: "Sunucu değişikliklerinde sertifikanızı ücretsiz olarak yeniden oluşturabilirsiniz.",
  },
  {
    icon: Headphones,
    title: "7/24 Destek",
    description: "SSL kurulumu ve teknik sorunlar için uzman ekibimiz her zaman yanınızda.",
  },
  {
    icon: Server,
    title: "Kolay Kurulum",
    description: "Detaylı kurulum kılavuzları ve teknik destek ile hızlıca SSL'inizi aktif edin.",
  },
];

const brands = [
  { name: "Sectigo", description: "Dünya lideri SSL sağlayıcısı" },
  { name: "GeoTrust", description: "DigiCert markası" },
  { name: "RapidSSL", description: "Hızlı ve ekonomik" },
  { name: "Thawte", description: "Kurumsal güven" },
];

export default function StandartSSLPage() {
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
                  <Lock className="h-4 w-4" />
                  Standart SSL Sertifikaları
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Standart SSL Sertifikaları
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Web sitenizi HTTPS ile koruyun. Domain Validation (DV) ve
                  Organization Validation (OV) sertifikalarıyla güvenli bağlantı sağlayın.
                </p>
              </div>
            </BlurFade>

            {/* Plans */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                {sslPlans.map((plan) => (
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
                        <Shield className="h-7 w-7 text-primary" />
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

        {/* Features */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Standart SSL Avantajları
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Güvenli web sitesi için ihtiyacınız olan tüm özellikler
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-6">
                      <feature.icon className="h-10 w-10 text-primary mb-4" />
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Brands */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Güvenilir Markalar
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Dünya genelinde tanınan sertifika otoritelerinden SSL
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
                {brands.map((brand) => (
                  <Card key={brand.name} className="text-center hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-bold text-primary mx-auto mb-3">
                        {brand.name.charAt(0)}
                      </div>
                      <h3 className="font-semibold">{brand.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {brand.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Hemen SSL Sertifikanızı Alın
                </h2>
                <p className="text-muted-foreground mb-8">
                  Web sitenizi güvence altına alın. Ziyaretçilerinize güvenli
                  bir deneyim sunun ve SEO sıralamanızı yükseltin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    SSL Satın Al
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Tüm SSL Seçenekleri
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
