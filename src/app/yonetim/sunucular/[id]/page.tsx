"use client";

import { use, useState } from "react";
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
  Copy,
  Check,
  ExternalLink,
  Settings,
  Terminal,
  Shield,
  Network,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

// Mock server data
const getServerById = (id: string) => {
  const servers: Record<string, {
    id: string;
    name: string;
    ip: string;
    hostname: string;
    location: string;
    datacenter: string;
    status: string;
    type: string;
    os: string;
    specs: { cpu: string; cores: number; ram: string; disk: string };
    usage: { cpu: number; ram: number; disk: number; bandwidth: number };
    uptime: string;
    lastRestart: string;
    services: number;
  }> = {
    "SRV-01": {
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
      usage: { cpu: 45, ram: 62, disk: 78, bandwidth: 45 },
      uptime: "99.98%",
      lastRestart: "2024-05-15 03:00",
      services: 156,
    },
    "SRV-02": {
      id: "SRV-02",
      name: "Web Server 02",
      ip: "185.123.45.68",
      hostname: "srv02.kleacore.com",
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
      usage: { cpu: 32, ram: 48, disk: 65, bandwidth: 38 },
      uptime: "99.99%",
      lastRestart: "2024-04-20 02:30",
      services: 142,
    },
    "SRV-03": {
      id: "SRV-03",
      name: "VDS Server 01",
      ip: "185.123.45.70",
      hostname: "vds01.kleacore.com",
      location: "Frankfurt, DE",
      datacenter: "Equinix Frankfurt",
      status: "warning",
      type: "VDS",
      os: "CentOS 8 Stream",
      specs: {
        cpu: "AMD EPYC 7542 @ 2.90GHz",
        cores: 32,
        ram: "256 GB DDR4",
        disk: "8x 2TB NVMe SSD (RAID 10)",
      },
      usage: { cpu: 92, ram: 85, disk: 45, bandwidth: 72 },
      uptime: "99.95%",
      lastRestart: "2024-06-01 04:00",
      services: 24,
    },
  };

  return servers[id] || servers["SRV-01"];
};

const hostedServices = [
  { id: "H-001", domain: "yilmaztech.com", type: "Hosting", customer: "Ahmet Yılmaz", status: "active" },
  { id: "H-004", domain: "sahingiyim.com", type: "Hosting", customer: "Fatma Şahin", status: "active" },
  { id: "H-012", domain: "demir-holding.com", type: "Hosting", customer: "Ayşe Demir", status: "active" },
  { id: "H-023", domain: "example.net", type: "Hosting", customer: "Can Özkan", status: "suspended" },
  { id: "H-031", domain: "techstore.com.tr", type: "Hosting", customer: "Elif Çelik", status: "active" },
];

const maintenanceLog = [
  { date: "2024-05-15 03:00", action: "Planlı yeniden başlatma", status: "success" },
  { date: "2024-04-20 02:30", action: "Kernel güncelleme", status: "success" },
  { date: "2024-03-10 04:00", action: "Disk genişletme", status: "success" },
  { date: "2024-02-28 03:15", action: "Güvenlik yaması", status: "success" },
  { date: "2024-01-15 02:00", action: "PHP güncelleme", status: "success" },
];

