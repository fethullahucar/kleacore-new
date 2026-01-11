"use client";

import { Server, HardDrive, Gauge, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const vdsPlans = [
  {
    name: "VDS-2",
    ram: "2GB RAM",
    specs: ["30 GB NVMe", "2 vCPU @ 3.8 GHz", "1 Gbps Port"],
    price: "199",
    href: "/sunucu/vds",
  },
  {
    name: "VDS-4",
    ram: "4GB RAM",
    specs: ["50 GB NVMe", "2 vCPU @ 3.8 GHz", "1 Gbps Port"],
    price: "349",
    href: "/sunucu/vds",
  },
  {
    name: "VDS-8",
    ram: "8GB RAM",
    specs: ["100 GB NVMe", "4 vCPU @ 3.8 GHz", "1 Gbps Port"],
    price: "599",
    href: "/sunucu/vds",
    popular: true,
  },
  {
    name: "VDS-16",
    ram: "16GB RAM",
    specs: ["200 GB NVMe", "6 vCPU @ 3.8 GHz", "1 Gbps Port"],
    price: "999",
    href: "/sunucu/vds",
  },
  {
    name: "VDS-32",
    ram: "32GB RAM",
    specs: ["400 GB NVMe", "8 vCPU @ 3.8 GHz", "1 Gbps Port"],
    price: "1.799",
    href: "/sunucu/vds",
  },
];

interface PlanRowProps {
  plan: {
    name: string;
    ram: string;
    specs: string[];
    price: string;
    href: string;
    popular?: boolean;
  };
  index: number;
}

function PlanRow({ plan, index }: PlanRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {plan.popular && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
      )}

      <div
        className={cn(
          "relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border bg-card transition-all duration-300",
          plan.popular
            ? "border-primary/50"
            : "hover:border-primary/30 hover:bg-accent/30"
        )}
      >
        {plan.popular && (
          <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-foreground text-background text-xs font-medium rounded-full">
            Popüler
          </div>
        )}

        {/* Left: Icon + Name */}
        <div className="flex items-center gap-4 min-w-[140px]">
          <div className="p-2 rounded-lg bg-muted">
            <Server className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <p className="font-bold text-lg">{plan.ram}</p>
            <p className="text-xs text-muted-foreground">{plan.name}</p>
          </div>
        </div>

        {/* Middle: Specs */}
        <div className="flex flex-wrap gap-2 flex-1 justify-start sm:justify-center">
          {plan.specs.map((spec) => (
            <span
              key={spec}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 border border-border/50"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Right: Price + Button */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold">₺{plan.price}</p>
            <p className="text-xs text-muted-foreground">/aylık</p>
          </div>
          <Button
            variant={plan.popular ? "default" : "outline"}
            size="sm"
            className={cn(
              "group/btn whitespace-nowrap",
              plan.popular && "bg-foreground text-background hover:bg-foreground/90"
            )}
            asChild
          >
            <Link href={plan.href}>
              Satın Al
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ServersSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium mb-4">
            <Server className="h-4 w-4 text-primary" />
            Kurumsal Altyapı
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Güçlü Sunucu Çözümleri
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            İhtiyacınıza göre ölçeklenebilir VDS ve dedicated sunucu çözümleri.
            Tüm sunucularda DDoS koruması dahil.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* VDS Servers */}
          <div className="space-y-3">
            {vdsPlans.map((plan, index) => (
              <PlanRow key={plan.name} plan={plan} index={index} />
            ))}
          </div>

          {/* Other Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <Link href="/veri-merkezi/barindirma" className="group">
              <div className="flex items-center gap-4 p-5 rounded-xl border bg-card hover:border-primary/30 hover:bg-accent/30 transition-all duration-300">
                <div className="p-3 rounded-lg bg-orange-500/10">
                  <HardDrive className="h-6 w-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">Colocation</p>
                  <p className="text-sm text-muted-foreground">Sunucu barındırma hizmeti</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₺999<span className="text-sm font-normal text-muted-foreground">/ay</span></p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>

            <Link href="/veri-merkezi/ip-asn" className="group">
              <div className="flex items-center gap-4 p-5 rounded-xl border bg-card hover:border-primary/30 hover:bg-accent/30 transition-all duration-300">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Gauge className="h-6 w-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">IPv4 & ASN</p>
                  <p className="text-sm text-muted-foreground">IP blokları ve ASN hizmeti</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₺499<span className="text-sm font-normal text-muted-foreground">/ay</span></p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
        >
          {[
            { color: "bg-green-500", text: "%99.9 Uptime SLA" },
            { color: "bg-blue-500", text: "DDoS Koruması Dahil" },
            { color: "bg-purple-500", text: "7/24 Teknik Destek" },
            { color: "bg-orange-500", text: "Anlık Kurulum" },
          ].map((item) => (
            <span key={item.text} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
