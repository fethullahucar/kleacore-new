"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCcw,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Calendar,
  CreditCard,
  FileText,
  ExternalLink,
  Server,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { orderStatusConfig, billingPeriodConfig, categoryConfig } from "@/lib/products/constants";
import type { Order, OrderStatus, OrderActivity, ProductCategorySlug } from "@/types/products";

// Mock data
const mockOrder: Order = {
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
  customerNotes: "Lütfen en kısa sürede aktif edin.",
  adminNotes: "",
  createdAt: "2024-06-20T10:00:00Z",
  updatedAt: "2024-06-20T10:00:00Z",
};

const mockActivities: OrderActivity[] = [
  {
    id: "act-1",
    orderId: "ord-1",
    action: "created",
    description: "Sipariş oluşturuldu",
    performedBy: "Ahmet Yılmaz (Müşteri)",
    performedAt: "2024-06-20T10:00:00Z",
  },
  {
    id: "act-2",
    orderId: "ord-1",
    action: "payment_received",
    description: "Ödeme alındı",
    performedBy: "Sistem",
    performedAt: "2024-06-20T10:02:00Z",
    metadata: { transactionId: "TXN-12345" },
  },
];

const timelineSteps = [
  { key: "pending", label: "Sipariş Alındı", icon: Clock },
  { key: "approved", label: "Onaylandı", icon: CheckCircle },
  { key: "processing", label: "İşleniyor", icon: RefreshCcw },
  { key: "completed", label: "Tamamlandı", icon: CheckCircle },
];

