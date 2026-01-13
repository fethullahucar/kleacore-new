"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Headphones,
  ArrowLeft,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Send,
  Paperclip,
  User,
  Calendar,
  Tag,
  Building,
  XCircle,
  Lock,
  MoreVertical,
  AlertTriangle,
  Star,
  Download,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock tickets database
const ticketsDB: Record<string, {
  id: string;
  subject: string;
  department: string;
  status: "open" | "answered" | "waiting" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  createdAtFull: string;
  relatedService?: string;
  messages: Array<{
    id: number;
    sender: "customer" | "support";
    senderName: string;
    senderRole?: string;
    content: string;
    timestamp: string;
    attachments?: Array<{
      name: string;
      size: string;
      type: "image" | "document";
    }>;
  }>;
}> = {
  "TKT-4521": {
    id: "TKT-4521",
    subject: "DNS Ayarları Yardım",
    department: "Teknik Destek",
    status: "open",
    priority: "medium",
    createdAt: "2 gün önce",
    createdAtFull: "11 Ocak 2025, 14:32",
    relatedService: "example.com - Linux Hosting Pro",
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "Ahmet Yılmaz",
        content: "Merhaba,\n\nexample.com domainim için DNS ayarlarını değiştirmek istiyorum. A kaydını yeni sunucu IP adresine yönlendirmem gerekiyor.\n\nYeni IP: 195.85.201.100\n\nNasıl yapabilirim?",
        timestamp: "11 Ocak 2025, 14:32",
      },
      {
        id: 2,
        sender: "support",
        senderName: "Mehmet Demir",
        senderRole: "Teknik Destek Uzmanı",
        content: "Merhaba Ahmet Bey,\n\nDNS ayarlarınızı değiştirmek için aşağıdaki adımları takip edebilirsiniz:\n\n1. Müşteri panelinize giriş yapın\n2. Domainler > example.com > DNS Yönetimi'ne gidin\n3. Mevcut A kaydını bulun ve düzenle butonuna tıklayın\n4. IP adresini 195.85.201.100 olarak güncelleyin\n5. Kaydet butonuna tıklayın\n\nDeğişiklikler 24-48 saat içinde yayılacaktır.\n\nBaşka bir sorunuz olursa yardımcı olmaktan memnuniyet duyarız.",
        timestamp: "11 Ocak 2025, 15:45",
      },
      {
        id: 3,
        sender: "customer",
        senderName: "Ahmet Yılmaz",
        content: "Teşekkürler, DNS yönetimi bölümünü buldum. Ancak A kaydı dışında MX kaydı da eklemem gerekiyor. Mail sunucusu için ayrı bir kayıt mı eklenmeli?",
        timestamp: "11 Ocak 2025, 16:20",
        attachments: [
          { name: "dns-panel-screenshot.png", size: "245 KB", type: "image" },
        ],
      },
      {
        id: 4,
        sender: "support",
        senderName: "Mehmet Demir",
        senderRole: "Teknik Destek Uzmanı",
        content: "Evet, mail sunucunuz için MX kaydı eklemeniz gerekiyor.\n\nMX kaydı eklemek için:\n1. DNS Yönetimi'nde 'Kayıt Ekle' butonuna tıklayın\n2. Kayıt tipi olarak 'MX' seçin\n3. Host alanına '@' yazın\n4. Değer alanına mail sunucu adresinizi yazın\n5. Öncelik değerini 10 olarak ayarlayın\n\nEklediğiniz screenshot'ı inceledim, doğru yoldasınız. Başka sorunuz var mı?",
        timestamp: "13 Ocak 2025, 09:15",
      },
    ],
  },
  "TKT-4498": {
    id: "TKT-4498",
    subject: "SSL Sertifikası Kurulumu",
    department: "Teknik Destek",
    status: "answered",
    priority: "high",
    createdAt: "5 gün önce",
    createdAtFull: "8 Ocak 2025, 10:15",
    relatedService: "example.com - Wildcard SSL",
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "Ahmet Yılmaz",
        content: "Wildcard SSL sertifikamı sunucuma kurmak istiyorum. cPanel üzerinden nasıl kurulum yapabilirim?",
        timestamp: "8 Ocak 2025, 10:15",
      },
      {
        id: 2,
        sender: "support",
        senderName: "Ali Kaya",
        senderRole: "Teknik Destek Uzmanı",
        content: "Merhaba,\n\nSSL sertifikanızı cPanel üzerinden kurmak için:\n\n1. cPanel > SSL/TLS bölümüne gidin\n2. 'Manage SSL Sites' seçeneğine tıklayın\n3. Domain seçin ve sertifika bilgilerini yapıştırın\n4. Install Certificate butonuna tıklayın\n\nSertifika dosyalarınızı müşteri panelinizden indirebilirsiniz.",
        timestamp: "8 Ocak 2025, 11:30",
        attachments: [
          { name: "ssl-kurulum-rehberi.pdf", size: "1.2 MB", type: "document" },
        ],
      },
    ],
  },
  "TKT-4456": {
    id: "TKT-4456",
    subject: "Fatura Sorgulama",
    department: "Muhasebe",
    status: "closed",
    priority: "low",
    createdAt: "1 hafta önce",
    createdAtFull: "6 Ocak 2025, 09:00",
    messages: [
      {
        id: 1,
        sender: "customer",
        senderName: "Ahmet Yılmaz",
        content: "INV-2024-0156 numaralı fatura hakkında bilgi almak istiyorum. Ödeme yaptım ancak hala bekliyor görünüyor.",
        timestamp: "6 Ocak 2025, 09:00",
      },
      {
        id: 2,
        sender: "support",
        senderName: "Zeynep Aydın",
        senderRole: "Muhasebe Uzmanı",
        content: "Merhaba,\n\nÖdemenizi kontrol ettik. Havale ile yapılan ödemeler manuel onay gerektirdiğinden biraz gecikme yaşanmış. Ödemeniz şu an onaylanmıştır ve faturanız 'Ödendi' olarak güncellendi.\n\nTeşekkür ederiz.",
        timestamp: "6 Ocak 2025, 14:20",
      },
      {
        id: 3,
        sender: "customer",
        senderName: "Ahmet Yılmaz",
        content: "Teşekkürler, faturamın güncellendiğini gördüm. Talebi kapatabilirsiniz.",
        timestamp: "7 Ocak 2025, 10:00",
      },
    ],
  },
};

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
    icon: Lock,
  },
};

