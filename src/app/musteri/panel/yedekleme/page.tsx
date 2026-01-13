"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  Search,
  Settings,
  History,
  Shield,
  Cloud,
  AlertTriangle,
  Play,
  Pause,
  ChevronRight,
  Filter,
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
    files: 12458,
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
    files: 12445,
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
    files: 89234,
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
    files: 3456,
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
    files: 45678,
    progress: 67,
  },
  {
    id: 6,
    service: "MySQL Veritabanı",
    serviceType: "database",
    type: "Otomatik",
    size: "128 MB",
    status: "completed",
    createdAt: "Bugün, 02:00",
    retention: "14 gün",
    files: 24,
  },
  {
    id: 7,
    service: "PostgreSQL DB",
    serviceType: "database",
    type: "Otomatik",
    size: "256 MB",
    status: "failed",
    createdAt: "Dün, 02:00",
    retention: "-",
    files: 0,
    error: "Bağlantı zaman aşımı",
  },
];

// Restore history
const restoreHistory = [
  {
    id: 1,
    service: "Linux Hosting Pro",
    backupDate: "15 Ocak 2024",
    restoredAt: "16 Ocak 2024, 14:30",
    status: "completed",
    restoredBy: "Ahmet Yılmaz",
  },
  {
    id: 2,
    service: "WordPress Starter",
    backupDate: "10 Ocak 2024",
    restoredAt: "12 Ocak 2024, 09:15",
    status: "completed",
    restoredBy: "Ahmet Yılmaz",
  },
  {
    id: 3,
    service: "VDS-M Production",
    backupDate: "5 Ocak 2024",
    restoredAt: "5 Ocak 2024, 22:45",
    status: "completed",
    restoredBy: "Sistem",
  },
];

