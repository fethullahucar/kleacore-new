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
  Building2,
  Globe,
  Headphones,
  Server,
  Users,
  FileCheck,
  Award,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const enterprisePlans = [
  {
    name: "Kurumsal Paket",
    description: "Orta ölçekli işletmeler",
    price: "İletişime Geçin",
    features: [
      "10+ SSL sertifikası",
      "Toplu indirim",
      "Merkezi yönetim paneli",
      "Otomatik yenileme",
      "E-posta desteği",
      "Aylık raporlama",
    ],
  },
  {
    name: "Enterprise Paket",
    description: "Büyük kuruluşlar",
    price: "İletişime Geçin",
    popular: true,
    features: [
      "50+ SSL sertifikası",
      "Özel fiyatlandırma",
      "API entegrasyonu",
      "Otomatik yenileme",
      "7/24 öncelikli destek",
      "Dedicated account manager",
      "Haftalık raporlama",
      "SLA garantisi",
    ],
  },
  {
    name: "Özel Çözümler",
    description: "Holding ve grup şirketleri",
    price: "İletişime Geçin",
    features: [
      "Sınırsız SSL sertifikası",
      "Tamamen özel fiyat",
      "Tam API kontrolü",
      "White-label seçeneği",
      "Dedicated destek ekibi",
      "Özel SLA",
      "Günlük raporlama",
      "Yerinde eğitim",
    ],
  },
];

const sslTypes = [
  {
    name: "DV SSL",
    description: "Domain doğrulamalı",
    useCase: "Bloglar, portfolyolar",
    price: "₺99'dan",
  },
  {
    name: "OV SSL",
    description: "Şirket doğrulamalı",
    useCase: "İşletme siteleri",
    price: "₺299'dan",
  },
  {
    name: "EV SSL",
    description: "Kapsamlı doğrulama",
    useCase: "E-ticaret, bankacılık",
    price: "₺799'dan",
  },
  {
    name: "Wildcard SSL",
    description: "Tüm alt domainler",
    useCase: "Çoklu alt domain",
    price: "₺299'dan",
  },
  {
    name: "Multi-Domain",
    description: "Birden fazla domain",
    useCase: "Farklı domainler",
    price: "₺399'dan",
  },
  {
    name: "Code Signing",
    description: "Yazılım imzalama",
    useCase: "Uygulama geliştiriciler",
    price: "₺999'dan",
  },
];

const features = [
  {
    icon: Building2,
    title: "Merkezi Yönetim",
    description: "Tüm SSL sertifikalarınızı tek bir panelden yönetin. Kolayca izleyin, yenileyin ve raporlayın.",
  },
  {
    icon: Server,
    title: "API Entegrasyonu",
    description: "REST API ile SSL işlemlerini otomatikleştirin. CI/CD pipeline'larınıza entegre edin.",
  },
  {
    icon: Users,
    title: "Dedicated Destek",
    description: "Kurumsal müşterilerimize özel hesap yöneticisi ve öncelikli teknik destek.",
  },
  {
    icon: FileCheck,
    title: "Otomatik Yenileme",
    description: "SSL sertifikalarınız süresi dolmadan otomatik olarak yenilenir. Asla kesinti yaşamayın.",
  },
  {
    icon: Award,
    title: "SLA Garantisi",
    description: "%99.99 uptime garantisi ve hızlı müdahale süreleri ile kurumsal güvence.",
  },
  {
    icon: Briefcase,
    title: "Özel Fiyatlandırma",
    description: "Sertifika sayısına ve ihtiyaçlarınıza göre özel kurumsal fiyatlar.",
  },
];

const brands = [
  { name: "DigiCert", description: "Premium güvenlik" },
  { name: "Sectigo", description: "Geniş ürün yelpazesi" },
  { name: "GlobalSign", description: "Kurumsal çözümler" },
  { name: "Entrust", description: "Finansal sektör" },
];

const industries = [
  {
    title: "Finans & Bankacılık",
    description: "PCI DSS uyumlu SSL çözümleri ile finansal verilerinizi koruyun.",
    icon: "🏦",
  },
  {
    title: "E-Ticaret",
    description: "Müşteri güvenini artıran EV SSL ve güvenli ödeme altyapısı.",
    icon: "🛒",
  },
  {
    title: "Sağlık",
    description: "HIPAA ve KVKK uyumlu SSL ile hasta verilerini güvende tutun.",
    icon: "🏥",
  },
  {
    title: "Kamu & Eğitim",
    description: "Kamu kurumları ve üniversiteler için toplu SSL çözümleri.",
    icon: "🏛️",
  },
];

export default function KurumsalSSLPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border-primary/30 border px-4 py-1.5 text-sm font-medium text-primary mb-4">
                  <Building2 className="h-4 w-4" />
                  Kurumsal Çözümler
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Kurumsal SSL Çözümleri
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Büyük ölçekli organizasyonlar için özel SSL paketleri.
                  Toplu satın alma, merkezi yönetim ve öncelikli destek.
                </p>
              </div>
            </BlurFade>

            {/* Plans */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                {enterprisePlans.map((plan) => (
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
                        <span className="text-2xl font-bold">{plan.price}</span>
                      </div>
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
                        Teklif Al
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* SSL Types */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Mevcut SSL Türleri
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Her ihtiyaca uygun SSL sertifikası seçenekleri
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {sslTypes.map((ssl) => (
                  <Card key={ssl.name} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{ssl.name}</h3>
                          <p className="text-xs text-muted-foreground">{ssl.description}</p>
                        </div>
                        <span className="text-sm font-medium text-primary">{ssl.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Kullanım: {ssl.useCase}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sektörel Çözümler
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Her sektörün özel ihtiyaçlarına uygun SSL çözümleri
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {industries.map((industry) => (
                  <Card key={industry.title} className="text-center hover:border-primary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{industry.icon}</div>
                      <h3 className="font-semibold mb-2">{industry.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {industry.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Kurumsal Avantajlar
                </h2>
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
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Kurumsal Partnerlerimiz
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Dünya lideri sertifika otoritelerinden kurumsal SSL
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
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Kurumsal Teklif Alın
                </h2>
                <p className="text-muted-foreground mb-8">
                  SSL ihtiyaçlarınız için özel fiyat teklifi alın.
                  Uzman ekibimiz en uygun çözümü belirlemenize yardımcı olsun.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Teklif Talep Et
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    <Headphones className="mr-2 h-4 w-4" />
                    Satış Ekibiyle Görüşün
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  Veya doğrudan arayın: <span className="font-medium">0850 XXX XX XX</span>
                </p>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
