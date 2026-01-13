"use client";

import { useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Server,
  Cloud,
  Search,
  MoreVertical,
  Power,
  RotateCcw,
  Terminal,
  HardDrive,
  Cpu,
  Activity,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Pause,
  Play,
  Camera,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock servers data
const servers = [
  {
    id: 1,
    name: "VDS-M Production",
    type: "VDS",
    ip: "185.123.45.67",
    status: "running",
    os: "Ubuntu 22.04 LTS",
    cpu: { used: 45, total: 4 },
    ram: { used: 6.2, total: 8 },
    disk: { used: 85, total: 160 },
    location: "İstanbul",
    createdAt: "10 Şubat 2024",
  },
  {
    id: 2,
    name: "Cloud-S Dev",
    type: "Bulut",
    ip: "185.123.45.68",
    status: "running",
    os: "Debian 12",
    cpu: { used: 20, total: 2 },
    ram: { used: 1.5, total: 4 },
    disk: { used: 25, total: 80 },
    location: "İstanbul",
    createdAt: "5 Nisan 2024",
  },
  {
    id: 3,
    name: "VPS-S Test",
    type: "VPS",
    ip: "185.123.45.69",
    status: "stopped",
    os: "CentOS 8",
    cpu: { used: 0, total: 1 },
    ram: { used: 0, total: 2 },
    disk: { used: 15, total: 40 },
    location: "Frankfurt",
    createdAt: "15 Mayıs 2024",
  },
  {
    id: 4,
    name: "VDS-L Database",
    type: "VDS",
    ip: "185.123.45.70",
    status: "running",
    os: "Ubuntu 20.04 LTS",
    cpu: { used: 78, total: 8 },
    ram: { used: 14.5, total: 16 },
    disk: { used: 280, total: 320 },
    location: "İstanbul",
    createdAt: "1 Mart 2024",
  },
];

const statusConfig = {
  running: {
    label: "Çalışıyor",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    icon: CheckCircle2,
  },
  stopped: {
    label: "Durduruldu",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    icon: Pause,
  },
  restarting: {
    label: "Yeniden Başlıyor",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    icon: RotateCcw,
  },
  error: {
    label: "Hata",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    icon: XCircle,
  },
};

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percentage = (value / max) * 100;
  return (
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function SunucularPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.ip.includes(searchQuery)
  );

  const stats = {
    total: servers.length,
    running: servers.filter((s) => s.status === "running").length,
    stopped: servers.filter((s) => s.status === "stopped").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sunucularım</h1>
            <p className="text-muted-foreground">
              VPS, VDS ve Bulut sunucularınızı yönetin.
            </p>
          </div>
          <Button asChild>
            <Link href="/sunucu/vds">Yeni Sunucu</Link>
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Server className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Sunucu</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Activity className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Çalışıyor</p>
                  <p className="text-2xl font-bold">{stats.running}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-500/10">
                  <Pause className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Durduruldu</p>
                  <p className="text-2xl font-bold">{stats.stopped}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Search */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sunucu adı veya IP ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Servers List */}
      <BlurFade delay={0.25} inView>
        <div className="grid gap-4">
          {filteredServers.map((server) => {
            const status = statusConfig[server.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isRunning = server.status === "running";

            return (
              <Card key={server.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Server Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className={cn("p-3 rounded-lg", status.bgColor)}>
                        {server.type === "Bulut" ? (
                          <Cloud className={cn("h-6 w-6", status.color)} />
                        ) : (
                          <Server className={cn("h-6 w-6", status.color)} />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{server.name}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                            {server.type}
                          </span>
                          <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", status.bgColor, status.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {server.ip} - {server.os}
                        </p>
                      </div>
                    </div>

                    {/* Resources */}
                    {isRunning && (
                      <div className="grid grid-cols-3 gap-6 flex-1">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Cpu className="h-3 w-3" /> CPU
                            </span>
                            <span>{server.cpu.used}%</span>
                          </div>
                          <ProgressBar
                            value={server.cpu.used}
                            max={100}
                            color={server.cpu.used > 80 ? "bg-red-500" : server.cpu.used > 60 ? "bg-orange-500" : "bg-green-500"}
                          />
                          <p className="text-xs text-muted-foreground">{server.cpu.total} vCPU</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Activity className="h-3 w-3" /> RAM
                            </span>
                            <span>{server.ram.used} GB</span>
                          </div>
                          <ProgressBar
                            value={server.ram.used}
                            max={server.ram.total}
                            color={(server.ram.used / server.ram.total) * 100 > 80 ? "bg-red-500" : (server.ram.used / server.ram.total) * 100 > 60 ? "bg-orange-500" : "bg-green-500"}
                          />
                          <p className="text-xs text-muted-foreground">{server.ram.total} GB</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <HardDrive className="h-3 w-3" /> Disk
                            </span>
                            <span>{server.disk.used} GB</span>
                          </div>
                          <ProgressBar
                            value={server.disk.used}
                            max={server.disk.total}
                            color={(server.disk.used / server.disk.total) * 100 > 80 ? "bg-red-500" : (server.disk.used / server.disk.total) * 100 > 60 ? "bg-orange-500" : "bg-green-500"}
                          />
                          <p className="text-xs text-muted-foreground">{server.disk.total} GB</p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {isRunning ? (
                        <Button variant="outline" size="sm">
                          <Terminal className="mr-2 h-4 w-4" />
                          Konsol
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Başlat
                        </Button>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Yeniden Başlat
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Power className="mr-2 h-4 w-4" />
                            {isRunning ? "Durdur" : "Başlat"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Camera className="mr-2 h-4 w-4" />
                            Snapshot Al
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <HardDrive className="mr-2 h-4 w-4" />
                            OS Yeniden Kur
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredServers.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                Aramanızla eşleşen sunucu bulunamadı.
              </CardContent>
            </Card>
          )}
        </div>
      </BlurFade>
    </div>
  );
}
