"use client";

import { useState } from "react";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Headphones,
  Building2,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const contactInfo = [
  {
    icon: Mail,
    title: "E-posta",
    details: ["destek@kleacore.com", "satis@kleacore.com"],
    description: "24 saat içinde yanıt garantisi",
  },
  {
    icon: MapPin,
    title: "Adres",
    details: ["30 N Gould St Ste R", "Sheridan, WY 82801, USA"],
    description: "KLEAWORK DIGITAL LLC",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    details: ["Pazartesi - Cuma: 09:00 - 18:00 (EST)", "Teknik destek 7/24"],
    description: "Tüm zaman dilimlerinde hizmet",
  },
  {
    icon: Phone,
    title: "Ticari Bilgiler",
    details: ["EIN: 36-5157418", "KLEAWORK DIGITAL LLC"],
    description: "Wyoming, USA",
  },
];

const supportChannels = [
  {
    icon: Headphones,
    title: "Teknik Destek",
    description: "7/24 teknik destek hattı",
    action: "Destek Talebi",
    href: "#",
  },
  {
    icon: MessageSquare,
    title: "Canlı Sohbet",
    description: "Anlık yardım alın",
    action: "Sohbet Başlat",
    href: "#",
  },
  {
    icon: Building2,
    title: "Kurumsal Satış",
    description: "Özel çözümler için",
    action: "Teklif Al",
    href: "#",
  },
];

const departments = [
  { name: "Satış", email: "satis@kleacore.com", phone: "" },
  { name: "Teknik Destek", email: "destek@kleacore.com", phone: "" },
  { name: "Muhasebe", email: "muhasebe@kleacore.com", phone: "" },
  { name: "Genel", email: "info@kleacore.com", phone: "" },
];

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium mb-4">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  7/24 Destek
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  İletişim
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Sorularınız için bize ulaşın. Ekibimiz size yardımcı olmaktan
                  mutluluk duyacaktır.
                </p>
              </div>
            </BlurFade>

            {/* Contact Info Cards */}
            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail} className="text-sm font-medium">
                          {detail}
                        </p>
                      ))}
                      <p className="text-xs text-muted-foreground mt-2">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
              {/* Form */}
              <BlurFade delay={0.1} inView>
                <Card>
                  <CardHeader>
                    <CardTitle>Bize Yazın</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ad Soyad</Label>
                          <Input
                            id="name"
                            placeholder="Adınız Soyadınız"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-posta</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="ornek@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon</Label>
                          <Input
                            id="phone"
                            placeholder="0555 123 45 67"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Konu</Label>
                          <Input
                            id="subject"
                            placeholder="Mesaj konusu"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({ ...formData, subject: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mesajınız</Label>
                        <textarea
                          id="message"
                          className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Mesajınızı buraya yazın..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Mesaj Gönder
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </BlurFade>

              {/* Map Placeholder */}
              <BlurFade delay={0.2} inView>
                <div className="space-y-6">
                  <Card className="overflow-hidden">
                    <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                      <div className="text-center p-8">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Harita görüntüsü için Google Maps API entegrasyonu gerekli
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Maslak Mah. Büyükdere Cad. No: 123, Sarıyer/İstanbul
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Quick Support */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    {supportChannels.map((channel) => (
                      <Card
                        key={channel.title}
                        className="text-center hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <channel.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                          <h4 className="font-medium text-sm">{channel.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">
                            {channel.description}
                          </p>
                          <Button variant="link" size="sm" className="h-auto p-0">
                            {channel.action}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Departmanlar
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Doğrudan ilgili birime ulaşın
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
                {departments.map((dept) => (
                  <Card key={dept.name}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-3">{dept.name}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <a
                            href={`mailto:${dept.email}`}
                            className="hover:text-primary transition-colors"
                          >
                            {dept.email}
                          </a>
                        </div>
                        {dept.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a
                              href={`tel:${dept.phone.replace(/\s/g, "")}`}
                              className="hover:text-primary transition-colors"
                            >
                              {dept.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Sık Sorulan Sorular
                </h2>
                <p className="text-muted-foreground mb-8">
                  Belki aradığınız cevap SSS sayfamızda vardır. Hızlı çözümler
                  için destek tabanımızı inceleyin.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    SSS Sayfası
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Bilgi Bankası
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
