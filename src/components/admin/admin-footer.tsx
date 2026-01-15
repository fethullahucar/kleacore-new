"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 mt-auto">
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - Copyright */}
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>&copy; {currentYear} KLEACORE.</span>
            <span className="hidden sm:inline">Tüm hakları saklıdır.</span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/yasal/gizlilik"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Gizlilik
            </Link>
            <Link
              href="/yasal/kullanim-kosullari"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Kullanım Koşulları
            </Link>
            <Link
              href="/"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              Siteye Git
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          {/* Right - Version */}
          <div className="text-xs text-zinc-600">
            v1.0.0
          </div>
        </div>
      </div>
    </footer>
  );
}
