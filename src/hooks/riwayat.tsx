"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const Riwayat = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lastTracked = useRef("");

  useEffect(() => {
    const call = async () => {
      const search = searchParams.toString();
      const current = `${pathname}?${search}`;
      const fullUrl = `${window.location.origin}${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
      const title = document.title;
      if (lastTracked.current === current) {
        return;
      }
      lastTracked.current = current;
      fetch("/api/riwayat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pathname,
          search,
          title,
          fullUrl,
        }),
      }).catch(console.error);
    };
    const handler = setTimeout(() => {
      call();
    }, 1000);
    return () => clearTimeout(handler);
  }, [pathname, searchParams]);

  return null;
};

export default Riwayat;
