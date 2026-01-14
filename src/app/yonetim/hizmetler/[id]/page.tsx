"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Globe,
  Server,
  Calendar,
  HardDrive,
  Cpu,
  MemoryStick,
  Activity,
  RefreshCcw,
  Pause,
  Play,
  Edit,
  FileText,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock service data
const serviceData = {
  id: "H-001",
  type: "hosting",
  typeName: "Profesyonel Hosting",
  domain: "yilmaztech.com",
  server: "SRV-01",
  serverIp: "185.123.45.67",
  status: "active",
  createdAt: "2023-05-15",
  expiresAt: "2025-05-15",
  price: 299,
  period: "yıllık",
  customer: {
    id: "M-001",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
  },
  resources: {
    disk: { used: 4.2, total: 10, unit: "GB" },
    bandwidth: { used: 45, total: 100, unit: "GB" },
    email: { used: 8, total: 25, unit: "hesap" },
    database: { used: 3, total: 10, unit: "adet" },
  },
  features: [
    "10 GB SSD Disk",
    "100 GB Bandwidth",
    "25 E-posta Hesabı",
    "10 MySQL Veritabanı",
    "Ücretsiz SSL",
    "Günlük Yedekleme",
    "cPanel Yönetim",
  ],
};

const invoices = [
  {
    id: "F-2024-0156",
    date: "2024-06-01",
    amount: 299,
    status: "paid",
  },
  {
    id: "F-2023-0089",
    date: "2023-05-15",
    amount: 299,
    status: "paid",
  },
];

const activityLog = [
  { date: "2024-06-25 08:15", action: "cPanel girişi yapıldı" },
  { date: "2024-06-24 14:32", action: "FTP bağlantısı kuruldu" },
  { date: "2024-06-23 09:45", action: "Veritabanı oluşturuldu" },
  { date: "2024-06-01 00:00", action: "Hizmet yenilendi" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Aktif", variant: "default" },
  suspended: { label: "Askıda", variant: "destructive" },
  pending: { label: "Beklemede", variant: "secondary" },
  paid: { label: "Ödendi", variant: "default" },
};

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const getUsagePercent = (used: number, total: number) => (used / total) * 100;
  const getUsageColor = (percent: number) => {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 70) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/yonetim/hizmetler"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Hizmetlere Dön
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-white">{serviceData.typeName}</h1>
            <Badge variant={statusConfig[serviceData.status].variant}>
              {statusConfig[serviceData.status].label}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{serviceData.domain}</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span>{serviceData.server}</span>
            </div>
          </div>
          <p className="text-sm text-zinc-500 mt-1">Hizmet ID: {serviceData.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
            <Edit className="mr-2 h-4 w-4" />
            Düzenle
          </Button>
          <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Yenile
          </Button>
          {serviceData.status === "active" ? (
            <Button variant="destructive">
              <Pause className="mr-2 h-4 w-4" />
              Askıya Al
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              <Play className="mr-2 h-4 w-4" />
              Aktif Et
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Usage */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Kaynak Kullanımı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(serviceData.resources).map(([key, resource]) => {
                const percent = getUsagePercent(resource.used, resource.total);
                const labels: Record<string, string> = {
                  disk: "Disk Alanı",
                  bandwidth: "Bandwidth",
                  email: "E-posta Hesapları",
                  database: "Veritabanları",
                };
                const icons: Record<string, any> = {
                  disk: HardDrive,
                  bandwidth: Activity,
                  email: User,
                  database: Server,
                };
                const Icon = icons[key];

                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm text-zinc-300">{labels[key]}</span>
                      </div>
                      <span className="text-sm text-zinc-400">
                        {resource.used} / {resource.total} {resource.unit}
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", getUsageColor(percent))}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Paket Özellikleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {serviceData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invoices */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Faturalar</CardTitle>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                Tümünü Gör
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/50">
                    <div>
                      <Link
                        href={`/yonetim/faturalar/${invoice.id}`}
                        className="text-sm font-medium text-white hover:text-primary"
                      >
                        {invoice.id}
                      </Link>
                      <p className="text-xs text-zinc-500">
                        {new Date(invoice.date).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-white">
                        ₺{invoice.amount.toLocaleString("tr-TR")}
                      </span>
                      <Badge variant={statusConfig[invoice.status].variant}>
                        {statusConfig[invoice.status].label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Service Info */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Hizmet Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Ücret</span>
                <span className="text-sm font-medium text-white">
                  ₺{serviceData.price}/{serviceData.period}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Sunucu IP</span>
                <span className="text-sm text-zinc-300 font-mono">{serviceData.serverIp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Oluşturulma</span>
                <span className="text-sm text-zinc-300">
                  {new Date(serviceData.createdAt).toLocaleDateString("tr-TR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Bitiş Tarihi</span>
                <span className="text-sm text-zinc-300">
                  {new Date(serviceData.expiresAt).toLocaleDateString("tr-TR")}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Müşteri</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/yonetim/musteriler/${serviceData.customer.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white text-sm font-medium">
                  {serviceData.customer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{serviceData.customer.name}</p>
                  <p className="text-xs text-zinc-500">{serviceData.customer.email}</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-zinc-600" />
                    <div>
                      <p className="text-sm text-zinc-300">{log.action}</p>
                      <p className="text-xs text-zinc-500">{log.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
