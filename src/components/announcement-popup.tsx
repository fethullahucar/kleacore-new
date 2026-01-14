"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Construction, AlertTriangle } from "lucide-react";

export function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const hasSeenPopup = sessionStorage.getItem("announcement-popup-seen");
    if (!hasSeenPopup) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("announcement-popup-seen", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
            <Construction className="h-8 w-8 text-orange-500" />
          </div>
          <DialogTitle className="text-xl">Yapım Aşamasında</DialogTitle>
          <DialogDescription className="text-center pt-2">
            <span className="flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400 font-medium mb-2">
              <AlertTriangle className="h-4 w-4" />
              Dikkat
            </span>
            Sitemiz şu an yapım aşamasındadır. Gösterilen fiyatlar gerçeği yansıtmamaktadır ve sadece tasarım amaçlıdır.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button onClick={handleClose} className="w-full sm:w-auto">
            Anladım
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
