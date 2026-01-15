"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Copy,
  Trash2,
  MoreVertical,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  CheckCircle,
  HardDrive,
  RefreshCcw,
  Mail,
  Globe,
  Shield,
  Server,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  categoryConfig,
  productStatusConfig,
  billingPeriodConfig,
} from "@/lib/products/constants";
import type { Product, ProductCategorySlug, ProductStatus, PricingTier, Order } from "@/types/products";

// Mock data
const mockProduct: Product = {
  id: "prod-2",
  categoryId: "hosting",
  categoryName: "Web Hosting",
  sku: "HST-PRO",
  name: "Pro Hosting",
  slug: "pro-hosting",
  shortDescription: "Profesyonel projeler için güçlü hosting",
  longDescription: "Pro Hosting paketi, profesyonel web projeleri için tasarlanmış güçlü bir hosting çözümüdür. Yüksek performans, güvenlik ve 7/24 destek ile projeleriniz güvende.",
  features: [
    { featureId: "f1", featureName: "Disk Alanı", value: 50, displayValue: "50 GB", isUnlimited: false },
    { featureId: "f2", featureName: "Aylık Trafik", value: -1, displayValue: "Sınırsız", isUnlimited: true },
    { featureId: "f3", featureName: "E-posta Hesabı", value: 25, displayValue: "25 Adet", isUnlimited: false },
    { featureId: "f4", featureName: "Veritabanı", value: 10, displayValue: "10 Adet", isUnlimited: false },
    { featureId: "f5", featureName: "Domain", value: 5, displayValue: "5 Adet", isUnlimited: false },
    { featureId: "f8", featureName: "SSL Sertifikası", value: 1, displayValue: "1 Adet", isUnlimited: false },
  ],
  includedFeatures: ["cPanel Kontrol Paneli", "Ücretsiz SSL", "Günlük Yedekleme", "DDoS Koruması", "7/24 Destek"],
  resourceLimits: { diskSpace: 50, bandwidth: -1, emailAccounts: 25, databases: 10, domains: 5 },
  pricingTiers: [],
  basePrice: 99,
  badge: "POPÜLER",
  isPopular: true,
  displayOrder: 2,
  stockQuantity: -1,
  isInStock: true,
  upgradeToProducts: ["prod-3"],
  downgradeToProducts: ["prod-1"],
  status: "active",
  isVisible: true,
  metaTitle: "Pro Hosting Paketi | KLEACORE",
  metaDescription: "Profesyonel projeler için güçlü hosting çözümü",
  totalOrders: 342,
  activeSubscriptions: 234,
  totalRevenue: 45600,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-06-20T14:30:00Z",
  createdBy: "Admin",
};

const mockPricingTiers: PricingTier[] = [
  { id: "pt-1", productId: "prod-2", period: "monthly", price: 99, setupFee: 0, renewalPrice: 99, isDefault: true, isActive: true },
  { id: "pt-2", productId: "prod-2", period: "quarterly", price: 282, setupFee: 0, renewalPrice: 282, isDefault: false, isActive: true },
  { id: "pt-3", productId: "prod-2", period: "semiannual", price: 534, setupFee: 0, renewalPrice: 534, isDefault: false, isActive: true },
  { id: "pt-4", productId: "prod-2", period: "yearly", price: 999, discountedPrice: 999, setupFee: 0, renewalPrice: 999, isDefault: false, isActive: true },
];

const mockRecentOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "S-2024-00342",
    customerId: "cust-1",
    customerName: "Ahmet Yılmaz",
    customerEmail: "ahmet@example.com",
    productId: "prod-2",
    productName: "Pro Hosting",
    productSku: "HST-PRO",
    categoryId: "hosting",
    categoryName: "Web Hosting",
    domain: "ahmetyilmaz.com",
    billingPeriod: "yearly",
    quantity: 1,
    basePrice: 999,
    discountAmount: 0,
    setupFee: 0,
    taxRate: 20,
    taxAmount: 199.8,
    totalAmount: 1198.8,
    status: "completed",
    createdAt: "2024-06-15T10:00:00Z",
    updatedAt: "2024-06-15T14:30:00Z",
  },
  {
    id: "ord-2",
    orderNumber: "S-2024-00341",
    customerId: "cust-2",
    customerName: "Ayşe Demir",
    customerEmail: "ayse@example.com",
    productId: "prod-2",
    productName: "Pro Hosting",
    productSku: "HST-PRO",
    categoryId: "hosting",
    categoryName: "Web Hosting",
    domain: "aysedemir.net",
    billingPeriod: "monthly",
    quantity: 1,
    basePrice: 99,
    discountAmount: 0,
    setupFee: 0,
    taxRate: 20,
    taxAmount: 19.8,
    totalAmount: 118.8,
    status: "processing",
    createdAt: "2024-06-14T16:00:00Z",
    updatedAt: "2024-06-14T16:30:00Z",
  },
  {
    id: "ord-3",
    orderNumber: "S-2024-00340",
    customerId: "cust-3",
    customerName: "Mehmet Kaya",
    customerEmail: "mehmet@example.com",
    productId: "prod-2",
    productName: "Pro Hosting",
    productSku: "HST-PRO",
    categoryId: "hosting",
    categoryName: "Web Hosting",
    domain: "mehmetkaya.com.tr",
    billingPeriod: "yearly",
    quantity: 1,
    basePrice: 999,
    discountAmount: 100,
    promoCode: "SUMMER24",
    setupFee: 0,
    taxRate: 20,
    taxAmount: 179.8,
    totalAmount: 1078.8,
    status: "pending",
    createdAt: "2024-06-14T09:00:00Z",
    updatedAt: "2024-06-14T09:00:00Z",
  },
];

const resourceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  diskSpace: HardDrive,
  bandwidth: RefreshCcw,
  emailAccounts: Mail,
  databases: Package,
  domains: Globe,
  sslCertificates: Shield,
  cpuCores: Server,
  ram: Server,
};

const orderStatusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  approved: "bg-blue-500/10 text-blue-500",
  processing: "bg-cyan-500/10 text-cyan-500",
  completed: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

