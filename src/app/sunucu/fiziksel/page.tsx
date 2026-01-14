"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ServerFeatures } from "@/components/sunucu/server-features";
import { ServerFaq } from "@/components/sunucu/server-faq";
import {
  Cpu,
  HardDrive,
  Shield,
  Zap,
  Check,
  ChevronDown,
  Wrench,
  Headphones,
  MapPin,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const dedicatedPlans = [
  {
    name: "DS-E3",
    cpu: "Intel Xeon E-2336",
    cores: "6C / 12T",
    ram: "32 GB",
    disk: "2x 500 GB",
    bandwidth: "10 TB",
    port: "1 Gbps",
    monthlyPrice: 2999.00,
    discountedMonthly: 2499.00,
    yearlyPrice: 25190.00,
  },
  {
    name: "DS-E5",
    cpu: "Intel Xeon E-2388G",
    cores: "8C / 16T",
    ram: "64 GB",
    disk: "2x 1 TB",
    bandwidth: "20 TB",
    port: "1 Gbps",
    monthlyPrice: 4799.00,
    discountedMonthly: 3999.00,
    yearlyPrice: 40310.00,
  },
  {
    name: "DS-Silver",
    cpu: "Intel Xeon Silver 4314",
    cores: "16C / 32T",
    ram: "128 GB",
    disk: "4x 1 TB",
    bandwidth: "50 TB",
    port: "10 Gbps",
    monthlyPrice: 8999.00,
    discountedMonthly: 7499.00,
    yearlyPrice: 75590.00,
  },
  {
    name: "DS-Gold",
    cpu: "2x Intel Xeon Gold 6330",
    cores: "56C / 112T",
    ram: "256 GB",
    disk: "4x 2 TB",
    bandwidth: "Sınırsız",
    port: "10 Gbps",
    monthlyPrice: 17999.00,
    discountedMonthly: 14999.00,
    yearlyPrice: 151190.00,
  },
];

const planFeatures = [
  { icon: Zap, text: "4 Saat Kurulum" },
  { icon: HardDrive, text: "NVMe SSD" },
  { icon: Globe, text: "Full Root Erişimi" },
  { icon: MapPin, text: "İstanbul / Frankfurt" },
  { icon: Cpu, text: "Dedicated Hardware" },
  { icon: Shield, text: "%99.99 Uptime" },
  { icon: Wrench, text: "IPMI/KVM Erişimi" },
  { icon: Headphones, text: "7/24 Destek" },
];

interface PlanRowProps {
  plan: typeof dedicatedPlans[0];
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
      <div className="grid grid-cols-8 items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
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

        {/* CPU */}
        <div className="col-span-2">
          <p className="font-semibold text-sm">{plan.cpu}</p>
          <p className="text-xs text-muted-foreground">{plan.cores}</p>
        </div>

        {/* RAM */}
        <div className="text-center">
          <p className="font-semibold">{plan.ram}</p>
          <p className="text-xs text-muted-foreground">DDR4 ECC</p>
        </div>

        {/* Disk */}
        <div className="text-center">
          <p className="font-semibold">{plan.disk}</p>
          <p className="text-xs text-muted-foreground">NVMe SSD</p>
        </div>

        {/* Bandwidth */}
        <div className="text-center">
          <p className="font-semibold text-sm">{plan.bandwidth}</p>
          <p className="text-xs text-muted-foreground">{plan.port}</p>
        </div>

        {/* Fiyat */}
        <div className="text-right">
          <p className="text-xs text-muted-foreground line-through">
            {originalPrice.toLocaleString("tr-TR")}₺/ay
          </p>
          <p className="font-bold text-lg">
            {price.toLocaleString("tr-TR")}₺<span className="text-sm font-normal text-muted-foreground">/ay</span>
          </p>
        </div>

        {/* Button */}
        <div className="text-right">
          <Button size="sm" className="px-6">
            Yapılandır
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

export default function FizikselSunucuPage() {
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
                  Fiziksel Sunucu Paketleri
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Intel Xeon işlemciler, ECC RAM ve NVMe SSD diskler ile
                  kurumsal sınıf dedicated sunucu çözümleri.
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
              <Card className="max-w-7xl mx-auto overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-8 gap-4 p-4 bg-muted/50 border-b text-sm font-medium text-muted-foreground">
                  <div>Paket</div>
                  <div className="col-span-2">İşlemci</div>
                  <div className="text-center">RAM</div>
                  <div className="text-center">Disk</div>
                  <div className="text-center">Trafik</div>
                  <div className="text-right">Fiyat</div>
                  <div></div>
                </div>

                {/* Table Body */}
                <CardContent className="p-0">
                  {dedicatedPlans.map((plan) => (
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
        <ServerFaq />

        {/* Specs */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Teknik Altyapı
                </h2>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Sunucu Donanımı</h3>
                    <ul className="space-y-3 text-sm">
                      {[
                        "Intel Xeon E / Silver / Gold",
                        "DDR4 ECC Registered RAM",
                        "Enterprise NVMe SSD",
                        "Hardware RAID opsiyonu",
                        "Redundant güç kaynağı",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Network</h3>
                    <ul className="space-y-3 text-sm">
                      {[
                        "1 Gbps - 10 Gbps port",
                        "Tier-1 carrier bağlantıları",
                        "BGP peering",
                        "DDoS mitigasyon (10Tbps+)",
                        "Private VLAN desteği",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Veri Merkezi</h3>
                    <ul className="space-y-3 text-sm">
                      {[
                        "Tier III+ sertifikalı DC",
                        "N+1 soğutma sistemi",
                        "UPS ve jeneratör",
                        "7/24 fiziksel güvenlik",
                        "Biometrik erişim kontrolü",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Özel Yapılandırma mı Gerekiyor?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Standart paketler dışında özel sunucu yapılandırması için
                  satış ekibimizle iletişime geçin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Teklif Al
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    <Headphones className="mr-2 h-4 w-4" />
                    0850 123 45 67
                  </Button>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
