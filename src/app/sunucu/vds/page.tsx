"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Cpu,
  HardDrive,
  Globe,
  Shield,
  Zap,
  Check,
  ChevronDown,
  Server,
  Clock,
  Headphones,
  MapPin,
  RefreshCcw,
  Code,
  Layers,
  Monitor,
  Terminal,
  Activity,
  Cloud,
  Settings,
  Bot,
  Lock,
  Truck,
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

const vdsPlans = [
  {
    name: "VDS-1",
    cpu: "1 vCPU",
    ram: "2 GB",
    disk: "30 GB",
    traffic: "Paylaşımlı Trafik",
    port: "50 Gbps Port",
    monthlyPrice: 119.98,
    discountedMonthly: 99.99,
    yearlyPrice: 1007.83,
  },
  {
    name: "VDS-2",
    cpu: "2 vCPU",
    ram: "4 GB",
    disk: "50 GB",
    traffic: "Paylaşımlı Trafik",
    port: "50 Gbps Port",
    monthlyPrice: 167.98,
    discountedMonthly: 139.99,
    yearlyPrice: 1411.10,
  },
  {
    name: "VDS-3",
    cpu: "3 vCPU",
    ram: "6 GB",
    disk: "60 GB",
    traffic: "Paylaşımlı Trafik",
    port: "50 Gbps Port",
    monthlyPrice: 215.98,
    discountedMonthly: 179.99,
    yearlyPrice: 1814.30,
  },
  {
    name: "VDS-4",
    cpu: "4 vCPU",
    ram: "8 GB",
    disk: "80 GB",
    traffic: "Paylaşımlı Trafik",
    port: "50 Gbps Port",
    monthlyPrice: 263.98,
    discountedMonthly: 219.99,
    yearlyPrice: 2217.50,
  },
  {
    name: "VDS-5",
    cpu: "5 vCPU",
    ram: "10 GB",
    disk: "100 GB",
    traffic: "Paylaşımlı Trafik",
    port: "50 Gbps Port",
    monthlyPrice: 347.98,
    discountedMonthly: 289.99,
    yearlyPrice: 2923.10,
  },
];

const planFeatures = [
  { icon: Zap, text: "Anında Aktivasyon" },
  { icon: HardDrive, text: "NVMe Storage" },
  { icon: Globe, text: "Limitsiz Trafik" },
  { icon: MapPin, text: "İstanbul Lokasyon" },
  { icon: Cpu, text: "Platinum 8160" },
  { icon: Shield, text: "%99.9 Uptime" },
  { icon: Check, text: "Ücretsiz Kurulum" },
  { icon: Headphones, text: "7/24 Destek" },
];

const faqs = [
  {
    question: "VDS nedir, VPS'ten farkı ne?",
    answer: "VDS (Virtual Dedicated Server), KVM sanallaştırma teknolojisi ile tam izole edilmiş sanal sunucudur. VPS'e göre daha yüksek performans ve güvenlik sunar. Kendi çekirdeğinizi yönetebilir, özel kernel modülleri yükleyebilirsiniz.",
  },
  {
    question: "Hangi işletim sistemlerini kurabilirim?",
    answer: "Ubuntu, Debian, CentOS, AlmaLinux, Rocky Linux, Fedora gibi Linux dağıtımlarını ve Windows Server 2019/2022 işletim sistemlerini kurabilirsiniz. Kendi ISO dosyanızı da yükleyebilirsiniz.",
  },
  {
    question: "Sunucu ne kadar sürede aktif olur?",
    answer: "Ödeme onayından sonra sunucunuz otomatik olarak birkaç dakika içinde aktif edilir. Kontrol paneline giriş bilgileriniz e-posta ile gönderilir.",
  },
  {
    question: "Root erişimim var mı?",
    answer: "Evet, tüm VDS paketlerinde tam root erişimi sunuyoruz. SSH ile bağlanabilir, istediğiniz yazılımı kurabilir ve sunucunuzu tamamen özelleştirebilirsiniz.",
  },
  {
    question: "DDoS koruması dahil mi?",
    answer: "Evet, tüm VDS paketlerimizde Layer 3-4 DDoS koruması ücretsiz olarak dahildir. Sunucunuz saldırılara karşı 7/24 korunur.",
  },
  {
    question: "Yedekleme yapılıyor mu?",
    answer: "Snapshot özelliği ile istediğiniz zaman sunucunuzun anlık görüntüsünü alabilirsiniz. Ayrıca otomatik yedekleme eklentisi satın alabilirsiniz.",
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

const features = [
  {
    icon: Layers,
    title: "KVM Sanallaştırma",
    description: "Tam izole KVM tabanlı sanallaştırma ile kendi çekirdeğinizi yönetin. Donanım düzeyinde izolasyon ve maksimum performans.",
  },
  {
    icon: Monitor,
    title: "İşletim Sistemi Seçimi",
    description: "Ubuntu, Debian, CentOS, Windows Server ve daha fazlası. İstediğiniz işletim sistemini tek tıkla kurabilirsiniz.",
  },
  {
    icon: Terminal,
    title: "Tam Root Erişimi",
    description: "Sunucunuz üzerinde tam kontrol. SSH ile root erişimi, istediğiniz yazılımı kurma ve yapılandırma özgürlüğü.",
  },
  {
    icon: RefreshCcw,
    title: "Anlık Yedekleme",
    description: "Sunucunuzun anlık görüntüsünü alın. Snapshot özelliği ile istediğiniz zaman geri dönüş yapabilirsiniz.",
  },
  {
    icon: Activity,
    title: "Kaynak İzleme",
    description: "CPU, RAM, disk ve ağ kullanımınızı gerçek zamanlı izleyin. Detaylı grafikler ve raporlarla performansı takip edin.",
  },
  {
    icon: Shield,
    title: "DDoS Koruması",
    description: "Ücretsiz Layer 3-4 DDoS koruması dahil. Sunucunuz saldırılara karşı 7/24 korunur.",
  },
  {
    icon: Cloud,
    title: "Özel Ağ (Private Network)",
    description: "Sunucularınız arasında güvenli özel ağ oluşturun. Dahili trafik ücretsiz ve yüksek hızlı.",
  },
  {
    icon: Settings,
    title: "API Desteği",
    description: "RESTful API ile sunucularınızı programatik olarak yönetin. Otomasyon ve entegrasyon kolaylığı.",
  },
  {
    icon: Bot,
    title: "Otomatik Kurulum",
    description: "Control panel, web sunucu ve veritabanı kurulumları otomatik. cPanel, Plesk, LAMP/LEMP stack hazır scriptler.",
  },
];

interface PlanRowProps {
  plan: typeof vdsPlans[0];
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
          <p className="text-xs text-muted-foreground">NVMe</p>
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

export default function VDSPage() {
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
                  VDS Sunucu Paketleri
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Yeni nesil donanımlara sahip sunucular ile güçlü ve ekonomik VDS sunucu hizmetine
                  KLEACORE ile sahip olun.
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
                  {vdsPlans.map((plan) => (
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
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Neden VDS Sunucu?
                </h2>
                <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                  VDS sunucularımızda sunduğumuz tüm özellikler
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {features.map((feature) => (
                  <div key={feature.title} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sık Sorulan Sorular
                </h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  VDS sunucu hakkında merak edilenler
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
