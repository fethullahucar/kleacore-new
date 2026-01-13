"use client";

import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { DatacenterFeatures } from "@/components/veri-merkezi/datacenter-features";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  Globe,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const cdnPlans = [
  {
    name: "Starter",
    badge: "BAŞLANGIÇ",
    description: "Kişisel siteler için",
    price: 99,
    period: "ay",
    bandwidth: "500 GB",
    features: [
      "500 GB aylık trafik",
      "50+ global PoP",
      "SSL sertifikası dahil",
      "Temel DDoS koruması",
      "Gerçek zamanlı analitik",
    ],
  },
  {
    name: "Business",
    description: "İşletmeler için",
    price: 299,
    period: "ay",
    bandwidth: "2 TB",
    popular: true,
    features: [
      "2 TB aylık trafik",
      "100+ global PoP",
      "Wildcard SSL dahil",
      "Gelişmiş DDoS koruması",
      "WAF koruması",
      "Görsel optimizasyon",
    ],
  },
  {
    name: "Enterprise",
    badge: "KURUMSAL",
    description: "Kurumsal projeler için",
    price: 799,
    period: "ay",
    bandwidth: "10 TB",
    features: [
      "10 TB aylık trafik",
      "200+ global PoP",
      "Özel SSL sertifikası",
      "Premium DDoS koruması",
      "WAF + Bot koruması",
      "Video streaming desteği",
      "API erişimi",
    ],
  },
];

const faqs = [
  {
    question: "CDN nedir ve ne işe yarar?",
    answer: "CDN (Content Delivery Network), web sitenizin içeriğini dünya genelindeki sunuculara dağıtarak kullanıcılarınıza en yakın lokasyondan hizmet verir. Bu sayede sayfa yükleme süreleri düşer, kullanıcı deneyimi artar.",
  },
  {
    question: "CDN kurulumu zor mu?",
    answer: "Hayır, kurulum oldukça basittir. DNS ayarlarınızda CNAME kaydı oluşturarak veya nameserver değişikliği yaparak dakikalar içinde CDN hizmetini aktif edebilirsiniz. Teknik destek ekibimiz kurulum sürecinde yardımcı olur.",
  },
  {
    question: "Hangi içerik türleri önbelleklenir?",
    answer: "Görsel dosyalar (JPG, PNG, WebP), JavaScript, CSS, fontlar ve diğer statik içerikler otomatik olarak önbelleklenir. Dinamik içerikler için özel cache kuralları tanımlayabilirsiniz.",
  },
  {
    question: "SSL sertifikası dahil mi?",
    answer: "Evet, tüm CDN paketlerimizde ücretsiz SSL sertifikası dahildir. Starter pakette standart SSL, Business ve Enterprise paketlerde Wildcard SSL sunulmaktadır.",
  },
  {
    question: "Trafik kotasını aşarsam ne olur?",
    answer: "Kotanızı aştığınızda hizmetiniz kesilmez. Fazla kullanım GB başına faturalandırılır veya bir üst pakete yükseltme yapabilirsiniz. Yaklaşan kota aşımları için e-posta bildirimleri gönderilir.",
  },
  {
    question: "Video streaming desteği nasıl çalışır?",
    answer: "Enterprise pakette HLS ve DASH protokolleri ile video streaming desteği sunulmaktadır. Canlı yayın ve VOD içerikleri için optimize edilmiş altyapı ile kesintisiz video deneyimi sağlanır.",
  },
];

export default function CDNPage() {
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
                  <Globe className="h-4 w-4 text-primary" />
                  Global İçerik Dağıtım Ağı
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  CDN Hizmeti
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  200+ lokasyonda içerik dağıtımı ile web sitenizi hızlandırın.
                  Düşük gecikme, yüksek performans ve güvenlik bir arada.
                </p>
              </div>
            </BlurFade>

            {/* Plans */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                {cdnPlans.map((plan) => (
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
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground text-sm">/{plan.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {plan.bandwidth} aylık trafik
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
                  CDN hizmeti hakkında merak edilenler
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
