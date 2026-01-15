"use client";

import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Tag,
  TrendingUp,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
  Box,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { categoryConfig, orderStatusConfig, billingPeriodConfig } from "@/lib/products/constants";
import type { ProductCategorySlug, OrderStatus } from "@/types/products";

// Mock dashboard data
const dashboardStats = {
  totalProducts: 40,
  activeProducts: 38,
  draftProducts: 2,
  totalCategories: 7,
  pendingOrders: 12,
  processingOrders: 5,
  completedOrdersToday: 8,
  thisMonthRevenue: 156780,
  lastMonthRevenue: 132500,
  revenueGrowth: 18.3,
};

const recentOrders = [
  {
    id: "ord-1",
    orderNumber: "S-2024-00345",
    customerName: "Ahmet Yılmaz",
    productName: "Pro Hosting",
    totalAmount: 1198.8,
    status: "pending" as OrderStatus,
    createdAt: "2024-06-20T10:00:00Z",
  },
  {
    id: "ord-2",
    orderNumber: "S-2024-00344",
    customerName: "Ayşe Demir",
    productName: "VDS Small",
    totalAmount: 418.8,
    status: "processing" as OrderStatus,
    createdAt: "2024-06-19T09:00:00Z",
  },
  {
    id: "ord-3",
    orderNumber: "S-2024-00343",
    customerName: "Mehmet Kaya",
    productName: ".com Domain",
    totalAmount: 154.8,
    status: "completed" as OrderStatus,
    createdAt: "2024-06-18T09:00:00Z",
  },
  {
    id: "ord-4",
    orderNumber: "S-2024-00342",
    customerName: "Fatma Şahin",
    productName: "Starter Hosting",
    totalAmount: 58.8,
    status: "completed" as OrderStatus,
    createdAt: "2024-06-17T14:00:00Z",
  },
];

const stockAlerts = [
  { productName: "VDS Medium", sku: "VDS-M1", stock: 5, severity: "low" },
  { productName: "VDS Large", sku: "VDS-L1", stock: 2, severity: "critical" },
];

const quickLinks = [
  { title: "Kategoriler", href: "/yonetim/urunler/kategoriler", icon: Layers, count: 7 },
  { title: "Paketler", href: "/yonetim/urunler/paketler", icon: Box, count: 40 },
  { title: "Özellikler", href: "/yonetim/urunler/ozellikler", icon: Tag, count: 19 },
  { title: "Promosyonlar", href: "/yonetim/urunler/promosyonlar", icon: Percent, count: 4 },
  { title: "Siparişler", href: "/yonetim/urunler/siparisler", icon: ShoppingCart, count: 156 },
];

const stats = [
  {
    title: "Toplam Ürün",
    value: dashboardStats.totalProducts.toString(),
    description: `${dashboardStats.activeProducts} aktif, ${dashboardStats.draftProducts} taslak`,
    icon: Package,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Bekleyen Sipariş",
    value: dashboardStats.pendingOrders.toString(),
    description: `${dashboardStats.processingOrders} işleniyor`,
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/yonetim/urunler/siparisler?durum=pending",
  },
  {
    title: "Bugün Tamamlanan",
    value: dashboardStats.completedOrdersToday.toString(),
    description: "Sipariş",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Bu Ay Gelir",
    value: `₺${dashboardStats.thisMonthRevenue.toLocaleString("tr-TR")}`,
    description: `+${dashboardStats.revenueGrowth}% geçen aya göre`,
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export default function ProductsDashboardPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Ürün Yönetimi</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Ürünler, siparişler ve promosyonlar</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/yonetim/urunler/paketler/yeni">
              <Package className="mr-2 h-4 w-4" />
              Yeni Paket
            </Link>
          </Button>
        </div>
      </BlurFade>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.1 + index * 0.05}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              {stat.href ? (
                <Link href={stat.href}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                        <stat.icon className={cn("h-5 w-5", stat.color)} />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-zinc-600" />
                    </div>
                    <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.title}</p>
                    <p className="text-xs text-zinc-500 mt-1">{stat.description}</p>
                  </CardContent>
                </Link>
              ) : (
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <stat.icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.description}</p>
                </CardContent>
              )}
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Quick Links */}
      <BlurFade delay={0.3}>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-5">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all group"
            >
              <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <link.icon className="h-5 w-5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{link.title}</p>
                <p className="text-xs text-zinc-500">{link.count} kayıt</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </Link>
          ))}
        </div>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <BlurFade delay={0.4}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-zinc-900 dark:text-white">Son Siparişler</CardTitle>
                <CardDescription className="text-zinc-400">
                  Son gelen siparişler
                </CardDescription>
              </div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <Link href="/yonetim/urunler/siparisler">
                  Tümünü Gör
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => {
                  const statusConf = orderStatusConfig[order.status];
                  const StatusIcon = statusConf?.icon;

                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Link
                            href={`/yonetim/urunler/siparisler/${order.id}`}
                            className="text-sm font-mono text-primary hover:underline"
                          >
                            {order.orderNumber}
                          </Link>
                          <span className="text-xs text-zinc-500">
                            {order.customerName}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {formatPrice(order.totalAmount)}
                        </p>
                        <p className="text-xs text-zinc-500">{order.productName}</p>
                      </div>
                      <Badge
                        className={cn(
                          "gap-1",
                          statusConf?.color.replace("text-", "bg-").replace("500", "500/10"),
                          statusConf?.color
                        )}
                      >
                        {StatusIcon && <StatusIcon className="h-3 w-3" />}
                        {statusConf?.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Stock Alerts */}
        <BlurFade delay={0.45}>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-zinc-900 dark:text-white">Stok Uyarıları</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                Düşük stoklu ürünler
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stockAlerts.length > 0 ? (
                <div className="space-y-3">
                  {stockAlerts.map((alert) => (
                    <div
                      key={alert.sku}
                      className={cn(
                        "p-3 rounded-lg border",
                        alert.severity === "critical"
                          ? "bg-red-500/10 border-red-500/30"
                          : "bg-yellow-500/10 border-yellow-500/30"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-zinc-900 dark:text-white">
                            {alert.productName}
                          </p>
                          <code className="text-xs text-zinc-500">{alert.sku}</code>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            alert.severity === "critical"
                              ? "border-red-500/50 text-red-500"
                              : "border-yellow-500/50 text-yellow-500"
                          )}
                        >
                          {alert.stock} adet
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Tüm stoklar yeterli</p>
                </div>
              )}
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Categories Overview */}
      <BlurFade delay={0.5}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-zinc-900 dark:text-white">Kategoriler</CardTitle>
              <CardDescription className="text-zinc-400">
                Kategori bazlı ürün dağılımı
              </CardDescription>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            >
              <Link href="/yonetim/urunler/kategoriler">
                Tümünü Gör
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4 lg:grid-cols-7">
              {Object.entries(categoryConfig).map(([slug, config]) => {
                const Icon = config.icon;
                // Mock product counts
                const productCounts: Record<string, number> = {
                  hosting: 8,
                  vds: 5,
                  vps: 6,
                  server: 4,
                  domain: 12,
                  ssl: 3,
                  email: 2,
                };

                return (
                  <Link
                    key={slug}
                    href={`/yonetim/urunler/paketler?kategori=${slug}`}
                    className="flex flex-col items-center p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-center group"
                  >
                    <div className={cn("p-3 rounded-lg mb-2", config.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                      {config.name}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {productCounts[slug as ProductCategorySlug]} ürün
                    </p>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
