"use client";

import { useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Download,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Eye,
  Printer,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock invoices data
const invoices = [
  {
    id: "INV-2024-0156",
    description: "Linux Hosting Pro - 12 Aylık",
    amount: 2388.0,
    status: "paid",
    dueDate: "15 Ocak 2024",
    paidDate: "14 Ocak 2024",
    paymentMethod: "Kredi Kartı",
  },
  {
    id: "INV-2024-0178",
    description: "VDS-M Sunucu - Aylık",
    amount: 549.0,
    status: "paid",
    dueDate: "10 Şubat 2024",
    paidDate: "10 Şubat 2024",
    paymentMethod: "Havale",
  },
  {
    id: "INV-2024-0195",
    description: "Wildcard SSL - Yıllık",
    amount: 599.0,
    status: "pending",
    dueDate: "3 gün kaldı",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2024-0201",
    description: "Cloud-S - Aylık",
    amount: 299.0,
    status: "pending",
    dueDate: "7 gün kaldı",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2024-0089",
    description: "Domain Yenileme - example.com",
    amount: 149.0,
    status: "overdue",
    dueDate: "1 Ocak 2024",
    paidDate: null,
    paymentMethod: null,
  },
  {
    id: "INV-2024-0145",
    description: "VPS-S - Aylık",
    amount: 199.0,
    status: "cancelled",
    dueDate: "15 Aralık 2023",
    paidDate: null,
    paymentMethod: null,
  },
];

const statusConfig = {
  paid: {
    label: "Ödendi",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    icon: CheckCircle2,
  },
  pending: {
    label: "Bekliyor",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    icon: Clock,
  },
  overdue: {
    label: "Gecikmiş",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    icon: AlertCircle,
  },
  cancelled: {
    label: "İptal",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    icon: XCircle,
  },
};

const filterOptions = [
  { value: "all", label: "Tümü" },
  { value: "pending", label: "Bekleyen" },
  { value: "paid", label: "Ödenen" },
  { value: "overdue", label: "Gecikmiş" },
];

export default function FaturalarPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || invoice.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    pending: invoices
      .filter((i) => i.status === "pending")
      .reduce((sum, inv) => sum + inv.amount, 0),
    overdue: invoices
      .filter((i) => i.status === "overdue")
      .reduce((sum, inv) => sum + inv.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Faturalarım</h1>
            <p className="text-muted-foreground">
              Faturalarınızı görüntüleyin ve ödemelerinizi yönetin.
            </p>
          </div>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Tutar</p>
                  <p className="text-2xl font-bold">{stats.total.toFixed(2)} TL</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bekleyen</p>
                  <p className="text-2xl font-bold">{stats.pending.toFixed(2)} TL</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gecikmiş</p>
                  <p className="text-2xl font-bold">{stats.overdue.toFixed(2)} TL</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Filters */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filter === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Fatura no veya açıklama ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Invoices List */}
      <BlurFade delay={0.25} inView>
        <Card>
          <CardHeader>
            <CardTitle>Faturalar ({filteredInvoices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => {
                const status = statusConfig[invoice.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                const canPay = invoice.status === "pending" || invoice.status === "overdue";

                return (
                  <div
                    key={invoice.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className={cn("p-3 rounded-lg", status.bgColor)}>
                      <FileText className={cn("h-6 w-6", status.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{invoice.id}</p>
                        <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", status.bgColor, status.color)}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {invoice.description}
                      </p>
                    </div>

                    <div className="hidden md:block text-right">
                      <p className="text-lg font-bold">{invoice.amount.toFixed(2)} TL</p>
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                        <Calendar className="h-3 w-3" />
                        {invoice.status === "paid" ? `Ödeme: ${invoice.paidDate}` : `Son: ${invoice.dueDate}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {canPay && (
                        <Button size="sm">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Öde
                        </Button>
                      )}
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/musteri/panel/faturalar/${invoice.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}

              {filteredInvoices.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aramanızla eşleşen fatura bulunamadı.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
