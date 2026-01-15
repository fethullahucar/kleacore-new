"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  Headphones,
  User,
  Timer,
  AlertCircle,
  XCircle,
  MessageSquare,
  Plus,
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
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";

const tickets = [
  {
    id: "T-2024-0089",
    subject: "DNS yapılandırma sorunu",
    customer: "Ahmet Yılmaz",
    customerId: "M-001",
    department: "Teknik Destek",
    priority: "high",
    status: "open",
    assignedTo: "Admin",
    createdAt: "2024-06-24 11:15",
    lastReply: "2024-06-25 09:30",
    replyCount: 3,
  },
  {
    id: "T-2024-0088",
    subject: "Fatura düzeltme talebi",
    customer: "Ayşe Demir",
    customerId: "M-002",
    department: "Muhasebe",
    priority: "medium",
    status: "waiting",
    assignedTo: null,
    createdAt: "2024-06-24 09:45",
    lastReply: "2024-06-24 10:30",
    replyCount: 2,
  },
  {
    id: "T-2024-0087",
    subject: "SSL sertifikası yenilenmiyor",
    customer: "Mehmet Kaya",
    customerId: "M-003",
    department: "Teknik Destek",
    priority: "high",
    status: "open",
    assignedTo: "Admin",
    createdAt: "2024-06-23 16:20",
    lastReply: "2024-06-24 08:15",
    replyCount: 5,
  },
  {
    id: "T-2024-0086",
    subject: "Hosting paketi yükseltme",
    customer: "Fatma Şahin",
    customerId: "M-004",
    department: "Satış",
    priority: "low",
    status: "closed",
    assignedTo: "Admin",
    createdAt: "2024-06-22 14:00",
    lastReply: "2024-06-23 11:45",
    replyCount: 4,
  },
  {
    id: "T-2024-0085",
    subject: "E-posta gönderim problemi",
    customer: "Zeynep Arslan",
    customerId: "M-006",
    department: "Teknik Destek",
    priority: "medium",
    status: "waiting",
    assignedTo: null,
    createdAt: "2024-06-22 10:30",
    lastReply: "2024-06-22 15:20",
    replyCount: 3,
  },
  {
    id: "T-2024-0084",
    subject: "Domain transfer işlemi",
    customer: "Ali Yıldız",
    customerId: "M-007",
    department: "Domain",
    priority: "low",
    status: "closed",
    assignedTo: "Admin",
    createdAt: "2024-06-21 09:15",
    lastReply: "2024-06-22 14:00",
    replyCount: 6,
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: "Açık", color: "bg-blue-500/10 text-blue-500" },
  waiting: { label: "Yanıt Bekliyor", color: "bg-yellow-500/10 text-yellow-500" },
  closed: { label: "Kapalı", color: "bg-green-500/10 text-green-500" },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "Yüksek", color: "bg-red-500/10 text-red-500" },
  medium: { label: "Orta", color: "bg-yellow-500/10 text-yellow-500" },
  low: { label: "Düşük", color: "bg-green-500/10 text-green-500" },
};

