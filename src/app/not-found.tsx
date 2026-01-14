import Link from "next/link";
import { Topbar } from "@/components/layout/topbar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, HelpCircle, Server, Globe, Shield } from "lucide-react";

const popularPages = [
  { name: "Web Hosting", href: "/hosting/linux", icon: Server },
  { name: "Domain Kayıt", href: "/domain/kayit", icon: Globe },
  { name: "SSL Sertifikası", href: "/ssl/standart", icon: Shield },
  { name: "Destek Merkezi", href: "/musteri/destek", icon: HelpCircle },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Topbar />
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Illustration */}
            <div className="relative mb-8">
              <div className="text-[180px] md:text-[220px] font-bold text-muted/20 leading-none select-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Oops!
                </div>
              </div>
            </div>

            {/* Message */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              Sayfa Bulunamadı
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
              Endişelenmeyin, sizi doğru yere yönlendirelim.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Ana Sayfaya Git
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/iletisim">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Yardım Al
                </Link>
              </Button>
            </div>

            {/* Popular Pages */}
            <div className="border-t pt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Belki bunlardan birini arıyordunuz:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {popularPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card hover:border-primary/50 hover:shadow-sm transition-all"
                  >
                    <page.icon className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">{page.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-8">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Önceki Sayfaya Dön
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
