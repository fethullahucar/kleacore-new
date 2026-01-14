"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Package,
  FileText,
  Headphones,
  Edit,
  Ban,
  CheckCircle,
  CreditCard,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock customer data
const customerData = {
  id: "M-001",
  name: "Ahmet Yılmaz",
  email: "ahmet@example.com",
  phone: "0532 123 45 67",
  address: "Atatürk Cad. No:123, Kadıköy, İstanbul",
  company: "Yılmaz Teknoloji Ltd.",
  taxNumber: "1234567890",
  balance: 250,
  status: "active",
  registeredAt: "2023-05-15",
  lastLogin: "2024-06-25 14:32",
  notes: "VIP müşteri, öncelikli destek",
};

const services = [
  {
    id: "H-001",
    name: "Profesyonel Hosting",
    domain: "yilmaztech.com",
    status: "active",
    expiresAt: "2025-05-15",
    price: "₺299/yıl",
  },
  {
    id: "H-002",
    name: "SSL Sertifikası",
    domain: "yilmaztech.com",
    status: "active",
    expiresAt: "2025-05-15",
    price: "₺199/yıl",
  },
  {
    id: "H-003",
    name: "Kurumsal E-posta",
    domain: "yilmaztech.com",
    status: "active",
    expiresAt: "2025-05-15",
    price: "₺149/yıl",
  },
];

const invoices = [
  {
    id: "F-2024-0156",
    date: "2024-06-01",
    amount: 647,
    status: "paid",
    paidAt: "2024-06-03",
  },
  {
    id: "F-2024-0089",
    date: "2024-05-01",
    amount: 299,
    status: "paid",
    paidAt: "2024-05-02",
  },
  {
    id: "F-2024-0045",
    date: "2024-04-01",
    amount: 299,
    status: "paid",
    paidAt: "2024-04-05",
  },
];

const tickets = [
  {
    id: "T-2024-0089",
    subject: "DNS yapılandırma sorunu",
    status: "open",
    priority: "high",
    createdAt: "2024-06-24",
  },
  {
    id: "T-2024-0056",
    subject: "E-posta gönderim problemi",
    status: "closed",
    priority: "medium",
    createdAt: "2024-05-15",
  },
];

