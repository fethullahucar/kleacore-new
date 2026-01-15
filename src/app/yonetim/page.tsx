"use client";

import Link from "next/link";
import {
  TrendingUp,
  Headphones,
  ArrowUpRight,
  DollarSign,
  UserPlus,
  ShoppingCart,
  FileWarning,
  CalendarClock,
  Bell,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

// Top 4 Stats
const stats = [
  {
    title: "Bugün Satış Ciro",
    value: "₺12.450",
    description: "Dün: ₺10.050",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/yonetim/faturalar",
  },
  {
    title: "Toplam Kasa (Aylık)",
    value: "₺284.750",
    description: "Geçen ay: ₺241.200",
    icon: TrendingUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/yonetim/raporlar",
  },
  {
    title: "Müşteri Kaydı Bugün",
    value: "12",
    description: "Bu hafta: 48 kayıt",
    icon: UserPlus,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/yonetim/musteriler",
  },
  {
    title: "Bekleyen Destek",
    value: "37",
    description: "8 kritik öncelikli",
    icon: Headphones,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/yonetim/destek",
  },
];

// Recent Orders
const recentOrders = [
  {
    id: "S-2024-00345",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    product: "Pro Hosting",
    category: "Hosting",
    renewalDate: "2025-06-20",
    amount: 1198.80,
    status: "pending",
  },
  {
    id: "S-2024-00344",
    customer: "Ayşe Demir",
    customerId: "M-002",
    product: "VDS Small",
    category: "VDS",
    renewalDate: "2025-06-19",
    amount: 418.80,
    status: "processing",
  },
  {
    id: "S-2024-00343",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    product: ".com Domain",
    category: "Domain",
    renewalDate: "2025-06-18",
    amount: 154.80,
    status: "completed",
  },
  {
    id: "S-2024-00342",
    customer: "Fatma Şahin",
    customerId: "M-004",
    product: "Starter Hosting",
    category: "Hosting",
    renewalDate: "2025-06-17",
    amount: 58.80,
    status: "completed",
  },
  {
    id: "S-2024-00341",
    customer: "Can Özkan",
    customerId: "M-005",
    product: "SSL Sertifika",
    category: "SSL",
    renewalDate: "2025-06-16",
    amount: 299.00,
    status: "processing",
  },
];

const orderStatusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-500" },
  processing: { label: "İşleniyor", color: "bg-blue-500/10 text-blue-500" },
  completed: { label: "Tamamlandı", color: "bg-green-500/10 text-green-500" },
};

// Middle 4 Cards Stats
const middleStats = [
  {
    title: "Gecikmiş Fatura",
    value: 12,
    description: "Toplam: ₺8.450",
    icon: FileWarning,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/yonetim/faturalar?durum=overdue",
  },
  {
    title: "Yaklaşan Ödeme",
    value: 23,
    description: "7 gün içinde",
    icon: CalendarClock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/yonetim/faturalar?durum=upcoming",
  },
  {
    title: "İşlemdeki Sipariş",
    value: 8,
    description: "Onay bekliyor",
    icon: ShoppingCart,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/yonetim/siparisler?durum=processing",
  },
  {
    title: "Hatırlatma",
    value: 5,
    description: "Bugün yapılacak",
    icon: Bell,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "#",
  },
];

// Upcoming Due Invoices
const upcomingInvoices = [
  {
    id: "F-2024-0189",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    amount: 299.00,
    dueDate: "2024-06-22",
    daysLeft: 2,
    service: "Pro Hosting",
  },
  {
    id: "F-2024-0185",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    amount: 599.00,
    dueDate: "2024-06-23",
    daysLeft: 3,
    service: "Kurumsal Hosting",
  },
  {
    id: "F-2024-0182",
    customer: "Elif Çelik",
    customerId: "M-008",
    amount: 449.00,
    dueDate: "2024-06-24",
    daysLeft: 4,
    service: "VPS Sunucu",
  },
  {
    id: "F-2024-0178",
    customer: "Ali Yıldız",
    customerId: "M-007",
    amount: 149.00,
    dueDate: "2024-06-25",
    daysLeft: 5,
    service: "Kurumsal E-posta",
  },
  {
    id: "F-2024-0175",
    customer: "Ayşe Demir",
    customerId: "M-002",
    amount: 899.00,
    dueDate: "2024-06-26",
    daysLeft: 6,
    service: "VDS Sunucu Pro",
  },
  {
    id: "F-2024-0171",
    customer: "Can Özkan",
    customerId: "M-005",
    amount: 199.00,
    dueDate: "2024-06-27",
    daysLeft: 7,
    service: "Başlangıç Hosting",
  },
];

export default function AdminDashboard() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Hoş geldin, Admin. İşte bugünkü genel bakış.</p>
        </div>
      </BlurFade>

      {/* Top Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.1 + index * 0.05}>
            <Link href={stat.href}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                      <stat.icon className={cn("h-6 w-6", stat.color)} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.title}</p>
                      <p className="text-xs text-zinc-500">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </BlurFade>
        ))}
      </div>

      {/* Middle Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {middleStats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.5 + index * 0.05}>
            <Link href={stat.href}>
              <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                      <stat.icon className={cn("h-6 w-6", stat.color)} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.title}</p>
                      <p className="text-xs text-zinc-500">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </BlurFade>
        ))}
      </div>

      {/* Recent Orders */}
      <BlurFade delay={0.7}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-zinc-900 dark:text-white">Son Siparişler</CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              <Link href="/yonetim/siparisler">
                Tümünü Gör
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ürün/Hizmet</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ürün Grubu</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Yenilenen/Bitiş</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tutar</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-right pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">İncele</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="py-3">
                        <Link
                          href={`/yonetim/musteriler/${order.customerId}`}
                          className="text-sm text-zinc-900 dark:text-white hover:text-primary"
                        >
                          {order.customer}
                        </Link>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-zinc-900 dark:text-white">{order.product}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{order.category}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {new Date(order.renewalDate).toLocaleDateString("tr-TR")}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {formatPrice(order.amount)}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={cn(
                          "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                          orderStatusConfig[order.status].color
                        )}>
                          {orderStatusConfig[order.status].label}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={`/yonetim/siparisler/${order.id}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          <Search className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Upcoming Due Invoices */}
      <BlurFade delay={0.8}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-zinc-900 dark:text-white">Ödeme Tarihi Yaklaşan Faturalar</CardTitle>
              <p className="text-sm text-zinc-500 mt-1">7 gün içinde ödenmesi gereken faturalar</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
              <Link href="/yonetim/faturalar?durum=upcoming">
                Tümünü Gör
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ürün/Hizmet</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Son Ödeme</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tutar</th>
                    <th className="text-left pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kalan</th>
                    <th className="text-right pb-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">İncele</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="py-3">
                        <Link
                          href={`/yonetim/musteriler/${invoice.customerId}`}
                          className="text-sm text-zinc-900 dark:text-white hover:text-primary"
                        >
                          {invoice.customer}
                        </Link>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-zinc-900 dark:text-white">{invoice.service}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {new Date(invoice.dueDate).toLocaleDateString("tr-TR")}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {formatPrice(invoice.amount)}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={cn(
                          "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                          invoice.daysLeft <= 2 ? "bg-red-500/10 text-red-500" :
                          invoice.daysLeft <= 4 ? "bg-yellow-500/10 text-yellow-500" :
                          "bg-zinc-500/10 text-zinc-500"
                        )}>
                          {invoice.daysLeft} gün
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={`/yonetim/faturalar/${invoice.id}`}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                          <Search className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