const statusOrder = ["pending", "approved", "processing", "completed"];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const order = mockOrder;
  const activities = mockActivities;

  const [adminNotes, setAdminNotes] = useState(order.adminNotes || "");
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");

  const statusConf = orderStatusConfig[order.status as OrderStatus];
  const periodConf = billingPeriodConfig[order.billingPeriod as keyof typeof billingPeriodConfig];
  const catConf = categoryConfig[order.categoryId as ProductCategorySlug];
  const StatusIcon = statusConf?.icon;
  const CategoryIcon = catConf?.icon;

  const currentStepIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === "cancelled";
  const isRefunded = order.status === "refunded";

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
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

  const confirmApproval = () => {
    console.log("Approving order:", order.orderNumber);
    setApprovalDialogOpen(false);
  };

  const confirmCancellation = () => {
    console.log("Cancelling order:", order.orderNumber, "Reason:", cancellationReason);
    setCancelDialogOpen(false);
    setCancellationReason("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Link href="/yonetim/urunler/siparisler">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white font-mono">
                  {order.orderNumber}
                </h1>
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
              <p className="text-zinc-400 mt-1">
                {formatDate(order.createdAt)} tarihinde oluşturuldu
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {order.status === "pending" && (
              <>
                <Button
                  onClick={() => setApprovalDialogOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Onayla
                </Button>
                <Button
                  onClick={() => setCancelDialogOpen(true)}
                  variant="outline"
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  İptal Et
                </Button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  Fatura Oluştur
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Mail className="mr-2 h-4 w-4" />
                  E-posta Gönder
                </DropdownMenuItem>
                {order.status !== "cancelled" && order.status !== "refunded" && (
                  <>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem className="cursor-pointer text-red-400">
                      <XCircle className="mr-2 h-4 w-4" />
                      İptal Et
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </BlurFade>

      {/* Timeline */}
      {!isCancelled && !isRefunded && (
        <BlurFade delay={0.1}>
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {timelineSteps.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const StepIcon = step.icon;

                  return (
                    <div key={step.key} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isCurrent
                              ? "bg-primary text-white"
                              : "bg-zinc-800 text-zinc-500"
                          )}
                        >
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <span
                          className={cn(
                            "mt-2 text-sm font-medium",
                            isCompleted || isCurrent ? "text-white" : "text-zinc-500"
                          )}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-1 mx-4 rounded",
                            index < currentStepIndex
                              ? "bg-green-500"
                              : "bg-zinc-800"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}

      {/* Cancelled/Refunded Banner */}
      {(isCancelled || isRefunded) && (
        <BlurFade delay={0.1}>
          <Card className={cn(
            "border",
            isCancelled ? "bg-red-500/10 border-red-500/30" : "bg-orange-500/10 border-orange-500/30"
          )}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <XCircle className={cn(
                  "h-5 w-5",
                  isCancelled ? "text-red-500" : "text-orange-500"
                )} />
                <div>
                  <p className={cn(
                    "font-medium",
                    isCancelled ? "text-red-500" : "text-orange-500"
                  )}>
                    {isCancelled ? "Sipariş İptal Edildi" : "Sipariş İade Edildi"}
                  </p>
                  {order.cancellationReason && (
                    <p className="text-sm text-zinc-400 mt-1">
                      Neden: {order.cancellationReason}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Details */}
          <BlurFade delay={0.2}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Ürün Bilgileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-800/50">
                  <div className={cn("p-3 rounded-lg", catConf?.color)}>
                    {CategoryIcon && <CategoryIcon className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{order.productName}</h3>
                        <p className="text-sm text-zinc-400">{order.categoryName}</p>
                        <code className="text-xs text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded mt-1 inline-block">
                          {order.productSku}
                        </code>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                        <Link href={`/yonetim/urunler/paketler/${order.productId}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    {order.domain && (
                      <div className="mt-3 pt-3 border-t border-zinc-700">
                        <p className="text-sm text-zinc-400">Domain:</p>
                        <p className="text-white font-medium">{order.domain}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Price Breakdown */}
          <BlurFade delay={0.25}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Fiyat Dökümü</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Faturalama Dönemi</span>
                    <span className="text-white">{periodConf?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Ürün Fiyatı</span>
                    <span className="text-white">{formatPrice(order.basePrice)}</span>
                  </div>
                  {order.setupFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Kurulum Ücreti</span>
                      <span className="text-white">{formatPrice(order.setupFee)}</span>
                    </div>
                  )}
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-zinc-400">
                        İndirim {order.promoCode && (
                          <Badge variant="outline" className="ml-2 text-xs border-green-500/50 text-green-500">
                            {order.promoCode}
                          </Badge>
                        )}
                      </span>
                      <span className="text-green-500">-{formatPrice(order.discountAmount)}</span>
                    </div>
                  )}
                  <Separator className="bg-zinc-800" />
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Ara Toplam</span>
                    <span className="text-white">
                      {formatPrice(order.basePrice + order.setupFee - order.discountAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">KDV (%{order.taxRate})</span>
                    <span className="text-white">{formatPrice(order.taxAmount)}</span>
                  </div>
                  <Separator className="bg-zinc-800" />
                  <div className="flex justify-between">
                    <span className="text-white font-semibold">Toplam</span>
                    <span className="text-white font-bold text-lg">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Notes */}
          <BlurFade delay={0.3}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Notlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.customerNotes && (
                  <div>
                    <Label className="text-zinc-400 text-sm">Müşteri Notu</Label>
                    <p className="mt-1 text-white bg-zinc-800/50 p-3 rounded-lg">
                      {order.customerNotes}
                    </p>
                  </div>
                )}
                <div>
                  <Label htmlFor="adminNotes" className="text-zinc-400 text-sm">
                    Admin Notları
                  </Label>
                  <Textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Sipariş hakkında not ekleyin..."
                    className="mt-1 bg-zinc-800 border-zinc-700 text-white resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Activity Timeline */}
          <BlurFade delay={0.35}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Aktivite Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {index < activities.length - 1 && (
                          <div className="w-0.5 flex-1 bg-zinc-800 mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm text-white">{activity.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-zinc-500">{activity.performedBy}</span>
                          <span className="text-zinc-700">•</span>
                          <span className="text-xs text-zinc-500">
                            {formatDate(activity.performedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <BlurFade delay={0.2}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Müşteri Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p className="text-sm text-zinc-400">#{order.customerId}</p>
                  </div>
                </div>
                <Separator className="bg-zinc-800" />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-400">{order.customerEmail}</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Link href={`/yonetim/musteriler/${order.customerId}`}>
                    Müşteri Profilini Gör
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Related Records */}
          <BlurFade delay={0.25}>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">İlişkili Kayıtlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.serviceId ? (
                  <Link
                    href={`/yonetim/hizmetler/${order.serviceId}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-white">Hizmet</span>
                    </div>
                    <span className="text-xs text-zinc-500">{order.serviceId}</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-zinc-600" />
                      <span className="text-sm text-zinc-500">Hizmet</span>
                    </div>
                    <span className="text-xs text-zinc-600">Henüz oluşturulmadı</span>
                  </div>
                )}
                {order.invoiceId ? (
                  <Link
                    href={`/yonetim/faturalar/${order.invoiceId}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-white">Fatura</span>
                    </div>
                    <span className="text-xs text-zinc-500">{order.invoiceId}</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-zinc-600" />
                      <span className="text-sm text-zinc-500">Fatura</span>
                    </div>
                    <span className="text-xs text-zinc-600">Henüz oluşturulmadı</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-white">Siparişi Onayla</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Bu siparişi onaylamak istediğinize emin misiniz? Onayladıktan sonra hizmet oluşturma süreci başlayacaktır.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">Ürün:</span>
              <span className="text-white">{order.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Tutar:</span>
              <span className="text-white font-medium">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
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
          <div className="py-4 space-y-4">
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