const activityLog = [
  { date: "2024-06-25 14:32", action: "Giriş yaptı", type: "login" },
  { date: "2024-06-24 11:15", action: "Destek talebi açtı #T-2024-0089", type: "ticket" },
  { date: "2024-06-03 09:45", action: "Fatura #F-2024-0156 ödedi", type: "payment" },
  { date: "2024-06-01 00:00", action: "Fatura #F-2024-0156 oluşturuldu", type: "invoice" },
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Aktif", variant: "default" },
  suspended: { label: "Askıda", variant: "destructive" },
  pending: { label: "Beklemede", variant: "secondary" },
  paid: { label: "Ödendi", variant: "default" },
  unpaid: { label: "Ödenmedi", variant: "destructive" },
  open: { label: "Açık", variant: "secondary" },
  closed: { label: "Kapalı", variant: "outline" },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "Yüksek", color: "text-red-500" },
  medium: { label: "Orta", color: "text-yellow-500" },
  low: { label: "Düşük", color: "text-green-500" },
};

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/yonetim/musteriler"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Müşterilere Dön
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
            {customerData.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{customerData.name}</h1>
              <Badge variant={statusConfig[customerData.status].variant}>
                {statusConfig[customerData.status].label}
              </Badge>
            </div>
            <p className="text-zinc-400">{customerData.company}</p>
            <p className="text-sm text-zinc-500">Müşteri ID: {customerData.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
            <Edit className="mr-2 h-4 w-4" />
            Düzenle
          </Button>
          <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
            <Mail className="mr-2 h-4 w-4" />
            E-posta Gönder
          </Button>
          {customerData.status === "active" ? (
            <Button variant="destructive">
              <Ban className="mr-2 h-4 w-4" />
              Askıya Al
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Aktif Et
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Info Cards */}
        <div className="space-y-6">
          {/* Contact Info */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-300">{customerData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-300">{customerData.phone}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-zinc-500 mt-0.5" />
                <span className="text-sm text-zinc-300">{customerData.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Hesap Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Bakiye</span>
                <span className={cn(
                  "text-sm font-medium",
                  customerData.balance >= 0 ? "text-green-500" : "text-red-500"
                )}>
                  ₺{customerData.balance.toLocaleString("tr-TR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Vergi No</span>
                <span className="text-sm text-zinc-300">{customerData.taxNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Kayıt Tarihi</span>
                <span className="text-sm text-zinc-300">
                  {new Date(customerData.registeredAt).toLocaleDateString("tr-TR")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Son Giriş</span>
                <span className="text-sm text-zinc-300">{customerData.lastLogin}</span>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Notlar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-400">{customerData.notes}</p>
              <Button variant="ghost" size="sm" className="mt-3 text-zinc-500 hover:text-white">
                Not Ekle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="bg-zinc-800 border border-zinc-700">
              <TabsTrigger value="services" className="data-[state=active]:bg-zinc-700">
                <Package className="mr-2 h-4 w-4" />
                Hizmetler ({services.length})
              </TabsTrigger>
              <TabsTrigger value="invoices" className="data-[state=active]:bg-zinc-700">
                <FileText className="mr-2 h-4 w-4" />
                Faturalar ({invoices.length})
              </TabsTrigger>
              <TabsTrigger value="tickets" className="data-[state=active]:bg-zinc-700">
                <Headphones className="mr-2 h-4 w-4" />
                Destek ({tickets.length})
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-zinc-700">
                <Clock className="mr-2 h-4 w-4" />
                Aktivite
              </TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-0">
                  <div className="divide-y divide-zinc-800">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/50">
                        <div>
                          <Link
                            href={`/yonetim/hizmetler/${service.id}`}
                            className="text-sm font-medium text-white hover:text-primary"
                          >
                            {service.name}
                          </Link>
                          <p className="text-xs text-zinc-500">{service.domain}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-zinc-300">{service.price}</p>
                            <p className="text-xs text-zinc-500">
                              Bitiş: {new Date(service.expiresAt).toLocaleDateString("tr-TR")}
                            </p>
                          </div>
                          <Badge variant={statusConfig[service.status].variant}>
                            {statusConfig[service.status].label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="mt-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-0">
                  <div className="divide-y divide-zinc-800">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/50">
                        <div>
                          <Link
                            href={`/yonetim/faturalar/${invoice.id}`}
                            className="text-sm font-medium text-white hover:text-primary"
                          >
                            {invoice.id}
                          </Link>
                          <p className="text-xs text-zinc-500">
                            {new Date(invoice.date).toLocaleDateString("tr-TR")}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-white">
                            ₺{invoice.amount.toLocaleString("tr-TR")}
                          </span>
                          <Badge variant={statusConfig[invoice.status].variant}>
                            {statusConfig[invoice.status].label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tickets Tab */}
            <TabsContent value="tickets" className="mt-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-0">
                  <div className="divide-y divide-zinc-800">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-4 hover:bg-zinc-800/50">
                        <div>
                          <Link
                            href={`/yonetim/destek/${ticket.id}`}
                            className="text-sm font-medium text-white hover:text-primary"
                          >
                            {ticket.subject}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-zinc-500">{ticket.id}</span>
                            <span className={cn("text-xs", priorityConfig[ticket.priority].color)}>
                              {priorityConfig[ticket.priority].label}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-zinc-500">
                            {new Date(ticket.createdAt).toLocaleDateString("tr-TR")}
                          </span>
                          <Badge variant={statusConfig[ticket.status].variant}>
                            {statusConfig[ticket.status].label}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="mt-4">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {activityLog.map((log, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-zinc-600" />
                        <div>
                          <p className="text-sm text-zinc-300">{log.action}</p>
                          <p className="text-xs text-zinc-500">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