const stats = [
  {
    title: "Toplam Talepler",
    value: "146",
    icon: Headphones,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Açık",
    value: "37",
    icon: Clock,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Yanıt Bekliyor",
    value: "12",
    icon: Timer,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Kapalı",
    value: "97",
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

const statusFilters = [
  { value: "all", label: "Tümü", count: 146 },
  { value: "open", label: "Açık", count: 37, color: "text-blue-500" },
  { value: "waiting", label: "Yanıt Bekliyor", count: 12, color: "text-yellow-500" },
  { value: "closed", label: "Kapalı", count: 97, color: "text-green-500" },
];

const priorityFilters = [
  { value: "all", label: "Tüm Öncelik", count: 146 },
  { value: "high", label: "Yüksek", count: 18, color: "text-red-500" },
  { value: "medium", label: "Orta", count: 56, color: "text-yellow-500" },
  { value: "low", label: "Düşük", count: 72, color: "text-green-500" },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <BlurFade delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Destek Talepleri</h1>
            <p className="text-zinc-600 dark:text-zinc-400">Müşteri destek taleplerini yönetin</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Talep
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <BlurFade key={stat.title} delay={0.05 + index * 0.05}>
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
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

      {/* Status Filter Buttons */}
      <BlurFade delay={0.25}>
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(filter.value)}
              className={cn(
                statusFilter === filter.value
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {filter.label}
              <span className={cn(
                "ml-2 px-1.5 py-0.5 rounded text-xs font-medium",
                statusFilter === filter.value
                  ? "bg-white dark:bg-zinc-900 text-primary"
                  : filter.color || "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
              )}>
                {filter.count}
              </span>
            </Button>
          ))}
        </div>
      </BlurFade>

      {/* Priority Filter Buttons */}
      <BlurFade delay={0.3}>
        <div className="flex flex-wrap gap-2">
          {priorityFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={priorityFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setPriorityFilter(filter.value)}
              className={cn(
                priorityFilter === filter.value
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {filter.label}
              <span className={cn(
                "ml-2 px-1.5 py-0.5 rounded text-xs font-medium",
                priorityFilter === filter.value
                  ? "bg-white dark:bg-zinc-900 text-primary"
                  : filter.color || "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400"
              )}>
                {filter.count}
              </span>
            </Button>
          ))}
        </div>
      </BlurFade>

      {/* Search */}
      <BlurFade delay={0.35}>
        <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Talep no, konu veya müşteri ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-500"
              />
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
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Talep</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Müşteri</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Departman</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Öncelik</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Durum</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Atanan</th>
                    <th className="text-left p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">Son Yanıt</th>
                    <th className="text-right p-4 text-sm font-medium text-zinc-600 dark:text-zinc-400">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Headphones className="h-12 w-12 text-zinc-300 dark:text-zinc-700" />
                          <p className="text-zinc-500 dark:text-zinc-400">Talep bulunamadı</p>
                          <p className="text-sm text-zinc-400 dark:text-zinc-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <Link
                            href={`/yonetim/destek/${ticket.id}`}
                            className="text-sm font-medium text-zinc-900 dark:text-white hover:text-primary"
                          >
                            {ticket.subject}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-zinc-500">{ticket.id}</span>
                            <span className="text-xs text-zinc-400">•</span>
                            <div className="flex items-center gap-1 text-zinc-500">
                              <MessageSquare className="h-3 w-3" />
                              <span className="text-xs">{ticket.replyCount}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Link
                            href={`/yonetim/musteriler/${ticket.customerId}`}
                            className="text-sm text-zinc-900 dark:text-white hover:text-primary"
                          >
                            {ticket.customer}
                          </Link>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">{ticket.department}</span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                            priorityConfig[ticket.priority].color
                          )}>
                            {priorityConfig[ticket.priority].label}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "inline-flex px-2 py-0.5 rounded text-xs font-medium",
                            statusConfig[ticket.status].color
                          )}>
                            {statusConfig[ticket.status].label}
                          </span>
                        </td>
                        <td className="p-4">
                          {ticket.assignedTo ? (
                            <span className="text-sm text-zinc-900 dark:text-white">{ticket.assignedTo}</span>
                          ) : (
                            <span className="text-sm text-zinc-500">Atanmamış</span>
                          )}
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(ticket.lastReply).toLocaleDateString("tr-TR")}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                              <DropdownMenuItem asChild>
                                <Link href={`/yonetim/destek/${ticket.id}`} className="flex items-center cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4" />
                                  Görüntüle & Yanıtla
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => alert(`Ticket ${ticket.id} size atandı`)}
                                className="flex items-center cursor-pointer"
                              >
                                <User className="mr-2 h-4 w-4" />
                                Bana Ata
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-800" />
                              {ticket.status !== "closed" ? (
                                <DropdownMenuItem
                                  onClick={() => alert(`Ticket ${ticket.id} kapatıldı`)}
                                  className="flex items-center cursor-pointer text-green-600 dark:text-green-500"
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Kapat
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => alert(`Ticket ${ticket.id} yeniden açıldı`)}
                                  className="flex items-center cursor-pointer text-blue-600 dark:text-blue-500"
                                >
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Yeniden Aç
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
