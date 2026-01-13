"use client";

import {
  Building2,
  Battery,
  Thermometer,
  Shield,
  Wifi,
  Eye,
  Clock,
  Wrench,
  Network,
  HardDrive,
  Lock,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const datacenterFeatures = [
  {
    icon: Building2,
    title: "Tier III+ Sertifikalı",
    description: "Uluslararası standartlarda tasarlanmış veri merkezi altyapısı. %99.999 uptime garantisi ile kesintisiz hizmet.",
  },
  {
    icon: Battery,
    title: "Kesintisiz Güç Kaynağı",
    description: "N+1 redundant UPS sistemleri ve diesel jeneratörler. 72+ saat özerk çalışma kapasitesi ile tam güvence.",
  },
  {
    icon: Thermometer,
    title: "Hassas İklimlendirme",
    description: "N+1 CRAC soğutma sistemleri, sıcak/soğuk koridor izolasyonu. Optimum çalışma sıcaklığı garantisi.",
  },
  {
    icon: Shield,
    title: "Fiziksel Güvenlik",
    description: "Biometrik erişim kontrolü, 7/24 güvenlik personeli, CCTV kayıt ve izleme. Çok katmanlı güvenlik.",
  },
  {
    icon: Wifi,
    title: "Premium Ağ Bağlantısı",
    description: "Çoklu Tier-1 carrier bağlantıları, düşük latency, BGP routing. 10 Gbps'e kadar port seçenekleri.",
  },
  {
    icon: Eye,
    title: "7/24 NOC İzleme",
    description: "Network Operations Center ile proaktif izleme. Anormallik tespiti ve hızlı müdahale.",
  },
  {
    icon: Clock,
    title: "Hızlı Kurulum",
    description: "Sunucunuz teslim alındıktan sonra 24 saat içinde rack'e monte edilir ve ağa bağlanır.",
  },
  {
    icon: Wrench,
    title: "Remote Hands Desteği",
    description: "Uzaktan fiziksel müdahale hizmeti. Kablo bağlantısı, yeniden başlatma, donanım değişikliği.",
  },
  {
    icon: Network,
    title: "Özel VLAN & Private Ağ",
    description: "İzole ağ segmentleri ile güvenli iletişim. Sunucularınız arası private network imkanı.",
  },
  {
    icon: HardDrive,
    title: "KVM over IP",
    description: "Uzaktan konsol erişimi ile BIOS seviyesinde kontrol. OS çökmelerinde bile tam erişim.",
  },
  {
    icon: Lock,
    title: "DDoS Koruması",
    description: "Volumetrik ve uygulama katmanı DDoS saldırılarına karşı koruma. Her zaman aktif filtreleme.",
  },
  {
    icon: Headphones,
    title: "Öncelikli Teknik Destek",
    description: "Uzman teknik ekibimiz 7/24 hizmetinizde. Ortalama 15 dakika yanıt süresi garantisi.",
  },
];

export function DatacenterFeatures() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Kurumsal altyapı ve profesyonel hizmet anlayışımız
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {datacenterFeatures.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
