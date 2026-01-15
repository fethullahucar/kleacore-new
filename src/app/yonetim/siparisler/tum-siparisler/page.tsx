"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ShoppingCart,
  CheckCircle,
  Clock,
  Pause,
  XCircle,
  Plus,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

const orders = [
  {
    id: "S-2024-00345",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    companyName: null,
    product: "Pro Hosting",
    category: "Hosting",
    period: "Yıllık",
    amount: 1198.80,
    status: "active",
    createdAt: "2024-06-20",
    expiresAt: "2025-06-20",
  },
  {
    id: "S-2024-00344",
    customer: "Ayşe Demir",
    customerId: "M-002",
    companyName: "Demir Holding A.Ş.",
    product: "VDS Small",
    category: "VDS",
    period: "Aylık",
    amount: 418.80,
    status: "pending",
    createdAt: "2024-06-19",
    expiresAt: "2024-07-19",
  },
  {
    id: "S-2024-00343",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    companyName: "KayaSoft Ltd.",
    product: ".com Domain",
    category: "Domain",
    period: "Yıllık",
    amount: 154.80,
    status: "active",
    createdAt: "2024-06-18",
    expiresAt: "2025-06-18",
  },
  {
    id: "S-2024-00342",
    customer: "Fatma Şahin",
    customerId: "M-004",
    companyName: null,
    product: "Starter Hosting",
    category: "Hosting",
    period: "6 Aylık",
    amount: 58.80,
    status: "suspended",
    createdAt: "2024-06-17",
    expiresAt: "2024-12-17",
  },
  {
    id: "S-2024-00341",
    customer: "Can Özkan",
    customerId: "M-005",
    companyName: null,
    product: "SSL Sertifika",
    category: "SSL",
    period: "Yıllık",
    amount: 299.00,
    status: "cancelled",
    createdAt: "2024-06-16",
    expiresAt: null,
  },
  {
    id: "S-2024-00340",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    companyName: "Arslan Group",
    product: "Kurumsal Hosting",
    category: "Hosting",
    period: "Yıllık",
    amount: 599.00,
    status: "active",
    createdAt: "2024-06-15",
    expiresAt: "2025-06-15",
  },
  {
    id: "S-2024-00339",
    customer: "Ali Yıldız",
    customerId: "M-007",
    companyName: null,
    product: "VPS Medium",
    category: "VPS",
    period: "Aylık",
    amount: 349.00,
    status: "pending",
    createdAt: "2024-06-14",
    expiresAt: "2024-07-14",
  },
  {
    id: "S-2024-00338",
    customer: "Elif Çelik",
    customerId: "M-008",
    companyName: "Çelik Tech",
    product: "E-posta Pro",
    category: "E-posta",
    period: "Yıllık",
    amount: 199.00,
    status: "active",
    createdAt: "2024-06-13",
    expiresAt: "2025-06-13",
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  active: { label: "Aktif", color: "bg-green-500/10 text-green-500", icon: CheckCircle },
  pending: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-500", icon: Clock },
  suspended: { label: "Askıda", color: "bg-orange-500/10 text-orange-500", icon: Pause },
  cancelled: { label: "İptal", color: "bg-red-500/10 text-red-500", icon: XCircle },
};

const stats = [
  {
    title: "Toplam Sipariş",
    value: "12,847",
    icon: ShoppingCart,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Aktif",
    value: "8,634",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Beklemede",
    value: "847",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "İptal Edilen",
    value: "1,132",
    icon: XCircle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
];

export default function AllOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.companyName && order.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || order.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Tüm Siparişler</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Sistemdeki tüm siparişleri görüntüleyin</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/yonetim/hizmet-ekle">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Sipariş
            </Link>
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.1 + index * 0.05}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Filters */}
      <BlurFade delay={0.3}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="pending">Beklemede</SelectItem>
                    <SelectItem value="suspended">Askıda</SelectItem>
                    <SelectItem value="cancelled">İptal</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px] bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    <SelectItem value="Hosting">Hosting</SelectItem>
                    <SelectItem value="VDS">VDS</SelectItem>
                    <SelectItem value="VPS">VPS</SelectItem>
                    <SelectItem value="Domain">Domain</SelectItem>
                    <SelectItem value="SSL">SSL</SelectItem>
                    <SelectItem value="E-posta">E-posta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Sipariş no, müşteri, ürün veya firma ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.4}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ürün/Hizmet</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Kategori</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Dönem</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tutar</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Bitiş Tarihi</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İncele</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <Link
                            href={`/yonetim/musteriler/${order.customerId}`}
                            className="text-sm font-medium text-zinc-900 dark:text-white hover:text-primary"
                          >
                            {order.customer}
                          </Link>
                          {order.companyName && (
                            <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                              <Building2 className="h-3 w-3" />
                              {order.companyName}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-900 dark:text-white">{order.product}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{order.category}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{order.period}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {formatPrice(order.amount)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {order.expiresAt ? new Date(order.expiresAt).toLocaleDateString("tr-TR") : "-"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                          statusConfig[order.status].color
                        )}>
                          {statusConfig[order.status].label}
                        </span>
                      </td>
                      <td className="p-4 text-right">
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
    </div>
  );
}
