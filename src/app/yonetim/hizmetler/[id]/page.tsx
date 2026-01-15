"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Server,
  HardDrive,
  Cloud,
  Globe,
  Shield,
  Mail,
  User,
  Building2,
  Calendar,
  CreditCard,
  RefreshCcw,
  FileText,
  Edit,
  Pause,
  XCircle,
  CheckCircle,
  Clock,
  ArrowUpDown,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

// Mock service data
const getServiceById = (id: string) => {
  const services: Record<string, {
    id: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    companyName?: string;
    domain: string;
    category: string;
    packageName: string;
    status: string;
    billingPeriod: string;
    price: number;
    nextRenewal: string | null;
    createdAt: string;
    serverId: string;
    serverName: string;
    serverIp: string;
    notes: string;
  }> = {
    "H-001": {
      id: "H-001",
      customerId: "M-001",
      customerName: "Ahmet Yılmaz",
      customerEmail: "ahmet@example.com",
      domain: "ahmetyilmaz.com",
      category: "hosting",
      packageName: "Profesyonel Hosting",
      status: "active",
      billingPeriod: "yearly",
      price: 99,
      nextRenewal: "2024-12-15",
      createdAt: "2023-12-15",
      serverId: "SRV-01",
      serverName: "Web Server 01",
      serverIp: "185.123.45.67",
      notes: "Müşteri VIP statüsünde, öncelikli destek.",
    },
    "H-002": {
      id: "H-002",
      customerId: "M-002",
      customerName: "Ayşe Demir",
      customerEmail: "ayse@demir-holding.com",
      companyName: "Demir Holding A.Ş.",
      domain: "demir-holding.com",
      category: "vds",
      packageName: "VDS Medium",
      status: "active",
      billingPeriod: "yearly",
      price: 349,
      nextRenewal: "2024-08-20",
      createdAt: "2023-08-20",
      serverId: "SRV-03",
      serverName: "VDS Server 01",
      serverIp: "185.123.45.70",
      notes: "",
    },
    "H-003": {
      id: "H-003",
      customerId: "M-003",
      customerName: "Mehmet Kaya",
      customerEmail: "mehmet@kayasoft.net",
      companyName: "KayaSoft Ltd.",
      domain: "kayasoft.net",
      category: "hosting",
      packageName: "Kurumsal Hosting",
      status: "suspended",
      billingPeriod: "yearly",
      price: 199,
      nextRenewal: "2024-06-10",
      createdAt: "2023-06-10",
      serverId: "SRV-02",
      serverName: "Web Server 02",
      serverIp: "185.123.45.68",
      notes: "Ödeme gecikmesi nedeniyle askıya alındı.",
    },
  };

  return services[id] || services["H-001"];
};

const categoryConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
  hosting: { label: "Web Hosting", icon: Server, color: "text-blue-500 bg-blue-500/10" },
  vds: { label: "VDS Sunucu", icon: HardDrive, color: "text-purple-500 bg-purple-500/10" },
  vps: { label: "VPS Sunucu", icon: Cloud, color: "text-cyan-500 bg-cyan-500/10" },
  server: { label: "Fiziksel Sunucu", icon: Server, color: "text-orange-500 bg-orange-500/10" },
  domain: { label: "Domain", icon: Globe, color: "text-green-500 bg-green-500/10" },
  ssl: { label: "SSL Sertifikası", icon: Shield, color: "text-yellow-500 bg-yellow-500/10" },
  email: { label: "Kurumsal E-posta", icon: Mail, color: "text-pink-500 bg-pink-500/10" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-green-500/10 text-green-500 border-green-500/30" },
  suspended: { label: "Askıda", color: "bg-orange-500/10 text-orange-500 border-orange-500/30" },
  pending: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" },
  cancelled: { label: "İptal", color: "bg-red-500/10 text-red-500 border-red-500/30" },
};

const billingPeriodLabels: Record<string, string> = {
  monthly: "Aylık",
  quarterly: "3 Aylık",
  semiannual: "6 Aylık",
  yearly: "Yıllık",
  biennial: "2 Yıllık",
};

// Mock invoices
const invoices = [
  { id: "F-2024-0156", date: "2024-06-15", amount: 1188, status: "paid" },
  { id: "F-2024-0089", date: "2024-03-15", amount: 1188, status: "paid" },
  { id: "F-2023-0342", date: "2023-12-15", amount: 1188, status: "paid" },
];

