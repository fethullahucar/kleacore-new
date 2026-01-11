"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingCard, type HostingPlan } from "@/components/hosting/pricing-card";
import { BillingToggle } from "@/components/hosting/billing-toggle";
import { HostingFeatures } from "@/components/hosting/hosting-features";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Zap,
  Globe,
  HardDrive,
  Mail,
  Cpu,
  Download,
  Lock,
  Rocket,
  CircleDot,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans: HostingPlan[] = [
  {
    name: "WP Starter",
    badge: "BAŞLANGIÇ",
    description: "Bloglar için ideal",
    price: 59,
    yearlyPrice: 47,
    period: "ay",
    storage: "5 GB",
    bandwidth: "25 GB",
    websites: "1",
    emails: "5",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "1 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "5 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "25 GB" },
      { icon: Mail, label: "E-Posta", value: "5 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "1 Core / 1 GB" },
      { icon: Rocket, label: "LiteSpeed Cache", value: "✓" },
      { icon: CircleDot, label: "WP Staging", value: "✓" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "WP Pro",
    description: "Profesyonel bloglar",
    price: 99,
    yearlyPrice: 79,
    period: "ay",
    storage: "10 GB",
    bandwidth: "50 GB",
    websites: "3",
    emails: "10",
    features: [],
    popular: true,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "3 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "10 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "50 GB" },
      { icon: Mail, label: "E-Posta", value: "10 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "2 Core / 2 GB" },
      { icon: Rocket, label: "LiteSpeed Cache", value: "✓" },
      { icon: CircleDot, label: "WP Staging", value: "✓" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "WP Business",
    badge: "İŞLETME",
    description: "E-ticaret siteleri",
    price: 149,
    yearlyPrice: 119,
    period: "ay",
    storage: "20 GB",
    bandwidth: "100 GB",
    websites: "5",
    emails: "25",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "5 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "20 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "100 GB" },
      { icon: Mail, label: "E-Posta", value: "25 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "2 Core / 4 GB" },
      { icon: Rocket, label: "LiteSpeed Cache", value: "✓" },
      { icon: CircleDot, label: "WP Staging", value: "✓" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "WP Enterprise",
    badge: "KURUMSAL",
    description: "Yüksek trafik için",
    price: 249,
    yearlyPrice: 199,
    period: "ay",
    storage: "40 GB",
    bandwidth: "200 GB",
    websites: "Sınırsız",
    emails: "Sınırsız",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "Sınırsız" },
      { icon: HardDrive, label: "Disk Alanı", value: "40 GB NVMe", highlight: true },
      { icon: Zap, label: "Trafik", value: "200 GB" },
      { icon: Mail, label: "E-Posta", value: "Sınırsız" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Wildcard" },
      { icon: Cpu, label: "CPU / RAM", value: "4 Core / 8 GB" },
      { icon: Rocket, label: "LiteSpeed Cache", value: "✓" },
      { icon: CircleDot, label: "WP Staging", value: "✓" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
];

const faqs = [
  {
    question: "WordPress hosting ile normal hosting arasındaki fark nedir?",
    answer: "WordPress hosting, WordPress için özel optimize edilmiş sunucular kullanır. LiteSpeed Cache, otomatik güncellemeler, staging ortamı ve WordPress'e özel güvenlik kuralları gibi özellikler standart olarak sunulur.",
  },
  {
    question: "WordPress otomatik olarak kurulu mu geliyor?",
    answer: "Evet, tüm WordPress hosting paketlerimizde 1-tık WordPress kurulumu mevcuttur. Hesabınız açıldıktan sonra dakikalar içinde WordPress sitenizi kurabilirsiniz.",
  },
  {
    question: "WP Staging nedir?",
    answer: "WP Staging, canlı sitenizin bir kopyasını oluşturarak değişikliklerinizi test etmenizi sağlar. Tema, eklenti veya içerik değişikliklerini önce test ortamında deneyebilir, sorun yoksa canlıya alabilirsiniz.",
  },
  {
    question: "LiteSpeed Cache nedir ve nasıl çalışır?",
    answer: "LiteSpeed Cache, WordPress için özel geliştirilmiş bir önbellekleme eklentisidir. Sayfa önbellekleme, görsel optimizasyonu, CSS/JS minify ve veritabanı optimizasyonu gibi özelliklerle sitenizi hızlandırır.",
  },
  {
    question: "WordPress güncellemeleri otomatik yapılıyor mu?",
    answer: "Evet, WordPress çekirdek güncellemeleri, tema ve eklenti güncellemeleri otomatik olarak yapılabilir. Bu özelliği cPanel üzerinden açıp kapatabilirsiniz.",
  },
  {
    question: "WooCommerce için uygun mu?",
    answer: "Evet, özellikle WP Business ve WP Enterprise paketlerimiz WooCommerce e-ticaret siteleri için idealdir. Yüksek performans ve güvenlik özellikleri ile online mağazanızı sorunsuz çalıştırabilirsiniz.",
  },
];

export default function WordPressHostingPage() {
  const [isYearly, setIsYearly] = useState(false);

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
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  WordPress Hosting
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  WordPress için özel optimize edilmiş sunucular. Otomatik
                  güncellemeler, önbellekleme ve güvenlik dahil.
                </p>
                <BillingToggle
                  isYearly={isYearly}
                  onToggle={setIsYearly}
                  className="mt-8"
                />
              </div>
            </BlurFade>

            {/* Pricing Cards */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {plans.map((plan) => (
                  <PricingCard key={plan.name} plan={plan} isYearly={isYearly} />
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Hosting Features */}
        <HostingFeatures />

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sık Sorulan Sorular
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  WordPress hosting hakkında merak edilenler
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
