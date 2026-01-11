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
  Building2,
  Zap,
  Globe,
  HardDrive,
  Mail,
  Database,
  Cpu,
  Download,
  Lock,
  Timer,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans: HostingPlan[] = [
  {
    name: "Kurumsal Start",
    badge: "BAŞLANGIÇ",
    description: "Küçük işletmeler",
    price: 249,
    yearlyPrice: 199,
    period: "ay",
    storage: "25 GB",
    bandwidth: "100 GB",
    websites: "5",
    emails: "25",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "5 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "25 GB NVMe", highlight: true },
      { icon: Zap, label: "Trafik", value: "100 GB" },
      { icon: Mail, label: "E-Posta", value: "25 Adet" },
      { icon: Database, label: "MySQL", value: "10 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Wildcard" },
      { icon: Cpu, label: "CPU / RAM", value: "2 Core / 4 GB" },
      { icon: Timer, label: "Uptime SLA", value: "99.9%" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "Kurumsal Pro",
    description: "Orta ölçekli firmalar",
    price: 399,
    yearlyPrice: 319,
    period: "ay",
    storage: "50 GB",
    bandwidth: "250 GB",
    websites: "15",
    emails: "50",
    features: [],
    popular: true,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "15 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "50 GB NVMe", highlight: true },
      { icon: Zap, label: "Trafik", value: "250 GB" },
      { icon: Mail, label: "E-Posta", value: "50 Adet" },
      { icon: Database, label: "MySQL", value: "25 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Wildcard" },
      { icon: Cpu, label: "CPU / RAM", value: "4 Core / 8 GB" },
      { icon: Timer, label: "Uptime SLA", value: "99.95%" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "Kurumsal Plus",
    badge: "İŞLETME",
    description: "Büyük işletmeler",
    price: 599,
    yearlyPrice: 479,
    period: "ay",
    storage: "80 GB",
    bandwidth: "500 GB",
    websites: "30",
    emails: "100",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "30 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "80 GB NVMe", highlight: true },
      { icon: Zap, label: "Trafik", value: "500 GB" },
      { icon: Mail, label: "E-Posta", value: "100 Adet" },
      { icon: Database, label: "MySQL", value: "50 Adet" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Wildcard" },
      { icon: Cpu, label: "CPU / RAM", value: "6 Core / 12 GB" },
      { icon: Timer, label: "Uptime SLA", value: "99.99%" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "Kurumsal Max",
    badge: "ENTERPRİSE",
    description: "Büyük kuruluşlar",
    price: 899,
    yearlyPrice: 719,
    period: "ay",
    storage: "150 GB",
    bandwidth: "Sınırsız",
    websites: "Sınırsız",
    emails: "Sınırsız",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Globe, label: "Web Sitesi", value: "Sınırsız" },
      { icon: HardDrive, label: "Disk Alanı", value: "150 GB NVMe", highlight: true },
      { icon: Zap, label: "Trafik", value: "Sınırsız" },
      { icon: Mail, label: "E-Posta", value: "Sınırsız" },
      { icon: Database, label: "MySQL", value: "Sınırsız" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Wildcard" },
      { icon: Cpu, label: "CPU / RAM", value: "8 Core / 16 GB" },
      { icon: Timer, label: "Uptime SLA", value: "99.99%" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
];

const faqs = [
  {
    question: "Kurumsal hosting ile standart hosting arasındaki fark nedir?",
    answer: "Kurumsal hosting, daha yüksek kaynak tahsisi (CPU, RAM, disk), garantili uptime SLA, öncelikli teknik destek ve gelişmiş güvenlik özellikleri sunar. Büyük ölçekli projeler ve yoğun trafikli siteler için idealdir.",
  },
  {
    question: "SLA (Service Level Agreement) nedir?",
    answer: "SLA, hizmet seviyesi anlaşmasıdır. Sunucularımızın belirli bir süre içinde ne kadar süre çalışır durumda olacağını garanti eder. Örneğin %99.99 SLA, yılda maksimum 52 dakika kesinti anlamına gelir.",
  },
  {
    question: "Wildcard SSL sertifikası nedir?",
    answer: "Wildcard SSL, ana domain ve tüm alt domainlerinizi tek bir sertifika ile güvence altına alır. Örneğin example.com, www.example.com, blog.example.com gibi tüm subdomainler korunur.",
  },
  {
    question: "Özel destek ne anlama geliyor?",
    answer: "Kurumsal paketlerimizde öncelikli teknik destek sunuyoruz. Talepleriniz daha hızlı değerlendirilir ve uzman ekibimiz tarafından öncelikli olarak çözüme kavuşturulur.",
  },
  {
    question: "Kaynak yükseltme yapabilir miyim?",
    answer: "Evet, işletmeniz büyüdükçe paketinizi yükseltebilir veya ek kaynak talep edebilirsiniz. Yükseltme işlemi kesintisiz olarak gerçekleştirilir.",
  },
  {
    question: "KVKK ve GDPR uyumlu mu?",
    answer: "Evet, sunucularımız Türkiye'de konumlandırılmış olup KVKK gereksinimlerini karşılar. Ayrıca GDPR uyumluluğu için gerekli teknik altyapı mevcuttur.",
  },
];

export default function KurumsalHostingPage() {
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
                  Kurumsal Web Hosting
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Büyük ölçekli projeler için yüksek performans, güvenlik ve
                  7/24 öncelikli destek.
                </p>
                <BillingToggle
                  isYearly={isYearly}
                  onToggle={setIsYearly}
                  className="mt-8"
                />
              </div>
            </BlurFade>

            {/* Pricing */}
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
                  Kurumsal hosting hakkında merak edilenler
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