const priorityConfig = {
  low: { label: "Düşük", color: "text-gray-500", bgColor: "bg-gray-500/10" },
  medium: { label: "Normal", color: "text-blue-500", bgColor: "bg-blue-500/10" },
  high: { label: "Yüksek", color: "text-red-500", bgColor: "bg-red-500/10" },
};

export default function DestekDetayPage() {
  const params = useParams();
  const id = params.id as string;
  const ticket = ticketsDB[id];

  const [replyText, setReplyText] = useState("");

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Headphones className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Talep Bulunamadı</h2>
        <p className="text-muted-foreground mb-4">İstediğiniz destek talebi mevcut değil.</p>
        <Button asChild>
          <Link href="/musteri/panel/destek">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Taleplere Dön
          </Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[ticket.status];
  const priority = priorityConfig[ticket.priority];
  const StatusIcon = status.icon;

  const handleSubmit = () => {
    if (replyText.trim()) {
      // In real app, this would send the reply
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col gap-4">
          <Link
            href="/musteri/panel/destek"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Taleplere Dön
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={cn("p-4 rounded-xl", status.bgColor)}>
                <Headphones className={cn("h-8 w-8", status.color)} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold tracking-tight">{ticket.subject}</h1>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    status.bgColor, status.color
                  )}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                  <span className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    priority.bgColor, priority.color
                  )}>
                    <AlertTriangle className="h-3 w-3" />
                    {priority.label} Öncelik
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">
                    {ticket.department}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {ticket.id} • Oluşturulma: {ticket.createdAtFull}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Star className="mr-2 h-4 w-4" />
                  Öncelik Değiştir
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {ticket.status !== "closed" ? (
                  <DropdownMenuItem className="text-red-500">
                    <XCircle className="mr-2 h-4 w-4" />
                    Talebi Kapat
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem className="text-green-500">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Talebi Yeniden Aç
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Messages */}
        <div className="lg:col-span-2 space-y-6">
          <BlurFade delay={0.15} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Mesajlar ({ticket.messages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-4 rounded-lg",
                      message.sender === "customer"
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-muted/50 border"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          message.sender === "customer"
                            ? "bg-primary/10"
                            : "bg-green-500/10"
                        )}>
                          <User className={cn(
                            "h-5 w-5",
                            message.sender === "customer"
                              ? "text-primary"
                              : "text-green-500"
                          )} />
                        </div>
                        <div>
                          <p className="font-semibold">{message.senderName}</p>
                          {message.senderRole && (
                            <p className="text-xs text-muted-foreground">{message.senderRole}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>

                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground mb-2">Ekler:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.attachments.map((attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border hover:shadow-sm transition-shadow cursor-pointer"
                            >
                              {attachment.type === "image" ? (
                                <ImageIcon className="h-4 w-4 text-blue-500" />
                              ) : (
                                <FileText className="h-4 w-4 text-orange-500" />
                              )}
                              <div>
                                <p className="text-sm font-medium">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">{attachment.size}</p>
                              </div>
                              <Download className="h-4 w-4 text-muted-foreground ml-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </BlurFade>

          {/* Reply Form */}
          {ticket.status !== "closed" ? (
            <BlurFade delay={0.2} inView>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Yanıt Yaz</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Mesajınızı yazın..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Dosya Ekle
                    </Button>
                    <Button onClick={handleSubmit} disabled={!replyText.trim()}>
                      <Send className="mr-2 h-4 w-4" />
                      Gönder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          ) : (
            <BlurFade delay={0.2} inView>
              <Card className="border-dashed">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Lock className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Bu talep kapatılmıştır</p>
                      <p className="text-sm">Yeni bir mesaj göndermek için talebi yeniden açabilirsiniz.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <BlurFade delay={0.25} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Talep Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Talep No</p>
                      <p className="font-medium">{ticket.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Departman</p>
                      <p className="font-medium">{ticket.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Oluşturulma</p>
                      <p className="font-medium">{ticket.createdAtFull}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Öncelik</p>
                      <p className={cn("font-medium", priority.color)}>{priority.label}</p>
                    </div>
                  </div>
                </div>

                {ticket.relatedService && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">İlgili Hizmet</p>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium">{ticket.relatedService}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          {/* Quick Actions */}
          <BlurFade delay={0.3} inView>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  Önceliği Yükselt
                </Button>
                {ticket.status !== "closed" ? (
                  <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                    <XCircle className="mr-2 h-4 w-4" />
                    Talebi Kapat
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full justify-start text-green-500 hover:text-green-600">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Yeniden Aç
                  </Button>
                )}
              </CardContent>
            </Card>
          </BlurFade>

          {/* Help */}
          <BlurFade delay={0.35} inView>
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Headphones className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Acil Destek</p>
                    <p className="text-muted-foreground">
                      Acil durumlar için 7/24 telefon desteğimizi arayabilirsiniz.
                    </p>
                    <p className="font-semibold text-primary mt-2">
                      0850 123 45 67
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