const networkStats = [
  { label: "Gelen Trafik", value: "2.4 TB", change: "+12%" },
  { label: "Giden Trafik", value: "1.8 TB", change: "+8%" },
  { label: "Aktif Bağlantı", value: "1,247", change: "+5%" },
  { label: "DNS Sorgusu", value: "45.2K", change: "-2%" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  online: { label: "Çevrimiçi", color: "bg-green-500/10 text-green-500 border-green-500/30" },
  warning: { label: "Uyarı", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" },
  maintenance: { label: "Bakımda", color: "bg-blue-500/10 text-blue-500 border-blue-500/30" },
  offline: { label: "Çevrimdışı", color: "bg-red-500/10 text-red-500 border-red-500/30" },
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
  const serverData = getServerById(id);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <BlurFade delay={0}>
        <Link
          href="/yonetim/sunucular"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Sunuculara Dön
        </Link>
      </BlurFade>

      {/* Header */}
      <BlurFade delay={0.05}>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
              <Server className="h-7 w-7 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{serverData.name}</h1>
                <Badge className={cn("border", statusConfig[serverData.status].color)}>
                  {statusConfig[serverData.status].label}
                </Badge>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">{serverData.id} • {serverData.type}</p>
              <p className="text-sm text-zinc-500 mt-1">{serverData.location} - {serverData.datacenter}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Terminal className="mr-2 h-4 w-4" />
              SSH Konsol
            </Button>
            <Button variant="outline" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Yeniden Başlat
            </Button>
            <Button variant="outline" className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Wrench className="mr-2 h-4 w-4" />
              Bakım Modu
            </Button>
            <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
              <Power className="mr-2 h-4 w-4" />
              Kapat
            </Button>
          </div>
        </div>
      </BlurFade>

      {/* Usage Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "CPU", value: serverData.usage.cpu, icon: Cpu },
          { label: "RAM", value: serverData.usage.ram, icon: MemoryStick },
          { label: "Disk", value: serverData.usage.disk, icon: HardDrive },
          { label: "Bandwidth", value: serverData.usage.bandwidth, icon: Activity },
        ].map((stat, index) => (
          <BlurFade key={stat.label} delay={0.1 + index * 0.05}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <stat.icon className="h-4 w-4 text-zinc-500" />
                    </div>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</span>
                  </div>
                  <span className={cn("text-lg font-bold", getUsageTextColor(stat.value))}>
                    {stat.value}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all", getUsageColor(stat.value))}
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <BlurFade delay={0.3}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-0">
                <Tabs defaultValue="services" className="w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-zinc-200 dark:border-zinc-800 bg-transparent p-0">
                    <TabsTrigger
                      value="services"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                      Hizmetler ({serverData.services})
                    </TabsTrigger>
                    <TabsTrigger
                      value="maintenance"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                      Bakım Geçmişi
                    </TabsTrigger>
                    <TabsTrigger
                      value="network"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                    >
                      Ağ İstatistikleri
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="services" className="p-0 mt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-zinc-200 dark:border-zinc-800">
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Domain</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tip</th>
                            <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                            <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlem</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hostedServices.map((service) => (
                            <tr key={service.id} className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-zinc-400" />
                                  <Link
                                    href={`/yonetim/hizmetler/${service.id}`}
                                    className="text-sm font-medium text-zinc-900 dark:text-white hover:text-primary"
                                  >
                                    {service.domain}
                                  </Link>
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">{service.customer}</span>
                              </td>
                              <td className="p-4">
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">{service.type}</span>
                              </td>
                              <td className="p-4">
                                <Badge className={cn(
                                  service.status === "active"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-orange-500/10 text-orange-500"
                                )}>
                                  {service.status === "active" ? "Aktif" : "Askıda"}
                                </Badge>
                              </td>
                              <td className="p-4 text-right">
                                <Link href={`/yonetim/hizmetler/${service.id}`}>
                                  <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                      <Link href="/yonetim/hizmetler">
                        <Button variant="outline" size="sm" className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          Tüm Hizmetleri Görüntüle
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>

                  <TabsContent value="maintenance" className="p-0 mt-0">
                    <div className="p-4 space-y-4">
                      {maintenanceLog.map((log, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{log.action}</p>
                            <p className="text-xs text-zinc-500 mt-0.5">{log.date}</p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-500">Başarılı</Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="network" className="p-0 mt-0">
                    <div className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        {networkStats.map((stat, index) => (
                          <div key={index} className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-zinc-500">{stat.label}</span>
                              <span className={cn(
                                "text-xs font-medium",
                                stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
                              )}>
                                {stat.change}
                              </span>
                            </div>
                            <p className="text-xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Server Info */}
          <BlurFade delay={0.35}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Sunucu Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">IP Adresi</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-zinc-900 dark:text-white">{serverData.ip}</span>
                    <button
                      onClick={() => copyToClipboard(serverData.ip, "ip")}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      {copiedField === "ip" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Hostname</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-900 dark:text-white">{serverData.hostname}</span>
                    <button
                      onClick={() => copyToClipboard(serverData.hostname, "hostname")}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      {copiedField === "hostname" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">İşletim Sistemi</span>
                  <span className="text-sm text-zinc-900 dark:text-white">{serverData.os}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Uptime (30 gün)</span>
                  <span className="text-sm font-medium text-green-500">{serverData.uptime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">Son Yeniden Başlatma</span>
                  <span className="text-sm text-zinc-900 dark:text-white">{serverData.lastRestart}</span>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Hardware Specs */}
          <BlurFade delay={0.4}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Donanım
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-xs text-zinc-500">İşlemci</span>
                  <p className="text-sm text-zinc-900 dark:text-white">{serverData.specs.cpu}</p>
                  <p className="text-xs text-zinc-500">{serverData.specs.cores} Çekirdek</p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Bellek</span>
                  <p className="text-sm text-zinc-900 dark:text-white">{serverData.specs.ram}</p>
                </div>
                <div>
                  <span className="text-xs text-zinc-500">Depolama</span>
                  <p className="text-sm text-zinc-900 dark:text-white">{serverData.specs.disk}</p>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Quick Stats */}
          <BlurFade delay={0.45}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">Özet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">{serverData.services}</p>
                    <p className="text-xs text-zinc-500">Aktif Hizmet</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <p className="text-2xl font-bold text-green-500">{serverData.uptime}</p>
                    <p className="text-xs text-zinc-500">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Quick Actions */}
          <BlurFade delay={0.5}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-zinc-900 dark:text-white text-base">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <Shield className="mr-2 h-4 w-4" />
                  Güvenlik Taraması
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <Network className="mr-2 h-4 w-4" />
                  Ağ Testi
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <HardDrive className="mr-2 h-4 w-4" />
                  Yedek Al
                </Button>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
