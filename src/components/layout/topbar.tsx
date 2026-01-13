"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  ChevronRight,
  ChevronDown,
  FileText,
  LogOut,
  User,
  Shield,
  Package,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Panel menu items
const panelMenuItems = [
  { title: "Profil", href: "/musteri/panel/ayarlar", icon: User },
  { title: "Güvenlik", href: "/musteri/panel/ayarlar#guvenlik", icon: Shield },
  { title: "Faturalarım", href: "/musteri/panel/faturalar", icon: FileText },
  { title: "Hizmetlerim", href: "/musteri/panel/hizmetlerim", icon: Package },
];

export function Topbar() {
  // Mock: kullanıcı giriş durumu (gerçek uygulamada auth state'den gelir)
  const [isLoggedIn] = useState(true);

  return (
    <div className="bg-zinc-900 text-zinc-300 text-xs border-b border-zinc-800">
      <div className="container flex items-center justify-between h-9">
        {/* Left - Contact Info */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="mailto:support@kleacore.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="h-3 w-3" />
            <span>support@kleacore.com</span>
          </a>
        </div>

        {/* Center - Promo Banner */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Link
            href="/hosting/linux"
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <span>%30 İndirim Fırsatı</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Right - Auth Links / User Menu */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium">
                  <User className="h-3 w-3" />
                  <span>Müşteri Paneli</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {panelMenuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2 cursor-pointer text-destructive">
                    <LogOut className="h-4 w-4" />
                    Çıkış Yap
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/musteri/giris"
                className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <User className="h-3 w-3" />
                <span>Giriş Yap</span>
              </Link>
              <span className="hidden sm:inline text-zinc-700">|</span>
              <Link
                href="/musteri/giris"
                className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <span>Kayıt Ol</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
