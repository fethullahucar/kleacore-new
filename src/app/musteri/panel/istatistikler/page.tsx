"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HardDrive,
  Globe,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
  Wifi,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Zap,
  RefreshCw,
  Download,
  Upload,
  Eye,
  MousePointer,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock statistics data
const overviewStats = [
  {
    title: "Toplam Bandwidth",
    value: "256.8 GB",
    change: "+12%",
    trend: "up",
    period: "Bu ay",
    icon: Wifi,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Disk Kullanımı",
    value: "45.2 GB",
    change: "+5%",
    trend: "up",
    period: "Toplam",
    icon: HardDrive,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Ortalama CPU",
    value: "34%",
    change: "-8%",
    trend: "down",
    period: "Bu hafta",
    icon: Cpu,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Toplam Ziyaretçi",
    value: "12,456",
    change: "+23%",
    trend: "up",
    period: "Bu ay",
    icon: Users,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

// Uptime stats
const uptimeStats = [
  {
    service: "Linux Hosting Pro",
    uptime: 99.98,
    lastDowntime: "15 gün önce",
    duration: "3 dakika",
    status: "operational",
  },
  {
    service: "VDS-M Production",
    uptime: 99.99,
    lastDowntime: "32 gün önce",
    duration: "45 saniye",
    status: "operational",
  },
  {
    service: "Cloud-S Dev",
    uptime: 100.0,
    lastDowntime: "Hiç",
    duration: "-",
    status: "operational",
  },
  {
    service: "WordPress Starter",
    uptime: 99.95,
    lastDowntime: "2 gün önce",
    duration: "12 dakika",
    status: "degraded",
  },
];

// Mock bandwidth data (simulating chart data)
const bandwidthData = [
  { day: "Pzt", incoming: 8.2, outgoing: 12.4 },
  { day: "Sal", incoming: 9.1, outgoing: 14.2 },
  { day: "Çar", incoming: 7.8, outgoing: 11.8 },
  { day: "Per", incoming: 10.5, outgoing: 15.6 },
  { day: "Cum", incoming: 12.3, outgoing: 18.9 },
  { day: "Cmt", incoming: 6.4, outgoing: 9.2 },
  { day: "Paz", incoming: 5.8, outgoing: 8.4 },
];

// Response time data
const responseTimeData = [
  { hour: "00:00", time: 245 },
  { hour: "04:00", time: 198 },
  { hour: "08:00", time: 312 },
  { hour: "12:00", time: 456 },
  { hour: "16:00", time: 523 },
  { hour: "20:00", time: 389 },
  { hour: "24:00", time: 267 },
];

// Mock service usage
const serviceUsage = [
  {
    name: "Linux Hosting Pro",
    disk: { used: 12.4, total: 50 },
    bandwidth: { used: 45.2, total: 100 },
    cpu: 28,
    ram: 45,
    iops: 1250,
  },
  {
    name: "VDS-M Production",
    disk: { used: 85, total: 160 },
    bandwidth: { used: 156.8, total: 1000 },
    cpu: 45,
    ram: 62,
    iops: 4500,
  },
  {
    name: "Cloud-S Dev",
    disk: { used: 25, total: 80 },
    bandwidth: { used: 32.4, total: 500 },
    cpu: 18,
    ram: 35,
    iops: 2100,
  },
];

// Mock visitor stats
const visitorStats = [
  { country: "Türkiye", visitors: 8234, percentage: 66 },
  { country: "Almanya", visitors: 1856, percentage: 15 },
  { country: "Amerika", visitors: 1245, percentage: 10 },
  { country: "İngiltere", visitors: 621, percentage: 5 },
  { country: "Diğer", visitors: 500, percentage: 4 },
];

// Traffic sources
const trafficSources = [
  { source: "Organik Arama", visits: 5234, percentage: 42, icon: Globe },
  { source: "Direkt Trafik", visits: 3125, percentage: 25, icon: MousePointer },
  { source: "Sosyal Medya", visits: 2456, percentage: 20, icon: Users },
  { source: "Referans", visits: 1641, percentage: 13, icon: Eye },
];

// Error rates
const errorRates = [
  { code: "2xx", label: "Başarılı", count: 45234, percentage: 96.2, color: "bg-green-500" },
  { code: "3xx", label: "Yönlendirme", count: 1234, percentage: 2.6, color: "bg-blue-500" },
  { code: "4xx", label: "İstemci Hatası", count: 456, percentage: 0.97, color: "bg-orange-500" },
  { code: "5xx", label: "Sunucu Hatası", count: 108, percentage: 0.23, color: "bg-red-500" },
];

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function SimpleBarChart({ data }: { data: typeof bandwidthData }) {
  const maxValue = Math.max(...data.flatMap((d) => [d.incoming, d.outgoing]));

  return (
    <div className="flex items-end justify-between gap-2 h-48">
      {data.map((item) => (
        <div key={item.day} className="flex-1 flex flex-col items-center gap-1">
          <div className="flex-1 w-full flex items-end gap-1">
            <div
              className="flex-1 bg-blue-500 rounded-t transition-all hover:opacity-80"
              style={{ height: `${(item.incoming / maxValue) * 100}%` }}
              title={`Gelen: ${item.incoming} GB`}
            />
            <div
              className="flex-1 bg-green-500 rounded-t transition-all hover:opacity-80"
              style={{ height: `${(item.outgoing / maxValue) * 100}%` }}
              title={`Giden: ${item.outgoing} GB`}
            />
          </div>
          <span className="text-xs text-muted-foreground">{item.day}</span>
        </div>
      ))}
    </div>
  );
}

function ResponseTimeChart({ data }: { data: typeof responseTimeData }) {
  const maxTime = Math.max(...data.map((d) => d.time));
  const minTime = Math.min(...data.map((d) => d.time));
  const avgTime = Math.round(data.reduce((acc, d) => acc + d.time, 0) / data.length);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-1 h-32">
        {data.map((item, index) => (
          <div key={item.hour} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={cn(
                "w-full rounded-t transition-all hover:opacity-80",
                item.time > 400 ? "bg-orange-500" : item.time > 300 ? "bg-yellow-500" : "bg-green-500"
              )}
              style={{ height: `${(item.time / maxTime) * 100}%` }}
              title={`${item.time}ms`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        {data.map((item) => (
          <span key={item.hour}>{item.hour}</span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 pt-2 border-t">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Min</p>
          <p className="font-semibold text-green-500">{minTime}ms</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Ortalama</p>
          <p className="font-semibold text-yellow-500">{avgTime}ms</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Max</p>
          <p className="font-semibold text-orange-500">{maxTime}ms</p>
        </div>
      </div>
    </div>
  );
}

export default function IstatistiklerPage() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("week");

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">İstatistikler</h1>
            <p className="text-muted-foreground">
              Hizmetlerinizin kullanım istatistiklerini görüntüleyin.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={period === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("week")}
            >
              Haftalık
            </Button>
            <Button
              variant={period === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("month")}
            >
              Aylık
            </Button>
            <Button
              variant={period === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setPeriod("year")}
            >
              Yıllık
            </Button>
          </div>
        </div>
      </BlurFade>

      {/* Overview Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={cn(
                          "text-sm font-medium",
                          stat.trend === "up" ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stat.period}
                      </span>
                    </div>
                  </div>
                  <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </BlurFade>

      {/* Uptime Stats */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Uptime Durumu
            </CardTitle>
            <CardDescription>
              Son 30 günlük çalışma süresi istatistikleri
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {uptimeStats.map((stat) => (
                <div key={stat.service} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-sm">{stat.service}</p>
                    {stat.status === "operational" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : stat.status === "degraded" ? (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className={cn(
                    "text-3xl font-bold",
                    stat.uptime >= 99.99 ? "text-green-500" :
                    stat.uptime >= 99.9 ? "text-yellow-500" : "text-orange-500"
                  )}>
                    {stat.uptime}%
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>Son kesinti: {stat.lastDowntime}</p>
                    <p>Süre: {stat.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bandwidth Chart */}
        <BlurFade delay={0.25} inView>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-blue-500" />
                  Bandwidth Kullanımı
                </span>
                <div className="flex items-center gap-4 text-sm font-normal">
                  <span className="flex items-center gap-1">
                    <Download className="h-3 w-3 text-blue-500" />
                    Gelen
                  </span>
                  <span className="flex items-center gap-1">
                    <Upload className="h-3 w-3 text-green-500" />
                    Giden
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={bandwidthData} />
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Toplam Gelen</p>
                  <p className="text-xl font-bold text-blue-500">60.1 GB</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Toplam Giden</p>
                  <p className="text-xl font-bold text-green-500">90.5 GB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Response Time */}
        <BlurFade delay={0.3} inView>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-purple-500" />
                Yanıt Süresi
              </CardTitle>
              <CardDescription>
                Son 24 saatlik ortalama yanıt süreleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponseTimeChart data={responseTimeData} />
            </CardContent>
          </Card>
        </BlurFade>

        {/* Visitor Stats */}
        <BlurFade delay={0.35} inView>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-cyan-500" />
                Ziyaretçi Dağılımı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitorStats.map((stat) => (
                  <div key={stat.country} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        {stat.country}
                      </span>
                      <span className="font-medium">
                        {stat.visitors.toLocaleString()} ({stat.percentage}%)
                      </span>
                    </div>
                    <ProgressBar
                      value={stat.percentage}
                      max={100}
                      color="bg-cyan-500"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Traffic Sources */}
        <BlurFade delay={0.4} inView>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Trafik Kaynakları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <source.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{source.source}</p>
                        <p className="text-xs text-muted-foreground">
                          {source.visits.toLocaleString()} ziyaret
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold">{source.percentage}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Error Rates */}
      <BlurFade delay={0.45} inView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-red-500" />
              HTTP Yanıt Kodları
            </CardTitle>
            <CardDescription>
              Son 7 günlük HTTP durum kodu dağılımı
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {errorRates.map((rate) => (
                <div key={rate.code} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-bold text-white",
                      rate.color
                    )}>
                      {rate.code}
                    </span>
                    <span className="text-xs text-muted-foreground">{rate.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{rate.count.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{rate.percentage}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Service Usage */}
      <BlurFade delay={0.5} inView>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-500" />
                  Hizmet Bazlı Kullanım
                </CardTitle>
                <CardDescription>
                  Her hizmetin kaynak kullanım detayları
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Yenile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {serviceUsage.map((service) => (
                <div key={service.name} className="p-4 rounded-lg border">
                  <p className="font-semibold mb-4">{service.name}</p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <HardDrive className="h-4 w-4" />
                          Disk
                        </span>
                        <span>
                          {service.disk.used} / {service.disk.total} GB
                        </span>
                      </div>
                      <ProgressBar
                        value={service.disk.used}
                        max={service.disk.total}
                        color={
                          (service.disk.used / service.disk.total) * 100 > 80
                            ? "bg-red-500"
                            : (service.disk.used / service.disk.total) * 100 > 60
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Wifi className="h-4 w-4" />
                          Bandwidth
                        </span>
                        <span>
                          {service.bandwidth.used} / {service.bandwidth.total} GB
                        </span>
                      </div>
                      <ProgressBar
                        value={service.bandwidth.used}
                        max={service.bandwidth.total}
                        color={
                          (service.bandwidth.used / service.bandwidth.total) * 100 > 80
                            ? "bg-red-500"
                            : (service.bandwidth.used / service.bandwidth.total) * 100 > 60
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Cpu className="h-4 w-4" />
                          CPU
                        </span>
                        <span>{service.cpu}%</span>
                      </div>
                      <ProgressBar
                        value={service.cpu}
                        max={100}
                        color={
                          service.cpu > 80
                            ? "bg-red-500"
                            : service.cpu > 60
                            ? "bg-orange-500"
                            : "bg-purple-500"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Activity className="h-4 w-4" />
                          RAM
                        </span>
                        <span>{service.ram}%</span>
                      </div>
                      <ProgressBar
                        value={service.ram}
                        max={100}
                        color={
                          service.ram > 80
                            ? "bg-red-500"
                            : service.ram > 60
                            ? "bg-orange-500"
                            : "bg-cyan-500"
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Zap className="h-4 w-4" />
                          IOPS
                        </span>
                        <span>{service.iops.toLocaleString()}</span>
                      </div>
                      <ProgressBar
                        value={service.iops}
                        max={5000}
                        color="bg-yellow-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
