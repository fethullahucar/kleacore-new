"use client";

import { useState } from "react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Headphones,
  Search,
  Plus,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  User,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock tickets data
const tickets = [
  {
    id: "TKT-4521",
    subject: "DNS Ayarları Yardım",
    department: "Teknik Destek",
    status: "open",
    priority: "medium",
    createdAt: "2 gün önce",
    lastReply: "1 saat önce",
    lastReplyBy: "Destek Ekibi",
    messages: 4,
  },
  {
    id: "TKT-4498",
    subject: "SSL Sertifikası Kurulumu",
    department: "Teknik Destek",
    status: "answered",
    priority: "high",
    createdAt: "5 gün önce",
    lastReply: "3 gün önce",
    lastReplyBy: "Destek Ekibi",
    messages: 6,
  },
  {
    id: "TKT-4456",
    subject: "Fatura Sorgulama",
    department: "Muhasebe",
    status: "closed",
    priority: "low",
    createdAt: "1 hafta önce",
    lastReply: "6 gün önce",
    lastReplyBy: "Muhasebe",
    messages: 3,
  },
  {
    id: "TKT-4412",
    subject: "Sunucu Performans Sorunu",
    department: "Teknik Destek",
    status: "closed",
    priority: "high",
    createdAt: "2 hafta önce",
    lastReply: "10 gün önce",
    lastReplyBy: "Destek Ekibi",
    messages: 8,
  },
  {
    id: "TKT-4389",
    subject: "Domain Transfer Talebi",
    department: "Satış",
    status: "waiting",
    priority: "medium",
    createdAt: "3 hafta önce",
    lastReply: "2 hafta önce",
    lastReplyBy: "Siz",
    messages: 2,
  },
];

const statusConfig = {
  open: {
    label: "Açık",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    icon: MessageSquare,
  },
  answered: {
    label: "Yanıtlandı",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    icon: CheckCircle2,
  },
  waiting: {
    label: "Yanıt Bekliyor",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    icon: Clock,
  },
  closed: {
    label: "Kapalı",
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
    icon: CheckCircle2,
  },
};

const priorityConfig = {
  low: { label: "Düşük", color: "text-gray-500" },
  medium: { label: "Normal", color: "text-blue-500" },
  high: { label: "Yüksek", color: "text-red-500" },
};

const filterOptions = [
  { value: "all", label: "Tümü" },
  { value: "open", label: "Açık" },
  { value: "answered", label: "Yanıtlandı" },
  { value: "closed", label: "Kapalı" },
];

export default function DestekPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || ticket.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open" || t.status === "answered").length,
    waiting: tickets.filter((t) => t.status === "waiting").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Destek Talepleri</h1>
            <p className="text-muted-foreground">
              Destek taleplerinizi görüntüleyin ve yönetin.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Talep
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Headphones className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Talep</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <MessageSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Açık Talepler</p>
                  <p className="text-2xl font-bold">{stats.open}</p>
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
                  <p className="text-sm text-muted-foreground">Yanıt Bekleyen</p>
                  <p className="text-2xl font-bold">{stats.waiting}</p>
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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Talep no veya konu ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
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
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Tickets List */}
      <BlurFade delay={0.25} inView>
        <Card>
          <CardHeader>
            <CardTitle>Talepler ({filteredTickets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTickets.map((ticket) => {
                const status = statusConfig[ticket.status as keyof typeof statusConfig];
                const priority = priorityConfig[ticket.priority as keyof typeof priorityConfig];
                const StatusIcon = status.icon;

                return (
                  <div
                    key={ticket.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow cursor-pointer group"
                  >
                    <div className={cn("p-3 rounded-lg", status.bgColor)}>
                      <StatusIcon className={cn("h-6 w-6", status.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold">{ticket.subject}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                          {ticket.department}
                        </span>
                        <span className={cn("text-xs font-medium", priority.color)}>
                          {priority.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{ticket.id}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {ticket.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {ticket.messages} mesaj
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:block text-right">
                      <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-1", status.bgColor, status.color)}>
                        {status.label}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                        <User className="h-3 w-3" />
                        {ticket.lastReplyBy} - {ticket.lastReply}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                );
              })}

              {filteredTickets.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Aramanızla eşleşen talep bulunamadı.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
