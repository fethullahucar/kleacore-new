"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
  ShoppingCart,
  TrendingUp,
  Package,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { orderStatusConfig, billingPeriodConfig, categoryConfig } from "@/lib/products/constants";
import type { Order, OrderStatus, ProductCategorySlug } from "@/types/products";

// Mock data
const mockOrders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "S-2024-00345",
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
    status: "pending",
    createdAt: "2024-06-20T10:00:00Z",
    updatedAt: "2024-06-20T10:00:00Z",
  },
  {
    id: "ord-2",
    orderNumber: "S-2024-00344",
    customerId: "cust-2",
    customerName: "Ayşe Demir",
    customerEmail: "ayse@example.com",
    productId: "prod-4",
    productName: "VDS Small",
    productSku: "VDS-S1",
    categoryId: "vds",
    categoryName: "VDS Sunucu",
    billingPeriod: "monthly",
    quantity: 1,
    basePrice: 299,
    discountAmount: 0,
    setupFee: 50,
    taxRate: 20,
    taxAmount: 69.8,
    totalAmount: 418.8,
    status: "processing",
    approvedAt: "2024-06-19T14:00:00Z",
    approvedBy: "Admin",
    processingStartedAt: "2024-06-19T14:30:00Z",
    createdAt: "2024-06-19T09:00:00Z",
    updatedAt: "2024-06-19T14:30:00Z",
  },
  {
    id: "ord-3",
    orderNumber: "S-2024-00343",
    customerId: "cust-3",
    customerName: "Mehmet Kaya",
    customerEmail: "mehmet@example.com",
    productId: "prod-6",
    productName: ".com Domain",
    productSku: "DOM-COM",
    categoryId: "domain",
    categoryName: "Domain",
    domain: "mehmetkaya.com",
    billingPeriod: "yearly",
    quantity: 1,
    basePrice: 149,
    discountAmount: 20,
    promoCode: "WELCOME20",
    setupFee: 0,
    taxRate: 20,
    taxAmount: 25.8,
    totalAmount: 154.8,
    status: "completed",
    approvedAt: "2024-06-18T10:00:00Z",
    completedAt: "2024-06-18T11:00:00Z",
    serviceId: "srv-123",
    invoiceId: "inv-456",
    createdAt: "2024-06-18T09:00:00Z",
    updatedAt: "2024-06-18T11:00:00Z",
  },
  {
    id: "ord-4",
    orderNumber: "S-2024-00342",
    customerId: "cust-4",
    customerName: "Fatma Şahin",
    customerEmail: "fatma@example.com",
    productId: "prod-1",
    productName: "Starter Hosting",
    productSku: "HST-STARTER",
    categoryId: "hosting",
    categoryName: "Web Hosting",
    domain: "fatmasahin.net",
    billingPeriod: "monthly",
    quantity: 1,
    basePrice: 49,
    discountAmount: 0,
    setupFee: 0,
    taxRate: 20,
    taxAmount: 9.8,
    totalAmount: 58.8,
    status: "completed",
    approvedAt: "2024-06-17T15:00:00Z",
    completedAt: "2024-06-17T15:30:00Z",
    serviceId: "srv-124",
    invoiceId: "inv-457",
    createdAt: "2024-06-17T14:00:00Z",
    updatedAt: "2024-06-17T15:30:00Z",
  },
  {
    id: "ord-5",
    orderNumber: "S-2024-00341",
    customerId: "cust-5",
    customerName: "Can Özkan",
    customerEmail: "can@example.com",
    productId: "prod-7",
    productName: "Standard SSL",
    productSku: "SSL-STD",
    categoryId: "ssl",
    categoryName: "SSL Sertifikası",
    domain: "canozkan.com.tr",
    billingPeriod: "yearly",
    quantity: 1,
    basePrice: 199,
    discountAmount: 0,
    setupFee: 0,
    taxRate: 20,
    taxAmount: 39.8,
    totalAmount: 238.8,
    status: "cancelled",
    cancelledAt: "2024-06-16T16:00:00Z",
    cancellationReason: "Müşteri talebi",
    createdAt: "2024-06-16T10:00:00Z",
    updatedAt: "2024-06-16T16:00:00Z",
  },
  {
    id: "ord-6",
    orderNumber: "S-2024-00340",
    customerId: "cust-1",
    customerName: "Ahmet Yılmaz",
    customerEmail: "ahmet@example.com",
    productId: "prod-5",
    productName: "VDS Medium",
    productSku: "VDS-M1",
    categoryId: "vds",
    categoryName: "VDS Sunucu",
    billingPeriod: "yearly",
    quantity: 1,
    basePrice: 4999,
    discountAmount: 500,
    promoCode: "VDS500",
    setupFee: 0,
    taxRate: 20,
    taxAmount: 899.8,
    totalAmount: 5398.8,
    status: "pending",
    createdAt: "2024-06-20T08:00:00Z",
    updatedAt: "2024-06-20T08:00:00Z",
  },
];

