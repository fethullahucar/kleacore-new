"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Mail,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
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

const invoices = [
  {
    id: "F-2024-0201",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    amount: 647,
    status: "paid",
    createdAt: "2024-06-15",
    dueDate: "2024-06-30",
    paidAt: "2024-06-18",
  },
  {
    id: "F-2024-0200",
    customer: "Ayşe Demir",
    customerId: "M-002",
    amount: 1250,
    status: "paid",
    createdAt: "2024-06-14",
    dueDate: "2024-06-29",
    paidAt: "2024-06-16",
  },
  {
    id: "F-2024-0199",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    amount: 899,
    status: "overdue",
    createdAt: "2024-05-20",
    dueDate: "2024-06-05",
    paidAt: null,
  },
  {
    id: "F-2024-0198",
    customer: "Fatma Şahin",
    customerId: "M-004",
    amount: 299,
    status: "pending",
    createdAt: "2024-06-10",
    dueDate: "2024-06-25",
    paidAt: null,
  },
  {
    id: "F-2024-0197",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    amount: 599,
    status: "pending",
    createdAt: "2024-06-08",
    dueDate: "2024-06-23",
    paidAt: null,
  },
  {
    id: "F-2024-0196",
    customer: "Ali Yıldız",
    customerId: "M-007",
    amount: 449,
    status: "cancelled",
    createdAt: "2024-06-05",
    dueDate: "2024-06-20",
    paidAt: null,
  },
  {
    id: "F-2024-0195",
    customer: "Elif Çelik",
    customerId: "M-008",
    amount: 1850,
    status: "paid",
    createdAt: "2024-06-01",
    dueDate: "2024-06-16",
    paidAt: "2024-06-03",
  },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
  paid: { label: "Ödendi", variant: "default", icon: CheckCircle },
  pending: { label: "Bekliyor", variant: "secondary", icon: Clock },
  overdue: { label: "Gecikmiş", variant: "destructive", icon: AlertTriangle },
  cancelled: { label: "İptal", variant: "outline", icon: XCircle },
};

const stats = [
  { title: "Bu Ay Gelir", value: "₺284.750", icon: DollarSign, change: "+18%" },
  { title: "Ödenen", value: "₺248.500", icon: CheckCircle, change: "185 fatura" },
  { title: "Bekleyen", value: "₺24.350", icon: Clock, change: "32 fatura" },
  { title: "Gecikmiş", value: "₺11.900", icon: AlertTriangle, change: "8 fatura" },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Faturalar</h1>
          <p className="text-zinc-400">Tüm faturaları yönetin</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FileText className="mr-2 h-4 w-4" />
          Fatura Oluştur
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-zinc-500" />
                <span className="text-xs text-zinc-500">{stat.change}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-zinc-400">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="paid">Ödendi</SelectItem>
                  <SelectItem value="pending">Bekliyor</SelectItem>
                  <SelectItem value="overdue">Gecikmiş</SelectItem>
                  <SelectItem value="cancelled">İptal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Fatura no veya müşteri ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Fatura No</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Müşteri</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Tutar</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Durum</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Oluşturma</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Son Ödeme</th>
                  <th className="text-right p-4 text-sm font-medium text-zinc-400">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/yonetim/faturalar/${invoice.id}`}
                        className="text-sm font-medium text-white hover:text-primary"
                      >
                        {invoice.id}
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/yonetim/musteriler/${invoice.customerId}`}
                        className="text-sm text-zinc-400 hover:text-white"
                      >
                        {invoice.customer}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-white">
                        ₺{invoice.amount.toLocaleString("tr-TR")}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusConfig[invoice.status].variant}>
                        {statusConfig[invoice.status].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-400">
                        {new Date(invoice.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-sm",
                        invoice.status === "overdue" ? "text-red-500" : "text-zinc-400"
                      )}>
                        {new Date(invoice.dueDate).toLocaleDateString("tr-TR")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                          <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href={`/yonetim/faturalar/${invoice.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Detayları Gör
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="mr-2 h-4 w-4" />
                            PDF İndir
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Mail className="mr-2 h-4 w-4" />
                            Hatırlatma Gönder
                          </DropdownMenuItem>
                          {invoice.status === "pending" && (
                            <>
                              <DropdownMenuSeparator className="bg-zinc-800" />
                              <DropdownMenuItem className="cursor-pointer text-green-400">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Ödendi İşaretle
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
