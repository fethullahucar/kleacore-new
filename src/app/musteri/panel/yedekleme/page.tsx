"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HardDrive,
  Download,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Server,
  Database,
  FileArchive,
  Trash2,
  RefreshCcw,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock backups data
const backups = [
  {
    id: 1,
    service: "Linux Hosting Pro",
    serviceType: "hosting",
    type: "Otomatik",
    size: "2.4 GB",
    status: "completed",
    createdAt: "Bugün, 03:00",
    retention: "7 gün",
  },
  {
    id: 2,
    service: "Linux Hosting Pro",
    serviceType: "hosting",
    type: "Otomatik",
    size: "2.3 GB",
    status: "completed",
    createdAt: "Dün, 03:00",
    retention: "6 gün",
  },
  {
    id: 3,
    service: "VDS-M Production",
    serviceType: "server",
    type: "Manuel",
    size: "45.2 GB",
    status: "completed",
    createdAt: "2 gün önce",
    retention: "30 gün",
  },
  {
    id: 4,
    service: "WordPress Starter",
    serviceType: "hosting",
    type: "Otomatik",
    size: "856 MB",
    status: "completed",
    createdAt: "Bugün, 04:00",
    retention: "7 gün",
  },
  {
    id: 5,
    service: "Cloud-S Dev",
    serviceType: "server",
    type: "Snapshot",
    size: "12.8 GB",
    status: "in_progress",
    createdAt: "Şimdi",
    retention: "Manuel",
  },
  {
    id: 6,
    service: "Database Backup",
    serviceType: "database",
    type: "Otomatik",
    size: "128 MB",
    status: "completed",
    createdAt: "Bugün, 02:00",
    retention: "14 gün",
  },
];

const statusConfig = {
  completed: {
    label: "Tamamlandı",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    icon: CheckCircle2,
  },
  in_progress: {
    label: "Devam Ediyor",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    icon: RefreshCcw,
  },
  failed: {
    label: "Başarısız",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    icon: AlertCircle,
  },
};

const serviceIcons = {
  hosting: HardDrive,
  server: Server,
  database: Database,
};

export default function YedeklemePage() {
  const stats = {
    total: backups.length,
    totalSize: "63.7 GB",
    lastBackup: "Bugün, 04:00",
    autoBackups: backups.filter((b) => b.type === "Otomatik").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Yedekleme</h1>
            <p className="text-muted-foreground">
              Yedeklerinizi görüntüleyin ve yönetin.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Manuel Yedek Al
          </Button>
        </div>
      </BlurFade>

      {/* Stats */}
      <BlurFade delay={0.15} inView>
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileArchive className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Yedek</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <HardDrive className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Boyut</p>
                  <p className="text-2xl font-bold">{stats.totalSize}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Son Yedek</p>
                  <p className="text-2xl font-bold text-sm">{stats.lastBackup}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <RefreshCcw className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Otomatik</p>
                  <p className="text-2xl font-bold">{stats.autoBackups}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Backup Settings */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardHeader>
            <CardTitle>Yedekleme Ayarları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Hosting Yedekleri</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                    Aktif
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Günlük otomatik yedekleme, 7 gün saklama
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Sunucu Yedekleri</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                    Aktif
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Haftalık otomatik yedekleme, 30 gün saklama
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Veritabanı Yedekleri</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-500">
                    Aktif
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Günlük otomatik yedekleme, 14 gün saklama
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Backups List */}
      <BlurFade delay={0.25} inView>
        <Card>
          <CardHeader>
            <CardTitle>Son Yedekler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backups.map((backup) => {
                const status = statusConfig[backup.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                const ServiceIcon = serviceIcons[backup.serviceType as keyof typeof serviceIcons];

                return (
                  <div
                    key={backup.id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-shadow"
                  >
                    <div className={cn("p-3 rounded-lg", status.bgColor)}>
                      <ServiceIcon className={cn("h-6 w-6", status.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{backup.service}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                          {backup.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {backup.createdAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="h-3 w-3" />
                          {backup.size}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Saklama: {backup.retention}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", status.bgColor, status.color)}>
                        <StatusIcon className={cn("h-3 w-3", backup.status === "in_progress" && "animate-spin")} />
                        {status.label}
                      </div>

                      {backup.status === "completed" && (
                        <>
                          <Button variant="outline" size="icon" title="İndir">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" title="Geri Yükle">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" title="Sil">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}
