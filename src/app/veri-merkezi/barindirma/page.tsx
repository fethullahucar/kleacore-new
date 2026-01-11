"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Server,
  Shield,
  Zap,
  Check,
  Building2,
  Thermometer,
  Wifi,
  Battery,
  Eye,
  HardDrive,
  Globe,
  Cpu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const colocationPlans = [
  {
    name: "1U Raf",
    badge: "BAŞLANGIÇ",
    price: 799,
    power: "300W",
    bandwidth: "10 TB",
    ip: "1 IPv4",
    features: [
      "1U raf alanı",
      "1 Gbps port",
      "Uzaktan hands desteği",
      "7/24 NOC izleme",
    ],
  },
  {
    name: "2U Raf",
    price: 1299,
    power: "500W",
    bandwidth: "20 TB",
    ip: "2 IPv4",
    popular: true,
    features: [
      "2U raf alanı",
      "1 Gbps port",
      "Uzaktan hands desteği",
      "7/24 NOC izleme",
      "KVM over IP",
    ],
  },
  {
    name: "4U Raf",
    badge: "İŞLETME",
    price: 2199,
    power: "1000W",
    bandwidth: "50 TB",
    ip: "4 IPv4",
    features: [
      "4U raf alanı",
      "1 Gbps port",
      "Uzaktan hands desteği",
      "7/24 NOC izleme",
      "KVM over IP",
      "Özel VLAN",
    ],
  },
  {
    name: "Yarım Kabinet",
    badge: "KURUMSAL",
    price: 4999,
    power: "3000W",
    bandwidth: "100 TB",
    ip: "8 IPv4",
    features: [
      "21U raf alanı",
      "10 Gbps port",
      "Uzaktan hands desteği",
      "7/24 NOC izleme",
      "KVM over IP",
      "Özel VLAN",
      "Private ağ",
    ],
  },
];

const dcFeatures = [
  {
    icon: Building2,
    title: "Tier III+ Sertifikalı",
    description: "Uluslararası standartlarda veri merkezi altyapısı",
  },
  {
    icon: Battery,
    title: "Kesintisiz Güç",
    description: "N+1 UPS, diesel jeneratörler, 72+ saat özerklik",
  },
  {
    icon: Thermometer,
    title: "Hassas Soğutma",
    description: "N+1 CRAC sistemleri, sıcak/soğuk koridor izolasyonu",
  },
  {
    icon: Shield,
    title: "Fiziksel Güvenlik",
    description: "Biometrik erişim, 7/24 güvenlik, CCTV kayıt",
  },
  {
    icon: Wifi,
    title: "Premium Bağlantı",
    description: "Çoklu Tier-1 carrier, düşük latency, BGP",
  },
  {
    icon: Eye,
    title: "7/24 NOC İzleme",
    description: "Proaktif izleme ve hızlı müdahale",
  },
];

const faqs = [
  {
    question: "Colocation (sunucu barındırma) nedir?",
    answer: "Colocation, kendi sunucularınızı profesyonel bir veri merkezinde barındırma hizmetidir. Güç, soğutma, ağ bağlantısı ve fiziksel güvenlik gibi altyapı hizmetleri tarafımızdan sağlanır.",
  },
  {
    question: "Sunucumu nasıl veri merkezine ulaştırabilirim?",
    answer: "Sunucunuzu kargo ile gönderebilir veya randevu alarak kendiniz getirebilirsiniz. Kurulum ekibimiz sunucunuzu rack'e monte eder ve ağ bağlantısını sağlar.",
  },
  {
    question: "Remote hands desteği nedir?",
    answer: "Remote hands, veri merkezindeki teknik ekibimizin sizin adınıza fiziksel işlemler yapmasıdır. Kablo bağlantısı, sunucu yeniden başlatma, donanım değişikliği gibi işlemler bu kapsamdadır.",
  },
  {
    question: "KVM over IP nedir?",
    answer: "KVM over IP, sunucunuza uzaktan konsol erişimi sağlar. İşletim sistemi çökmelerinde bile sunucunuza BIOS seviyesinde erişebilir, yeniden kurulum yapabilirsiniz.",
  },
  {
    question: "Ek güç veya bant genişliği alabilir miyim?",
    answer: "Evet, ihtiyacınıza göre ek güç (kW başına) ve bant genişliği satın alabilirsiniz. Ayrıca 10 Gbps port yükseltmesi de mevcuttur.",
  },
  {
    question: "SLA garantisi nedir?",
    answer: "Tüm colocation paketlerimizde %99.999 uptime SLA garantisi sunuyoruz. Bu, yıllık maksimum 5 dakika kesinti anlamına gelir. SLA ihlallerinde kredi iadesi yapılır.",
  },
];

export default function BarindirmaPage() {
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
                  <Building2 className="h-4 w-4 text-primary" />
                  Tier III+ Veri Merkezi
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Sunucu Barındırma
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Kendi sunucularınızı Tier III+ sertifikalı veri merkezimizde
                  barındırın. Kesintisiz güç, premium ağ bağlantısı ve 7/24 destek.
                </p>
              </div>
            </BlurFade>

            {/* Pricing Cards */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {colocationPlans.map((plan) => (
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
                    </CardHeader>

                    <CardContent className="flex-1">
                      <div className="text-center mb-6">
                        <span className="text-sm text-muted-foreground">₺</span>
                        <span className="text-4xl font-bold">{plan.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/ay</span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Zap className="h-4 w-4" />
                            <span>Güç</span>
                          </div>
                          <span className="font-medium">{plan.power}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            <span>Trafik</span>
                          </div>
                          <span className="font-medium">{plan.bandwidth}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Server className="h-4 w-4" />
                            <span>IP Adresi</span>
                          </div>
                          <span className="font-medium">{plan.ip}</span>
                        </div>
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
                        Sipariş Ver
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* DC Features */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Neden Bizi Tercih Etmelisiniz?
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Uluslararası standartlarda altyapı ile güvenli barındırma
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dcFeatures.map((feature) => (
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

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sık Sorulan Sorular
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Sunucu barındırma hakkında merak edilenler
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