// Backup schedules
const backupSchedules = [
  {
    id: 1,
    name: "Hosting Yedekleri",
    type: "hosting",
    frequency: "Günlük",
    time: "03:00",
    retention: "7 gün",
    enabled: true,
    lastRun: "Bugün, 03:00",
    nextRun: "Yarın, 03:00",
  },
  {
    id: 2,
    name: "Sunucu Snapshot",
    type: "server",
    frequency: "Haftalık",
    time: "02:00",
    retention: "30 gün",
    enabled: true,
    lastRun: "Pazar, 02:00",
    nextRun: "Pazar, 02:00",
  },
  {
    id: 3,
    name: "Veritabanı Yedekleri",
    type: "database",
    frequency: "Günlük",
    time: "02:00",
    retention: "14 gün",
    enabled: true,
    lastRun: "Bugün, 02:00",
    nextRun: "Yarın, 02:00",
  },
  {
    id: 4,
    name: "Tam Sistem Yedeği",
    type: "full",
    frequency: "Aylık",
    time: "01:00",
    retention: "90 gün",
    enabled: false,
    lastRun: "1 Ocak 2024",
    nextRun: "Devre Dışı",
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
  full: Cloud,
};

const filterOptions = [
  { value: "all", label: "Tümü" },
  { value: "hosting", label: "Hosting" },
  { value: "server", label: "Sunucu" },
  { value: "database", label: "Veritabanı" },
];

export default function YedeklemePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"backups" | "schedules" | "history">("backups");
  const [schedules, setSchedules] = useState(backupSchedules);

  const filteredBackups = backups.filter((backup) => {
    const matchesSearch = backup.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || backup.serviceType === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: backups.length,
    totalSize: "63.7 GB",
    lastBackup: "Bugün, 04:00",
    autoBackups: backups.filter((b) => b.type === "Otomatik").length,
    failed: backups.filter((b) => b.status === "failed").length,
  };

  const storageUsage = {
    used: 63.7,
    total: 100,
    hosting: 5.5,
    server: 58,
    database: 0.2,
  };

  const toggleSchedule = (id: number) => {
    setSchedules(schedules.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
                  <p className="text-lg font-bold">{stats.lastBackup}</p>
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
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Başarısız</p>
                  <p className="text-2xl font-bold">{stats.failed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </BlurFade>

      {/* Storage Usage */}
      <BlurFade delay={0.2} inView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-blue-500" />
              Depolama Kullanımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {storageUsage.used} GB / {storageUsage.total} GB kullanılıyor
                </span>
                <span className="text-sm font-medium">
                  {((storageUsage.used / storageUsage.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-4 w-full bg-muted rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(storageUsage.hosting / storageUsage.total) * 100}%` }}
                  title={`Hosting: ${storageUsage.hosting} GB`}
                />
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${(storageUsage.server / storageUsage.total) * 100}%` }}
                  title={`Sunucu: ${storageUsage.server} GB`}
                />
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(storageUsage.database / storageUsage.total) * 100}%` }}
                  title={`Veritabanı: ${storageUsage.database} GB`}
                />
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                  Hosting ({storageUsage.hosting} GB)
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-purple-500" />
                  Sunucu ({storageUsage.server} GB)
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                  Veritabanı ({storageUsage.database} GB)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Tabs */}
      <BlurFade delay={0.25} inView>
        <div className="flex gap-2 border-b pb-2">
          <Button
            variant={activeTab === "backups" ? "default" : "ghost"}
            onClick={() => setActiveTab("backups")}
            className="gap-2"
          >
            <FileArchive className="h-4 w-4" />
            Yedekler
          </Button>
          <Button
            variant={activeTab === "schedules" ? "default" : "ghost"}
            onClick={() => setActiveTab("schedules")}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Zamanlamalar
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            onClick={() => setActiveTab("history")}
            className="gap-2"
          >
            <History className="h-4 w-4" />
            Geri Yükleme Geçmişi
          </Button>
        </div>
      </BlurFade>

      {/* Backups Tab */}
      {activeTab === "backups" && (
        <>
          {/* Filters */}
          <BlurFade delay={0.3} inView>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Yedek ara..."
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

          {/* Backups List */}
          <BlurFade delay={0.35} inView>
            <Card>
              <CardHeader>
                <CardTitle>Son Yedekler ({filteredBackups.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBackups.map((backup) => {
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
                              <FileArchive className="h-3 w-3" />
                              {backup.files.toLocaleString()} dosya
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Saklama: {backup.retention}
                            </span>
                          </div>
                          {backup.status === "in_progress" && backup.progress && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>İlerleme</span>
                                <span>{backup.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 transition-all"
                                  style={{ width: `${backup.progress}%` }}
                                />
                              </div>
                            </div>
                          )}
                          {backup.status === "failed" && backup.error && (
                            <p className="text-xs text-red-500 mt-1">
                              Hata: {backup.error}
                            </p>
                          )}
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
                          {backup.status === "failed" && (
                            <Button variant="outline" size="sm">
                              <RefreshCcw className="mr-2 h-4 w-4" />
                              Tekrar Dene
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {filteredBackups.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aramanızla eşleşen yedek bulunamadı.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        </>
      )}

      {/* Schedules Tab */}
      {activeTab === "schedules" && (
        <BlurFade delay={0.3} inView>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Yedekleme Zamanlamaları</CardTitle>
                  <CardDescription>
                    Otomatik yedekleme programlarınızı yapılandırın
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Zamanlama
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedules.map((schedule) => {
                  const ServiceIcon = serviceIcons[schedule.type as keyof typeof serviceIcons] || Shield;

                  return (
                    <div
                      key={schedule.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border",
                        !schedule.enabled && "opacity-60"
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-lg",
                        schedule.enabled ? "bg-green-500/10" : "bg-muted"
                      )}>
                        <ServiceIcon className={cn(
                          "h-6 w-6",
                          schedule.enabled ? "text-green-500" : "text-muted-foreground"
                        )} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{schedule.name}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                            {schedule.frequency}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Saat: {schedule.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Saklama: {schedule.retention}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Son çalışma: {schedule.lastRun}</span>
                          <span>Sonraki: {schedule.nextRun}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {schedule.enabled ? "Aktif" : "Devre Dışı"}
                          </span>
                          <Switch
                            checked={schedule.enabled}
                            onCheckedChange={() => toggleSchedule(schedule.id)}
                          />
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings className="mr-2 h-4 w-4" />
                          Düzenle
                        </Button>
                        {schedule.enabled && (
                          <Button variant="outline" size="sm">
                            <Play className="mr-2 h-4 w-4" />
                            Şimdi Çalıştır
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <BlurFade delay={0.3} inView>
          <Card>
            <CardHeader>
              <CardTitle>Geri Yükleme Geçmişi</CardTitle>
              <CardDescription>
                Daha önce geri yüklenen yedeklerinizin listesi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {restoreHistory.map((restore) => (
                  <div
                    key={restore.id}
                    className="flex items-center gap-4 p-4 rounded-lg border"
                  >
                    <div className="p-3 rounded-lg bg-green-500/10">
                      <RotateCcw className="h-6 w-6 text-green-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{restore.service}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileArchive className="h-3 w-3" />
                          Yedek tarihi: {restore.backupDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Geri yükleme: {restore.restoredAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {restore.restoredBy}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                      <CheckCircle2 className="h-3 w-3" />
                      Başarılı
                    </div>
                  </div>
                ))}

                {restoreHistory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Henüz geri yükleme işlemi yapılmamış.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      )}
    </div>
  );
}
