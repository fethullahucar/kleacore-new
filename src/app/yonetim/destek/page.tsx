"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertTriangle,
  Headphones,
  User,
  Timer,
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

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }> = {
  open: { label: "Açık", variant: "secondary", icon: Clock },
  waiting: { label: "Yanıt Bekliyor", variant: "outline", icon: Timer },
  closed: { label: "Kapalı", variant: "default", icon: CheckCircle },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "Yüksek", color: "bg-red-500/10 text-red-500" },
  medium: { label: "Orta", color: "bg-yellow-500/10 text-yellow-500" },
  low: { label: "Düşük", color: "bg-green-500/10 text-green-500" },
};

const stats = [
  { title: "Açık Talepler", value: "37", icon: Clock, change: "8 kritik" },
  { title: "Yanıt Bekliyor", value: "12", icon: Timer, change: "Müşteri cevabı" },
  { title: "Bugün Kapatılan", value: "15", icon: CheckCircle, change: "+23%" },
  { title: "Ort. Yanıt Süresi", value: "2.4 saat", icon: Headphones, change: "Son 7 gün" },
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
            <h1 className="text-2xl font-bold text-white">Destek Talepleri</h1>
            <p className="text-zinc-400">Müşteri destek taleplerini yönetin</p>
          </div>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] bg-zinc-800 border-zinc-700 text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="open">Açık</SelectItem>
                    <SelectItem value="waiting">Yanıt Bekliyor</SelectItem>
                    <SelectItem value="closed">Kapalı</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[130px] bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Öncelik" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="all">Tüm Öncelik</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="low">Düşük</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Talep no, konu veya müşteri ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.4}>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Talep</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Müşteri</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Departman</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Öncelik</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Durum</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Atanan</th>
                  <th className="text-left p-4 text-sm font-medium text-zinc-400">Son Yanıt</th>
                  <th className="text-right p-4 text-sm font-medium text-zinc-400">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <Link
                        href={`/yonetim/destek/${ticket.id}`}
                        className="text-sm font-medium text-white hover:text-primary"
                      >
                        {ticket.subject}
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-zinc-500">{ticket.id}</span>
                        <span className="text-xs text-zinc-600">•</span>
                        <span className="text-xs text-zinc-500">{ticket.replyCount} yanıt</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/yonetim/musteriler/${ticket.customerId}`}
                        className="text-sm text-zinc-400 hover:text-white"
                      >
                        {ticket.customer}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-400">{ticket.department}</span>
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium",
                        priorityConfig[ticket.priority].color
                      )}>
                        {priorityConfig[ticket.priority].label}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusConfig[ticket.status].variant}>
                        {statusConfig[ticket.status].label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {ticket.assignedTo ? (
                        <span className="text-sm text-zinc-300">{ticket.assignedTo}</span>
                      ) : (
                        <span className="text-sm text-zinc-500">Atanmamış</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-zinc-400">{ticket.lastReply}</span>
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
                            <Link href={`/yonetim/destek/${ticket.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Görüntüle & Yanıtla
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            Bana Ata
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          {ticket.status !== "closed" ? (
                            <DropdownMenuItem className="cursor-pointer text-green-400">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Kapat
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="cursor-pointer text-yellow-400">
                              <Clock className="mr-2 h-4 w-4" />
                              Yeniden Aç
                            </DropdownMenuItem>
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
      </BlurFade>
    </div>
  );
}