const orderStatusLabels: Record<string, string> = {
  pending: "Onay Bekliyor",
  approved: "Onaylandı",
  processing: "İşleniyor",
  completed: "Tamamlandı",
  cancelled: "İptal Edildi",
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = mockProduct;
  const pricingTiers = mockPricingTiers;
  const recentOrders = mockRecentOrders;

  const statusConf = productStatusConfig[product.status as ProductStatus];
  const catConf = categoryConfig[product.categoryId as ProductCategorySlug];
  const StatusIcon = statusConf?.icon;
  const CategoryIcon = catConf?.icon;

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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const stats = [
    { title: "Toplam Sipariş", value: product.totalOrders.toString(), icon: ShoppingCart, change: "Tüm zamanlar" },
    { title: "Aktif Abonelik", value: product.activeSubscriptions.toString(), icon: Users, change: "Şu an" },
    { title: "Toplam Gelir", value: formatPrice(product.totalRevenue), icon: TrendingUp, change: "Bu üründen" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Link href="/yonetim/urunler/paketler">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{product.name}</h1>
                {product.badge && (
                  <Badge variant="outline" className="border-primary text-primary">
                    {product.badge}
                  </Badge>
                )}
                <Badge
                  variant={statusConf?.variant || "secondary"}
                  className={cn(
                    "gap-1",
                    product.status === "active" && "bg-green-500/10 text-green-500"
                  )}
                >
                  {StatusIcon && <StatusIcon className="h-3 w-3" />}
                  {statusConf?.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {product.sku}
                </code>
                <span className="text-zinc-600">•</span>
                <div className="flex items-center gap-1.5">
                  {CategoryIcon && (
                    <div className={cn("p-1 rounded", catConf?.color)}>
                      <CategoryIcon className="h-3 w-3" />
                    </div>
                  )}
                  <span className="text-sm text-zinc-400">{product.categoryName}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              <Link href={`/yonetim/urunler/paketler/${product.id}/duzenle`}>
                <Edit className="mr-2 h-4 w-4" />
                Düzenle
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                <DropdownMenuItem className="cursor-pointer">
                  <Copy className="mr-2 h-4 w-4" />
                  Kopyala
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Sitede Görüntüle
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="cursor-pointer text-red-400">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Arşivle
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* Tabs */}
      <BlurFade delay={0.3}>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-800">
              Genel Bakış
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-zinc-800">
              Fiyatlandırma
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-zinc-800">
              Siparişler
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Description */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Açıklama</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 mb-4">
                    {product.shortDescription}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {product.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Resource Limits */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">Kaynak Limitleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.features.map((feature) => {
                      const Icon = resourceIcons[feature.featureId.replace("f", "")] || Package;
                      return (
                        <div
                          key={feature.featureId}
                          className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-zinc-500" />
                            <span className="text-sm text-zinc-300">
                              {feature.featureName}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "text-sm font-medium",
                              feature.isUnlimited ? "text-green-500" : "text-white"
                            )}
                          >
                            {feature.displayValue}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Included Features */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Dahil Özellikler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {product.includedFeatures.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-zinc-800 text-zinc-300 gap-1"
                    >
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Fiyat Tablosu</CardTitle>
                <CardDescription className="text-zinc-400">
                  Farklı dönemler için fiyatlandırma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Dönem</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Fiyat</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Aylık</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Kurulum</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Yenileme</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingTiers.map((tier) => {
                        const periodConf = billingPeriodConfig[tier.period];
                        const monthlyPrice = tier.price / periodConf.months;

                        return (
                          <tr
                            key={tier.id}
                            className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50"
                          >
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">
                                  {periodConf.label}
                                </span>
                                {tier.isDefault && (
                                  <Badge variant="outline" className="text-xs border-primary text-primary">
                                    Varsayılan
                                  </Badge>
                                )}
                                {periodConf.discount > 0 && (
                                  <Badge className="text-xs bg-green-500/10 text-green-500">
                                    %{periodConf.discount} İndirim
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="text-sm font-medium text-white">
                                {formatPrice(tier.price)}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-zinc-400">
                                {formatPrice(Math.round(monthlyPrice))}/ay
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-zinc-400">
                                {tier.setupFee > 0 ? formatPrice(tier.setupFee) : "Ücretsiz"}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-zinc-400">
                                {formatPrice(tier.renewalPrice)}
                              </span>
                            </td>
                            <td className="p-3">
                              <Badge
                                variant={tier.isActive ? "default" : "secondary"}
                                className={cn(
                                  tier.isActive
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-zinc-800 text-zinc-500"
                                )}
                              >
                                {tier.isActive ? "Aktif" : "Pasif"}
                              </Badge>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Son Siparişler</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Bu ürüne ait son siparişler
                  </CardDescription>
                </div>
                <Button asChild variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Link href={`/yonetim/siparisler?urun=${product.id}`}>
                    Tümünü Gör
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Sipariş No</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Müşteri</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Domain</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Dönem</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Tutar</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Durum</th>
                        <th className="text-left p-3 text-sm font-medium text-zinc-400">Tarih</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => {
                        const periodConf = billingPeriodConfig[order.billingPeriod as keyof typeof billingPeriodConfig];
                        return (
                          <tr
                            key={order.id}
                            className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50"
                          >
                            <td className="p-3">
                              <Link
                                href={`/yonetim/siparisler/${order.id}`}
                                className="text-sm font-mono text-primary hover:underline"
                              >
                                {order.orderNumber}
                              </Link>
                            </td>
                            <td className="p-3">
                              <div>
                                <p className="text-sm font-medium text-white">
                                  {order.customerName}
                                </p>
                                <p className="text-xs text-zinc-500">
                                  {order.customerEmail}
                                </p>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-zinc-400">
                                {order.domain || "-"}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-zinc-400">
                                {periodConf?.label}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm font-medium text-white">
                                {formatPrice(order.totalAmount)}
                              </span>
                            </td>
                            <td className="p-3">
                              <Badge className={orderStatusColors[order.status]}>
                                {orderStatusLabels[order.status]}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-zinc-400">
                                {formatDate(order.createdAt)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </BlurFade>
    </div>
  );
}
