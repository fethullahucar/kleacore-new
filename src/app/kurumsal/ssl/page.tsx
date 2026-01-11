"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Shield,
  Lock,
  Check,
  ArrowRight,
  BadgeCheck,
  Building2,
  Globe,
  Zap,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sslTypes = [
  {
    name: "DV SSL",
    fullName: "Domain Validation",
    description: "Temel güvenlik için ideal",
    price: 99,
    period: "yıl",
    validationTime: "5 dakika",
    features: [
      "Domain doğrulaması",
      "256-bit şifreleme",
      "Tek domain koruma",
      "Tarayıcı uyumluluğu",
      "Site mührü",
    ],
    icon: Lock,
    color: "green",
  },
  {
    name: "OV SSL",
    fullName: "Organization Validation",
    description: "İşletmeler için önerilen",
    price: 299,
    period: "yıl",
    validationTime: "1-3 gün",
    popular: true,
    features: [
      "Şirket doğrulaması",
      "256-bit şifreleme",
      "Tek domain koruma",
      "Tarayıcıda şirket adı",
      "Dinamik site mührü",
      "$250.000 garanti",
    ],
    icon: BadgeCheck,
    color: "blue",
  },
  {
    name: "EV SSL",
    fullName: "Extended Validation",
    description: "En yüksek güven seviyesi",
    price: 799,
    period: "yıl",
    validationTime: "3-7 gün",
    features: [
      "Kapsamlı doğrulama",
      "256-bit şifreleme",
      "Tek domain koruma",
      "Yeşil adres çubuğu",
      "Dinamik site mührü",
      "$1.500.000 garanti",
      "Öncelikli destek",
    ],
    icon: Shield,
    color: "purple",
  },
];

const wildcardPlans = [
  {
    name: "Wildcard DV",
    price: 299,
    description: "*.domain.com tüm alt alanları korur",
  },
  {
    name: "Wildcard OV",
    price: 599,
    description: "Şirket doğrulamalı wildcard",
  },
  {
    name: "Multi-Domain",
    price: 399,
    description: "Birden fazla domain tek sertifika",
  },
  {
    name: "Multi-Domain EV",
    price: 999,
    description: "EV güvenceli çoklu domain",
  },
];

const brands = [
  { name: "Sectigo", logo: "S" },
  { name: "DigiCert", logo: "D" },
  { name: "GeoTrust", logo: "G" },
  { name: "Thawte", logo: "T" },
  { name: "RapidSSL", logo: "R" },
  { name: "GlobalSign", logo: "GS" },
];

const features = [
  {
    icon: Zap,
    title: "Hızlı Aktivasyon",
    description: "DV sertifikalar dakikalar içinde aktif",
  },
  {
    icon: RefreshCw,
    title: "Ücretsiz Yeniden Oluşturma",
    description: "Sunucu değişikliğinde ücretsiz reissue",
  },
  {
    icon: Shield,
    title: "Yüksek Garanti",
    description: "1.5 milyon $'a kadar garanti tutarı",
  },
  {
    icon: Globe,
    title: "Tarayıcı Uyumluluğu",
    description: "%99.9 tarayıcı ve mobil uyum",
  },
  {
    icon: Clock,
    title: "7/24 Destek",
    description: "Kurulum ve teknik destek",
  },
  {
    icon: Building2,
    title: "Kurumsal Çözümler",
    description: "Toplu SSL ve özel fiyatlandırma",
  },
];

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    green: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary",
    },
    blue: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary",
    },
    purple: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary",
    },
  };
  return colors[color] || colors.green;
};

export default function SSLPage() {
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
                  <Shield className="h-4 w-4" />
                  256-bit Şifreleme
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  SSL Sertifikaları
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Web sitenizi HTTPS ile koruyun. Sectigo, DigiCert ve GeoTrust
                  gibi lider markalardan SSL sertifikaları.
                </p>
              </div>
            </BlurFade>

            {/* SSL Types */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                {sslTypes.map((ssl) => {
                  const colorClasses = getColorClasses(ssl.color);
                  return (
                    <Card
                      key={ssl.name}
                      className={`relative flex flex-col ${
                        ssl.popular ? `${colorClasses.border} shadow-lg` : ""
                      }`}
                    >
                      {ssl.popular && (
                        <>
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                              Önerilen
                            </span>
                          </div>
                          <BorderBeam
                            size={200}
                            duration={12}
                            colorFrom="#3b82f6"
                            colorTo="#2563eb"
                          />
                        </>
                      )}
                      <CardHeader className="text-center">
                        <div
                          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${colorClasses.bg} mb-4`}
                        >
                          <ssl.icon className={`h-7 w-7 ${colorClasses.text}`} />
                        </div>
                        <CardTitle className="text-xl">{ssl.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {ssl.fullName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {ssl.description}
                        </p>
                        <div className="mt-4">
                          <span className="text-4xl font-bold">₺{ssl.price}</span>
                          <span className="text-muted-foreground">/{ssl.period}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Doğrulama: {ssl.validationTime}
                        </p>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {ssl.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check
                                className={`h-4 w-4 ${colorClasses.text} flex-shrink-0`}
                              />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className="w-full mt-6"
                          variant={ssl.popular ? "default" : "outline"}
                        >
                          Satın Al
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Wildcard & Multi-Domain */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Wildcard & Multi-Domain SSL
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Birden fazla domain veya alt domain için tek sertifika
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {wildcardPlans.map((plan) => (
                  <Card key={plan.name} className="text-center">
                    <CardHeader>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {plan.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">₺{plan.price}</span>
                        <span className="text-muted-foreground">/yıl</span>
                      </div>
                      <Button variant="outline" className="w-full">
                        Detaylar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* SSL Comparison */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  SSL Türleri Karşılaştırma
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <Card className="max-w-4xl mx-auto overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-left p-4">Özellik</th>
                          <th className="text-center p-4">DV SSL</th>
                          <th className="text-center p-4">OV SSL</th>
                          <th className="text-center p-4">EV SSL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Domain Doğrulama", true, true, true],
                          ["Şirket Doğrulama", false, true, true],
                          ["Kapsamlı Doğrulama", false, false, true],
                          ["Yeşil Adres Çubuğu", false, false, true],
                          ["Aktivasyon Süresi", "5 dk", "1-3 gün", "3-7 gün"],
                          ["Garanti Tutarı", "$10.000", "$250.000", "$1.500.000"],
                          ["Fiyat (Yıllık)", "₺99", "₺299", "₺799"],
                        ].map((row, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="p-4 font-medium">{row[0]}</td>
                            {[1, 2, 3].map((col) => (
                              <td key={col} className="text-center p-4">
                                {typeof row[col] === "boolean" ? (
                                  row[col] ? (
                                    <Check className="h-5 w-5 text-primary mx-auto" />
                                  ) : (
                                    <span className="text-muted-foreground">—</span>
                                  )
                                ) : (
                                  row[col]
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
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
              <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex items-center gap-3 px-6 py-4 bg-card border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      {brand.logo}
                    </div>
                    <span className="font-medium">{brand.name}</span>
                  </div>
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
                  SSL Hizmet Avantajları
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

        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Ücretsiz SSL Desteği
                </h2>
                <p className="text-muted-foreground mb-8">
                  Hosting paketlerimizde Let&apos;s Encrypt SSL ücretsiz olarak dahildir.
                  Kurumsal SSL için satış ekibimize ulaşın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    SSL Satın Al
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Hosting Paketleri
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
