"use client";

import { useState } from "react";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Headphones,
  BarChart3,
  PieChart,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const revenueData = [
  { month: "Oca", revenue: 185000, expenses: 42000 },
  { month: "Şub", revenue: 198000, expenses: 45000 },
  { month: "Mar", revenue: 215000, expenses: 48000 },
  { month: "Nis", revenue: 242000, expenses: 52000 },
  { month: "May", revenue: 268000, expenses: 55000 },
  { month: "Haz", revenue: 284750, expenses: 58000 },
];

const serviceDistribution = [
  { name: "Hosting", count: 2150, percentage: 48, color: "bg-blue-500" },
  { name: "SSL", count: 890, percentage: 20, color: "bg-green-500" },
  { name: "VDS/VPS", count: 450, percentage: 10, color: "bg-purple-500" },
  { name: "Domain", count: 680, percentage: 15, color: "bg-orange-500" },
  { name: "E-posta", count: 351, percentage: 7, color: "bg-cyan-500" },
];

const customerStats = {
  total: 2847,
  newThisMonth: 156,
  churned: 23,
  growthRate: 5.8,
  avgLifetime: "18.5 ay",
  avgRevenue: "₺3,240",
};

const supportStats = {
  total: 1250,
  resolved: 1185,
  avgResponseTime: "2.4 saat",
  satisfactionRate: 94.5,
  topIssues: [
    { issue: "DNS Yapılandırma", count: 145 },
    { issue: "E-posta Gönderim", count: 132 },
    { issue: "SSL Kurulum", count: 98 },
    { issue: "Fatura Sorgusu", count: 87 },
    { issue: "Hosting Performans", count: 76 },
  ],
};

const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

