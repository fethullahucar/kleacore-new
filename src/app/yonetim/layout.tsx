import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminFooter } from "@/components/admin/admin-footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex flex-col">
      {/* Top Bar with Logo */}
      <div className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link href="/yonetim" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-white">K</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-zinc-900 dark:text-white">KLEACORE</span>
              <span className="text-[10px] text-zinc-500 -mt-1">YÖNETİM PANELİ</span>
            </div>
          </Link>

          {/* Header Actions (Search, Notifications, User) */}
          <AdminHeader />
        </div>

        {/* Horizontal Navigation */}
        <AdminNav />
      </div>

      {/* Main Content */}
      <main className="p-6 max-w-[1600px] mx-auto flex-1 w-full">{children}</main>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
}
