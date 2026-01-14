"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  CheckCircle,
  Clock,
  User,
  Package,
  AlertTriangle,
  Paperclip,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock ticket data
const ticketData = {
  id: "T-2024-0089",
  subject: "DNS yapılandırma sorunu",
  department: "Teknik Destek",
  priority: "high",
  status: "open",
  assignedTo: "Admin",
  createdAt: "2024-06-24 11:15",
  customer: {
    id: "M-001",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
  },
  service: {
    id: "H-001",
    name: "Profesyonel Hosting",
    domain: "yilmaztech.com",
  },
};

const messages = [
  {
    id: 1,
    type: "customer",
    author: "Ahmet Yılmaz",
    content: "Merhaba, DNS ayarlarımı değiştirdikten sonra sitem erişilemez durumda. A kaydı olarak sunucu IP'sini ekledim ama hala çalışmıyor. Yardımcı olabilir misiniz?",
    createdAt: "2024-06-24 11:15",
    attachments: [],
  },
  {
    id: 2,
    type: "staff",
    author: "Admin",
    content: "Merhaba Ahmet Bey,\n\nTalebinizi inceliyorum. DNS değişikliklerinin yayılması 24-48 saat sürebilir. Ancak hızlıca kontrol etmem için domain adınızı ve yaptığınız değişikliklerin detaylarını paylaşır mısınız?\n\nSaygılarımla",
    createdAt: "2024-06-24 11:45",
    attachments: [],
  },
  {
    id: 3,
    type: "customer",
    author: "Ahmet Yılmaz",
    content: "Domain: yilmaztech.com\nA kaydı: 185.123.45.67\n\nYaklaşık 6 saat önce değiştirdim ama hala eski IP'ye gidiyor gibi görünüyor.",
    createdAt: "2024-06-24 14:20",
    attachments: [],
  },
  {
    id: 4,
    type: "staff",
    author: "Admin",
    content: "Teşekkürler, kontrol ettim. DNS kayıtlarınız doğru görünüyor. Propagasyon devam ediyor. Lütfen tarayıcı önbelleğinizi temizleyip tekrar deneyin.\n\nAyrıca https://dnschecker.org adresinden global propagasyonu takip edebilirsiniz.",
    createdAt: "2024-06-25 09:30",
    attachments: [],
  },
];

const internalNotes = [
  {
    id: 1,
    author: "Admin",
    content: "Müşteri VIP, öncelikli destek sağlanacak.",
    createdAt: "2024-06-24 11:30",
  },
];

const quickReplies = [
  "Talebiniz için teşekkürler. İnceliyorum.",
  "DNS propagasyonu 24-48 saat sürebilir.",
  "Lütfen tarayıcı önbelleğinizi temizleyin.",
  "Sorununuz çözüldü mü?",
];

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  open: { label: "Açık", variant: "secondary" },
  waiting: { label: "Yanıt Bekliyor", variant: "outline" },
  closed: { label: "Kapalı", variant: "default" },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "Yüksek", color: "text-red-500" },
  medium: { label: "Orta", color: "text-yellow-500" },
  low: { label: "Düşük", color: "text-green-500" },
};

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [replyText, setReplyText] = useState("");
  const [noteText, setNoteText] = useState("");

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/yonetim/destek"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Destek Taleplerine Dön
      </Link>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl font-bold text-white">{ticketData.subject}</h1>
            <Badge variant={statusConfig[ticketData.status].variant}>
              {statusConfig[ticketData.status].label}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-400">
            <span>{ticketData.id}</span>
            <span>•</span>
            <span>{ticketData.department}</span>
            <span>•</span>
            <span className={priorityConfig[ticketData.priority].color}>
              {priorityConfig[ticketData.priority].label} Öncelik
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Select defaultValue={ticketData.status}>
            <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="open">Açık</SelectItem>
              <SelectItem value="waiting">Yanıt Bekliyor</SelectItem>
              <SelectItem value="closed">Kapalı</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={ticketData.priority}>
            <SelectTrigger className="w-[130px] bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Öncelik" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="high">Yüksek</SelectItem>
              <SelectItem value="medium">Orta</SelectItem>
              <SelectItem value="low">Düşük</SelectItem>
            </SelectContent>
          </Select>
          {ticketData.status !== "closed" ? (
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Kapat
            </Button>
          ) : (
            <Button variant="outline" className="border-zinc-700">
              <Clock className="mr-2 h-4 w-4" />
              Yeniden Aç
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Thread */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800">
                {messages.map((message) => (
                  <div key={message.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium",
                          message.type === "staff"
                            ? "bg-primary text-white"
                            : "bg-zinc-700 text-zinc-300"
                        )}>
                          {message.author.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{message.author}</p>
                          <p className="text-xs text-zinc-500">{message.createdAt}</p>
                        </div>
                      </div>
                      {message.type === "staff" && (
                        <Badge variant="outline" className="text-xs">
                          Personel
                        </Badge>
                      )}
                    </div>
                    <div className="pl-12">
                      <p className="text-sm text-zinc-300 whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reply Form */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Yanıt Yaz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Replies */}
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-400 hover:text-white text-xs"
                    onClick={() => setReplyText(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>

              <Textarea
                placeholder="Yanıtınızı yazın..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-32 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />

              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                  <Paperclip className="mr-2 h-4 w-4" />
                  Dosya Ekle
                </Button>
                <Button className="bg-primary hover:bg-primary/90">
                  <Send className="mr-2 h-4 w-4" />
                  Yanıtla
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Talep Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Atanan</span>
                <span className="text-sm text-zinc-300">{ticketData.assignedTo || "Atanmamış"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Departman</span>
                <span className="text-sm text-zinc-300">{ticketData.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Oluşturulma</span>
                <span className="text-sm text-zinc-300">{ticketData.createdAt}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Müşteri</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/yonetim/musteriler/${ticketData.customer.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700 text-white text-sm font-medium">
                  {ticketData.customer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{ticketData.customer.name}</p>
                  <p className="text-xs text-zinc-500">{ticketData.customer.email}</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Related Service */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white text-base">İlgili Hizmet</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={`/yonetim/hizmetler/${ticketData.service.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
              >
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-white">{ticketData.service.name}</p>
                  <p className="text-xs text-zinc-500">{ticketData.service.domain}</p>
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Internal Notes */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white text-base">Dahili Notlar</CardTitle>
              <Badge variant="outline" className="text-xs">Gizli</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {internalNotes.map((note) => (
                <div key={note.id} className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm text-zinc-300">{note.content}</p>
                  <p className="text-xs text-zinc-500 mt-2">
                    {note.author} - {note.createdAt}
                  </p>
                </div>
              ))}

              <Textarea
                placeholder="Dahili not ekle..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="min-h-20 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
              <Button variant="outline" size="sm" className="w-full border-zinc-700">
                Not Ekle
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
