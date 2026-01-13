"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "VPS, VDS ve Bulut sunucu arasındaki fark nedir?",
    answer: "VPS (Virtual Private Server) konteyner tabanlı sanallaştırma ile ekonomik çözüm sunar. VDS (Virtual Dedicated Server) KVM sanallaştırma ile tam izolasyon ve daha yüksek performans sağlar. Bulut sunucu ise esnek ölçeklendirme, yüksek erişilebilirlik ve dağıtık altyapı avantajları sunar.",
  },
  {
    question: "Fiziksel sunucu ne zaman tercih edilmeli?",
    answer: "Yüksek performans gerektiren uygulamalar, büyük veritabanları, oyun sunucuları veya özel donanım ihtiyaçları olan projeler için fiziksel sunucu idealdir. Kaynak paylaşımı olmadan tüm donanım size aittir.",
  },
  {
    question: "Hangi işletim sistemlerini kurabilirim?",
    answer: "Ubuntu, Debian, CentOS, AlmaLinux, Rocky Linux, Fedora gibi Linux dağıtımlarını ve Windows Server 2019/2022 işletim sistemlerini kurabilirsiniz. VDS ve fiziksel sunucularda kendi ISO dosyanızı da yükleyebilirsiniz.",
  },
  {
    question: "Sunucu ne kadar sürede aktif olur?",
    answer: "VPS ve VDS sunucular ödeme onayından sonra otomatik olarak birkaç dakika içinde aktif edilir. Bulut sunucular saniyeler içinde hazır olur. Fiziksel sunucular için kurulum süresi 4-24 saat arasındadır.",
  },
  {
    question: "Root erişimim var mı?",
    answer: "Evet, tüm sunucu paketlerimizde tam root/administrator erişimi sunuyoruz. SSH veya RDP ile bağlanabilir, istediğiniz yazılımı kurabilir ve sunucunuzu tamamen özelleştirebilirsiniz.",
  },
  {
    question: "DDoS koruması dahil mi?",
    answer: "Evet, tüm sunucu paketlerimizde Layer 3-7 DDoS koruması ücretsiz olarak dahildir. 10+ Tbps mitigasyon kapasitesi ile sunucunuz 7/24 saldırılara karşı korunur.",
  },
  {
    question: "Yedekleme ve snapshot desteği var mı?",
    answer: "Evet, tüm paketlerde snapshot özelliği ile anlık görüntü alabilirsiniz. Bulut sunucularda günlük otomatik yedekleme dahildir. Diğer paketlerde otomatik yedekleme eklentisi satın alabilirsiniz.",
  },
  {
    question: "Paket yükseltme veya düşürme yapabilir miyim?",
    answer: "Evet, istediğiniz zaman daha üst veya alt bir pakete geçiş yapabilirsiniz. Bulut sunucularda kaynak değişiklikleri anında uygulanır, diğer paketlerde kısa bir kesinti olabilir.",
  },
  {
    question: "Hangi lokasyonlarda sunucu alabilirim?",
    answer: "İstanbul, Frankfurt, Amsterdam ve New York lokasyonlarında sunucu hizmeti sunuyoruz. Hedef kitlenize en yakın lokasyonu seçerek düşük gecikme süresi elde edebilirsiniz.",
  },
  {
    question: "Teknik destek 7/24 mü?",
    answer: "Evet, uzman teknik destek ekibimiz 7/24 hizmetinizdedir. Canlı destek, ticket sistemi veya telefon ile bize ulaşabilirsiniz. Fiziksel sunucularda IPMI/KVM erişimi de sağlıyoruz.",
  },
];

export function ServerFaq() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sık Sorulan Sorular
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Sunucu hizmetlerimiz hakkında merak edilenler
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
  );
}
