"use client";

import { Star, MessageSquare } from "lucide-react";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "3 yıldır KLEACORE kullanıyorum. Sitelerim hiç kesintiye uğramadı. Destek ekibi muhteşem, her soruma anında dönüş yapıyorlar.",
    name: "Ahmet Yılmaz",
    title: "E-Ticaret Site Sahibi",
    avatar: "AY",
  },
  {
    quote: "Müşterilerim için onlarca site barındırıyorum. Reseller paketleri çok avantajlı ve yönetim paneli kullanımı kolay.",
    name: "Elif Demir",
    title: "Web Geliştirici",
    avatar: "ED",
  },
  {
    quote: "VDS sunucularının performansı beklentimin çok üzerinde. Fiyat/performans oranı piyasadaki en iyilerden.",
    name: "Mehmet Kaya",
    title: "Startup Kurucusu",
    avatar: "MK",
  },
  {
    quote: "WordPress hosting paketi aldım, site açılış hızım inanılmaz arttı. Otomatik yedekleme özelliği hayat kurtarıcı.",
    name: "Zeynep Öztürk",
    title: "Blog Yazarı",
    avatar: "ZÖ",
  },
  {
    quote: "Kurumsal hosting paketini kullanıyoruz. 7/24 destek gerçekten 7/24, gece 3'te bile yardım aldım.",
    name: "Can Aydın",
    title: "Dijital Ajans Sahibi",
    avatar: "CA",
  },
  {
    quote: "Domain transferi çok kolay oldu. Eski sağlayıcımdaki tüm sorunlardan kurtuldum. Kesinlikle tavsiye ederim.",
    name: "Selin Arslan",
    title: "Freelancer",
    avatar: "SA",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium mb-4">
            <MessageSquare className="h-4 w-4 text-primary" />
            Müşteri Yorumları
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Binlerce mutlu müşterimizin deneyimlerini okuyun.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { value: "4.9/5", label: "Ortalama Puan" },
            { value: "10K+", label: "Yorum" },
            { value: "%98", label: "Memnuniyet" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                {stat.label === "Ortalama Puan" && (
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                )}
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite Moving Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          pauseOnHover={true}
          className="py-4 mx-auto"
        />
      </motion.div>
    </section>
  );
}
