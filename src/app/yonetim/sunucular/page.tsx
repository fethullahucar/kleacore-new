"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
  CheckCircle,
  AlertTriangle,
  Wrench,
  MoreVertical,
  RefreshCcw,
  Power,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

const servers = [
  {
    id: "SRV-01",
    name: "Web Server 01",
    ip: "185.123.45.67",
    location: "İstanbul",
    status: "online",
    type: "Shared Hosting",
    cpu: 45,
    ram: 62,
    disk: 78,
    services: 156,
    uptime: "99.98%",
  },
  {
    id: "SRV-02",
    name: "Web Server 02",
    ip: "185.123.45.68",
    location: "İstanbul",
    status: "online",
    type: "Shared Hosting",
    cpu: 32,
    ram: 48,
    disk: 65,
    services: 142,
    uptime: "99.99%",
  },
  {
    id: "SRV-03",
    name: "VDS Server 01",
    ip: "185.123.45.70",
    location: "Frankfurt",
    status: "warning",
    type: "VDS",
    cpu: 92,
    ram: 85,
    disk: 45,
    services: 24,
    uptime: "99.95%",
  },
  {
    id: "SRV-04",
    name: "VPS Server 01",
    ip: "185.123.45.71",
    location: "Amsterdam",
    status: "online",
    type: "VPS",
    cpu: 28,
    ram: 55,
    disk: 40,
    services: 38,
    uptime: "99.97%",
  },
  {
    id: "SRV-05",
    name: "Mail Server 01",
    ip: "185.123.45.72",
    location: "İstanbul",
    status: "maintenance",
    type: "E-posta",
    cpu: 0,
    ram: 0,
    disk: 52,
    services: 0,
    uptime: "99.90%",
  },
  {
    id: "SRV-06",
    name: "Backup Server",
    ip: "185.123.45.73",
    location: "İstanbul",
    status: "online",
    type: "Yedekleme",
    cpu: 15,
    ram: 22,
    disk: 88,
    services: 0,
    uptime: "100%",
  },
];

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  online: { label: "Çevrimiçi", color: "text-green-500", bgColor: "bg-green-500", icon: CheckCircle },
  warning: { label: "Uyarı", color: "text-yellow-500", bgColor: "bg-yellow-500", icon: AlertTriangle },
  maintenance: { label: "Bakımda", color: "text-blue-500", bgColor: "bg-blue-500", icon: Wrench },
  offline: { label: "Çevrimdışı", color: "text-red-500", bgColor: "bg-red-500", icon: Power },
};

const stats = [
  { title: "Toplam Sunucu", value: "12", icon: Server, change: "6 aktif" },
  { title: "Çevrimiçi", value: "10", icon: CheckCircle, change: "%83" },
  { title: "Uyarı", value: "1", icon: AlertTriangle, change: "Dikkat gerekiyor" },
  { title: "Ort. Uptime", value: "99.96%", icon: Activity, change: "Son 30 gün" },
];

const getUsageColor = (percent: number) => {
  if (percent >= 90) return "bg-red-500";
  if (percent >= 70) return "bg-yellow-500";
  return "bg-green-500";
};

export default function ServersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServers = servers.filter((server) =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    server.ip.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Sunucular</h1>
            <p className="text-zinc-400">Sunucu durumlarını izleyin ve yönetin</p>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.1 + index * 0.05}>
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">{stat.change}</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-zinc-400">{stat.title}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Search */}
      <BlurFade delay={0.3}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Sunucu adı, ID veya IP ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Server Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredServers.map((server, index) => {
          const status = statusConfig[server.status];
          return (
            <BlurFade key={server.id} delay={0.4 + index * 0.05}>
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      "bg-zinc-800"
                    )}>
                      <Server className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Link
                        href={`/yonetim/sunucular/${server.id}`}
                        className="text-sm font-medium text-white hover:text-primary"
                      >
                        {server.name}
                      </Link>
                      <p className="text-xs text-zinc-500">{server.id} • {server.type}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href={`/yonetim/sunucular/${server.id}`}>
                          <Activity className="mr-2 h-4 w-4" />
                          Detayları Gör
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Yeniden Başlat
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-zinc-800" />
                      <DropdownMenuItem className="cursor-pointer text-blue-400">
                        <Wrench className="mr-2 h-4 w-4" />
                        Bakım Modu
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status & Info */}
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("h-2 w-2 rounded-full", status.bgColor)} />
                      <span className={cn("text-sm font-medium", status.color)}>
                        {status.label}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">{server.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{server.ip}</span>
                    <span>{server.services} hizmet</span>
                  </div>

                  {/* Usage Bars */}
                  {server.status !== "maintenance" && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <Cpu className="h-3 w-3 text-zinc-500" />
                            <span className="text-xs text-zinc-400">CPU</span>
                          </div>
                          <span className="text-xs text-zinc-400">{server.cpu}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", getUsageColor(server.cpu))}
                            style={{ width: `${server.cpu}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <MemoryStick className="h-3 w-3 text-zinc-500" />
                            <span className="text-xs text-zinc-400">RAM</span>
                          </div>
                          <span className="text-xs text-zinc-400">{server.ram}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", getUsageColor(server.ram))}
                            style={{ width: `${server.ram}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <HardDrive className="h-3 w-3 text-zinc-500" />
                            <span className="text-xs text-zinc-400">Disk</span>
                          </div>
                          <span className="text-xs text-zinc-400">{server.disk}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", getUsageColor(server.disk))}
                            style={{ width: `${server.disk}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {server.status === "maintenance" && (
                    <div className="text-center py-4">
                      <Wrench className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-zinc-400">Bakım çalışması devam ediyor</p>
                    </div>
                  )}

                  {/* Uptime */}
                  <div className="pt-3 border-t border-zinc-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Uptime (30 gün)</span>
                      <span className="text-green-500 font-medium">{server.uptime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
