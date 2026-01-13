"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ServerFeatures } from "@/components/sunucu/server-features";
import {
  Cpu,
  HardDrive,
  Shield,
  Zap,
  Check,
  ChevronDown,
  Globe,
  Headphones,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const vpsPlans = [
  {
    name: "VPS-1",
    cpu: "1 vCPU",
    ram: "2 GB",
    disk: "40 GB",
    traffic: "1 TB Trafik",
    port: "1 Gbps Port",
    monthlyPrice: 119.00,
    discountedMonthly: 99.00,
    yearlyPrice: 999.00,
  },
  {
    name: "VPS-2",
    cpu: "2 vCPU",
    ram: "4 GB",
    disk: "80 GB",
    traffic: "2 TB Trafik",
    port: "1 Gbps Port",
    monthlyPrice: 239.00,
    discountedMonthly: 199.00,
    yearlyPrice: 2007.00,
  },
  {
    name: "VPS-3",
    cpu: "4 vCPU",
    ram: "8 GB",
    disk: "160 GB",
    traffic: "4 TB Trafik",
    port: "1 Gbps Port",
    monthlyPrice: 479.00,
    discountedMonthly: 399.00,
    yearlyPrice: 4023.00,
  },
  {
    name: "VPS-4",
    cpu: "6 vCPU",
    ram: "16 GB",
    disk: "320 GB",
    traffic: "8 TB Trafik",
    port: "1 Gbps Port",
    monthlyPrice: 899.00,
    discountedMonthly: 749.00,
    yearlyPrice: 7551.00,
  },
];

const planFeatures = [
  { icon: Zap, text: "Anında Aktivasyon" },
  { icon: HardDrive, text: "SSD Storage" },
  { icon: Globe, text: "1 IPv4 Dahil" },
  { icon: MapPin, text: "Avrupa Lokasyon" },
  { icon: Cpu, text: "Intel Xeon" },
  { icon: Shield, text: "%99.9 Uptime" },
  { icon: Check, text: "Ücretsiz Kurulum" },
  { icon: Headphones, text: "7/24 Destek" },
];

const faqs = [
  {
    question: "VPS nedir?",
    answer: "VPS (Virtual Private Server), fiziksel bir sunucunun sanal olarak bölünmesiyle oluşturulan özel sunucudur. Paylaşımlı hostinge göre daha fazla kaynak ve kontrol sunar, dedicated sunucuya göre daha ekonomiktir.",
  },
  {
    question: "OpenVZ sanallaştırma nedir?",
    answer: "OpenVZ, konteyner tabanlı bir sanallaştırma teknolojisidir. Düşük kaynak tüketimi ve yüksek performans sunar. Linux işletim sistemleri için idealdir.",
  },
  {
    question: "Hangi işletim sistemlerini kurabilirim?",
    answer: "Ubuntu, Debian, CentOS, AlmaLinux ve diğer popüler Linux dağıtımlarını kurabilirsiniz. Windows desteği için VDS sunucularımıza bakabilirsiniz.",
  },
  {
    question: "Sunucu ne kadar sürede aktif olur?",
    answer: "Ödeme onayından sonra sunucunuz otomatik olarak birkaç dakika içinde aktif edilir. Kontrol paneline giriş bilgileriniz e-posta ile gönderilir.",
  },
  {
    question: "Root erişimim var mı?",
    answer: "Evet, tüm VPS paketlerinde tam root erişimi sunuyoruz. SSH ile bağlanabilir, istediğiniz yazılımı kurabilirsiniz.",
  },
  {
    question: "Trafik limiti aşılırsa ne olur?",
    answer: "Trafik limitiniz aşıldığında sunucunuz kapatılmaz, sadece hız kısıtlaması uygulanır. Ek trafik paketi satın alabilirsiniz.",
  },
  {
    question: "Paket yükseltme yapabilir miyim?",
    answer: "Evet, istediğiniz zaman daha üst bir pakete geçiş yapabilirsiniz. Yükseltme işlemi kısa bir kesinti ile gerçekleşir.",
  },
  {
    question: "Teknik destek 7/24 mü?",
    answer: "Evet, teknik destek ekibimiz 7/24 hizmetinizdedir. Canlı destek, ticket sistemi veya telefon ile bize ulaşabilirsiniz.",
  },
];

interface PlanRowProps {
  plan: typeof vpsPlans[0];
  billingPeriod: "monthly" | "yearly";
  isExpanded: boolean;
  onToggle: () => void;
}

function PlanRow({ plan, billingPeriod, isExpanded, onToggle }: PlanRowProps) {
  const price = billingPeriod === "monthly" ? plan.discountedMonthly : (plan.yearlyPrice / 12);
  const originalPrice = billingPeriod === "monthly" ? plan.monthlyPrice : (plan.yearlyPrice / 12 * 1.16);

  return (
    <div className="border-b last:border-b-0">
      {/* Main Row */}
      <div className="grid grid-cols-7 items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
        {/* Paket */}
        <div>
          <p className="font-bold">{plan.name}</p>
          <button
            onClick={onToggle}
            className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            Tüm Özellikleri Gör
            <ChevronDown className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")} />
          </button>
        </div>

        {/* Core */}
        <div className="text-center">
          <p className="font-semibold">{plan.cpu}</p>
          <p className="text-xs text-muted-foreground">İşlemci</p>
        </div>

        {/* Bellek */}
        <div className="text-center">
          <p className="font-semibold">{plan.ram}</p>
          <p className="text-xs text-muted-foreground">DDR4</p>
        </div>

        {/* Disk */}
        <div className="text-center">
          <p className="font-semibold">{plan.disk}</p>
          <p className="text-xs text-muted-foreground">SSD</p>
        </div>

        {/* Trafik */}
        <div className="text-center">
          <p className="font-semibold text-sm">{plan.traffic}</p>
          <p className="text-xs text-muted-foreground">{plan.port}</p>
        </div>

        {/* Fiyat */}
        <div className="text-right">
          <p className="text-xs text-muted-foreground line-through">
            {originalPrice.toFixed(2)}₺/ay
          </p>
          <p className="font-bold text-lg">
            {price.toFixed(2)}₺<span className="text-sm font-normal text-muted-foreground">/ay</span>
          </p>
        </div>

        {/* Button */}
        <div className="text-right">
          <Button size="sm" className="px-6">
            Satın Al
          </Button>
        </div>
      </div>

      {/* Expandable Features */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 bg-muted/20">
              <div className="grid grid-cols-4 gap-4">
                {planFeatures.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-2 text-sm">
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const locations = [
  { id: "tr", name: "Türkiye", city: "İstanbul", code: "tr" },
  { id: "de", name: "Almanya", city: "Frankfurt", code: "de" },
  { id: "us", name: "Amerika", city: "New York", code: "us" },
  { id: "nl", name: "Hollanda", city: "Amsterdam", code: "nl" },
];

export default function VPSSunucuPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("tr");

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero & Pricing */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  VPS Sunucu Paketleri
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Uygun fiyatlı, güvenilir ve yönetimi kolay VPS sunucu çözümleri.
                  Kişisel projelerden küçük işletmelere kadar ideal.
                </p>
              </div>
            </BlurFade>

            {/* Location Selector */}
            <BlurFade delay={0.15} inView>
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 p-1 rounded-xl border bg-muted/50">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        selectedLocation === location.id
                          ? "bg-background shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      )}
                    >
                      <span className={`fi fi-${location.code} text-lg`} />
                      <span className="hidden sm:inline">{location.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </BlurFade>

            {/* Billing Toggle */}
            <BlurFade delay={0.2} inView>
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center rounded-full border p-1 bg-muted/50">
                  <button
                    onClick={() => setBillingPeriod("monthly")}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-medium transition-all",
                      billingPeriod === "monthly"
                        ? "bg-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Aylık
                  </button>
                  <button
                    onClick={() => setBillingPeriod("yearly")}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-medium transition-all relative",
                      billingPeriod === "yearly"
                        ? "bg-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Yıllık
                    <span className="absolute -top-3 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                      %16 İndirim
                    </span>
                  </button>
                </div>
              </div>
            </BlurFade>

            {/* Pricing Table */}
            <BlurFade delay={0.2} inView>
              <Card className="max-w-6xl mx-auto overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-7 gap-4 p-4 bg-muted/50 border-b text-sm font-medium text-muted-foreground">
                  <div>Paket</div>
                  <div className="text-center">Core</div>
                  <div className="text-center">Bellek</div>
                  <div className="text-center">Disk</div>
                  <div className="text-center">Trafik</div>
                  <div className="text-right">Fiyat</div>
                  <div></div>
                </div>

                {/* Table Body */}
                <CardContent className="p-0">
                  {vpsPlans.map((plan) => (
                    <PlanRow
                      key={plan.name}
                      plan={plan}
                      billingPeriod={billingPeriod}
                      isExpanded={expandedPlan === plan.name}
                      onToggle={() => setExpandedPlan(expandedPlan === plan.name ? null : plan.name)}
                    />
                  ))}
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </section>

        {/* Features */}
        <ServerFeatures />

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sık Sorulan Sorular
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  VPS sunucu hakkında merak edilenler
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
