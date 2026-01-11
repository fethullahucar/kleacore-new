"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Shield,
  Zap,
  Check,
  BarChart3,
  Activity,
  Eye,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ddosPlans = [
  {
    name: "Standart",
    badge: "BAŞLANGIÇ",
    description: "Küçük ve orta siteler için",
    price: 199,
    period: "ay",
    capacity: "10 Gbps",
    features: [
      "10 Gbps mitigasyon",
      "Layer 3-4 koruma",
      "Otomatik algılama",
      "Gerçek zamanlı izleme",
      "Temel raporlama",
    ],
  },
  {
    name: "Pro",
    description: "E-ticaret ve kurumsal siteler",
    price: 499,
    period: "ay",
    capacity: "100 Gbps",
    popular: true,
    features: [
      "100 Gbps mitigasyon",
      "Layer 3-4-7 koruma",
      "AI destekli algılama",
      "Detaylı analitik",
      "Özel kural tanımlama",
      "7/24 öncelikli destek",
    ],
  },
  {
    name: "Enterprise",
    badge: "KURUMSAL",
    description: "Kritik altyapılar için",
    price: 1499,
    period: "ay",
    capacity: "1 Tbps",
    features: [
      "1+ Tbps mitigasyon",
      "Layer 3-4-7 koruma",
      "AI + ML algılama",
      "SOC ekibi izleme",
      "BGP Anycast",
      "SLA garantisi (%99.99)",
    ],
  },
];

const features = [
  {
    icon: Shield,
    title: "Çok Katmanlı Koruma",
    description: "Layer 3, 4 ve 7 seviyesinde kapsamlı koruma. Tüm saldırı vektörlerine karşı savunma.",
  },
  {
    icon: Zap,
    title: "Anında Mitigasyon",
    description: "Saldırı algılandığında milisaniyeler içinde otomatik mitigasyon başlar.",
  },
  {
    icon: Activity,
    title: "AI Destekli Algılama",
    description: "Makine öğrenimi ile anormal trafik desenleri otomatik olarak tespit edilir.",
  },
  {
    icon: Eye,
    title: "7/24 İzleme",
    description: "SOC ekibimiz sunucunuzu 7/24 izler ve tehditlere anında müdahale eder.",
  },
  {
    icon: BarChart3,
    title: "Detaylı Raporlama",
    description: "Saldırı geçmişi, trafik analizi ve güvenlik raporları ile tam görünürlük.",
  },
  {
    icon: Settings,
    title: "Özelleştirilebilir Kurallar",
    description: "IP beyaz/kara liste, rate limiting ve özel güvenlik kuralları tanımlayın.",
  },
];

const faqs = [
  {
    question: "DDoS saldırısı nedir?",
    answer: "DDoS (Distributed Denial of Service), birden fazla kaynaktan sunucunuza yoğun trafik göndererek hizmetinizi kesintiye uğratmayı amaçlayan saldırı türüdür. Volumetrik, protokol ve uygulama katmanı saldırıları en yaygın türlerdir.",
  },
  {
    question: "Koruma nasıl aktif edilir?",
    answer: "DNS ayarlarınızı güncellemeniz veya IP adresinizi koruma altına almanız yeterlidir. Kurulum birkaç dakika içinde tamamlanır. Teknik destek ekibimiz tüm süreçte size yardımcı olur.",
  },
  {
    question: "Saldırı sırasında hizmetim kesilir mi?",
    answer: "Hayır, koruma sistemi saldırıyı milisaniyeler içinde algılar ve zararlı trafiği filtreler. Meşru kullanıcılarınız kesintisiz hizmet almaya devam eder.",
  },
  {
    question: "Layer 7 koruma ne anlama geliyor?",
    answer: "Layer 7 (uygulama katmanı) koruma, HTTP flood, Slowloris gibi uygulama seviyesindeki saldırılara karşı koruma sağlar. Bu saldırılar normal trafiğe benzer görünür ve tespit edilmesi daha zordur.",
  },
  {
    question: "Mitigasyon kapasitesi nedir?",
    answer: "Mitigasyon kapasitesi, sistemin aynı anda absorbe edebileceği maksimum saldırı trafiği miktarını gösterir. Örneğin 100 Gbps kapasite, 100 Gbps'e kadar olan saldırıları başarıyla engelleyebilir.",
  },
  {
    question: "SLA garantisi neyi kapsar?",
    answer: "Enterprise paketteki %99.99 SLA garantisi, yıllık maksimum 52 dakika kesinti anlamına gelir. SLA ihlallerinde kredi iadesi yapılır. Tüm saldırı olayları için detaylı raporlar sağlanır.",
  },
];

export default function DDoSKorumaPage() {
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
                  <Shield className="h-4 w-4 text-primary" />
                  Gelişmiş DDoS Koruması
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  DDoS Koruma Hizmeti
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  1+ Tbps mitigasyon kapasitesi ile en büyük saldırılara karşı koruma.
                  Layer 3-7 koruma, AI destekli algılama ve 7/24 SOC izleme.
                </p>
              </div>
            </BlurFade>

            {/* Plans */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                {ddosPlans.map((plan) => (
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

                    <CardHeader className="text-center pt-6">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                      <div className="mt-4">
                        <span className="text-sm text-muted-foreground">₺</span>
                        <span className="text-4xl font-bold">{plan.price.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">/{plan.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {plan.capacity} mitigasyon
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
                    </CardContent>

                    <div className="p-6 pt-0">
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
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
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Neden Bizi Tercih Etmelisiniz?
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Gelişmiş DDoS koruma altyapısı ile kesintisiz hizmet
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

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sık Sorulan Sorular
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  DDoS koruma hakkında merak edilenler
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
