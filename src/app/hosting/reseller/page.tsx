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
  Users,
  Building,
  HardDrive,
  Zap,
  Lock,
  Cpu,
  Download,
  Tag,
  Monitor,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const resellerPlans: HostingPlan[] = [
  {
    name: "Reseller Start",
    badge: "BAŞLANGIÇ",
    description: "Yeni bayiler için",
    price: 299,
    yearlyPrice: 239,
    period: "ay",
    storage: "50 GB",
    bandwidth: "500 GB",
    websites: "20",
    emails: "25",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Users, label: "cPanel Hesabı", value: "20 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "50 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "500 GB" },
      { icon: Monitor, label: "WHM Panel", value: "✓" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Let's Encrypt" },
      { icon: Tag, label: "White Label", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "2 Core / 4 GB" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "Reseller Pro",
    description: "Büyüyen bayiler",
    price: 449,
    yearlyPrice: 359,
    period: "ay",
    storage: "100 GB",
    bandwidth: "1 TB",
    websites: "50",
    emails: "50",
    features: [],
    popular: true,
    detailedFeatures: [
      { icon: Users, label: "cPanel Hesabı", value: "50 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "100 GB SSD", highlight: true },
      { icon: Zap, label: "Trafik", value: "1 TB" },
      { icon: Monitor, label: "WHM Panel", value: "✓" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Let's Encrypt" },
      { icon: Tag, label: "White Label", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "4 Core / 8 GB" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "Reseller Plus",
    badge: "İŞLETME",
    description: "Profesyonel bayiler",
    price: 649,
    yearlyPrice: 519,
    period: "ay",
    storage: "150 GB",
    bandwidth: "2 TB",
    websites: "100",
    emails: "100",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Users, label: "cPanel Hesabı", value: "100 Adet" },
      { icon: HardDrive, label: "Disk Alanı", value: "150 GB NVMe", highlight: true },
      { icon: Zap, label: "Trafik", value: "2 TB" },
      { icon: Monitor, label: "WHM Panel", value: "✓" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Let's Encrypt" },
      { icon: Tag, label: "White Label", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "6 Core / 12 GB" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
  {
    name: "Reseller Max",
    badge: "ENTERPRİSE",
    description: "Kurumsal bayiler",
    price: 999,
    yearlyPrice: 799,
    period: "ay",
    storage: "250 GB",
    bandwidth: "Sınırsız",
    websites: "Sınırsız",
    emails: "Sınırsız",
    features: [],
    popular: false,
    detailedFeatures: [
      { icon: Users, label: "cPanel Hesabı", value: "Sınırsız" },
      { icon: HardDrive, label: "Disk Alanı", value: "250 GB NVMe", highlight: true },
      { icon: Zap, label: "Trafik", value: "Sınırsız" },
      { icon: Monitor, label: "WHM Panel", value: "✓" },
      { icon: Lock, label: "Ücretsiz SSL", value: "Wildcard" },
      { icon: Tag, label: "White Label", value: "✓" },
      { icon: Cpu, label: "CPU / RAM", value: "8 Core / 16 GB" },
      { icon: Download, label: "Yedekleme", value: "Günlük" },
    ],
  },
];

const faqs = [
  {
    question: "Reseller hosting nedir?",
    answer: "Reseller hosting, satın aldığınız hosting kaynaklarını kendi müşterilerinize satmanızı sağlayan bir hizmettir. WHM kontrol paneli ile cPanel hesapları oluşturabilir, kendi hosting şirketinizi kurabilirsiniz.",
  },
  {
    question: "White-label ne anlama geliyor?",
    answer: "White-label, hosting hizmetini kendi markanız altında satmanızı sağlar. Müşterileriniz bizim altyapımızı kullandığınızı görmez, tüm iletişim sizin markanız üzerinden yapılır.",
  },
  {
    question: "WHM paneli nedir ve nasıl kullanılır?",
    answer: "WHM (Web Host Manager), reseller hesabınızı yönetmenizi sağlayan kontrol panelidir. cPanel hesapları oluşturabilir, paketler tanımlayabilir, DNS yönetimi yapabilir ve sunucu ayarlarını düzenleyebilirsiniz.",
  },
  {
    question: "Müşterilerime ne kadar kaynak verebilirim?",
    answer: "Toplam disk alanınız ve trafik kotanız dahilinde istediğiniz şekilde kaynak dağıtımı yapabilirsiniz. WHM üzerinden farklı hosting paketleri oluşturup müşterilerinize atayabilirsiniz.",
  },
  {
    question: "Teknik destek müşterilerime de veriliyor mu?",
    answer: "Teknik destek doğrudan size verilmektedir. Müşterilerinize destek vermek sizin sorumluluğunuzdadır, ancak sunucu seviyesinde karşılaştığınız sorunlarda size yardımcı oluyoruz.",
  },
  {
    question: "Kendi fiyatlarımı belirleyebilir miyim?",
    answer: "Evet, müşterilerinize sunacağınız fiyatları tamamen siz belirlersiniz. Kar marjınızı kendiniz ayarlayabilir, kampanyalar düzenleyebilirsiniz.",
  },
];

export default function ResellerHostingPage() {
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
                  Reseller Hosting
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  WHM kontrol paneli ile kendi hosting şirketinizi kurun.
                  White-label çözümler ve tam destek.
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
                {resellerPlans.map((plan) => (
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
                  Reseller hosting hakkında merak edilenler
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
