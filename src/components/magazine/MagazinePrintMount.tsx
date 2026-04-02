"use client";

import { useEffect } from "react";

/** Hides site chrome in print; toggles `body.magazine-issue-print`. */
export function MagazinePrintMount() {
  useEffect(() => {
    document.body.classList.add("magazine-issue-print");
    return () => document.body.classList.remove("magazine-issue-print");
  }, []);
  return null;
}