const stats = [
  { title: "Onay Bekleyen", value: "12", icon: Clock, change: "Acil", color: "text-yellow-500" },
  { title: "İşleniyor", value: "5", icon: RefreshCcw, change: "Devam ediyor", color: "text-cyan-500" },
  { title: "Bugün Tamamlanan", value: "8", icon: CheckCircle, change: "+3 dün", color: "text-green-500" },
  { title: "Bu Ay Gelir", value: "₺45,670", icon: TrendingUp, change: "+18%", color: "text-white" },
];

const statusButtons = [
  { value: "all", label: "Tümü" },
  { value: "pending", label: "Bekleyen" },
  { value: "processing", label: "İşleniyor" },
  { value: "completed", label: "Tamamlanan" },
  { value: "cancelled", label: "İptal" },
];

function OrdersContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("durum") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState<Order | null>(null);
  const [cancellationReason, setCancellationReason] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleApproveOrder = (order: Order) => {
    setSelectedOrderForAction(order);
    setApprovalDialogOpen(true);
  };

  const handleCancelOrder = (order: Order) => {
    setSelectedOrderForAction(order);
    setCancelDialogOpen(true);
  };

  const confirmApproval = () => {
    console.log("Approving order:", selectedOrderForAction?.orderNumber);
    setApprovalDialogOpen(false);
    setSelectedOrderForAction(null);
  };

  const confirmCancellation = () => {
    console.log("Cancelling order:", selectedOrderForAction?.orderNumber, "Reason:", cancellationReason);
    setCancelDialogOpen(false);
    setSelectedOrderForAction(null);
    setCancellationReason("");
  };

  const pendingCount = filteredOrders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Siparişler</h1>
            <p className="text-zinc-400">Ürün siparişlerini yönetin ve takip edin</p>
          </div>
          {selectedOrders.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">
                {selectedOrders.length} sipariş seçildi
              </span>
              <Button
                variant="outline"
                className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                onClick={() => console.log("Bulk approve:", selectedOrders)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Toplu Onayla
              </Button>
            </div>
          )}
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.1 + index * 0.05}>
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                  <span className="text-xs text-zinc-500">{stat.change}</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-zinc-400">{stat.title}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>

      {/* Status Filters */}
      <BlurFade delay={0.3}>
        <div className="flex flex-wrap gap-2">
          {statusButtons.map((btn) => {
            const isActive = statusFilter === btn.value;
            const count = btn.value === "all"
              ? mockOrders.length
              : mockOrders.filter((o) => o.status === btn.value).length;

            return (
              <Button
                key={btn.value}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(btn.value)}
                className={cn(
                  isActive
                    ? "bg-primary hover:bg-primary/90"
                    : "border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                )}
              >
                {btn.label}
                <Badge
                  variant="secondary"
                  className={cn(
                    "ml-2",
                    isActive ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                  )}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </BlurFade>

      {/* Search */}
      <BlurFade delay={0.35}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Sipariş no, müşteri adı, e-posta veya ürün ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Orders Table */}
      <BlurFade delay={0.4}>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 w-10">
                      <Checkbox
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onCheckedChange={handleSelectAll}
                        className="border-zinc-600"
                      />
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Sipariş</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Ürün</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Dönem</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Tutar</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Durum</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-400">Tarih</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const statusConf = orderStatusConfig[order.status as OrderStatus];
                    const periodConf = billingPeriodConfig[order.billingPeriod as keyof typeof billingPeriodConfig];
                    const catConf = categoryConfig[order.categoryId as ProductCategorySlug];
                    const StatusIcon = statusConf?.icon;

                    return (
                      <tr
                        key={order.id}
                        className={cn(
                          "border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors",
                          selectedOrders.includes(order.id) && "bg-zinc-800/30"
                        )}
                      >
                        <td className="p-4">
                          <Checkbox
                            checked={selectedOrders.includes(order.id)}
                            onCheckedChange={() => handleSelectOrder(order.id)}
                            className="border-zinc-600"
                          />
                        </td>
                        <td className="p-4">
                          <Link
                            href={`/yonetim/urunler/siparisler/${order.id}`}
                            className="text-sm font-mono text-primary hover:underline"
                          >
                            {order.orderNumber}
                          </Link>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-white">
                              {order.customerName}
                            </p>
                            <p className="text-xs text-zinc-500">{order.customerEmail}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {catConf?.icon && (
                              <div className={cn("p-1 rounded", catConf.color)}>
                                <catConf.icon className="h-3 w-3" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-white">{order.productName}</p>
                              <p className="text-xs text-zinc-500">{order.domain || "-"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-400">
                            {periodConf?.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm font-medium text-white">
                              {formatPrice(order.totalAmount)}
                            </p>
                            {order.discountAmount > 0 && (
                              <p className="text-xs text-green-500">
                                -{formatPrice(order.discountAmount)} ({order.promoCode})
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
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
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-400">
                            {formatDate(order.createdAt)}
                          </span>
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
                                <Link href={`/yonetim/urunler/siparisler/${order.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Detayları Gör
                                </Link>
                              </DropdownMenuItem>
                              {order.status === "pending" && (
                                <>
                                  <DropdownMenuSeparator className="bg-zinc-800" />
                                  <DropdownMenuItem
                                    className="cursor-pointer text-green-400"
                                    onClick={() => handleApproveOrder(order)}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Onayla
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer text-red-400"
                                    onClick={() => handleCancelOrder(order)}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" />
                                    İptal Et
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {filteredOrders.length === 0 && (
              <div className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Sipariş bulunamadı
                </h3>
                <p className="text-zinc-400">
                  Arama kriterlerinize uygun sipariş bulunmuyor.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </BlurFade>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Siparişi Onayla</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Bu siparişi onaylamak istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          {selectedOrderForAction && (
            <div className="py-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-zinc-400">Sipariş No:</span>
                <span className="text-white font-mono">
                  {selectedOrderForAction.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Müşteri:</span>
                <span className="text-white">{selectedOrderForAction.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Ürün:</span>
                <span className="text-white">{selectedOrderForAction.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tutar:</span>
                <span className="text-white font-medium">
                  {formatPrice(selectedOrderForAction.totalAmount)}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApprovalDialogOpen(false)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              İptal
            </Button>
            <Button
              onClick={confirmApproval}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Onayla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Siparişi İptal Et</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Bu siparişi iptal etmek istediğinize emin misiniz?
            </DialogDescription>
          </DialogHeader>
          {selectedOrderForAction && (
            <div className="py-4 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Sipariş No:</span>
                  <span className="text-white font-mono">
                    {selectedOrderForAction.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Müşteri:</span>
                  <span className="text-white">{selectedOrderForAction.customerName}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason" className="text-zinc-300">
                  İptal Nedeni
                </Label>
                <Textarea
                  id="reason"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  placeholder="İptal nedenini yazın..."
                  className="bg-zinc-800 border-zinc-700 text-white resize-none"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Vazgeç
            </Button>
            <Button
              onClick={confirmCancellation}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              <XCircle className="mr-2 h-4 w-4" />
              İptal Et
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
      <OrdersContent />
    </Suspense>
  );
}
