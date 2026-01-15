"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

const operations = [
  {
    id: "YD-001",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    companyName: null,
    orderId: "S-2024-00345",
    type: "upgrade",
    fromProduct: "Starter Hosting",
    toProduct: "Pro Hosting",
    priceDiff: 200.00,
    status: "completed",
    date: "2024-06-18",
  },
  {
    id: "YD-002",
    customer: "Ayşe Demir",
    customerId: "M-002",
    companyName: "Demir Holding A.Ş.",
    orderId: "S-2024-00344",
    type: "upgrade",
    fromProduct: "VDS Small",
    toProduct: "VDS Medium",
    priceDiff: 180.00,
    status: "pending",
    date: "2024-06-17",
  },
  {
    id: "YD-003",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    companyName: "KayaSoft Ltd.",
    orderId: "S-2024-00343",
    type: "downgrade",
    fromProduct: "Pro Hosting",
    toProduct: "Starter Hosting",
    priceDiff: -200.00,
    status: "completed",
    date: "2024-06-15",
  },
  {
    id: "YD-004",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    companyName: "Arslan Group",
    orderId: "S-2024-00340",
    type: "upgrade",
    fromProduct: "VPS Small",
    toProduct: "VPS Large",
    priceDiff: 300.00,
    status: "completed",
    date: "2024-06-12",
  },
  {
    id: "YD-005",
    customer: "Ali Yıldız",
    customerId: "M-007",
    companyName: null,
    orderId: "S-2024-00339",
    type: "downgrade",
    fromProduct: "E-posta Business",
    toProduct: "E-posta Starter",
    priceDiff: -150.00,
    status: "pending",
    date: "2024-06-10",
  },
];

const typeConfig: Record<string, { label: string; color: string; icon: any }> = {
  upgrade: { label: "Yükseltme", color: "bg-green-500/10 text-green-500", icon: ArrowUp },
  downgrade: { label: "Düşürme", color: "bg-orange-500/10 text-orange-500", icon: ArrowDown },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: "Tamamlandı", color: "bg-green-500/10 text-green-500" },
  pending: { label: "Beklemede", color: "bg-yellow-500/10 text-yellow-500" },
};

const stats = [
  {
    title: "Toplam İşlem",
    value: "89",
    icon: ArrowUpDown,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    title: "Yükseltme",
    value: "67",
    icon: ArrowUp,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Düşürme",
    value: "22",
    icon: ArrowDown,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

export default function UpgradeDowngradePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredOperations = operations.filter((op) => {
    const matchesSearch =
      op.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.fromProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.toProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (op.companyName && op.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "all" || op.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatPrice = (price: number) => {
    const absPrice = Math.abs(price);
    const prefix = price >= 0 ? "+" : "-";
    return `${prefix}${new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
    }).format(absPrice)}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Yükseltme & Düşürme</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Paket değişiklik işlemleri</p>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
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
      <BlurFade delay={0.25}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px] bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="İşlem Tipi" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                    <SelectItem value="all">Tüm İşlemler</SelectItem>
                    <SelectItem value="upgrade">Yükseltme</SelectItem>
                    <SelectItem value="downgrade">Düşürme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="İşlem no, müşteri veya ürün ara..."
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
      <BlurFade delay={0.3}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tip</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Önceki Paket</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Yeni Paket</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Fark</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tarih</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İncele</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOperations.map((op) => {
                    const TypeIcon = typeConfig[op.type].icon;
                    return (
                      <tr
                        key={op.id}
                        className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <div>
                            <Link
                              href={`/yonetim/musteriler/${op.customerId}`}
                              className="text-sm font-medium text-zinc-900 dark:text-white hover:text-primary"
                            >
                              {op.customer}
                            </Link>
                            {op.companyName && (
                              <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                                <Building2 className="h-3 w-3" />
                                {op.companyName}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                            typeConfig[op.type].color
                          )}>
                            <TypeIcon className="h-3 w-3" />
                            {typeConfig[op.type].label}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{op.fromProduct}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-900 dark:text-white">{op.toProduct}</span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "text-sm font-medium",
                            op.priceDiff >= 0 ? "text-green-500" : "text-orange-500"
                          )}>
                            {formatPrice(op.priceDiff)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                            statusConfig[op.status].color
                          )}>
                            {statusConfig[op.status].label}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(op.date).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Link
                            href={`/yonetim/siparisler/${op.orderId}`}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          >
                            <Search className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
