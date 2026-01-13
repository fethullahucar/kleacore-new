"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Activity,
  HardDrive,
  Globe,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Cpu,
  Wifi,
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

// Mock service usage
const serviceUsage = [
  {
    name: "Linux Hosting Pro",
    disk: { used: 12.4, total: 50 },
    bandwidth: { used: 45.2, total: 100 },
    cpu: 28,
  },
  {
    name: "VDS-M Production",
    disk: { used: 85, total: 160 },
    bandwidth: { used: 156.8, total: 1000 },
    cpu: 45,
  },
  {
    name: "Cloud-S Dev",
    disk: { used: 25, total: 80 },
    bandwidth: { used: 32.4, total: 500 },
    cpu: 18,
  },
  {
    name: "WordPress Starter",
    disk: { used: 2.8, total: 10 },
    bandwidth: { used: 22.4, total: 50 },
    cpu: 12,
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
              className="flex-1 bg-blue-500 rounded-t"
              style={{ height: `${(item.incoming / maxValue) * 100}%` }}
              title={`Gelen: ${item.incoming} GB`}
            />
            <div
              className="flex-1 bg-green-500 rounded-t"
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bandwidth Chart */}
        <BlurFade delay={0.2} inView>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Bandwidth Kullanımı</span>
                <div className="flex items-center gap-4 text-sm font-normal">
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-blue-500" />
                    Gelen
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    Giden
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={bandwidthData} />
            </CardContent>
          </Card>
        </BlurFade>

        {/* Visitor Stats */}
        <BlurFade delay={0.25} inView>
          <Card>
            <CardHeader>
              <CardTitle>Ziyaretçi Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitorStats.map((stat) => (
                  <div key={stat.country} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        {stat.country}
                      </span>
                      <span className="font-medium">
                        {stat.visitors.toLocaleString()} ({stat.percentage}%)
                      </span>
                    </div>
                    <ProgressBar
                      value={stat.percentage}
                      max={100}
                      color="bg-primary"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Service Usage */}
      <BlurFade delay={0.3} inView>
        <Card>
          <CardHeader>
            <CardTitle>Hizmet Bazlı Kullanım</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {serviceUsage.map((service) => (
                <div key={service.name} className="space-y-3">
                  <p className="font-semibold">{service.name}</p>
                  <div className="grid gap-4 sm:grid-cols-3">
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
