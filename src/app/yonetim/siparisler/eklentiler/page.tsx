"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Puzzle,
  Building2,
  Plus,
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

const addons = [
  {
    id: "EK-001",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    companyName: null,
    orderId: "S-2024-00345",
    mainProduct: "Pro Hosting",
    addonName: "Ek 10GB Disk",
    price: 49.00,
    period: "Aylık",
    status: "active",
    createdAt: "2024-06-18",
  },
  {
    id: "EK-002",
    customer: "Ayşe Demir",
    customerId: "M-002",
    companyName: "Demir Holding A.Ş.",
    orderId: "S-2024-00344",
    mainProduct: "VDS Small",
    addonName: "Yedekleme Servisi",
    price: 79.00,
    period: "Aylık",
    status: "active",
    createdAt: "2024-06-17",
  },
  {
    id: "EK-003",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    companyName: "KayaSoft Ltd.",
    orderId: "S-2024-00343",
    mainProduct: "Kurumsal Hosting",
    addonName: "DDoS Koruması",
    price: 149.00,
    period: "Aylık",
    status: "active",
    createdAt: "2024-06-15",
  },
  {
    id: "EK-004",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    companyName: "Arslan Group",
    orderId: "S-2024-00340",
    mainProduct: "VPS Large",
    addonName: "Ek IP Adresi",
    price: 29.00,
    period: "Aylık",
    status: "pending",
    createdAt: "2024-06-12",
  },
  {
    id: "EK-005",
    customer: "Elif Çelik",
    customerId: "M-008",
    companyName: "Çelik Tech",
    orderId: "S-2024-00338",
    mainProduct: "E-posta Pro",
    addonName: "Ek 50GB Kota",
    price: 99.00,
    period: "Aylık",
    status: "active",
    createdAt: "2024-06-10",
  },
  {
    id: "EK-006",
    customer: "Burak Demir",
    customerId: "M-009",
    companyName: null,
    orderId: "S-2024-00335",
    mainProduct: "Pro Hosting",
    addonName: "SSL Wildcard",
    price: 199.00,
    period: "Yıllık",
    status: "active",
    createdAt: "2024-06-08",
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-green-500/10 text-green-500" },
  pending: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-500" },
  cancelled: { label: "İptal", color: "bg-red-500/10 text-red-500" },
};

export default function AddonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAddons = addons.filter((addon) => {
    const matchesSearch =
      addon.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.addonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.mainProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (addon.companyName && addon.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || addon.status === statusFilter;
    return matchesSearch && matchesStatus;
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
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Sipariş Eklentileri</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Siparişlere eklenen ek hizmetler</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10">
            <Puzzle className="h-5 w-5 text-cyan-500" />
            <span className="text-sm font-medium text-cyan-500">456 Eklenti</span>
          </div>
        </div>
      </BlurFade>

      {/* Filters */}
      <BlurFade delay={0.1}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="pending">Beklemede</SelectItem>
                    <SelectItem value="cancelled">İptal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Eklenti, müşteri veya ana ürün ara..."
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
      <BlurFade delay={0.2}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Ana Ürün</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Eklenti</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Fiyat</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Dönem</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tarih</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İncele</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAddons.map((addon) => (
                    <tr
                      key={addon.id}
                      className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <Link
                            href={`/yonetim/musteriler/${addon.customerId}`}
                            className="text-sm font-medium text-zinc-900 dark:text-white hover:text-primary"
                          >
                            {addon.customer}
                          </Link>
                          {addon.companyName && (
                            <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                              <Building2 className="h-3 w-3" />
                              {addon.companyName}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{addon.mainProduct}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Puzzle className="h-4 w-4 text-cyan-500" />
                          <span className="text-sm text-zinc-900 dark:text-white">{addon.addonName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {formatPrice(addon.price)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">{addon.period}</span>
                      </td>
                      <td className="p-4">
                        <span className={cn(
                          "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                          statusConfig[addon.status].color
                        )}>
                          {statusConfig[addon.status].label}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {new Date(addon.createdAt).toLocaleDateString("tr-TR")}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/yonetim/siparisler/${addon.orderId}`}
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
