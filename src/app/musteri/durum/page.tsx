import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Globe,
  Mail,
  Shield,
  Database,
  Network,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const overallStatus = {
  status: "operational",
  message: "Tüm sistemler çalışıyor",
  lastUpdated: "2 dakika önce",
};

const services = [
  {
    name: "Web Hosting Sunucuları",
    status: "operational",
    uptime: "99.99%",
    icon: Server,
  },
  {
    name: "VDS/VPS Sunucuları",
    status: "operational",
    uptime: "99.98%",
    icon: Server,
  },
  {
    name: "Fiziksel Sunucular",
    status: "operational",
    uptime: "100%",
    icon: Server,
  },
  {
    name: "DNS Sunucuları",
    status: "operational",
    uptime: "100%",
    icon: Globe,
  },
  {
    name: "E-posta Sunucuları",
    status: "operational",
    uptime: "99.99%",
    icon: Mail,
  },
  {
    name: "Veritabanı Sunucuları",
    status: "operational",
    uptime: "99.99%",
    icon: Database,
  },
  {
    name: "CDN Altyapısı",
    status: "operational",
    uptime: "100%",
    icon: Network,
  },
  {
    name: "DDoS Koruma",
    status: "operational",
    uptime: "100%",
    icon: Shield,
  },
];

const incidents = [
  {
    date: "10 Ocak 2024",
    title: "E-posta Sunucu Bakımı",
    status: "resolved",
    description:
      "Planlı bakım çalışması başarıyla tamamlandı. Tüm e-posta hizmetleri normal çalışıyor.",
    duration: "45 dakika",
  },
  {
    date: "5 Ocak 2024",
    title: "DNS Sunucu Performans İyileştirmesi",
    status: "resolved",
    description:
      "DNS sunucularında performans optimizasyonu yapıldı. Yanıt süreleri %30 iyileştirildi.",
    duration: "30 dakika",
  },
  {
    date: "28 Aralık 2023",
    title: "Ağ Altyapısı Güncellemesi",
    status: "resolved",
    description:
      "Veri merkezi ağ altyapısı güncellendi. Bant genişliği %50 artırıldı.",
    duration: "2 saat",
  },
];

const maintenanceSchedule = [
  {
    date: "20 Ocak 2024",
    time: "02:00 - 04:00",
    title: "Veritabanı Sunucu Bakımı",
    affectedServices: ["MySQL", "PostgreSQL"],
    description: "Planlı veritabanı sunucu bakımı ve güncelleme.",
  },
  {
    date: "25 Ocak 2024",
    time: "03:00 - 05:00",
    title: "Network Ekipman Güncellemesi",
    affectedServices: ["Tüm servisler"],
    description: "Ağ ekipmanlarının firmware güncellemesi.",
  },
];

const uptimeHistory = [
  { month: "Ocak 2024", uptime: 99.99 },
  { month: "Aralık 2023", uptime: 99.98 },
  { month: "Kasım 2023", uptime: 100 },
  { month: "Ekim 2023", uptime: 99.99 },
  { month: "Eylül 2023", uptime: 99.97 },
  { month: "Ağustos 2023", uptime: 100 },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "degraded":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "outage":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "maintenance":
      return <Clock className="h-5 w-5 text-blue-500" />;
    default:
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "operational":
      return "Çalışıyor";
    case "degraded":
      return "Performans Düşük";
    case "outage":
      return "Kesinti";
    case "maintenance":
      return "Bakımda";
    case "resolved":
      return "Çözüldü";
    default:
      return "Çalışıyor";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational":
      return "bg-green-500";
    case "degraded":
      return "bg-yellow-500";
    case "outage":
      return "bg-red-500";
    case "maintenance":
      return "bg-blue-500";
    case "resolved":
      return "bg-green-500";
    default:
      return "bg-green-500";
  }
};

export default function DurumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-green-500/5 to-background">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4 ${
                    overallStatus.status === "operational"
                      ? "bg-green-500/10 text-green-600 border border-green-500/30"
                      : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/30"
                  }`}
                >
                  {getStatusIcon(overallStatus.status)}
                  {overallStatus.message}
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Sistem Durumu
                </h1>
                <p className="mt-4 text-muted-foreground">
                  Son güncelleme: {overallStatus.lastUpdated}
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Yenile
                </Button>
              </div>
            </BlurFade>

            {/* Services Status */}
            <BlurFade delay={0.2} inView>
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Servis Durumları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <service.icon className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            {service.uptime} uptime
                          </span>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(service.status)}
                            <span className="text-sm">
                              {getStatusText(service.status)}
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
        </section>

        {/* Uptime History */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Uptime Geçmişi
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Son 6 aylık çalışma süresi istatistikleri
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 max-w-5xl mx-auto">
                {uptimeHistory.map((month) => (
                  <Card key={month.month} className="text-center">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        {month.month}
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          month.uptime >= 99.99
                            ? "text-green-500"
                            : month.uptime >= 99.9
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {month.uptime}%
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Son Olaylar
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Geçmiş kesinti ve bakım çalışmaları
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="space-y-4 max-w-3xl mx-auto">
                {incidents.map((incident, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{incident.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {incident.date} • Süre: {incident.duration}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                            incident.status === "resolved"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-yellow-500/10 text-yellow-600"
                          }`}
                        >
                          {getStatusIcon(incident.status)}
                          {getStatusText(incident.status)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {incident.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Scheduled Maintenance */}
        <section className="py-16 md:py-24">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Planlı Bakım Çalışmaları
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Yaklaşan bakım ve güncelleme planları
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="space-y-4 max-w-3xl mx-auto">
                {maintenanceSchedule.length > 0 ? (
                  maintenanceSchedule.map((maintenance, idx) => (
                    <Card key={idx} className="border-blue-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 flex-shrink-0">
                            <Clock className="h-5 w-5 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold">{maintenance.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {maintenance.date} • {maintenance.time}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {maintenance.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {maintenance.affectedServices.map((service) => (
                                <span
                                  key={service}
                                  className="px-2 py-1 bg-muted rounded text-xs"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Planlanmış bakım çalışması bulunmuyor.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container">
            <BlurFade delay={0.1} inView>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Durum Bildirimleri
                </h2>
                <p className="text-muted-foreground mb-8">
                  Kesinti ve bakım çalışmalarından e-posta ile haberdar olun.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="E-posta adresiniz"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  <Button>Abone Ol</Button>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