export default function ReportsPage() {
  const [period, setPeriod] = useState("6months");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Raporlar</h1>
          <p className="text-zinc-400">İş performansınızı analiz edin</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[160px] bg-zinc-800 border-zinc-700 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Dönem" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="7days">Son 7 Gün</SelectItem>
              <SelectItem value="30days">Son 30 Gün</SelectItem>
              <SelectItem value="3months">Son 3 Ay</SelectItem>
              <SelectItem value="6months">Son 6 Ay</SelectItem>
              <SelectItem value="1year">Son 1 Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
            <Download className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="bg-zinc-800 border border-zinc-700">
          <TabsTrigger value="revenue" className="data-[state=active]:bg-zinc-700">
            <DollarSign className="mr-2 h-4 w-4" />
            Gelir
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-zinc-700">
            <Users className="mr-2 h-4 w-4" />
            Müşteriler
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-zinc-700">
            <Package className="mr-2 h-4 w-4" />
            Hizmetler
          </TabsTrigger>
          <TabsTrigger value="support" className="data-[state=active]:bg-zinc-700">
            <Headphones className="mr-2 h-4 w-4" />
            Destek
          </TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="mt-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <DollarSign className="h-5 w-5 text-zinc-500" />
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+18%</span>
                  </div>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">₺1.392.750</p>
                <p className="text-sm text-zinc-400">Toplam Gelir</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <TrendingDown className="h-5 w-5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">6 ay</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">₺300.000</p>
                <p className="text-sm text-zinc-400">Toplam Gider</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <BarChart3 className="h-5 w-5 text-zinc-500" />
                  <span className="text-xs text-green-500">%78</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">₺1.092.750</p>
                <p className="text-sm text-zinc-400">Net Kar</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-zinc-500" />
                  <span className="text-xs text-zinc-500">Aylık ort.</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">₺232.125</p>
                <p className="text-sm text-zinc-400">Ortalama Gelir</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">Gelir ve Gider Grafiği</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-64">
                {revenueData.map((data) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end" style={{ height: "200px" }}>
                      <div
                        className="flex-1 bg-primary rounded-t hover:bg-primary/80 transition-colors relative group"
                        style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ₺{data.revenue.toLocaleString("tr-TR")}
                        </div>
                      </div>
                      <div
                        className="flex-1 bg-red-500/50 rounded-t hover:bg-red-500/70 transition-colors relative group"
                        style={{ height: `${(data.expenses / maxRevenue) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ₺{data.expenses.toLocaleString("tr-TR")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-zinc-500">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-primary" />
                  <span className="text-sm text-zinc-400">Gelir</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-red-500/50" />
                  <span className="text-sm text-zinc-400">Gider</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <Users className="h-5 w-5 text-zinc-500 mb-2" />
                <p className="text-2xl font-bold text-white">{customerStats.total.toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Toplam Müşteri</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <TrendingUp className="h-5 w-5 text-green-500 mb-2" />
                <p className="text-2xl font-bold text-white">+{customerStats.newThisMonth}</p>
                <p className="text-sm text-zinc-400">Bu Ay Yeni Kayıt</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <TrendingDown className="h-5 w-5 text-red-500 mb-2" />
                <p className="text-2xl font-bold text-white">-{customerStats.churned}</p>
                <p className="text-sm text-zinc-400">Kaybedilen Müşteri</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Müşteri Metrikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                  <span className="text-sm text-zinc-400">Büyüme Oranı</span>
                  <span className="text-sm font-medium text-green-500">+{customerStats.growthRate}%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                  <span className="text-sm text-zinc-400">Ort. Müşteri Ömrü</span>
                  <span className="text-sm font-medium text-white">{customerStats.avgLifetime}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                  <span className="text-sm text-zinc-400">Ort. Müşteri Değeri</span>
                  <span className="text-sm font-medium text-white">{customerStats.avgRevenue}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Kayıt Kaynakları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { source: "Organik Arama", percentage: 42 },
                    { source: "Referans", percentage: 28 },
                    { source: "Sosyal Medya", percentage: 18 },
                    { source: "Doğrudan", percentage: 12 },
                  ].map((item) => (
                    <div key={item.source}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-zinc-400">{item.source}</span>
                        <span className="text-sm text-zinc-300">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Hizmet Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceDistribution.map((service) => (
                    <div key={service.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn("h-3 w-3 rounded", service.color)} />
                          <span className="text-sm text-zinc-300">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-zinc-400">{service.count}</span>
                          <span className="text-sm font-medium text-white">{service.percentage}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", service.color)}
                          style={{ width: `${service.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Hizmet İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                  <span className="text-sm text-zinc-400">Toplam Aktif Hizmet</span>
                  <span className="text-sm font-medium text-white">4,521</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                  <span className="text-sm text-zinc-400">Bu Ay Yeni Satış</span>
                  <span className="text-sm font-medium text-green-500">+342</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                  <span className="text-sm text-zinc-400">Yenileme Oranı</span>
                  <span className="text-sm font-medium text-white">87.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                  <span className="text-sm text-zinc-400">İptal Oranı</span>
                  <span className="text-sm font-medium text-red-500">2.3%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Support Tab */}
        <TabsContent value="support" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <Headphones className="h-5 w-5 text-zinc-500 mb-2" />
                <p className="text-2xl font-bold text-white">{supportStats.total.toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Toplam Talep</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <TrendingUp className="h-5 w-5 text-green-500 mb-2" />
                <p className="text-2xl font-bold text-white">{supportStats.resolved.toLocaleString()}</p>
                <p className="text-sm text-zinc-400">Çözülen</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <Calendar className="h-5 w-5 text-zinc-500 mb-2" />
                <p className="text-2xl font-bold text-white">{supportStats.avgResponseTime}</p>
                <p className="text-sm text-zinc-400">Ort. Yanıt Süresi</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <PieChart className="h-5 w-5 text-zinc-500 mb-2" />
                <p className="text-2xl font-bold text-green-500">{supportStats.satisfactionRate}%</p>
                <p className="text-sm text-zinc-400">Memnuniyet Oranı</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">En Sık Karşılaşılan Sorunlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportStats.topIssues.map((item, index) => (
                  <div key={item.issue} className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/50">
                    <span className="text-lg font-bold text-zinc-500 w-6">{index + 1}</span>
                    <span className="flex-1 text-sm text-zinc-300">{item.issue}</span>
                    <span className="text-sm font-medium text-white">{item.count} talep</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