// Mock activity
const activities = [
  { id: 1, action: "Hizmet yenilendi", date: "2024-06-15 14:32", user: "Sistem" },
  { id: 2, action: "Fatura oluşturuldu", date: "2024-06-01 09:00", user: "Sistem" },
  { id: 3, action: "DNS kayıtları güncellendi", date: "2024-05-22 16:45", user: "Ahmet Yılmaz" },
  { id: 4, action: "Paket yükseltildi", date: "2024-03-10 11:20", user: "Admin" },
  { id: 5, action: "Hizmet oluşturuldu", date: "2023-12-15 10:15", user: "Admin" },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params.id as string;
  const service = getServiceById(serviceId);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const CategoryIcon = categoryConfig[service.category]?.icon || Server;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const yearlyPrice = service.price * 12;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <BlurFade delay={0}>
        <Link
          href="/yonetim/hizmetler"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Hizmetlere Dön
        </Link>
      </BlurFade>

      {/* Page Header */}
      <BlurFade delay={0.05}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn("p-3 rounded-lg", categoryConfig[service.category]?.color.split(" ")[1])}>
              <CategoryIcon className={cn("h-8 w-8", categoryConfig[service.category]?.color.split(" ")[0])} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{service.domain}</h1>
                <Badge className={cn("border", statusConfig[service.status].color)}>
                  {statusConfig[service.status].label}
                </Badge>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                {categoryConfig[service.category]?.label} • {service.packageName}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Edit className="mr-2 h-4 w-4" />
              Düzenle
            </Button>
            <Button variant="outline" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Yükselt/Düşür
            </Button>
            <Button variant="outline" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <FileText className="mr-2 h-4 w-4" />
              Fatura Oluştur
            </Button>
            {service.status === "active" && (
              <Button variant="outline" className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10">
                <Pause className="mr-2 h-4 w-4" />
                Askıya Al
              </Button>
            )}
            {service.status === "suspended" && (
              <Button variant="outline" className="border-green-500/30 text-green-500 hover:bg-green-500/10">
                <CheckCircle className="mr-2 h-4 w-4" />
                Aktif Et
              </Button>
            )}
          </div>
        </div>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Info Card */}
          <BlurFade delay={0.1}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white">Hizmet Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">Hizmet ID</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium font-mono text-zinc-900 dark:text-white">{service.id}</p>
                      <button
                        onClick={() => copyToClipboard(service.id, "id")}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      >
                        {copiedField === "id" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">Domain</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{service.domain}</p>
                      <a
                        href={`https://${service.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">Kategori</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{categoryConfig[service.category]?.label}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">Paket</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{service.packageName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">Oluşturma Tarihi</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {new Date(service.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-500">Sonraki Yenileme</p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {service.nextRenewal ? new Date(service.nextRenewal).toLocaleDateString("tr-TR") : "-"}
                    </p>
                  </div>
                </div>

                <Separator className="bg-zinc-200 dark:bg-zinc-800" />

                <div className="space-y-1">
                  <p className="text-sm text-zinc-500">Sunucu Bilgileri</p>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{service.serverName}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-zinc-600 dark:text-zinc-400">{service.serverIp}</span>
                      <button
                        onClick={() => copyToClipboard(service.serverIp, "ip")}
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      >
                        {copiedField === "ip" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {service.notes && (
                  <>
                    <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500">Notlar</p>
                      <p className="text-sm text-zinc-900 dark:text-white">{service.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          {/* Tabs for Invoices and Activity */}
          <BlurFade delay={0.15}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-0">
                <Tabs defaultValue="invoices" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-zinc-200 dark:border-zinc-800 bg-transparent p-0">
                    <TabsTrigger
                      value="invoices"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                      Faturalar
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                      Aktivite Geçmişi
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="invoices" className="p-0 mt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Fatura No</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tarih</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tutar</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                            <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
                              <td className="p-4">
                                <span className="text-sm font-mono text-zinc-900 dark:text-white">{invoice.id}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                  {new Date(invoice.date).toLocaleDateString("tr-TR")}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                  {formatPrice(invoice.amount)}
                                </span>
                              </td>
                              <td className="p-4">
                                <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                                  Ödendi
                                </Badge>
                              </td>
                              <td className="p-4 text-right">
                                <Link href={`/yonetim/faturalar/${invoice.id}`}>
                                  <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                                    Görüntüle
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="p-0 mt-0">
                    <div className="p-4 space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="mt-1 p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                            <Clock className="h-3 w-3 text-zinc-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-zinc-900 dark:text-white">{activity.action}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-zinc-500">{activity.date}</span>
                              <span className="text-xs text-zinc-400">•</span>
                              <span className="text-xs text-zinc-500">{activity.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* Right Column - Customer & Billing */}
        <div className="space-y-6">
          {/* Customer Card */}
          <BlurFade delay={0.2}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Müşteri Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                    {service.customerName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{service.customerName}</p>
                    {service.companyName && (
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {service.companyName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{service.customerEmail}</p>
                </div>
                <Link href={`/yonetim/musteriler/${service.customerId}`}>
                  <Button variant="outline" size="sm" className="w-full mt-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    Müşteri Profiline Git
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Billing Card */}
          <BlurFade delay={0.25}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Faturalama
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">Dönem</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">
                    {billingPeriodLabels[service.billingPeriod]}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">Aylık Tutar</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">
                    {formatPrice(service.price)}
                  </span>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">Yıllık Tutar</span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(yearlyPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">Sonraki Ödeme</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">
                    {service.nextRenewal ? new Date(service.nextRenewal).toLocaleDateString("tr-TR") : "-"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Quick Actions */}
          <BlurFade delay={0.3}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Manuel Yenileme
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Paket Değiştir
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <FileText className="mr-2 h-4 w-4" />
                  Yenileme Faturası
                </Button>
                <Separator className="bg-zinc-200 dark:bg-zinc-800 my-2" />
                <Button variant="outline" size="sm" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/30">
                  <XCircle className="mr-2 h-4 w-4" />
                  Hizmeti İptal Et
                </Button>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
