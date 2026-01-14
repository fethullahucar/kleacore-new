"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  categoryConfig,
  productStatusConfig,
  billingPeriodConfig,
} from "@/lib/products/constants";
import type { Product, ProductCategorySlug, ProductStatus } from "@/types/products";

// Mock data
const mockProducts: Product[] = [
  {
    id: "prod-1",
    categoryId: "hosting",
    categoryName: "Web Hosting",
    sku: "HST-STARTER",
    name: "Starter Hosting",
    slug: "starter-hosting",
    shortDescription: "Kişisel siteler için ideal başlangıç paketi",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: { diskSpace: 10, bandwidth: 100, emailAccounts: 5 },
    pricingTiers: [],
    basePrice: 49,
    badge: "",
    isPopular: false,
    displayOrder: 1,
    stockQuantity: -1,
    isInStock: true,
    upgradeToProducts: ["prod-2"],
    downgradeToProducts: [],
    status: "active",
    isVisible: true,
    totalOrders: 156,
    activeSubscriptions: 89,
    totalRevenue: 12500,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "prod-2",
    categoryId: "hosting",
    categoryName: "Web Hosting",
    sku: "HST-PRO",
    name: "Pro Hosting",
    slug: "pro-hosting",
    shortDescription: "Profesyonel projeler için güçlü hosting",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: { diskSpace: 50, bandwidth: -1, emailAccounts: 25 },
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
    totalOrders: 342,
    activeSubscriptions: 234,
    totalRevenue: 45600,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "prod-3",
    categoryId: "hosting",
    categoryName: "Web Hosting",
    sku: "HST-BIZ",
    name: "Business Hosting",
    slug: "business-hosting",
    shortDescription: "E-ticaret ve kurumsal siteler için",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: { diskSpace: 100, bandwidth: -1, emailAccounts: -1 },
    pricingTiers: [],
    basePrice: 199,
    badge: "",
    isPopular: false,
    displayOrder: 3,
    stockQuantity: -1,
    isInStock: true,
    upgradeToProducts: [],
    downgradeToProducts: ["prod-2"],
    status: "active",
    isVisible: true,
    totalOrders: 78,
    activeSubscriptions: 56,
    totalRevenue: 23400,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "prod-4",
    categoryId: "vds",
    categoryName: "VDS Sunucu",
    sku: "VDS-S1",
    name: "VDS Small",
    slug: "vds-small",
    shortDescription: "Küçük projeler için VDS sunucu",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: { cpuCores: 2, ram: 4, diskSpace: 50 },
    pricingTiers: [],
    basePrice: 299,
    badge: "",
    isPopular: false,
    displayOrder: 1,
    stockQuantity: 10,
    isInStock: true,
    upgradeToProducts: ["prod-5"],
    downgradeToProducts: [],
    status: "active",
    isVisible: true,
    totalOrders: 45,
    activeSubscriptions: 32,
    totalRevenue: 18900,
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "prod-5",
    categoryId: "vds",
    categoryName: "VDS Sunucu",
    sku: "VDS-M1",
    name: "VDS Medium",
    slug: "vds-medium",
    shortDescription: "Orta ölçekli projeler için VDS",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: { cpuCores: 4, ram: 8, diskSpace: 100 },
    pricingTiers: [],
    basePrice: 499,
    badge: "YENİ",
    isPopular: true,
    displayOrder: 2,
    stockQuantity: 5,
    isInStock: true,
    upgradeToProducts: [],
    downgradeToProducts: ["prod-4"],
    status: "active",
    isVisible: true,
    totalOrders: 89,
    activeSubscriptions: 67,
    totalRevenue: 56700,
    createdAt: "2024-02-20T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "prod-6",
    categoryId: "domain",
    categoryName: "Domain",
    sku: "DOM-COM",
    name: ".com Domain",
    slug: "com-domain",
    shortDescription: "En popüler domain uzantısı",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: {},
    pricingTiers: [],
    basePrice: 149,
    badge: "",
    isPopular: true,
    displayOrder: 1,
    stockQuantity: -1,
    isInStock: true,
    upgradeToProducts: [],
    downgradeToProducts: [],
    status: "active",
    isVisible: true,
    totalOrders: 567,
    activeSubscriptions: 456,
    totalRevenue: 67800,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "prod-7",
    categoryId: "ssl",
    categoryName: "SSL Sertifikası",
    sku: "SSL-STD",
    name: "Standard SSL",
    slug: "standard-ssl",
    shortDescription: "Temel SSL güvenliği",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: {},
    pricingTiers: [],
    basePrice: 199,
    badge: "",
    isPopular: false,
    displayOrder: 1,
    stockQuantity: -1,
    isInStock: true,
    upgradeToProducts: ["prod-8"],
    downgradeToProducts: [],
    status: "active",
    isVisible: true,
    totalOrders: 123,
    activeSubscriptions: 98,
    totalRevenue: 24500,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
  {
    id: "prod-8",
    categoryId: "ssl",
    categoryName: "SSL Sertifikası",
    sku: "SSL-WC",
    name: "Wildcard SSL",
    slug: "wildcard-ssl",
    shortDescription: "Tüm alt domainler için SSL",
    longDescription: "",
    features: [],
    includedFeatures: [],
    resourceLimits: {},
    pricingTiers: [],
    basePrice: 599,
    badge: "",
    isPopular: false,
    displayOrder: 2,
    stockQuantity: -1,
    isInStock: true,
    upgradeToProducts: [],
    downgradeToProducts: ["prod-7"],
    status: "draft",
    isVisible: false,
    totalOrders: 34,
    activeSubscriptions: 28,
    totalRevenue: 20400,
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
    createdBy: "Admin",
  },
];

const stats = [
  { title: "Toplam Ürün", value: "40", icon: Package, change: "+5 bu ay" },
  { title: "Aktif Ürün", value: "38", icon: CheckCircle, change: "%95" },
  { title: "Düşük Stok", value: "2", icon: AlertTriangle, change: "Uyarı" },
  { title: "Toplam Gelir", value: "₺270,300", icon: TrendingUp, change: "+18%" },
];

const categoryOptions = Object.entries(categoryConfig).map(([slug, config]) => ({
  value: slug,
  label: config.name,
}));

function PackagesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.categoryId === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Paketler</h1>
            <p className="text-zinc-400">Ürün ve paketlerinizi yönetin</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/yonetim/urunler/paketler/yeni">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Paket
            </Link>
          </Button>
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

      {/* Filters */}
      <BlurFade delay={0.3}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[160px] bg-zinc-800 border-zinc-700 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                    <SelectItem value="draft">Taslak</SelectItem>
                    <SelectItem value="archived">Arşivlenmiş</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Paket adı veya SKU ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Products Table */}
      <BlurFade delay={0.4}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">SKU</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Paket</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Kategori</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Fiyat</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Stok</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Sipariş</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Durum</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => {
                    const statusConf = productStatusConfig[product.status as ProductStatus];
                    const catConf = categoryConfig[product.categoryId as ProductCategorySlug];
                    const StatusIcon = statusConf?.icon;

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <code className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                            {product.sku}
                          </code>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <Link
                                href={`/yonetim/urunler/paketler/${product.id}`}
                                className="text-sm font-medium text-white hover:text-primary flex items-center gap-2"
                              >
                                {product.name}
                                {product.badge && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-primary text-primary"
                                  >
                                    {product.badge}
                                  </Badge>
                                )}
                              </Link>
                              <p className="text-xs text-zinc-500 line-clamp-1 max-w-[200px]">
                                {product.shortDescription}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "p-1.5 rounded",
                                catConf?.color || "bg-zinc-800 text-zinc-400"
                              )}
                            >
                              {catConf?.icon && <catConf.icon className="h-3.5 w-3.5" />}
                            </div>
                            <span className="text-sm text-zinc-400">
                              {product.categoryName}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-white">
                            {formatPrice(product.basePrice)}
                            <span className="text-zinc-500 font-normal">/ay</span>
                          </span>
                        </td>
                        <td className="p-4">
                          {product.stockQuantity === -1 ? (
                            <span className="text-sm text-zinc-400">Sınırsız</span>
                          ) : (
                            <span
                              className={cn(
                                "text-sm font-medium",
                                product.stockQuantity <= 3
                                  ? "text-red-500"
                                  : product.stockQuantity <= 10
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              )}
                            >
                              {product.stockQuantity}
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div>
                            <span className="text-sm font-medium text-white">
                              {product.totalOrders}
                            </span>
                            <p className="text-xs text-zinc-500">
                              {product.activeSubscriptions} aktif
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={statusConf?.variant || "secondary"}
                            className={cn(
                              "gap-1",
                              product.status === "active" && "bg-green-500/10 text-green-500 hover:bg-green-500/20",
                              product.status === "draft" && "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
                              product.status === "inactive" && "bg-zinc-500/10 text-zinc-400",
                              product.status === "archived" && "bg-zinc-500/10 text-zinc-500"
                            )}
                          >
                            {StatusIcon && <StatusIcon className="h-3 w-3" />}
                            {statusConf?.label}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-zinc-400 hover:text-white"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-zinc-900 border-zinc-800"
                            >
                              <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href={`/yonetim/urunler/paketler/${product.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Detayları Gör
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href={`/yonetim/urunler/paketler/${product.id}/duzenle`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Düzenle
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <Copy className="mr-2 h-4 w-4" />
                                Kopyala
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-800" />
                              <DropdownMenuItem className="cursor-pointer text-red-400">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Arşivle
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="p-8 text-center">
                <Package className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Ürün bulunamadı
                </h3>
                <p className="text-zinc-400">
                  Arama kriterlerinize uygun ürün bulunmuyor.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <PackagesContent />
    </Suspense>
  );
}
