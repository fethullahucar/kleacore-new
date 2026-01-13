"use client";

import {
  Layers,
  Monitor,
  Terminal,
  RefreshCcw,
  Activity,
  Shield,
  Cloud,
  Settings,
  Bot,
  Headphones,
  Zap,
  Scale,
} from "lucide-react";
import { motion } from "framer-motion";

const serverFeatures = [
  {
    icon: Layers,
    title: "Güçlü Sanallaştırma",
    description: "KVM ve OpenVZ sanallaştırma teknolojileri ile tam izole, yüksek performanslı sanal sunucular. Donanım düzeyinde kaynak ayrımı.",
  },
  {
    icon: Monitor,
    title: "İşletim Sistemi Seçimi",
    description: "Ubuntu, Debian, CentOS, AlmaLinux, Windows Server ve daha fazlası. İstediğiniz işletim sistemini tek tıkla kurabilirsiniz.",
  },
  {
    icon: Terminal,
    title: "Tam Root Erişimi",
    description: "Sunucunuz üzerinde tam kontrol. SSH ile root erişimi, istediğiniz yazılımı kurma ve yapılandırma özgürlüğü.",
  },
  {
    icon: RefreshCcw,
    title: "Otomatik Yedekleme",
    description: "Günlük ve haftalık otomatik yedekleme. Snapshot özelliği ile istediğiniz zaman anlık görüntü alın ve geri yükleyin.",
  },
  {
    icon: Activity,
    title: "Gerçek Zamanlı İzleme",
    description: "CPU, RAM, disk ve ağ kullanımınızı gerçek zamanlı izleyin. Detaylı grafikler, uyarı sistemleri ve performans raporları.",
  },
  {
    icon: Shield,
    title: "DDoS Koruması",
    description: "Layer 3-7 DDoS koruması tüm sunucularda ücretsiz dahil. 10+ Tbps mitigasyon kapasitesi ile 7/24 koruma.",
  },
  {
    icon: Cloud,
    title: "Özel Ağ (Private Network)",
    description: "Sunucularınız arasında güvenli özel ağ oluşturun. Dahili trafik ücretsiz, yüksek hızlı ve şifreli iletişim.",
  },
  {
    icon: Settings,
    title: "API & Otomasyon",
    description: "RESTful API ve Terraform desteği ile sunucularınızı programatik olarak yönetin. CI/CD pipeline entegrasyonu.",
  },
  {
    icon: Bot,
    title: "Otomatik Kurulum",
    description: "Control panel, web sunucu ve veritabanı kurulumları otomatik. cPanel, Plesk, LAMP/LEMP stack hazır scriptler.",
  },
  {
    icon: Scale,
    title: "Esnek Ölçeklendirme",
    description: "İhtiyacınıza göre kaynakları anında artırın veya azaltın. Kesinti olmadan paket yükseltme ve düşürme.",
  },
  {
    icon: Zap,
    title: "Anında Aktivasyon",
    description: "Ödeme onayından sonra sunucunuz dakikalar içinde otomatik olarak aktif edilir. Hemen kullanmaya başlayın.",
  },
  {
    icon: Headphones,
    title: "7/24 Uzman Destek",
    description: "Sunucu yönetimi konusunda uzman teknik ekibimiz 7/24 hizmetinizde. Canlı destek, ticket ve telefon desteği.",
  },
];

export function ServerFeatures() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
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
            Sunucu hizmetlerimizde sunduğumuz tüm özellikler
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {serverFeatures.map((feature, idx) => (
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
