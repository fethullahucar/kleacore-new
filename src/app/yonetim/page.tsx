"use client";

import Link from "next/link";
import {
  Users,
  Package,
  TrendingUp,
  Headphones,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  CreditCard,
  Server,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Toplam Müşteri",
    value: "2,847",
    change: "+12%",
    changeType: "positive",
    description: "Bu ay 48 yeni kayıt",
    icon: Users,
    href: "/yonetim/musteriler",
  },
  {
    title: "Aktif Hizmetler",
    value: "4,521",
    change: "+8%",
    changeType: "positive",
    description: "23 bekleyen aktivasyon",
    icon: Package,
    href: "/yonetim/hizmetler",
  },
  {
    title: "Bu Ay Gelir",
    value: "₺284.750",
    change: "+18%",
    changeType: "positive",
    description: "Geçen aya göre",
    icon: DollarSign,
    href: "/yonetim/faturalar",
  },
  {
    title: "Açık Talepler",
    value: "37",
    change: "-5%",
    changeType: "negative",
    description: "8 kritik öncelikli",
    icon: Headphones,
    href: "/yonetim/destek",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "order",
    title: "Yeni sipariş",
    description: "Ahmet Yılmaz - Profesyonel Hosting paketi",
    amount: "₺299,00",
    time: "5 dk önce",
    icon: Package,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: 2,
    type: "payment",
    title: "Ödeme alındı",
    description: "Fatura #2024-0156 - Mehmet Kaya",
    amount: "₺1.250,00",
    time: "12 dk önce",
    icon: CreditCard,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    id: 3,
    type: "support",
    title: "Yeni destek talebi",
    description: "Ayşe Demir - DNS yapılandırma sorunu",
    amount: null,
    time: "25 dk önce",
    icon: Headphones,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    id: 4,
    type: "user",
    title: "Yeni müşteri kaydı",
    description: "Can Özkan - can@example.com",
    amount: null,
    time: "1 saat önce",
    icon: UserPlus,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    id: 5,
    type: "server",
    title: "Sunucu uyarısı",
    description: "SRV-03 - CPU kullanımı %92",
    amount: null,
    time: "2 saat önce",
    icon: Server,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
  },
];

const pendingTasks = [
  {
    id: 1,
    title: "8 kritik destek talebi",
    description: "Acil yanıt bekliyor",
    status: "critical",
    href: "/yonetim/destek",
  },
  {
    id: 2,
    title: "23 hizmet aktivasyonu",
    description: "Onay bekliyor",
    status: "warning",
    href: "/yonetim/hizmetler",
  },
  {
    id: 3,
    title: "12 ödenmemiş fatura",
    description: "Hatırlatma gönderilecek",
    status: "warning",
    href: "/yonetim/faturalar",
  },
];

const revenueData = [
  { month: "Oca", amount: 185000 },
  { month: "Şub", amount: 198000 },
  { month: "Mar", amount: 215000 },
  { month: "Nis", amount: 242000 },
  { month: "May", amount: 268000 },
  { month: "Haz", amount: 284750 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.amount));

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400">Hoş geldin, Admin. İşte bugünkü genel bakış.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    "bg-zinc-800"
                  )}>
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.changeType === "positive" ? "text-green-500" : "text-red-500"
                  )}>
                    {stat.changeType === "positive" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-zinc-400">{stat.title}</p>
                </div>
                <p className="mt-2 text-xs text-zinc-500">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Aylık Gelir</CardTitle>
            <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-white">
              Raporu Gör
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {revenueData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-primary/20 rounded-t hover:bg-primary/30 transition-colors relative group"
                    style={{ height: `${(data.amount / maxRevenue) * 100}%` }}
                  >
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                      style={{ height: "100%" }}
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ₺{data.amount.toLocaleString("tr-TR")}
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Tasks */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Bekleyen İşlemler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => (
              <Link
                key={task.id}
                href={task.href}
                className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <div className={cn(
                  "mt-0.5 h-2 w-2 rounded-full shrink-0",
                  task.status === "critical" ? "bg-red-500" : "bg-yellow-500"
                )} />
                <div>
                  <p className="text-sm font-medium text-white">{task.title}</p>
                  <p className="text-xs text-zinc-500">{task.description}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Son Aktiviteler</CardTitle>
          <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
            Tümünü Gör
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                  activity.iconBg
                )}>
                  <activity.icon className={cn("h-5 w-5", activity.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-sm text-zinc-400 truncate">{activity.description}</p>
                </div>
                {activity.amount && (
                  <span className="text-sm font-medium text-green-500">{activity.amount}</span>
                )}
                <span className="text-xs text-zinc-500 shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
