"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingCard, type HostingPlan } from "@/components/hosting/pricing-card";
import { BillingToggle } from "@/components/hosting/billing-toggle";
import { FeatureComparison } from "@/components/hosting/feature-comparison";
import { HostingFeatures } from "@/components/hosting/hosting-features";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Server,
  HardDrive,
  Globe,
  Mail,
  Database,
  Lock,
  Link2,
  Cpu,
  Download,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans: HostingPlan[] = [
  {
    name: "Starter",
    badge: "BAŞLANGIÇ",
    description: "Kişisel siteler için",
    price: 49,
    yearlyPrice: 39,
    period: "ay",
    storage: "1 GB",
    bandwidth: "5 GB",
    websites: "1",
    emails: "2",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "1 Adet" },
      { icon: Link2, label: "Subdomain", value: "5 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "1 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "5 GB" },
      { icon: Mail, label: "E-Posta", value: "2 Adet" },
      { icon: Database, label: "MySQL", value: "1 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "1 Core / 1 GB" },
      { icon: Download, label: "Yedekleme", value: "Haftalık" },
    ],
  },
  {
    name: "Professional",
    description: "Büyüyen projeler için",
    price: 79,
    yearlyPrice: 63,
    period: "ay",
    storage: "2 GB",
    bandwidth: "10 GB",
    websites: "1",
    emails: "5",
    features: [],
    popular: true,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "1 Adet" },
      { icon: Link2, label: "Subdomain", value: "5 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "2 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "10 GB" },
      { icon: Mail, label: "E-Posta", value: "5 Adet" },
      { icon: Database, label: "MySQL", value: "1 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "1 Core / 1 GB" },
      { icon: Download, label: "Yedekleme", value: "Haftalık" },
    ],
  },
  {
    name: "Business",
    badge: "İŞLETME",
    description: "KOBİ'ler için ideal",
    price: 119,
    yearlyPrice: 95,
    period: "ay",
    storage: "3 GB",
    bandwidth: "15 GB",
    websites: "1",
    emails: "10",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "1 Adet" },
      { icon: Link2, label: "Subdomain", value: "5 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "3 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "15 GB" },
      { icon: Mail, label: "E-Posta", value: "10 Adet" },
      { icon: Database, label: "MySQL", value: "1 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "1 Core / 2 GB" },
      { icon: Download, label: "Yedekleme", value: "Haftalık" },
    ],
  },
  {
    name: "Enterprise",
    badge: "KURUMSAL",
    description: "Yoğun trafik için",
    price: 179,
    yearlyPrice: 143,
    period: "ay",
    storage: "5 GB",
    bandwidth: "25 GB",
    websites: "1",
    emails: "20",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "1 Adet" },
      { icon: Link2, label: "Subdomain", value: "10 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "5 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "25 GB" },
      { icon: Mail, label: "E-Posta", value: "20 Adet" },
      { icon: Database, label: "MySQL", value: "3 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "2 Core / 4 GB" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
];

const faqs = [
  {
    question: "Linux hosting nedir?",
    answer: "Linux hosting, web sitelerinizi Linux işletim sistemi üzerinde çalışan sunucularda barındırma hizmetidir. PHP, MySQL, WordPress gibi popüler web teknolojileri ile mükemmel uyum sağlar.",
  },
  {
    question: "Hangi kontrol paneli kullanılıyor?",
    answer: "Tüm Linux hosting paketlerimizde cPanel kontrol paneli sunuyoruz. cPanel, web sitenizi, e-postalarınızı, veritabanlarınızı ve dosyalarınızı kolayca yönetmenizi sağlar.",
  },
  {
    question: "SSL sertifikası ücretsiz mi?",
    answer: "Evet, tüm hosting paketlerimizde Let's Encrypt SSL sertifikası ücretsiz olarak sunulmaktadır. SSL sertifikası sitenizin güvenliğini sağlar ve SEO'nuzu olumlu etkiler.",
  },
  {
    question: "Paket yükseltme yapabilir miyim?",
    answer: "Evet, istediğiniz zaman daha üst bir pakete geçiş yapabilirsiniz. Yükseltme işlemi anında gerçekleşir ve herhangi bir kesinti yaşamazsınız.",
  },
  {
    question: "Yedekleme ne sıklıkla yapılıyor?",
    answer: "Starter, Professional ve Business paketlerinde haftalık, Enterprise paketinde ise günlük otomatik yedekleme yapılmaktadır. İstediğiniz zaman yedeklerinize erişebilirsiniz.",
  },
  {
    question: "Teknik destek 7/24 mü?",
    answer: "Evet, teknik destek ekibimiz 7/24 hizmetinizdedir. Canlı destek, ticket sistemi veya telefon ile bize ulaşabilirsiniz.",
  },
];

export default function LinuxHostingPage() {
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
                  Linux Web Hosting
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  NVMe SSD diskler, LiteSpeed web server ve cPanel ile güçlü,
                  hızlı ve güvenilir hosting çözümleri.
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

        {/* Comparison Table */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Paket Karşılaştırma
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Tüm özellikleri detaylı karşılaştırın
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <Card>
                <CardContent className="p-0 md:p-6">
                  <FeatureComparison />
                </CardContent>
              </Card>
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
                  Linux hosting hakkında merak edilenler
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
