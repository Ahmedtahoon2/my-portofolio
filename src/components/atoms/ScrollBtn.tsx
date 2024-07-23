"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const ScrollBtn = () => {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300 && scrolled < lastScrollY) {
      setVisible(true);
    } else if (scrolled > lastScrollY || scrolled <= 300) {
      setVisible(false);
    }
    setLastScrollY(scrolled);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <div
      className={cn(
        "text-background fixed bottom-12 right-10 z-10 cursor-pointer rounded-full bg-zinc-900 p-2 text-3xl transition-opacity dark:bg-slate-50",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <ChevronUp onClick={scrollToTop} className="w-6" />
    </div>
  );
};
