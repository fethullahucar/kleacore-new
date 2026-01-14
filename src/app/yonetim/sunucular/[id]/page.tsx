"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
  RefreshCcw,
  Wrench,
  Power,
  Globe,
  Clock,
  Package,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock server data
const serverData = {
  id: "SRV-01",
  name: "Web Server 01",
  ip: "185.123.45.67",
  hostname: "srv01.kleacore.com",
  location: "İstanbul, TR",
  datacenter: "Equinix Istanbul",
  status: "online",
  type: "Shared Hosting",
  os: "Ubuntu 22.04 LTS",
  specs: {
    cpu: "Intel Xeon E5-2690 v4 @ 2.60GHz",
    cores: 28,
    ram: "128 GB DDR4",
    disk: "4x 1TB NVMe SSD (RAID 10)",
  },
  usage: {
    cpu: 45,
    ram: 62,
    disk: 78,
    bandwidth: 45,
  },
  uptime: "99.98%",
  lastRestart: "2024-05-15 03:00",
  services: 156,
};

const hostedServices = [
  { id: "H-001", domain: "yilmaztech.com", type: "Hosting", customer: "Ahmet Yılmaz" },
  { id: "H-004", domain: "sahingiyim.com", type: "Hosting", customer: "Fatma Şahin" },
  { id: "H-012", domain: "demir-holding.com", type: "Hosting", customer: "Ayşe Demir" },
  { id: "H-023", domain: "example.net", type: "Hosting", customer: "Can Özkan" },
  { id: "H-031", domain: "techstore.com.tr", type: "Hosting", customer: "Elif Çelik" },
];

const maintenanceLog = [
  { date: "2024-05-15 03:00", action: "Planlı yeniden başlatma", status: "success" },
  { date: "2024-04-20 02:30", action: "Kernel güncelleme", status: "success" },
  { date: "2024-03-10 04:00", action: "Disk genişletme", status: "success" },
  { date: "2024-02-28 03:15", action: "Güvenlik yaması", status: "success" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  online: { label: "Çevrimiçi", variant: "default" },
  warning: { label: "Uyarı", variant: "secondary" },
  maintenance: { label: "Bakımda", variant: "outline" },
  offline: { label: "Çevrimdışı", variant: "destructive" },
};

const getUsageColor = (percent: number) => {
  if (percent >= 90) return "bg-red-500";
  if (percent >= 70) return "bg-yellow-500";
  return "bg-green-500";
};

const getUsageTextColor = (percent: number) => {
  if (percent >= 90) return "text-red-500";
  if (percent >= 70) return "text-yellow-500";
  return "text-green-500";
};

export default function ServerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/yonetim/sunucular"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Sunuculara Dön
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800">
            <Server className="h-7 w-7 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">{serverData.name}</h1>
              <Badge variant={statusConfig[serverData.status].variant}>
                {statusConfig[serverData.status].label}
              </Badge>
            </div>
            <p className="text-zinc-400">{serverData.id} • {serverData.type}</p>
            <p className="text-sm text-zinc-500 mt-1">{serverData.location} - {serverData.datacenter}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Yeniden Başlat
          </Button>
          <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
            <Wrench className="mr-2 h-4 w-4" />
            Bakım Modu
          </Button>
          <Button variant="destructive">
            <Power className="mr-2 h-4 w-4" />
            Kapat
          </Button>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "CPU", value: serverData.usage.cpu, icon: Cpu },
          { label: "RAM", value: serverData.usage.ram, icon: MemoryStick },
          { label: "Disk", value: serverData.usage.disk, icon: HardDrive },
          { label: "Bandwidth", value: serverData.usage.bandwidth, icon: Activity },
        ].map((stat) => (
          <Card key={stat.label} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-zinc-500" />
                  <span className="text-sm text-zinc-400">{stat.label}</span>
                </div>
                <span className={cn("text-lg font-bold", getUsageTextColor(stat.value))}>
                  {stat.value}%
                </span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all", getUsageColor(stat.value))}
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hosted Services */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">
                Barındırılan Hizmetler ({serverData.services})
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                Tümünü Gör
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800">
                {hostedServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-zinc-500" />
                      <div>
                        <Link
                          href={`/yonetim/hizmetler/${service.id}`}
                          className="text-sm font-medium text-white hover:text-primary"
                        >
                          {service.domain}
                        </Link>
                        <p className="text-xs text-zinc-500">{service.type}</p>
                      </div>
                    </div>
                    <span className="text-sm text-zinc-400">{service.customer}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Log */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Bakım Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300">{log.action}</p>
                      <p className="text-xs text-zinc-500">{log.date}</p>
                    </div>
                    <Badge variant="default" className="text-xs">Başarılı</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Server Info */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Sunucu Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">IP Adresi</span>
                <span className="text-sm text-zinc-300 font-mono">{serverData.ip}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Hostname</span>
                <span className="text-sm text-zinc-300">{serverData.hostname}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">İşletim Sistemi</span>
                <span className="text-sm text-zinc-300">{serverData.os}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Uptime (30 gün)</span>
                <span className="text-sm text-green-500">{serverData.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Son Yeniden Başlatma</span>
                <span className="text-sm text-zinc-300">{serverData.lastRestart}</span>
              </div>
            </CardContent>
          </Card>

          {/* Hardware Specs */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Donanım</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-xs text-zinc-500">İşlemci</span>
                <p className="text-sm text-zinc-300">{serverData.specs.cpu}</p>
                <p className="text-xs text-zinc-500">{serverData.specs.cores} Çekirdek</p>
              </div>
              <div>
                <span className="text-xs text-zinc-500">Bellek</span>
                <p className="text-sm text-zinc-300">{serverData.specs.ram}</p>
              </div>
              <div>
                <span className="text-xs text-zinc-500">Depolama</span>
                <p className="text-sm text-zinc-300">{serverData.specs.disk}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Özet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-zinc-800/50">
                  <p className="text-2xl font-bold text-white">{serverData.services}</p>
                  <p className="text-xs text-zinc-500">Aktif Hizmet</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-zinc-800/50">
                  <p className="text-2xl font-bold text-green-500">{serverData.uptime}</p>
                  <p className="text-xs text-zinc-500">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
