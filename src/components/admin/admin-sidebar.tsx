"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  Headphones,
  Server,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  {
    title: "Dashboard",
    href: "/yonetim",
    icon: LayoutDashboard,
  },
  {
    title: "Müşteriler",
    href: "/yonetim/musteriler",
    icon: Users,
  },
  {
    title: "Hizmetler",
    href: "/yonetim/hizmetler",
    icon: Package,
  },
  {
    title: "Faturalar",
    href: "/yonetim/faturalar",
    icon: FileText,
  },
  {
    title: "Destek",
    href: "/yonetim/destek",
    icon: Headphones,
  },
  {
    title: "Sunucular",
    href: "/yonetim/sunucular",
    icon: Server,
  },
  {
    title: "Raporlar",
    href: "/yonetim/raporlar",
    icon: BarChart3,
  },
  {
    title: "Ayarlar",
    href: "/yonetim/ayarlar",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/yonetim") {
      return pathname === "/yonetim";
    }
    return pathname.startsWith(href);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-zinc-950 border-r border-zinc-800 transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className={cn(
            "flex h-16 items-center border-b border-zinc-800 px-4",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed && (
              <Link href="/yonetim" className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="KLEACORE"
                  width={120}
                  height={28}
                  className="h-6 w-auto brightness-0 invert"
                />
                <span className="text-xs font-medium text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                const menuLink = (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                );

                return (
                  <li key={item.href}>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>{menuLink}</TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      menuLink
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-zinc-800 p-3">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className="flex items-center justify-center rounded-lg px-2 py-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
                  Siteye Dön
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Siteye Dön</span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
