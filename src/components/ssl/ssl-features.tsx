"use client";

import { Shield, ShieldCheck, Clock, Globe, Headphones, Zap, RefreshCcw, Lock, Award, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const sslFeatures = [
  {
    icon: Zap,
    title: "Hızlı Aktivasyon",
    description: "DV sertifikalar dakikalar içinde, OV ve EV sertifikalar 1-3 iş günü içinde aktif edilir. Hemen güvenli bağlantı sağlayın.",
  },
  {
    icon: Shield,
    title: "256-bit Güçlü Şifreleme",
    description: "Endüstri standardı 256-bit SSL şifreleme ve SHA-256 algoritması ile verileriniz en üst düzeyde korunur.",
  },
  {
    icon: Globe,
    title: "%99.9 Tarayıcı Uyumu",
    description: "Tüm modern tarayıcılar, mobil cihazlar ve işletim sistemleriyle tam uyumluluk. Ziyaretçileriniz sorunsuz erişir.",
  },
  {
    icon: RefreshCcw,
    title: "Ücretsiz Yeniden Oluşturma",
    description: "Sunucu değişikliği veya kayıp durumunda sertifikanızı sınırsız ve ücretsiz olarak yeniden oluşturabilirsiniz.",
  },
  {
    icon: Headphones,
    title: "7/24 Uzman Destek",
    description: "SSL kurulumu, yapılandırma ve teknik sorunlar için uzman teknik ekibimiz her zaman yanınızda.",
  },
  {
    icon: Lock,
    title: "Kolay Kurulum",
    description: "Detaylı kurulum kılavuzları ve otomatik kurulum seçenekleri ile dakikalar içinde SSL'inizi aktif edin.",
  },
  {
    icon: Award,
    title: "Güvenilir Markalar",
    description: "Sectigo, DigiCert, GeoTrust, Thawte gibi dünya çapında tanınan sertifika otoritelerinin ürünleri.",
  },
  {
    icon: ShieldCheck,
    title: "Garanti Kapsamı",
    description: "Sertifika türüne göre $10.000'dan $1.750.000'a kadar garanti kapsamı. Güvenliğiniz sigortalı.",
  },
  {
    icon: CheckCircle2,
    title: "SEO Avantajı",
    description: "Google HTTPS kullanan siteleri ödüllendiriyor. SSL ile arama sonuçlarında üst sıralara çıkın.",
  },
];

export function SSLFeatures() {
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
            SSL sertifikalarımızla sunduğumuz tüm avantajlar
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {sslFeatures.map((feature, idx) => (
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
