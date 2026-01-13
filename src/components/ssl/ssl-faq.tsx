"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sslFaqs = [
  {
    question: "SSL sertifikası nedir?",
    answer: "SSL (Secure Sockets Layer) sertifikası, web siteniz ile ziyaretçileriniz arasındaki veri iletişimini şifreleyen bir güvenlik protokolüdür. HTTPS bağlantısı sağlar ve tarayıcıda kilit simgesi görünmesini sağlar.",
  },
  {
    question: "DV, OV ve EV SSL arasındaki fark nedir?",
    answer: "DV (Domain Validation) sadece domain sahipliğini doğrular ve dakikalar içinde alınır. OV (Organization Validation) şirket bilgilerini doğrular, 1-3 gün sürer. EV (Extended Validation) en kapsamlı doğrulamadır, şirket adı tarayıcıda görünür ve 3-7 gün sürer.",
  },
  {
    question: "Wildcard SSL nedir?",
    answer: "Wildcard SSL, ana domain ve tüm alt domainlerinizi (*.domain.com) tek bir sertifika ile korumanızı sağlar. Örneğin shop.domain.com, mail.domain.com, blog.domain.com gibi sınırsız alt domain tek sertifika ile güvence altına alınır.",
  },
  {
    question: "SSL sertifikası ne kadar sürede aktif olur?",
    answer: "DV SSL sertifikaları genellikle 5-15 dakika içinde aktif olur. OV SSL sertifikaları şirket doğrulaması gerektirdiğinden 1-3 iş günü sürer. EV SSL sertifikaları kapsamlı doğrulama nedeniyle 3-7 iş günü sürebilir.",
  },
  {
    question: "SSL sertifikası SEO'yu etkiler mi?",
    answer: "Evet, Google HTTPS kullanan siteleri arama sonuçlarında ödüllendirir. SSL sertifikası olmayan siteler tarayıcılarda 'Güvenli Değil' uyarısı alır, bu da ziyaretçi güvenini ve dönüşüm oranlarını olumsuz etkiler.",
  },
  {
    question: "SSL sertifikamı başka bir sunucuya taşıyabilir miyim?",
    answer: "Evet, SSL sertifikanızı başka bir sunucuya taşıyabilirsiniz. Bunun için sertifika dosyalarınızı (CRT, KEY, CA Bundle) yeni sunucuya yüklemeniz yeterlidir. Taşıma işleminde yardıma ihtiyacınız olursa teknik ekibimiz size destek olur.",
  },
  {
    question: "SSL sertifikası süresi dolunca ne olur?",
    answer: "SSL sertifikası süresi dolduğunda web siteniz 'Güvenli Değil' uyarısı gösterir ve ziyaretçiler siteye erişmekte zorlanabilir. Bu nedenle sertifikanızı süresi dolmadan yenilemeniz önemlidir. Otomatik yenileme seçeneğimiz ile bu sorunu yaşamazsınız.",
  },
  {
    question: "Hangi SSL sertifikasını seçmeliyim?",
    answer: "Kişisel blog veya portfolyo için DV SSL yeterlidir. İşletme web sitesi için OV SSL önerilir. E-ticaret veya finansal işlemler için EV SSL tercih edilmelidir. Birden fazla alt domain varsa Wildcard SSL, farklı domainler varsa Multi-Domain SSL idealdir.",
  },
];

export function SSLFaq() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Sık Sorulan Sorular
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              SSL sertifikaları hakkında merak edilenler
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {sslFaqs.map((faq, index) => (
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
