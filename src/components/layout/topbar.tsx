"use client";

import Link from "next/link";
import { Phone, Mail, Clock, ChevronRight, User } from "lucide-react";

export function Topbar() {
  return (
    <div className="bg-zinc-900 text-zinc-300 text-xs border-b border-zinc-800">
      <div className="container flex items-center justify-between h-9">
        {/* Left - Contact Info */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+13072234050"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span>+1 (307) 223-4050</span>
          </a>
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

        {/* Right - Auth Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/musteri/panel"
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <User className="h-3 w-3" />
            <span>Giriş Yap</span>
          </Link>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <Link
            href="/musteri/panel"
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <span>Kayıt Ol</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
