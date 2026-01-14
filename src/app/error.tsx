"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw, Home, Headphones } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold mb-2">Bir Hata Oluştu</h1>
        <p className="text-muted-foreground mb-6">
          Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya
          sorun devam ederse destek ekibimizle iletişime geçin.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 rounded-lg bg-muted text-left overflow-auto">
            <p className="text-sm font-mono text-red-500 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Hata Kodu: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Tekrar Dene
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ana Sayfa
            </Link>
          </Button>
        </div>

        {/* Support Link */}
        <div className="mt-8 pt-6 border-t">
          <p className="text-sm text-muted-foreground mb-3">
            Sorun devam ediyor mu?
          </p>
          <Button variant="link" asChild>
            <Link href="/iletisim">
              <Headphones className="mr-2 h-4 w-4" />
              Destek Ekibine Ulaşın
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
