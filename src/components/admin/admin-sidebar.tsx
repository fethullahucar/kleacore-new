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
  ChevronDown,
  LogOut,
  ShoppingBag,
  Layers,
  Box,
  Tag,
  Percent,
  ShoppingCart,
  CheckCircle,
  Clock,
  Pause,
  XCircle,
  ArrowUpDown,
  Puzzle,
  MessageSquareX,
  ListOrdered,
  UserPlus,
  Building2,
  UserCheck,
  UserX,
  AlertTriangle,
  FilePlus,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/yonetim",
    icon: LayoutDashboard,
  },
  {
    title: "Müşteriler",
    href: "/yonetim/musteriler",
    icon: Users,
    children: [
      { title: "Genel Bakış", href: "/yonetim/musteriler", icon: LayoutDashboard },
      { title: "Tüm Müşteriler", href: "/yonetim/musteriler/tum-musteriler", icon: Users },
      { title: "Bireysel", href: "/yonetim/musteriler/bireysel", icon: UserCheck },
      { title: "Kurumsal", href: "/yonetim/musteriler/kurumsal", icon: Building2 },
      { title: "Askıda", href: "/yonetim/musteriler/askida", icon: Pause },
      { title: "Kapalı Hesaplar", href: "/yonetim/musteriler/kapali", icon: UserX },
      { title: "Müşteri Ekle", href: "/yonetim/musteri-ekle", icon: UserPlus },
    ],
  },
  {
    title: "Ürünler",
    href: "/yonetim/urunler",
    icon: ShoppingBag,
    children: [
      { title: "Genel Bakış", href: "/yonetim/urunler", icon: LayoutDashboard },
      { title: "Kategoriler", href: "/yonetim/urunler/kategoriler", icon: Layers },
      { title: "Paketler", href: "/yonetim/urunler/paketler", icon: Box },
      { title: "Özellikler", href: "/yonetim/urunler/ozellikler", icon: Tag },
      { title: "Promosyonlar", href: "/yonetim/urunler/promosyonlar", icon: Percent },
      { title: "Siparişler", href: "/yonetim/urunler/siparisler", icon: ShoppingCart },
    ],
  },
  {
    title: "Siparişler",
    href: "/yonetim/siparisler",
    icon: ShoppingCart,
    children: [
      { title: "Genel Bakış", href: "/yonetim/siparisler", icon: LayoutDashboard },
      { title: "Tüm Siparişler", href: "/yonetim/siparisler/tum-siparisler", icon: ListOrdered },
      { title: "Aktif", href: "/yonetim/siparisler/aktif", icon: CheckCircle },
      { title: "Beklemede", href: "/yonetim/siparisler/beklemede", icon: Clock },
      { title: "Askıda", href: "/yonetim/siparisler/askida", icon: Pause },
      { title: "İptal Edilen", href: "/yonetim/siparisler/iptal", icon: XCircle },
      { title: "Yükseltme/Düşürme", href: "/yonetim/siparisler/yukseltme-dusurme", icon: ArrowUpDown },
      { title: "Eklentiler", href: "/yonetim/siparisler/eklentiler", icon: Puzzle },
      { title: "İptal Talepleri", href: "/yonetim/siparisler/iptal-talepleri", icon: MessageSquareX },
    ],
  },
  {
    title: "Faturalar",
    href: "/yonetim/faturalar",
    icon: FileText,
    children: [
      { title: "Genel Bakış", href: "/yonetim/faturalar", icon: LayoutDashboard },
      { title: "Tüm Faturalar", href: "/yonetim/faturalar/tum-faturalar", icon: Receipt },
      { title: "Ödendi", href: "/yonetim/faturalar/odendi", icon: CheckCircle },
      { title: "Bekleyen", href: "/yonetim/faturalar/bekleyen", icon: Clock },
      { title: "Gecikmiş", href: "/yonetim/faturalar/gecikmis", icon: AlertTriangle },
      { title: "İptal Edilen", href: "/yonetim/faturalar/iptal", icon: XCircle },
      { title: "Fatura Oluştur", href: "/yonetim/faturalar/olustur", icon: FilePlus },
    ],
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
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const isActive = (href: string) => {
    if (href === "/yonetim") {
      return pathname === "/yonetim";
    }
    return pathname.startsWith(href);
  };

  const isMenuExpanded = (href: string) => expandedMenus.includes(href);

  const toggleMenu = (href: string) => {
    setExpandedMenus((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    );
  };

  const isChildActive = (children?: MenuItem["children"]) => {
    if (!children) return false;
    return children.some((child) => pathname === child.href || pathname.startsWith(child.href + "/"));
  };

  // Auto-expand menu if a child is active
  const getInitialExpanded = () => {
    const expanded: string[] = [];
    menuItems.forEach((item) => {
      if (item.children && isChildActive(item.children)) {
        expanded.push(item.href);
      }
    });
    return expanded;
  };

  // Set initial expanded state on mount
  useState(() => {
    setExpandedMenus(getInitialExpanded());
  });

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-zinc-950 border-r border-zinc-800 transition-all duration-300",
          collapsed ? "w-[70px]" : "w-[260px]"
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
                const hasChildren = item.children && item.children.length > 0;
                const active = hasChildren ? isChildActive(item.children) : isActive(item.href);
                const expanded = isMenuExpanded(item.href);

                // Collapsed state - show tooltip
                if (collapsed) {
                  const menuLink = (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-center rounded-lg px-2 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary text-white"
                          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                    </Link>
                  );

                  return (
                    <li key={item.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>{menuLink}</TooltipTrigger>
                        <TooltipContent side="right" className="bg-zinc-800 text-white border-zinc-700">
                          {item.title}
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  );
                }

                // Expanded state with possible children
                return (
                  <li key={item.href}>
                    {hasChildren ? (
                      <>
                        {/* Parent menu item */}
                        <button
                          onClick={() => toggleMenu(item.href)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            active
                              ? "bg-zinc-800 text-white"
                              : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expanded && "rotate-180"
                            )}
                          />
                        </button>

                        {/* Child menu items */}
                        {expanded && (
                          <ul className="mt-1 ml-4 space-y-1 border-l border-zinc-800 pl-3">
                            {item.children!.map((child) => {
                              const childActive = pathname === child.href ||
                                (child.href !== "/yonetim/urunler" && pathname.startsWith(child.href + "/"));
                              const ChildIcon = child.icon;

                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                                      childActive
                                        ? "bg-primary text-white"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                    )}
                                  >
                                    {ChildIcon && <ChildIcon className="h-4 w-4 shrink-0" />}
                                    <span>{child.title}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-primary text-white"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
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
