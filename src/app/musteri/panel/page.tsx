"use client";

import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Package,
  Globe,
  FileText,
  Headphones,
  ArrowRight,
  Search,
  ChevronRight,
  CheckCircle2,
  Book,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Stat cards data - colored like the example
const statCards = [
  {
    title: "Aktif Hizmetler",
    value: "1",
    description: "Toplam aktif hizmet sayınız",
    href: "/musteri/panel/hizmetlerim",
    bgColor: "bg-blue-600",
  },
  {
    title: "Aktif Domainler",
    value: "0",
    description: "Toplam aktif domain sayınız",
    href: "/musteri/panel/domainler",
    bgColor: "bg-green-600",
  },
  {
    title: "Destek Talepleri",
    value: "0",
    description: "Aktif destek talebi sayınız",
    href: "/musteri/panel/destek",
    bgColor: "bg-orange-500",
  },
  {
    title: "Faturalar",
    value: "0",
    description: "Ödenmemiş fatura sayınız",
    href: "/musteri/panel/faturalar",
    bgColor: "bg-red-500",
  },
];

// Knowledge base quick links
const knowledgeBaseLinks = [
  { title: "Hosting", href: "/bilgi-bankasi" },
  { title: "Domain", href: "/bilgi-bankasi" },
  { title: "MySQL", href: "/bilgi-bankasi" },
  { title: "E-posta", href: "/bilgi-bankasi" },
];

// Mock services data
const services = [
  {
    id: 1,
    name: "C-Power",
    domain: "195.85.201.243",
    nextPayment: "10/01/2027",
    status: "active",
  },
];

// Mock support tickets
const supportTickets: Array<{
  id: number;
  subject: string;
  department: string;
  lastUpdate: string;
  status: string;
}> = [];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <BlurFade delay={0.1} inView>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card
                className={cn(
                  "text-white border-0 hover:opacity-90 transition-opacity cursor-pointer h-full",
                  card.bgColor
                )}
              >
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-white/80">{card.title}</p>
                  <p className="text-3xl font-bold mt-1">{card.value}</p>
                  <p className="text-xs text-white/70 mt-2">{card.description}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-white/90">
                    Görüntüle
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </BlurFade>

      {/* Knowledge Base Search */}
      <BlurFade delay={0.15} inView>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Book className="h-5 w-5 text-primary" />
              Bilgi Bankası
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Nasıl yardımcı olabiliriz?"
                  className="pr-20"
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Ara
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {knowledgeBaseLinks.map((link) => (
                <Button key={link.title} variant="outline" size="sm" asChild>
                  <Link href={link.href}>{link.title}</Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Active Services Table */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-5 w-5 text-primary" />
              Aktif Hizmetler ({services.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Ürün/Hizmet</th>
                    <th className="pb-3 font-medium">Domain</th>
                    <th className="pb-3 font-medium">Sonraki Ödeme</th>
                    <th className="pb-3 font-medium">Durum</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b last:border-0">
                      <td className="py-4">
                        <span className="text-primary font-medium">{service.name}</span>
                      </td>
                      <td className="py-4 text-muted-foreground">{service.domain}</td>
                      <td className="py-4 text-muted-foreground">{service.nextPayment}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle2 className="h-3 w-3" />
                          Aktif
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Button size="sm">Yönet</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="link" asChild>
                <Link href="/musteri/panel/hizmetlerim">
                  Tüm Hizmetler
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Support Tickets Table */}
      <BlurFade delay={0.25} inView>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Headphones className="h-5 w-5 text-red-500" />
              Aktif Destek Talepleri ({supportTickets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Talep No</th>
                    <th className="pb-3 font-medium">Konu</th>
                    <th className="pb-3 font-medium">Departman</th>
                    <th className="pb-3 font-medium">Son Güncelleme</th>
                    <th className="pb-3 font-medium">Durum</th>
                  </tr>
                </thead>
                <tbody>
                  {supportTickets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground italic">
                        Aktif destek talebi bulunmuyor.
                      </td>
                    </tr>
                  ) : (
                    supportTickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b last:border-0">
                        <td className="py-4 text-primary font-medium">#{ticket.id}</td>
                        <td className="py-4">{ticket.subject}</td>
                        <td className="py-4 text-muted-foreground">{ticket.department}</td>
                        <td className="py-4 text-muted-foreground">{ticket.lastUpdate}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <Button asChild>
                <Link href="/musteri/panel/destek">
                  Yeni Destek Talebi
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
