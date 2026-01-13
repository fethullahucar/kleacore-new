"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Send,
  Paperclip,
  X,
  FileText,
  Image as ImageIcon,
  File,
} from "lucide-react";

const departments = [
  { value: "teknik", label: "Teknik Destek", description: "Sunucu, hosting, domain sorunları" },
  { value: "satis", label: "Satış", description: "Fiyatlandırma, yeni hizmetler" },
  { value: "muhasebe", label: "Muhasebe", description: "Fatura, ödeme sorunları" },
  { value: "diger", label: "Diğer", description: "Genel sorular" },
];

const priorities = [
  { value: "low", label: "Düşük", description: "Acil değil, zaman olunca bakılabilir" },
  { value: "medium", label: "Normal", description: "Standart öncelik" },
  { value: "high", label: "Yüksek", description: "Önemli, hızlı yanıt gerekiyor" },
];

const services = [
  { value: "none", label: "Hizmet seçin (opsiyonel)" },
  { value: "vds-1", label: "VDS-3 - vds1.kleacore.com" },
  { value: "hosting-1", label: "Linux Hosting - example.com" },
  { value: "domain-1", label: "Domain - example.com" },
];

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: "image" | "document" | "other";
}

export default function YeniDestekTalebiPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("medium");
  const [service, setService] = useState("none");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  const handleFileAttach = () => {
    // Mock file attachment
    const mockFile: AttachedFile = {
      id: `file-${Date.now()}`,
      name: `ekran-goruntusu-${attachedFiles.length + 1}.png`,
      size: "245 KB",
      type: "image",
    };
    setAttachedFiles([...attachedFiles, mockFile]);
  };

  const removeFile = (id: string) => {
    setAttachedFiles(attachedFiles.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to ticket list
    router.push("/musteri/panel/destek");
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return ImageIcon;
      case "document":
        return FileText;
      default:
        return File;
    }
  };

  const isFormValid = department && subject.trim() && message.trim();

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex items-center gap-4">
          <Link href="/musteri/panel/destek">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Yeni Destek Talebi</h1>
            <p className="text-muted-foreground">
              Sorununuzu detaylı açıklayın, size en kısa sürede yardımcı olalım.
            </p>
          </div>
        </div>
      </BlurFade>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <BlurFade delay={0.15} inView>
              <Card>
                <CardHeader>
                  <CardTitle>Talep Detayları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Department */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Departman *</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Departman seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            <div>
                              <p className="font-medium">{dept.label}</p>
                              <p className="text-xs text-muted-foreground">{dept.description}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Related Service */}
                  <div className="space-y-2">
                    <Label htmlFor="service">İlgili Hizmet</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger id="service">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((svc) => (
                          <SelectItem key={svc.value} value={svc.value}>
                            {svc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu *</Label>
                    <Input
                      id="subject"
                      placeholder="Sorununuzu kısaca özetleyin"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj *</Label>
                    <Textarea
                      id="message"
                      placeholder="Sorununuzu detaylı açıklayın. Ne zaman başladı? Ne denediniz? Hata mesajı var mı?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={8}
                    />
                  </div>

                  {/* Attachments */}
                  <div className="space-y-2">
                    <Label>Dosya Ekleri</Label>
                    <div className="border-2 border-dashed rounded-lg p-4">
                      {attachedFiles.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {attachedFiles.map((file) => {
                            const FileIcon = getFileIcon(file.type);
                            return (
                              <div
                                key={file.id}
                                className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                              >
                                <div className="flex items-center gap-2">
                                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">{file.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({file.size})
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => removeFile(file.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleFileAttach}
                      >
                        <Paperclip className="mr-2 h-4 w-4" />
                        Dosya Ekle
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        PNG, JPG, PDF, ZIP - Maksimum 10MB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BlurFade delay={0.2} inView>
              <Card>
                <CardHeader>
                  <CardTitle>Öncelik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {priorities.map((p) => (
                      <label
                        key={p.value}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          priority === p.value
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={p.value}
                          checked={priority === p.value}
                          onChange={(e) => setPriority(e.target.value)}
                          className="mt-1"
                        />
                        <div>
                          <p className="font-medium">{p.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {p.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.25} inView>
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Hızlı İpuçları</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Sorunu detaylı açıklayın</li>
                    <li>• Hata mesajlarını ekleyin</li>
                    <li>• Ekran görüntüsü paylaşın</li>
                    <li>• Domain/IP bilgisi verin</li>
                  </ul>
                </CardContent>
              </Card>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  "Gönderiliyor..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Talebi Gönder
                  </>
                )}
              </Button>
            </BlurFade>
          </div>
        </div>
      </form>
    </div>
  );
}
