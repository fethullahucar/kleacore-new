"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DatacenterFeatures } from "@/components/veri-merkezi/datacenter-features";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Check,
  Network,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ipv4Plans = [
  {
    name: "/29 Blok",
    badge: "BAŞLANGIÇ",
    ips: "5 Kullanılabilir IP",
    price: 299,
    features: ["RIPE kayıtlı", "Hemen teslim", "PTR yönetimi", "Abuse yönetimi"],
  },
  {
    name: "/28 Blok",
    ips: "13 Kullanılabilir IP",
    price: 549,
    popular: true,
    features: [
      "RIPE kayıtlı",
      "Hemen teslim",
      "PTR yönetimi",
      "Abuse yönetimi",
      "Geolocation güncelleme",
    ],
  },
  {
    name: "/27 Blok",
    badge: "İŞLETME",
    ips: "29 Kullanılabilir IP",
    price: 999,
    features: [
      "RIPE kayıtlı",
      "Hemen teslim",
      "PTR yönetimi",
      "Abuse yönetimi",
      "Geolocation güncelleme",
      "Özel destek",
    ],
  },
  {
    name: "/26 Blok",
    badge: "KURUMSAL",
    ips: "61 Kullanılabilir IP",
    price: 1899,
    features: [
      "RIPE kayıtlı",
      "Hemen teslim",
      "PTR yönetimi",
      "Abuse yönetimi",
      "Geolocation güncelleme",
      "Özel destek",
      "SLA garantisi",
    ],
  },
];

const asnServices = [
  {
    name: "ASN Kiralama",
    badge: "TEMEL",
    price: 499,
    period: "ay",
    description: "RIPE kayıtlı ASN numarası kiralama",
    features: [
      "2 haftalı ASN",
      "RIPE veritabanı kaydı",
      "IRR kayıtları",
      "BGP session desteği",
      "LOA belgesi",
    ],
  },
  {
    name: "ASN + IP Paketi",
    price: 1299,
    period: "ay",
    popular: true,
    description: "ASN + /24 IPv4 blok kiralama",
    features: [
      "2 haftalı ASN",
      "/24 IPv4 blok (253 IP)",
      "RIPE veritabanı kaydı",
      "IRR kayıtları",
      "BGP session desteği",
      "LOA belgesi",
      "Geolocation güncelleme",
    ],
  },
];

const faqs = [
  {
    question: "IP blokları nereden temin edilir?",
    answer: "Tüm IP bloklarımız RIPE NCC tarafından tahsis edilmiş, resmi kayıtlı bloklardır. Her blok için LOA (Letter of Authorization) belgesi sağlanır.",
  },
  {
    question: "IP'lerin geçmişi nasıl kontrol edilir?",
    answer: "Her blok teslim öncesi Spamhaus, Barracuda ve diğer popüler spam veritabanları ile kara listeler üzerinden kontrol edilir. Temiz geçmişe sahip IP'ler teslim edilir.",
  },
  {
    question: "BGP session nasıl kurulur?",
    answer: "Sunucularımız üzerinden BGP peer kurabilir veya kendi altyapınıza bağlantı sağlayabilirsiniz. BGP konfigürasyonu için teknik destek ekibimiz yardımcı olur.",
  },
  {
    question: "Geolocation güncellenebilir mi?",
    answer: "Evet, IP bloklarınızın coğrafi konum bilgisini istediğiniz ülke veya şehir olarak güncelleyebiliriz. MaxMind ve IP2Location gibi veritabanlarında güncelleme yapılır.",
  },
  {
    question: "ASN ile ne yapabilirim?",
    answer: "Kendi ASN'iniz ile IP bloklarınızı announce edebilir, multi-homing yapabilir, farklı upstream provider'lar ile çalışabilir ve kendi routing politikalarınızı uygulayabilirsiniz.",
  },
  {
    question: "Büyük IP blokları için özel fiyat var mı?",
    answer: "Evet, /25 ve üzeri bloklar için özel fiyatlandırma yapılmaktadır. Satış ekibimizle iletişime geçerek ihtiyacınıza uygun teklif alabilirsiniz.",
  },
];

export default function IpAsnPage() {
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
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium mb-4">
                  <Network className="h-4 w-4 text-primary" />
                  RIPE NCC Kayıtlı
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  IPv4 & ASN Kiralama
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  RIPE kayıtlı IPv4 blokları ve ASN numaraları. Temiz IP geçmişi,
                  anında aktivasyon ve BGP desteği.
                </p>
              </div>
            </BlurFade>

            {/* IPv4 Plans */}
            <BlurFade delay={0.2} inView>
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-center mb-8">IPv4 Blokları</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                  {ipv4Plans.map((plan) => (
                    <Card
                      key={plan.name}
                      className={`relative flex flex-col h-full transition-all hover:shadow-lg ${
                        plan.popular ? "border-primary shadow-lg scale-[1.02] z-10" : ""
                      }`}
                    >
                      {/* Badge */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        {plan.popular ? (
                          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                            POPÜLER
                          </span>
                        ) : plan.badge ? (
                          <span className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap border">
                            {plan.badge}
                          </span>
                        ) : null}
                      </div>

                      {plan.popular && (
                        <BorderBeam
                          size={200}
                          duration={12}
                          colorFrom="#3b82f6"
                          colorTo="#8b5cf6"
                        />
                      )}

                      <CardHeader className="text-center pb-2 pt-6">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.ips}</p>
                      </CardHeader>

                      <CardContent className="flex-1">
                        <div className="text-center mb-6">
                          <span className="text-sm text-muted-foreground">₺</span>
                          <span className="text-4xl font-bold">{plan.price.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm">/ay</span>
                        </div>

                        <ul className="space-y-2 text-sm">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      <div className="p-6 pt-0">
                        <Button
                          className="w-full"
                          variant={plan.popular ? "default" : "outline"}
                          size="lg"
                        >
                          Kirala
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ASN Services */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  ASN Hizmetleri
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Kendi autonomous system numaranız ile IP bloklarınızı yönetin
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                {asnServices.map((service) => (
                  <Card
                    key={service.name}
                    className={`relative flex flex-col h-full transition-all hover:shadow-lg ${
                      service.popular ? "border-primary shadow-lg scale-[1.02] z-10" : ""
                    }`}
                  >
                    {/* Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                      {service.popular ? (
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                          EN İYİ DEĞER
                        </span>
                      ) : service.badge ? (
                        <span className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap border">
                          {service.badge}
                        </span>
                      ) : null}
                    </div>

                    {service.popular && (
                      <BorderBeam
                        size={200}
                        duration={12}
                        colorFrom="#3b82f6"
                        colorTo="#8b5cf6"
                      />
                    )}

                    <CardHeader className="text-center pt-6">
                      <CardTitle>{service.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <div className="mt-4">
                        <span className="text-sm text-muted-foreground">₺</span>
                        <span className="text-4xl font-bold">{service.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/{service.period}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <div className="p-6 pt-0">
                      <Button
                        className="w-full"
                        variant={service.popular ? "default" : "outline"}
                        size="lg"
                      >
                        Hemen Başla
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Features */}
        <DatacenterFeatures />

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sık Sorulan Sorular
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  IP ve ASN kiralama hakkında merak edilenler
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
