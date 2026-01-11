"use client";

import {
  Globe,
  Server,
  Shield,
  Cloud,
  Database,
  Cpu,
} from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { BlurFade } from "@/components/magicui/blur-fade";

const services = [
  {
    Icon: Globe,
    name: "Domain Kaydı",
    description:
      "500+ uzantı ile hayalinizdeki domain adını kaydedin. .com, .net, .com.tr ve daha fazlası.",
    href: "/domain/kayit",
    cta: "Domain Ara",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: Server,
    name: "Web Hosting",
    description:
      "cPanel ile yönetilen, SSD destekli Linux hosting. WordPress, PHP ve daha fazlası için optimize edilmiş.",
    href: "/hosting/linux",
    cta: "Paketleri Gör",
    className: "lg:col-span-2 lg:row-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: Cloud,
    name: "WordPress Hosting",
    description:
      "WordPress için özel optimize edilmiş sunucular. Otomatik güncelleme, önbellekleme ve güvenlik.",
    href: "/hosting/wordpress",
    cta: "Keşfet",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: Cpu,
    name: "VDS Sunucular",
    description:
      "Tam kontrol, root erişimi. Kaynaklarınızı dilediğiniz gibi ölçeklendirin.",
    href: "/sunucu/vds",
    cta: "Yapılandır",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: Database,
    name: "Fiziksel Sunucular",
    description:
      "Dedicated sunucu gücü. Yüksek performans gerektiren projeleriniz için ideal.",
    href: "/sunucu/fiziksel",
    cta: "Detaylar",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: Shield,
    name: "SSL Sertifikası",
    description:
      "Web sitenizi koruyun. DV, OV ve EV SSL sertifikaları ile güvenli bağlantı.",
    href: "/ssl",
    cta: "SSL Al",
    className: "lg:col-span-1 lg:row-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
    ),
  },
];

export function Services() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Hizmetlerimiz
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Web varlığınızı güçlendirmek için ihtiyacınız olan tüm çözümler
              tek çatı altında.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <BentoGrid>
            {services.map((service, idx) => (
              <BentoCard key={idx} {...service} />
            ))}
          </BentoGrid>
        </BlurFade>
      </div>
    </section>
  );
}
