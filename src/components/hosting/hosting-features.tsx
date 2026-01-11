"use client";

import { Shield, ShieldCheck, Clock, Globe, Server, Headphones, Bot, Database, Activity } from "lucide-react";
import { motion } from "framer-motion";

const hostingFeatures = [
  {
    icon: Shield,
    title: "Ücretsiz SSL Sertifikası",
    description: "Tüm hosting paketlerimizde Let's Encrypt SSL sertifikası ücretsiz olarak sunulmaktadır. Siteniz HTTPS ile güvenle çalışır.",
  },
  {
    icon: Database,
    title: "Ücretsiz Site Taşıma",
    description: "Mevcut hosting sağlayıcınızdan sitemize geçiş yapmak istiyorsanız, teknik ekibimiz sitenizi ücretsiz olarak taşır.",
  },
  {
    icon: Clock,
    title: "Otomatik Yedekleme",
    description: "Web siteleriniz günlük ve haftalık olarak otomatik yedeklenir. İstediğiniz zaman tek tıkla geri yükleme yapabilirsiniz.",
  },
  {
    icon: Globe,
    title: "%100 Türkçe Panel",
    description: "cPanel kontrol paneliniz tamamen Türkçe arayüz ile sunulmaktadır. Hosting yönetimi hiç bu kadar kolay olmamıştı.",
  },
  {
    icon: Headphones,
    title: "7/24 Teknik Destek",
    description: "Uzman teknik destek ekibimiz 7 gün 24 saat hizmetinizdedir. Canlı destek, ticket ve telefon ile bize ulaşabilirsiniz.",
  },
  {
    icon: ShieldCheck,
    title: "Zararlı Yazılım Koruması",
    description: "Sunucularımızda sürekli çalışan malware tarayıcıları ile zararlı dosyalar anında tespit edilip karantinaya alınır.",
  },
  {
    icon: Bot,
    title: "Bot Engelleme Sistemi",
    description: "Gelişmiş bot engelleme teknolojimiz ile kötü niyetli botlar engellenir, sunucu kaynaklarınız korunur.",
  },
  {
    icon: Server,
    title: "Gelişmiş Altyapı",
    description: "SSH erişimi, Git desteği, Node.js, Python ve daha birçok geliştirici aracı tüm paketlerimizde standart olarak sunulur.",
  },
  {
    icon: Activity,
    title: "%99.9 Uptime Garantisi",
    description: "Tier III+ veri merkezlerimizde barındırılan sunucularımız ile %99.9 uptime SLA garantisi sağlıyoruz.",
  },
];

export function HostingFeatures() {
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
            Hosting paketlerimizde sunduğumuz tüm özellikler
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {hostingFeatures.map((feature, idx) => (
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
